import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from './NavBar.module.css'
import FormNote from "../FormNote/FormNote";
import { logoutUser } from "../../redux/actions";
import { useDispatch } from "react-redux";

const NavBar = () => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = (event) => {
        if (event.target.id === "modal") {
            setShowModal(false);
        }
    }

    const handleLogout = () => {
        dispatch(logoutUser())
    }

    return (
        <>
            <nav className={styles.navbar}>
                <NavLink to={"/home"}>All Notes</NavLink>
                <NavLink to={"/archived"}>Archived Notes</NavLink>
                <NavLink to={"/note/create"} onClick={openModal}>Add Note</NavLink>
                <NavLink to={"/"} onClick={handleLogout}>Logout</NavLink>
            </nav>
        </>
    )
}

export default NavBar;
