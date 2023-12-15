// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection, onSnapshot, doc, deleteDoc, setDoc, query, orderBy, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export async function agregarTarea(email, {
    titulo="Sin título",
    descripcion,
    fecha="Sin fecha",
    orden=Date.now()
}){
    if(!descripcion) throw new Error("Escribe la descripción de la tarea");

    const id = Date.now().toString();
    const docRef = doc(db, email, id);

    await setDoc(docRef, {
        titulo,
        descripcion,
        fecha,
        orden: Number(orden)
    });
}

export async function editarTarea(email, id, {
    titulo="Sin título",
    descripcion,
    fecha="Sin fecha",
    orden=Date.now()
}){
    if(!descripcion) throw new Error("Escribe la descripción de la tarea");

    const docRef = doc(db, email, id);
    
    await updateDoc(docRef, {
        titulo,
        descripcion,
        fecha,
        orden: Number(orden)
    });
}

export async function obtenerTarea(email, id){
    const docRef = doc(db, email, id);

    const documento = await getDoc(docRef);

    if(!documento.exists()) return null;

    return { ...documento.data(), id: documento.id };
}

export function obtenerTareasTiempoReal(email, callback){
    const q = query(collection(db, email), orderBy("orden", "asc"));

    const unsubscribe = onSnapshot(q, querySnapshot => {
        if(querySnapshot.empty) return [];

        const tareas = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

        callback(tareas);
    })

    return unsubscribe;
}

export async function borrarTarea(email, id){
    const docRef = doc(db, email, id);

    await deleteDoc(docRef);
}