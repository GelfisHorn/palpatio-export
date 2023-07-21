"use client"

import axios from 'axios'
// React
import { useState, useRef, useEffect } from 'react'
// Nextjs
import Image from 'next/image'
// Animations
import { AnimatePresence, motion } from 'framer-motion'
// Notifications
import { toast } from 'react-hot-toast'
// Styles
import styles from './Index.module.css'

const MAX_BOXES_AMOUNT = 10;

export default function Boxes() {

    const [ showModal, setShowModal ] = useState(false);
    const handleShowModal = () => {
        setShowModal(!showModal);
    }

    return (
        <div className={`${styles.container} py-20 px-6 sm:px-20`}>
            <div className={"flex flex-col justify-center items-center gap-16 h-full"}>
                <div className={"flex flex-col gap-2 text-center"}>
                    <div className={"uppercase font-bold sm:text-lg text-primary"}>Nuestras cajas</div>
                    <h2 className={"text-2xl sm:text-4xl font-bold"}>Nuestras cajas resistentes</h2>
                </div>
                <div className={"grid grid-cols-1 xl:grid-cols-2 items-center justify-center gap-16 w-full 2xl:w-2/3"}>
                    <div className={"flex justify-center"}>
                        <div className={"w-full sm:w-2/3 lg:w-1/2 xl:w-full"}>
                            <div className={"image-container"}>
                                <Image className={"image rounded-xl"} src={"/Boxes/box.webp"} fill alt={"Box image"} />
                            </div>
                        </div>
                    </div>
                    <div className={"flex flex-col items-center justify-center gap-10"}>
                        <div className={"flex flex-col gap-6 items-center"}>
                            <h3 className={"text-2xl sm:text-3xl font-semibold text-center"}>Envía tus articulos de forma segura</h3>
                            <div className={"text-center sm:text-lg"}>Nuestras increíbles cajas están especialmente diseñadas para el transporte y protección de tus envíos. Sabemos lo importante que es para ti garantizar que tus objetos lleguen intactos a su destino, y es por eso que te ofrecemos estas cajas de alta calidad y resistencia.</div>
                        </div>
                        <button onClick={handleShowModal} className={"flex items-center gap-3 w-fit font-semibold border-2 border-primary hover:bg-primary text-primary hover:text-white transition-colors px-8 py-3 rounded-lg"}>
                            <i className="fa-solid fa-box text-xl sm:text-2xl"></i>
                            <span className={"sm:text-lg uppercase"}>Comprar caja</span>
                        </button>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {showModal && (
                    <Modal handleClose={handleShowModal} />
                )}
            </AnimatePresence>
        </div>
    )
}

function Modal({ handleClose }) {

    const [ fullName, setFullName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ phoneNumber, setPhoneNumber ] = useState("");
    const [ amount, setAmount ] = useState(1);

    useEffect(() => {
        if(amount >= MAX_BOXES_AMOUNT) {
            setAmount(MAX_BOXES_AMOUNT);
        }
    }, [amount])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([fullName, email, phoneNumber].includes("") || amount <= 0) {
            return toast.error("Debes llenar todos los campos");
        }

        try {
            await axios.post('/api/orders/boxes/create', { fullName, email, phoneNumber, amount });
            toast.success("Haz realizado el pedido correctamente!");
            resetForm();
            handleClose();
        } catch (error) {
            toast.error(error?.response?.data?.msg?.es || "Hubo un error al crear la orden");
        }
    }

    function resetForm() {
        setFullName("");
        setEmail("");
        setPhoneNumber("");
        setAmount(1);
    }

    return (
        <motion.div
            className={styles.modalContainer}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className={styles.modalBackdrop} onClick={handleClose}></div>
            <form onSubmit={handleSubmit} className={`${styles.modal} w-[95vw] md:w-[45rem] py-5 sm:py-6 px-5 sm:px-8 overflow-y-scroll hide-scrollbar`}>
                <div className={"pb-7 border-b"}>
                    <div className={"flex flex-col gap-4 sm:gap-7"}>
                        <div className={"flex items-center justify-between"}>
                            <div className={"text-2xl sm:text-3xl font-semibold"}>Comprar caja</div>
                            <button type={"button"} onClick={handleClose} className={"text-2xl sm:text-3xl font-semibold hover:text-primary transition-colors"}><i className="fa-sharp fa-solid fa-xmark"></i></button>
                        </div>
                        <div className={"flex flex-col gap-2 sm:gap-4"}>
                            <div className={"text-lg sm:text-xl font-semibold"}>Información de contacto</div>
                            <div className={"grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4"}>
                                <div className={"flex flex-col"}>
                                    <label className={"text-sm"} htmlFor="name">Nombre completo</label>
                                    <input onChange={e => setFullName(e.target.value)} value={fullName} className={`${styles.input} border py-2`} type="text" id="name" placeholder={"Escribe tu nombre completo"} />
                                </div>
                                <div className={"flex flex-col"}>
                                    <label className={"text-sm"} htmlFor="email">Correo electrónico</label>
                                    <input onChange={e => setEmail(e.target.value)} value={email} className={`${styles.input} border py-2`} type="email" id="email" placeholder={"Escribe tu correo electrónico"} />
                                </div>
                                <div className={"flex flex-col"}>
                                    <label className={"text-sm"} htmlFor="phoneNumber">Número de teléfono</label>
                                    <input onChange={e => setPhoneNumber(e.target.value)} value={phoneNumber} className={`${styles.input} border py-2`} type="tel" id="phoneNumber" placeholder={"Escribe tu número de teléfono"} />
                                </div>
                            </div>
                        </div>
                        <div className={"flex flex-col gap-2"}>
                            <div className={"text-lg sm:text-xl font-semibold"}>Cantidad</div>
                            <div className={"grid grid-cols-1"}>
                                <input onChange={e => setAmount(e.target.value)} value={amount} className={`${styles.input} border py-2`} type="number" id="amount" placeholder={"Cantidad de cajas"} min={1} max={MAX_BOXES_AMOUNT} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"flex items-center justify-end gap-2 pt-7"}>
                    <button type={"button"} onClick={handleClose} className={"py-2 px-4 font-semibold border border-primary hover:bg-primary text-primary hover:text-zinc-200 transition-colors rounded-md"}>Cancelar</button>
                    <button type={"submit"} className={"py-2 px-4 font-semibold bg-primary hover:bg-cyan-600 text-zinc-200 transition-colors rounded-md"}>Comprar caja</button>
                </div>
            </form>
        </motion.div>
    )
}