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
// Hooks
import useAppContext from '@/app/hooks/useAppContext'
// Locales
import locales from '@/app/langs/components/home/whatSend';

export default function WhatSend() {

    const { lang } = useAppContext();

    return (
        <div className={`${styles.container} py-20 px-6 md:px-20`}>
            <div className={"flex flex-col justify-center gap-16 h-full"}>
                <div className={"flex flex-col gap-2 text-center"}>
                    <div className={"uppercase font-bold sm:text-lg text-primary"}>{locales[lang].subtitle}</div>
                    <h2 className={"text-2xl sm:text-4xl font-bold"}>{locales[lang].title}</h2>
                </div>
                <div className={"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 gap-y-6 sm:gap-y-10"}>
                    <Card
                        src={"/order/car.webp?v=2"}
                        alt={"Car image"}
                        text={locales[lang].items.car.description}
                        title={locales[lang].items.car.title}                    
                    />
                    <Card
                        src={"/order/box.webp?v=1"}
                        alt={"Package image"}
                        text={locales[lang].items.package.description}
                        title={locales[lang].items.package.title}                    
                    />
                    <Card
                        src={"/order/furniture.webp?v=1"}
                        alt={"Furniture image"}
                        text={locales[lang].items.furniture.description}
                        title={locales[lang].items.furniture.title}                    
                    />
                    <Card
                        src={"/order/tank.webp?v=1"}
                        alt={"Tank image"}
                        text={locales[lang].items.tank.description}
                        title={locales[lang].items.tank.title}                    
                    />
                </div>
                <div className={"flex justify-center"}>
                    <Link href={"/order"} className={"border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors py-2 px-6 rounded-md"}>{locales[lang].button}</Link>
                </div>
            </div>
        </div>
    )
}

function Card({ src, alt, text, title }) {

    const { lang } = useAppContext();

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
                    <div>{showMore ? locales[lang].showLess : locales[lang].showMore}</div>
                    <i className={`fa-regular fa-angle-down ${showMore ? "rotate-180" : null}`}></i>
                </button>
            </div>
        </div>
    )
}