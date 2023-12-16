export const ERRORES_FIREBASE = {
    AUTH: {
        "auth/invalid-email": "Correo electrónico inválido",
        "auth/missing-password": "Escribe la contraseña",
        "auth/user-not-found": "Credenciales de inicio de sesión incorrectas. Verifique su correo y contraseña",
        "auth/wrong-password": "Credenciales de inicio de sesión incorrectas. Verifique su correo y contraseña",
        "auth/invalid-login-credentials": "Credenciales de inicio de sesión incorrectas. Verifique su correo y contraseña",
        "auth/missing-email": "Escribe el correo electrónico",
        "auth/weak-password": "La contraseña debe tener al menos 6 caracteres",
        "auth/email-already-in-use": "El correo ya está en uso",
        "auth/too-many-requests": "Acceso a la cuenta deshabilitado. Restablezca la contraseña",
    },
}

export function limpiarTexto(texto) {
    return texto
        .replaceAll(/<br>/g, "\n") // Los saltos de línea en HTML se convierten a \n
        .split("\n"); // Se separa por saltos de línea
}