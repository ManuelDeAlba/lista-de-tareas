"use client"

import { useEffect, useState } from "react";

import { useAuth } from "@/context/AuthProvider";
import { agregarTarea, editarTarea, obtenerTarea } from "@/firebase";

const tareaDefault = {
    titulo: "",
    descripcion: "",
    fecha: "",
    orden: ""
}

function Formulario({ datosEditar, setDatosEditar }){
    const { usuarioAuth } = useAuth();
    const [tarea, setTarea] = useState(tareaDefault);

    const handleSubmit = async e => {
        e.preventDefault();

        try{
            if(!datosEditar){
                await agregarTarea(usuarioAuth.email, tarea);
            } else {
                await editarTarea(datosEditar.email, datosEditar.id, tarea);
            }
    
            setTarea(tareaDefault);
            setDatosEditar(null);
        } catch(error){
            console.log(error);
        }
    }

    const handleInput = e => {
        setTarea(tarea => ({
            ...tarea,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        if(datosEditar){
            obtenerTarea(datosEditar.email, datosEditar.id)
            .then(tarea => {
                setTarea(tarea);
            })
        } else {
            setTarea(tareaDefault);
        }
    }, [datosEditar])

    return(
        <form className="my-4 flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
                className="border border-gray-600 px-3 py-1 outline-none"
                type="text"
                name="titulo"
                placeholder="Título"
                value={tarea.titulo}
                onInput={handleInput}
            />

            <textarea
                className="border border-gray-600 px-3 py-1 outline-none resize-none"
                type="text"
                name="descripcion"
                placeholder="Descripción"
                value={tarea.descripcion}
                onInput={handleInput}
            >
            </textarea>

            <input
                className="border border-gray-600 px-3 py-1 outline-none"
                type="text"
                name="fecha"
                placeholder="Fecha"
                value={tarea.fecha}
                onInput={handleInput}
            />

            <input
                className="border border-gray-600 px-3 py-1 outline-none"
                type="number"
                name="orden"
                placeholder="Orden"
                value={tarea.orden}
                onInput={handleInput}
            />

            <input className="boton cursor-pointer" type="submit" value={!datosEditar ? "Agregar tarea" : "Editar tarea"} />
        </form>
    )
}

export default Formulario;