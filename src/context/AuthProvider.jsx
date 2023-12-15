"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "@/firebase";

const authContext = createContext();

// Custom hook para obtener la información y funciones del provider
export const useAuth = () => {
    return useContext(authContext);
}

function AuthProvider({ children }){
    const [usuarioAuth, setUsuarioAuth] = useState(null);
    const [cargandoUsuario, setCargandoUsuario] = useState(true);

    // Funciones privadas
    const registrarUsuarioDB = async (datosUsuario) => {
        // Se registran los datos del perfil de cada usuario, las contraseñas no se guardan porque firebase/auth ya las maneja de una forma segura
        const docRef = doc(db, "u", datosUsuario.id);

        await setDoc(docRef, datosUsuario);

        return datosUsuario;
    }

    // Funciones públicas
    const registrarUsuario = async ({ correo, contrasena }) => {
        setCargandoUsuario(true);

        // Se registra al usuario y se regresan los datos de la cuenta
        const credenciales = await createUserWithEmailAndPassword(auth, correo, contrasena);

        // Se registra al usuario en nuestra base de datos
        const usuarioDB = await registrarUsuarioDB({
            a: correo,
            b: contrasena
        });

        return { usuarioAuth: credenciales.user, usuarioDB };
    }

    const iniciarSesion = async ({ correo, contrasena }) => {
        // Inicia sesión en firebase/auth
        // Los datos del usuario se obtienen al cambiar el estado del auth
        await signInWithEmailAndPassword(auth, correo, contrasena);
    }
    
    const cerrarSesion = async () => {
        await signOut(auth);
    }

    const actualizarUsuario = async uid => {
        setCargandoUsuario(true);

        setUsuarioAuth(auth.currentUser);
    }

    // Al cargar la página se suscribe al evento para obtener los cambios en el auth
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async currentUser => {
            setCargandoUsuario(true);

            if(currentUser){
                // Se obtienen los datos del usuario (auth)
                await actualizarUsuario(currentUser.uid);
            } else {
                setUsuarioAuth(currentUser);
            }

            setCargandoUsuario(false);
        })
         
        return () => unsubscribe();
    }, [])

    return(
        <authContext.Provider value={{
            usuarioAuth, // Usuario de firebase/auth
            cargandoUsuario,
            registrarUsuario,
            iniciarSesion,
            cerrarSesion,
        }}>
            {
                children
            }
        </authContext.Provider>
    )
}

export default AuthProvider;