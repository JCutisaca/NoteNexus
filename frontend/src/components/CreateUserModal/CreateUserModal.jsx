import { useState } from "react";
import { validateEmail, validateName, validatePassword } from "../Validation/formValidation";
import styles from '../Form/Form.module.css';
import { postUser } from "../../redux/actions";


const CreateUserModal = ({ setShowLoginForm }) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    };

    const handleBlurName = () => {
        validateName(form, setErrors, errors);
    }

    const handleBlurEmail = () => {
        validateEmail(form, setErrors, errors);
    }

    const handleBlurPassword = () => {
        validatePassword(form, setErrors, errors);
    }

    const handleSubmitPostUser = async (event) => {
        try {
            event.preventDefault();
            const response = await postUser(form)
            setShowLoginForm(true)
            window.alert(response)
        } catch (error) {
            console.log(error.message);
        }
    }
    
    const validateSubmit = () => {
        if (!form.name.trim().length) return false
        if (!form.email.trim().length) return false
        if (!form.password.trim().length) return false
        return true
    }
    const validateErrors = () => {
        if (errors.name.length) return true
        if (errors.email.length) return true
        if (errors.password.length) return true
        return false
    }

    return (
        <>
            <form onSubmit={handleSubmitPostUser} className={styles.form}>
                <input placeholder="Name" className={styles.loginemail} onBlur={handleBlurName} onChange={handleChange} type="text" value={form.name} name="name" />
                {errors.name ? <p className={styles.warning}>{errors.name}</p> : <p>&nbsp;</p>}

                <input placeholder="Email" className={styles.loginemail} onBlur={handleBlurEmail} onChange={handleChange} type="text" value={form.email} name="email" />
                {errors.email ? <p className={styles.warning}>{errors.email}</p> : <p>&nbsp;</p>}

                <input placeholder="Password" className={styles.loginpass} onBlur={handleBlurPassword} onChange={handleChange} type="password" value={form.password} name="password" />
                {errors.password ? <p className={styles.warning}>{errors.password}</p> : <p>&nbsp;</p>}

                <button disabled={!validateSubmit() || validateErrors()} className={styles.submit} type="submit">Create</button>
                <p className={styles.text}>Already registered? <a className={styles.text} href="#" onClick={() => { setShowLoginForm(true); }}>Sig In</a></p>
            </form>
        </>
    )
}

export default CreateUserModal;