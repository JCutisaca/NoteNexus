import { useState } from "react";
import CreateUserModal from "../CreateUserModal/CreateUserModal";
import LoginModal from "../LoginModal/LoginModal";
import styles from './Form.module.css'


const Form = () => {

    const [showLoginForm, setShowLoginForm] = useState(true);

    return (
        <div className={styles.containerForm}>
            {showLoginForm ?
                <LoginModal setShowLoginForm={setShowLoginForm}></LoginModal>
                :
                <CreateUserModal setShowLoginForm={setShowLoginForm}></CreateUserModal>
            }
        </div>
    )
}

export default Form;