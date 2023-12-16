"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthProvider";

import Formulario from "@/components/Formulario";
import Tareas from "@/components/Tareas";

function Inicio(){
    const router = useRouter();
    const { usuarioAuth, cargandoUsuario } = useAuth();
    const [datosEditar, setDatosEditar] = useState(null);

    const handleEditar = (email, id) => {
        setDatosEditar({
            email,
            id
        });
    }

    const handleBorrar = () => {
        setDatosEditar(null);
    }

    useEffect(() => {
        if(!usuarioAuth && !cargandoUsuario){
            router.push("/inicio-sesion");
        }
    }, [usuarioAuth, cargandoUsuario])

    if(!usuarioAuth) return <span className="block pt-4 text-xl text-center">Cargando...</span>

    return(
        <main className="w-[90%] max-w-5xl m-auto">
            <Formulario datosEditar={datosEditar} setDatosEditar={setDatosEditar} />
            <Tareas handleEditar={handleEditar} handleBorrar={handleBorrar} />
        </main>
    )
}

export default Inicio;