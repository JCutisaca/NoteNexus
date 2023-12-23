import { useEffect, useState } from 'react';
import styles from './FormNote.module.css';
import closeIcon from '../../assets/closeIcon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { getAllNotesByUserId, getDetailNote, postNote, updateNote } from '../../redux/actions';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

const FormNote = ({ setShowModal }) => {

    const allTags = useSelector(state => state.allTags);
    const userId = useSelector(state => state.userId);
    const detailNote = useSelector(state => state.detailNote);

    const dispatch = useDispatch();

    const [form, setForm] = useState({
        title: "",
        tags: [],
        content: ""
    });

    const [tags, setTags] = useState(allTags)

    const [inputValue, setInputValue] = useState('');
    const [filteredTags, setFilteredTags] = useState([]);

    const handleChange = (event) => {
        setInputValue(event.target.value);
        if (event.target.value !== '') {
            setFilteredTags(tags.filter(tag =>
                tag.toLowerCase().startsWith(event.target.value.toLowerCase())
            ));
        } else {
            setFilteredTags([]);
        }
    };

    const selectTag = (tag) => {
        setInputValue(tag);
        setFilteredTags([]);
    };

    const handleTittle = (event) => {
        setForm({
            ...form,
            title: event.target.value
        })
    }

    const handleTag = (event) => {
        event.preventDefault()
        if (tags.includes(inputValue)) {
            setTags(tags.filter(tag => tag !== inputValue))
        }
        setForm({
            ...form,
            tags: [...form.tags, inputValue]
        })
        setInputValue("")
    }

    const handleRemoveTag = (tag) => {
        if (allTags.includes(tag)) {
            setTags([...tags, tag])
            setForm({
                ...form,
                tags: form.tags.filter(newTag => newTag !== tag)
            })
            return
        }
        setForm({
            ...form,
            tags: form.tags.filter(newTag => newTag !== tag)
        })
    }

    const handleContent = (event) => {
        setForm({
            ...form,
            content: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await postNote({ ...form, userId });
            dispatch(getAllNotesByUserId(userId))
            setShowModal(false)
            navigate("/home")
        } catch (error) {
            console.log(error.message);
        }
    }
    
    const handleSubmitUpdate = async (event) => {
        try {
            event.preventDefault();
            const response = await updateNote({ ...form, userId });
            dispatch(getAllNotesByUserId(userId))
            setShowModal(false)
            navigate("/home")
        } catch (error) {
            console.log(error.message);
        }
    }

    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await dispatch(getDetailNote(userId, id));
                setForm(response.payload)
            } catch (error) {
                setShowModal(false)
                navigate("/home")
                const Toast = Swal.mixin({
                    toast: true,
                    position: "bottom-start",
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "error",
                    title: "Note not found.",
                });
            }
        };

        if (id) {
            fetchData();
        }
    }, [])

    const handleEnter = (event) => {
        if(event.keyCode === 13) {
           handleTag()
        }
     }

    return (
        <div className={styles.card}>
            {detailNote?.updatedAt ?
                <form onSubmit={handleSubmitUpdate} className={styles.cardNote}>
                    <div className={styles.cardHeader}>
                        <div className={styles.text}>
                            <input maxLength={"24"} onChange={handleTittle} placeholder='Title' type="text" value={form.title} />
                            <div className={styles.tagsAutocomplete}>
                                <input maxLength={"20"} disabled={form?.tags?.length === 3} placeholder='Tags' type="text" value={inputValue} onChange={handleChange} />
                                <button onKeyDown={handleEnter} className={styles.buttonAdd} disabled={form?.tags?.length === 3} type='' onClick={handleTag}>add</button>
                                {filteredTags.length ? (
                                    <div className={styles.tagsList}>
                                        {filteredTags.map((tag, index) => (
                                            <div key={index} className={styles.autocompleteItem} onClick={() => selectTag(tag)}>
                                                {tag}
                                            </div>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className={styles.tags}>
                            {form?.tags?.length ? form.tags.map((tag, index) => (
                                <div key={index} className={styles.tagButton}>
                                    <p>{tag}</p>
                                    <img onClick={() => handleRemoveTag(tag)} className={styles.closeIcon} src={closeIcon} width="18px" alt="" />
                                </div>
                            )) : null}
                        </div>
                    </div>
                    <div className={styles.content}>
                        <textarea maxLength={"4000"} onChange={handleContent} className={styles.textarea} value={form.content} name="" id=""></textarea>
                    </div>
                    <div className={styles.footer}>
                        <button type='submit'>Save</button>
                    </div>
                </form>




                :




                <form onSubmit={handleSubmit} className={styles.cardNote}>
                    <div className={styles.cardHeader}>
                        <div className={styles.text}>
                            <input maxLength={"24"} onChange={handleTittle} placeholder='Title' type="text" value={form.title} />
                            <div className={styles.tagsAutocomplete}>
                                <input maxLength={"20"} disabled={form?.tags?.length === 3} placeholder='Tags' type="text" value={inputValue} onChange={handleChange} />
                                <button onKeyDown={handleEnter} className={styles.buttonAdd} disabled={form?.tags?.length === 3} type='' onClick={handleTag}>add</button>
                                {filteredTags.length ? (
                                    <div className={styles.tagsList}>
                                        {filteredTags.map((tag, index) => (
                                            <div key={index} className={styles.autocompleteItem} onClick={() => selectTag(tag)}>
                                                {tag}
                                            </div>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className={styles.tags}>
                            {form?.tags?.length ? form?.tags?.map((tag, index) => (
                                <div key={index} className={styles.tagButton}>
                                    <p>{tag}</p>
                                    <img onClick={() => handleRemoveTag(tag)} className={styles.closeIcon} src={closeIcon} width="18px" alt="" />
                                </div>
                            )) : null}
                        </div>
                    </div>
                    <div className={styles.content}>
                        <textarea maxLength={"4000"} onChange={handleContent} className={styles.textarea} value={form.content} name="" id=""></textarea>
                    </div>
                    <div className={styles.footer}>
                        <button type='submit'>Submit</button>
                    </div>
                </form>}
        </div>
    );
};

export default FormNote;