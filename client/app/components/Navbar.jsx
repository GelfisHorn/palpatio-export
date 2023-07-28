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

export default function Navbar({ styles }) {

    const { lang } = useAppContext();

    const [ showMenu, setShowMenu ] = useState(false);

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
                <button className={"block sm:hidden"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>
        </div>
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