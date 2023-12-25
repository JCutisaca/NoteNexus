const regexCharacters = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ, ]+$/;
const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


export const validateName = (form, setErrors, errors) => {
    const name = form.name.trim();
    if (!name.length) {
        setErrors({
            ...errors,
            name: "Name is required."
        })
        return;
    }
    if (name.length < 4) {
        setErrors({
            ...errors,
            name: "Name should be at least 4 characters."
        })
        return;
    }
    if (!regexCharacters.test(name)) {
        setErrors({
            ...errors,
            name: "Invalid characters."
        })
        return;
    } else {
        setErrors({
            ...errors,
            name: ""
        })
    }
}

export const validateEmail = (form, setErrors, errors) => {
    const email = form.email.trim();
    if (!email.length) {
        setErrors({
            ...errors,
            email: "Email is required."
        })
        return;
    }
    if (!regexEmail.test(email)) {
        setErrors({
            ...errors,
            email: "Invalid email address."
        })
        return;
    } else {
        setErrors({
            ...errors,
            email: ""
        })
    }
}

export const validatePassword = (form, setErrors, errors) => {
    const password = form.password.trim();
    if (!password) {
        setErrors({
            ...errors,
            password: "Password is required."
        })
        return;
    }
    if (password.length < 6) {
        setErrors({
            ...errors,
            password: "Password should be at least 6 characters."
        })
        return;
    }
    if (password.length > 14) {
        setErrors({
            ...errors,
            password: "Password should not exceed 14 characters."
        })
        return;
    } else {
        setErrors({
            ...errors,
            password: ""
        })
    }
}