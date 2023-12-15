"use client"

import { useAuth } from "@/context/AuthProvider";
import { useState } from "react";

function Registro(){
    const { registrarUsuario } = useAuth();
    const [datosUsuario, setDatosUsuario] = useState({
        correo: "",
        contrasena: ""
    });

    const handleSubmit = async e => {
        e.preventDefault();

        await registrarUsuario(datosUsuario);
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
                />
            </div>

            <input className="boton cursor-pointer" type="submit" value="Registrarse" />
        </form>
    )
}

export default Registro;