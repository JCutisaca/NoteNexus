import { useEffect, useState } from 'react';
import Home from '../Home/Home';
import styles from './DetailCard.module.css';
import FormNote from '../FormNote/FormNote';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cleanDetail, getDetailNote } from '../../redux/actions';

const DetailCard = () => {
    const [showModal, setShowModal] = useState(false);
    const navidate = useNavigate();
    const location = useLocation().pathname;
    const userId = useSelector(state => state.userId)

    const closeModal = (event) => {
        if (event.target.id === "modal") {
            setShowModal(false);
            navidate("/home")
        }
    }

    const dispatch = useDispatch()
    const { id } = useParams();

    useEffect(() => {
        if (location.startsWith("/note")) {
            setShowModal(true)
        }

        // if (id) {
        //     dispatch(getDetailNote(userId, id))
        // }

        return (() => {
            if(id) {
                dispatch(cleanDetail())
            }
        })
        
    }, [])

    return (
        <>
            <Home></Home>
            {showModal &&
                <div id="modal" onClick={closeModal} className={styles.modal}>
                    <FormNote setShowModal={setShowModal} />
                </div>
            }
        </>
    )
}

export default DetailCard;