"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useAuth } from "@/context/AuthProvider";

function InicioSesion(){
    const { iniciarSesion } = useAuth();
    const [datosUsuario, setDatosUsuario] = useState({
        correo: "",
        contrasena: ""
    });

    const router = useRouter();

    const handleSubmit = async e => {
        e.preventDefault();

        try{
            await iniciarSesion(datosUsuario);

            router.push("/");
        } catch(err){
            console.log(err)
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
            <h1 className="text-2xl font-bold text-center">Introduce tu correo y contraseña para iniciar sesión</h1>

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

            <input className="boton cursor-pointer" type="submit" value="Iniciar sesión" />

            <span className="mt-8 text-center">¿No tienes cuenta? <Link className="text-cyan-800 hover:text-cyan-900" href="/registro">Registrarse</Link></span>
        </form>
    )
}

export default InicioSesion;