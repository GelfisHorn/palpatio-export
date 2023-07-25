"use client"

// React
import { useState } from 'react'
// Nextjs
import Image from 'next/image'
import Link from 'next/link'
// Animations
import { AnimatePresence, motion } from 'framer-motion'
// Styles
import styles from './Index.module.css'

export default function WhatSend() {
    return (
        <div className={`${styles.container} py-20 px-6 md:px-20`}>
            <div className={"flex flex-col justify-center gap-16 h-full"}>
                <div className={"flex flex-col gap-2 text-center"}>
                    <div className={"uppercase font-bold sm:text-lg text-primary"}>¿Qué enviar?</div>
                    <h2 className={"text-2xl sm:text-4xl font-bold"}>Lo que puedes enviar</h2>
                </div>
                <div className={"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 gap-y-6 sm:gap-y-10"}>
                    <Card
                        src={"/order/car.webp?v=2"}
                        alt={"Car image"}
                        text={"Confía en nuestro servicio de envío de autos para trasladar tu vehículo de forma segura y confiable a cualquier destino. Nos encargamos de la logística completa, desde la recolección hasta la entrega. Embalaje especializado y cuidado extremo para garantizar que tu auto llegue en perfectas condiciones. Simplifica el envío de tu vehículo con nosotros."}
                        title={"Autos"}                    
                    />
                    <Card
                        src={"/order/box.webp?v=1"}
                        alt={"Package image"}
                        text={"Nuestro servicio de envío de cajas ofrece comodidad y tranquilidad en cada envío. Desde pequeñas cajas personales hasta paquetes comerciales, nos encargamos de todo el proceso logístico. Opciones flexibles, embalaje profesional y seguimiento en línea para asegurar que tus cajas lleguen a su destino final sin complicaciones. Confía en nosotros para enviar tus cajas de manera confiable."}
                        title={"Paquetes"}                    
                    />
                    <Card
                        src={"/order/furniture.webp?v=1"}
                        alt={"Furniture image"}
                        text={"Transfiere tus muebles con confianza a República Dominicana con nuestro servicio especializado de envío. Embalaje profesional, cuidado extremo y opciones flexibles para adaptarse a tus necesidades. Nos encargamos de todo el proceso logístico para que puedas disfrutar de un envío sin preocupaciones. Simplifica el envío de tus muebles con nuestro servicio confiable y de alta calidad."}
                        title={"Muebles"}                    
                    />
                    <Card
                        src={"/order/tank.webp?v=1"}
                        alt={"Tank image"}
                        text={"Nuestro servicio de envío de tanques te brinda la tranquilidad de transportar estos grandes contenedores de manera segura y eficiente. Contamos con la experiencia y los recursos necesarios para manejar el envío de tanques de forma especializada. Nos encargamos de la logística completa, desde la carga hasta la entrega, garantizando el cuidado y la integridad de tus tanques. Confía en nuestro servicio confiable para enviar tus tanques sin complicaciones."}
                        title={"Tanques"}                    
                    />
                </div>
                <div className={"flex justify-center"}>
                    <Link href={"/order"} className={"border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors py-2 px-6 rounded-md"}>Quiero enviar</Link>
                </div>
            </div>
        </div>
    )
}

function Card({ src, alt, text, title }) {

    const [ showMore, setShowMore ] = useState(false);

    const handleShowMore = () => {
        setShowMore(!showMore);
    }

    return (
        <div className={"flex flex-col text-center"}>
            <div className={"image-container bg-black select-none rounded-md overflow-hidden"}>
                <Image className={"image opacity-40"} src={src} fill alt={alt} />
                <div className={"absolute text-white w-full h-full top-0 left-0 grid place-content-center text-2xl sm:text-3xl font-bold uppercase"}>{title}</div>
            </div>
            <div className={"flex flex-col gap-2 px-6 py-4 rounded-b-xl h-fit"}>
                <p
                    className={`${showMore ? "" : styles["text-ellipsis-4"]}`}
                >{text}</p>
                <button onClick={handleShowMore} className={"flex items-center justify-center gap-2 text-primary w-full"}>
                    <div>Mostrar {showMore ? "menos" : "más"}</div>
                    <i className={`fa-regular fa-angle-down ${showMore ? "rotate-180" : null}`}></i>
                </button>
            </div>
        </div>
    )
}