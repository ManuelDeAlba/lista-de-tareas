import { Poppins } from "next/font/google";

import "./globals.css";

import Navbar from "../components/Navbar";
import AuthProvider from "../context/AuthProvider";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["500", "700"],
});

export const metadata = {
    title: "Lista de Tareas",
    description: "Lista de tareas online",
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body className={poppins.className}>
                <AuthProvider>
                    <Navbar />
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}