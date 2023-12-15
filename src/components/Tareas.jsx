"use client"

import { useAuth } from "@/context/AuthProvider";
import { borrarTarea, obtenerTareasTiempoReal } from "@/firebase";
import { useEffect, useState } from "react";

function Tareas({ handleEditar, handleBorrar }){
    const { usuarioAuth, cargandoUsuario } = useAuth();
    const [tareas, setTareas] = useState([]);

    const limpiarTexto = texto => {
        return texto
            .replaceAll(/<br>/g, "\n") // Los saltos de línea en HTML se convierten a \n
            .split("\n"); // Se separa por saltos de línea
    }

    const handleEditarTarea = (email, id) => {
        handleEditar(email, id);
        window.scrollTo(0, 0);
    }

    const handleBorrarTarea = (email, id) => {
        handleBorrar();
        borrarTarea(email, id);
    }
    
    useEffect(() => {
        if(!usuarioAuth) return;

        const unsubscribe = obtenerTareasTiempoReal(usuarioAuth.email, setTareas);

        return () => {
            unsubscribe();
        }
    }, [cargandoUsuario])

    return(
        <div>
            <h1 className="text-2xl font-bold text-center mb-4">Tareas</h1>
            <div className="flex flex-col gap-4">
                {
                    tareas.length > 0 ? (
                        tareas.map(tarea => (
                            <div className="bg-slate-300 p-4 rounded-sm" key={tarea.id}>
                                <p><b>Orden:</b> {tarea.orden}</p>
                                <span className="cursor-pointer" onClick={() => handleEditarTarea(usuarioAuth.email, tarea.id)}>Editar</span>
                                <span className="cursor-pointer" onClick={() => handleBorrarTarea(usuarioAuth.email, tarea.id)}>Borrar</span>
                                <p className="text-bold text-2xl text-center py-2">{tarea.titulo}</p>
                                <div className="h-[2px] bg-black"></div>
                                <div>
                                    {
                                        limpiarTexto(tarea.descripcion).map((linea, index) => (
                                            <p key={index}>{linea}</p>
                                        ))
                                    }
                                </div>
                                <p>{tarea.fecha}</p>
                            </div>
                        ))
                    ) : (
                        <span>No hay tareas</span>
                    )
                }
            </div>
        </div>
    )
}

export default Tareas;