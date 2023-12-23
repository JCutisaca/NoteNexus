import styles from './CardNote.module.css';
import archiveIcon from '../../assets/archiveIcon.svg'
import deleteIcon from '../../assets/deleteIcon.svg'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import { deleteNote, getAllNotesByUserId, updateNote } from '../../redux/actions';
import closeIcon from '../../assets/closeIcon.svg'
import { useNavigate } from 'react-router-dom';

const CardNote = ({ id, title, tags, content, archived, createdAt, updatedAt }) => {
    const userId = useSelector(state => state.userId);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const dateServer = new Date(updatedAt);
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    };

    const dateClient = dateServer.toLocaleString('es-ES', options);

    const handleDeleteNote = async () => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });
            if (result.isConfirmed) {
                await deleteNote(userId, id);
                dispatch(getAllNotesByUserId(userId));
                Swal.fire({
                    title: "Deleted!",
                    text: "Your Note has been deleted.",
                    icon: "success"
                });
            }
        } catch (error) {
            console.error("Error deleting note:", error);
            Swal.fire({
                title: "Error!",
                text: "An error occurred while deleting the note.",
                icon: "error"
            });
        }
    };

    const handleArchive = async () => {
        const form = {
            userId,
            id,
            archived: !archived
        }
        await updateNote(form)
        dispatch(getAllNotesByUserId(userId));
    }

    const handleRemoveTag = async (tag) => {
        const newTags = tags.filter(currentTag => currentTag !== tag)
        const form = {
            userId,
            id,
            tags: newTags
        }
        await updateNote(form)
        dispatch(getAllNotesByUserId(userId));
    }

    return (
        <div className={styles.card}>
            <div className={styles.cardNote}>
                <div className={styles.cardHeader}>
                    <div className={styles.text}>
                        <h3> {title} </h3>
                        <img onClick={handleArchive} className={styles.archiveIcon} src={archiveIcon} title="archive" width="11%" alt="" />
                        <img onClick={handleDeleteNote} className={styles.deleteIcon} src={deleteIcon} title="delete" width="10%"></img>
                    </div>

                    <div className={styles.tags}>
                        {tags.length ? tags.map((tag, index) => (
                            <div key={index} className={styles.tagButton}>
                                <p>{tag}</p>
                                <img onClick={() => handleRemoveTag(tag)} className={styles.closeIcon} src={closeIcon} width="18px" alt="" />
                            </div>
                        )) : null}
                    </div>

                </div>
                <div onClick={() => navigate(`/note/${id}`)} className={styles.content}>
                    <p>{content}</p>
                </div>
                <div className={styles.footer}>
                    <p> Modified in {dateClient} hs </p>
                </div>
            </div>
        </div>
    )
}

export default CardNote;