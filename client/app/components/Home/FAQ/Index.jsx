"use client"

// React
import { useState } from 'react'
// Nextjs
import Link from 'next/link'
// Animations
import { AnimatePresence, motion } from 'framer-motion'
// Hooks
import useAppContext from '@/app/hooks/useAppContext'
// Locales
import locales from '@/app/langs/components/home/faq';
// Styles
import styles from './Index.module.css'

export default function FAQ() {

    const { lang } = useAppContext();

    return (
        <div className={`${styles.container} py-20 px-6 sm:px-20`}>
            <div className={"flex flex-col justify-center gap-16 h-full"}>
                <div className={"flex flex-col gap-2 text-center"}>
                    <div className={"uppercase font-bold sm:text-lg text-primary"}>{locales[lang].subtitle}</div>
                    <h2 className={"text-2xl sm:text-4xl font-bold"}>{locales[lang].title}</h2>
                </div>
                <div className={"grid grid-cols-1 divide-y"}>
                    <Item
                        title={"¿Cuáles son los servicios de envío disponibles?"}
                        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                    />
                    <Item
                        title={"¿Cuánto tiempo se tarda en enviar un artículo desde Europa a República Dominicana?"}
                        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                    />
                    <Item
                        title={"¿Cuáles son las restricciones de envío para los productos enviados?"}
                        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                    />
                    <Item
                        title={"¿Qué documentos necesito para enviar un artículo?"}
                        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                    />
                    <Item
                        title={"¿Cuál es el peso y tamaño máximo permitido para los productos?"}
                        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                    />
                    <Item
                        title={"¿Cómo puedo rastrear mi envío?"}
                        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                    />
                    <Item
                        title={"¿Cuáles son las opciones de embalaje disponibles?"}
                        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                    />
                    <Item
                        title={"¿Cuáles son los costos de envío desde Europa a República Dominicana?"}
                        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                    />
                </div>
            </div>
        </div>
    )
}

function Item({ title, description }) {

    const [ show, setShow ] = useState(false);

    const handleShow = () => {
        setShow(!show);
    }

    return (
        <div 
            onClick={handleShow} 
            className={"flex items-center justify-between p-4 cursor-pointer select-none"}
        >
            <div className={"flex flex-col gap-2"}>
                <div className={`text-sm sm:text-lg uppercase font-semibold ${show ? "text-primary" : "text-black"} transition-colors`}>{title}</div>
                <AnimatePresence>
                    {show && (<motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={"text-sm sm:text-base"}
                    >{description}</motion.div>)}
                </AnimatePresence>
            </div>
            <div className={"flex justify-end min-w-[2rem] text-base sm:text-xl"}>
                <AnimatePresence>
                    {show ? (
                        <motion.i
                            initial={{ rotate: 180 }}
                            animate={{ rotate: 0 }}
                            exit={{ rotate: 180 }}
                            className="fa-solid fa-angle-up"
                        ></motion.i>
                    ) : (
                        <motion.i
                            initial={{ rotate: 180 }}
                            animate={{ rotate: 0 }}
                            exit={{ rotate: 180 }}
                            className="fa-solid fa-angle-down"
                        ></motion.i>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}