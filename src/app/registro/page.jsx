"use client"

import { useState } from "react";
import Link from "next/link";

import { useAuth } from "@/context/AuthProvider";
import { ERRORES_FIREBASE } from "@/utils";

function Registro(){
    const { registrarUsuario } = useAuth();
    const [datosUsuario, setDatosUsuario] = useState({
        correo: "",
        contrasena: ""
    });
    const [error, setError] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();

        try{
            await registrarUsuario(datosUsuario);
        } catch(error){
            setError(ERRORES_FIREBASE.AUTH[error.code]);
        }
    }

    const handleInput = e => {
        setDatosUsuario(datos => ({
            ...datos,
            [e.target.name]: e.target.value
        }));
    }

    return(
        <form className="w-[90%] max-w-5xl m-auto my-4 flex flex-col gap-4" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-center">Introduce tu correo y contraseña para registrarte</h1>

            <div className="flex flex-col">
                <label htmlFor="correo">Correo:</label>
                <input
                    className="border border-gray-600 px-3 py-1 outline-none"
                    type="email"
                    name="correo"
                    id="correo"
                    placeholder="correo@example.com"
                    value={datosUsuario.correo}
                    onInput={handleInput}
                    required
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="contrasena">Contraseña:</label>
                <input
                    className="border border-gray-600 px-3 py-1 outline-none"
                    type="password"
                    name="contrasena"
                    id="contrasena"
                    placeholder="********"
                    value={datosUsuario.contrasena}
                    onInput={handleInput}
                    required
                />
            </div>

            {
                error && (
                    <span className="text-red-600">{error}</span>
                )
            }

            <input className="boton cursor-pointer" type="submit" value="Registrarse" />

            <span className="mt-8 text-center">¿Ya tienes cuenta? <Link className="text-cyan-800 hover:text-cyan-900" href="/inicio-sesion">Iniciar sesión</Link></span>
        </form>
    )
}

export default Registro;