import { useState } from "react";
import CreateUserModal from "../CreateUserModal/CreateUserModal";
import LoginModal from "../LoginModal/LoginModal";


const Form = () => {

    const [showLoginForm, setShowLoginForm] = useState(true);

    return (
        <>
            {showLoginForm ?
                <LoginModal setShowLoginForm={setShowLoginForm}></LoginModal>
                :
                <CreateUserModal setShowLoginForm={setShowLoginForm}></CreateUserModal>
            }
        </>
    )
}

export default Form;