"use client"

import { useEffect, useState } from "react";

import { useAuth } from "@/context/AuthProvider";
import { obtenerTareasTiempoReal } from "@/firebase";

import Tarea from "./Tarea";

function Tareas({ handleEditar, handleBorrar }){
    const { usuarioAuth, cargandoUsuario } = useAuth();
    const [tareas, setTareas] = useState([]);
    
    useEffect(() => {
        if(!usuarioAuth) return;

        const unsubscribe = obtenerTareasTiempoReal(usuarioAuth.email, setTareas);

        return () => {
            unsubscribe();
        }
    }, [cargandoUsuario])

    return(
        <div className="pb-6">
            <h1 className="text-2xl font-bold text-center mb-4">Tareas</h1>
            <div className="flex flex-col gap-4">
                {
                    tareas.length > 0 ? (
                        tareas.map(tarea => (
                            <Tarea
                                key={tarea.id}
                                tarea={tarea}
                                handleEditar={handleEditar}
                                handleBorrar={handleBorrar}
                            />
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