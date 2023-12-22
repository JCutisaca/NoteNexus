const regexCharacters = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ, ]+$/;
const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


export const validateName = (form, setErrors, errors) => {
    const name = form.name.trim();
    if (!name.length) {
        setErrors({
            ...errors,
            name: "errors.nameEmpty"
        })
        return;
    }
    if (name.length < 5) {
        setErrors({
            ...errors,
            name: "errors.nameShort"
        })
        return;
    }
    if (!regexCharacters.test(name)) {
        setErrors({
            ...errors,
            name: "errors.nameInvalid"
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
            email: "errors.emailEmpty"
        })
        return;
    }
    if (!regexEmail.test(email)) {
        setErrors({
            ...errors,
            email: "errors.emailInvalid"
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
            password: "errors.passwordEmpty"
        })
        return;
    }
    if (password.length < 6) {
        setErrors({
            ...errors,
            password: "errors.passwordShort"
        })
        return;
    }
    if (password.length > 14) {
        setErrors({
            ...errors,
            password: "errors.passwordLong"
        })
        return;
    } else {
        setErrors({
            ...errors,
            password: ""
        })
    }
}