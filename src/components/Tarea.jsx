import { useAuth } from "@/context/AuthProvider";

import { borrarTarea } from "@/firebase";
import { limpiarTexto } from "@/utils";

function Tarea({ tarea, handleEditar, handleBorrar }){
    const { usuarioAuth } = useAuth();

    const handleEditarTarea = (email, id) => {
        handleEditar(email, id);
        window.scrollTo(0, 0);
    }

    const handleBorrarTarea = (email, id) => {
        handleBorrar();
        borrarTarea(email, id);
    }

    return(
        <div className="bg-slate-300 p-4 rounded-sm whitespace-nowrap">
            <div className="flex gap-4 max-[250px]:flex-col-reverse">
                <p className="max-w-full mr-auto overflow-hidden text-ellipsis"><b>Orden:</b> {tarea.orden}</p>

                <div className="flex justify-end gap-4">
                    <span className="cursor-pointer text-3xl" onClick={() => handleEditarTarea(usuarioAuth.email, tarea.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit w-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                    </span>

                    <span className="cursor-pointer text-3xl" onClick={() => handleBorrarTarea(usuarioAuth.email, tarea.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash w-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                    </span>
                </div>
            </div>

            <p className="text-bold text-2xl text-center py-2 whitespace-normal">{tarea.titulo}</p>

            <div className="h-[2px] bg-black"></div>

            <div className="my-4">
                {
                    limpiarTexto(tarea.descripcion).map((linea, index) => (
                        <p className="whitespace-normal break-words" key={index}>{linea}</p>
                    ))
                }
            </div>

            <p className="text-right">{tarea.fecha}</p>
        </div>
    )
}

export default Tarea;