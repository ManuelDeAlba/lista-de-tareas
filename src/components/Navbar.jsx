"use client"

import Link from "next/link";
import { useAuth } from "../context/AuthProvider";

function Navbar(){
    const { usuarioAuth, cerrarSesion } = useAuth();

    return(
        <nav className="h-[50px] bg-cyan-900 text-white">
            <div className="h-full container m-auto flex justify-end items-center gap-4">
                {
                    usuarioAuth ? (
                        <>
                            <span>{usuarioAuth.email}</span>
                            <button onClick={cerrarSesion}>Cerrar sesión</button>
                        </>
                    ) : (
                        <>
                            <Link href="/registro">Registrarse</Link>
                            <Link href="/inicio-sesion">Iniciar sesión</Link>
                        </>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar;