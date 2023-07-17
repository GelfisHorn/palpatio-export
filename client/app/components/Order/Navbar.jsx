
// React
import { useState } from "react";
// Nextjs
import Link from "next/link";
// Animations
import { AnimatePresence, motion } from "framer-motion";
// Styles
import styles from './Navbar.module.css'

export default function OrderNavbar({ step }) {

    const [ showMenu, setShowMenu ] = useState(false);

    const handleShowMenu = () => {
        document.body.style.overflow = 'hidden';
        setShowMenu(true)
    }

    const handleCloseMenu = () => {
        document.body.style.overflow = 'auto';
        setShowMenu(false)
    }

    return (
        <div className={`relative flex items-center justify-between px-3 sm:px-8 text-sm 2xl:text-base h-16 shadow-md`}>
            <div className={"hidden md:flex items-center gap-3 cursor-default"}>
                <div className={`flex items-center gap-1 ${step == 1 ? "text-neutral-900 underline" : step > 1 ? "text-primary" : "text-neutral-400"} font-medium`}>
                    {step > 1 && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                    <span>Qué enviar</span>
                </div>
                <Arrow />
                <div className={`flex items-center gap-1 ${step == 2 ? "text-neutral-900 underline" : step > 2 ? "text-primary" : "text-neutral-400"} font-medium`}>
                    {step > 2 && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                    <span>Detalles del pedido</span>
                </div>
                <Arrow />
                <div className={`flex items-center gap-1 ${step == 3 ? "text-neutral-900 underline" : step > 3 ? "text-primary" : "text-neutral-400"} font-medium`}>
                    {step > 3 && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                    <span>Detalles de envío</span>
                </div>
            </div>
            <div className={"block md:hidden"}>
                <div className={"text-lg font-medium"}>Paso <span className={""}>{step}</span></div>
            </div>
            <div className={"flex items-center divide-x"}>
                <div className={"pr-3"}>
                    <Link href={"tel:+49 1522 343333"} className={"text-base hover:text-primary transition-colors"}>+49 1522 343333</Link>
                </div>
                <div className={"hidden md:block pl-3"}>
                    <Link href={"/login"} className={"text-base 2xl:text-lg hover:text-primary transition-colors"}>Iniciar sesión</Link>
                </div>
                <div className={"block md:hidden pl-3"}>
                    <div onClick={handleShowMenu} className={"text-2xl hover:text-primary cursor-pointer transition-colors"}>
                        <i class="fa-regular fa-bars"></i>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {showMenu && (
                    <NavbarMenu handleClose={handleCloseMenu} />
                )}
            </AnimatePresence>
        </div>
    )
}

function Arrow() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 2xl:w-4 h-3 2xl:h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
    )
}

function NavbarMenu({ handleClose }) {
    return (
        <>
            <div onClick={handleClose} className={`${styles.menuBackground}`}>
            </div>
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 500 }}
                className={`${styles.menu} rounded-l-md`}
            >
                <div className={"flex items-center justify-between py-5 px-6"}>
                    <div className={"text-xl font-semibold"}>Pal Patio Export</div>
                    <button onClick={handleClose} className={"text-2xl hover:text-primary transition-colors"}><i class="fa-regular fa-xmark"></i></button>
                </div>
                <div className={"flex flex-col items-center gap-4 pb-8 text-base"}>
                    <Link href={"/login"} className={"hover:text-primary transition-colors font-medium"}>Iniciar sesión</Link>
                    <Link href={"/register"} className={"py-2 px-6 bg-primary hover:bg-[#148bac] transition-colors rounded-md text-white"}>Crear cuenta</Link>
                </div>
            </motion.div>
        </>
    )
}