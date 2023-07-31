"use client"

// React
import { useState } from "react";
// Nextjs
import Link from "next/link";
// Components
import ContactButton from "./ContactButton";
// Hooks
import useAppContext from "../hooks/useAppContext";
// Animations
import { motion, AnimatePresence } from "framer-motion";
// Locales
import locales from "../langs/components/layout";
import mobileNavLocales from '@/app/langs/components/order/navbar';
// Styles
import styles from '@/app/components/Order/Navbar.module.css'

export default function Navbar({ styles }) {

    const { lang } = useAppContext();

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
        <div className={`relative flex items-center justify-between px-6 sm:px-20 2xl:px-28 h-20 ${styles || ""} z-10 text-lg 2xl:text-xl`}>
            <div className={"flex items-center gap-14"}>
                <Link href={'/'} className={"text-xl 2xl:text-2xl font-medium"}>Pal Patio Export</Link>
                {/* <nav>
                    <ul className={"flex items-center gap-3"}>
                        <li>
                            <Link href={"#"}>Inicio</Link>
                        </li>
                        <li>
                            <Link href={"#"}>Servicios</Link>
                        </li>
                    </ul>
                </nav> */}
            </div>
            <div className={"flex items-center gap-3"}>
                <div className={"hidden sm:flex items-center gap-5 text-lg"}>
                    <Link href={"/login"}>{locales[lang].login}</Link>
                    {/* <Link href={"/register"} className={"py-2 px-4 rounded-md bg-primary hover:bg-cyan-800 transition-colors text-white"}>Crear cuenta</Link> */}
                    <ContactButton />
                    <LangDropdown />
                </div>
                <div className={"block sm:hidden"}>
                    <ContactButton mobileMode={true} />
                </div>
                <button className={"block sm:hidden"} onClick={handleShowMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>
            <AnimatePresence>
                {showMenu && (
                    <NavbarMenu handleClose={handleCloseMenu} />
                )}
            </AnimatePresence>
        </div>
    )
}

function NavbarMenu({ handleClose }) {

    const { lang } = useAppContext();

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
                    <button onClick={handleClose} className={"text-2xl hover:text-primary transition-colors"}><i className="fa-regular fa-xmark"></i></button>
                </div>
                <div className={"flex flex-col items-center gap-10"}>
                    <LangDropdown />
                    <div className={"flex flex-col items-center gap-4 pb-8 text-base"}>
                        <Link href={"/login"} className={"hover:text-primary transition-colors font-medium"}>{mobileNavLocales[lang].logIn}</Link>
                        <Link href={"/register"} className={"py-2 px-6 bg-primary hover:bg-[#148bac] transition-colors rounded-md text-white"}>{mobileNavLocales[lang].signUp}</Link>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

const LANGS = {
    fr: {
        key: "fr",
        name: "French"
    },
    de: {
        key: "de",
        name: "German"
    },
    en: {
        key: "en",
        name: "English"
    },
    es: {
        key: "es",
        name: "Español"
    }
}

function LangDropdown() {

    const { lang, handleSetLang } = useAppContext();
 
    const [showLangDropdown, setShowLangDropdown] = useState(false);
    const handleLangDropdown = () => setShowLangDropdown(!showLangDropdown);

    const handleSetNewLang = (lang) => {
        handleSetLang(lang);
        handleLangDropdown();
    }

    return (
        <div className={"relative"}>
            <button onClick={handleLangDropdown} className={`flex items-center justify-center gap-2 w-[4.5rem] h-10 border ${showLangDropdown ? "rounded-t-md border-b-0" : "rounded-md"} bg-neutral-100`}>
                <div className={"uppercase"}>{LANGS[lang].key}</div>
                <div><i className="fa-regular fa-angle-down"></i></div>
            </button>
            <AnimatePresence>
                {showLangDropdown && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`absolute divide-y border rounded-b-md overflow-hidden`}
                    >
                        {Object.values(LANGS).map((lang, index) => (
                            <button key={index} onClick={() => handleSetNewLang(lang.key)} className={"bg-neutral-100 hover:bg-white px-5 py-1 w-full transition-colors"}>{lang.name}</button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}