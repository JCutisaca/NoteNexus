import { useState } from "react";
import { validateEmail, validateName, validatePassword } from "../Validation/formValidation";
import styles from '../Form/Form.module.css';
import { loginUser } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const LoginModal = ({setShowLoginForm}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    };

    const handleBlurEmail = () => {
        validateEmail(form, setErrors, errors);
    }

    const handleBlurPassword = () => {
        validatePassword(form, setErrors, errors);
    }

    const handleSubmitLoginUser = async (event) => {
        try {
            event.preventDefault();
            const response = await loginUser(form)(dispatch);
            if (response) {
                window.alert(response.payload.userId);
                navigate("/home")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const validateSubmit = () => {
        if (!form.email.trim().length) return false
        if (!form.password.trim().length) return false
        return true
    }
    const validateErrors = () => {
        if (errors.email.length) return true
        if (errors.password.length) return true
        return false
    }

    return (
        <>
            <form onSubmit={handleSubmitLoginUser} className={styles.form}>
                <input placeholder="Email" className={styles.loginemail} onBlur={handleBlurEmail} onChange={handleChange} type="text" value={form.email} name="email" />
                {errors.email ? <p className={styles.warning}>{errors.email}</p> : <p>&nbsp;</p>}

                <input placeholder="Password" className={styles.loginpass} onBlur={handleBlurPassword} onChange={handleChange} type="text" value={form.password} name="password" />
                {errors.password ? <p className={styles.warning}>{errors.password}</p> : <p>&nbsp;</p>}

                <button disabled={!validateSubmit() || validateErrors()} className={styles.submit} type="submit">Login</button>
                <p className={styles.text}>Not registered? <a className={styles.text} href="#" onClick={() => { setShowLoginForm(false); }}>Create an account</a></p>
            </form>
        </>
    )
}

export default LoginModal;