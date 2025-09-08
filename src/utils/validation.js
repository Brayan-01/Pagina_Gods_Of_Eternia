export const validatePassword = (password) => {
    const commonPasswords = [
        "123456", "password", "123456789", "12345678", "12345", "1234567",
        "1234567890", "qwerty", "abc123", "password123", "admin", "letmein",
        "welcome", "monkey", "1234", "dragon", "sunshine", "master", "123123",
        "football", "iloveyou", "admin123", "welcome123", "password1"
    ];
    if (commonPasswords.includes(password.toLowerCase())) {
        return "Esta contraseña es muy común y fácil de adivinar";
    }
    if (password.length < 8) {
        return "La contraseña debe tener al menos 8 caracteres";
    }
    if (!/[A-Z]/.test(password)) {
        return "La contraseña debe contener al menos una letra mayúscula";
    }
    if (!/[a-z]/.test(password)) {
        return "La contraseña debe contener al menos una letra minúscula";
    }
    if (!/[0-9]/.test(password)) {
        return "La contraseña debe contener al menos un número";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return "La contraseña debe contener al menos un carácter especial";
    }
    return "";
};
