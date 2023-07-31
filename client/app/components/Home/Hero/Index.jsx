"use client"

import Link from 'next/link'
// Styles
import styles from '../Hero/Index.module.css'
// Notifications
import { toast, Toaster } from 'react-hot-toast'
// Hooks
import useAppContext from '@/app/hooks/useAppContext'
// Locales
import locales from '@/app/langs/components/home/hero';

export default function HeroSection() {

    const { lang } = useAppContext();
    
    return (
        <section className={`flex items-center ${styles.section} overflow-hidden`}>
            <div className={`flex items-center px-6 sm:px-20 2xl:px-28 ${styles.background} w-screen`}>
                <div className={"flex flex-col gap-10"}>
                    <div className={"flex flex-col justify-between sm:justify-center gap-12 lg:w-1/2 text-center lg:text-left items-center lg:items-start h-full"}>
                        <div className={"flex flex-col gap-4"}>
                            <h1 className={"text-5xl lg:text-6xl xl:text-[4rem] 2xl:text-[4.7rem] font-bold text-primary"}>{locales[lang].title}</h1>
                            <p className={"text-lg 2xl:text-xl text-cyan-900"}>{locales[lang].description}</p>
                        </div>
                        <Link href={"/order"} className={"w-fit px-10 py-3 2xl:py-4 text-lg 2xl:text-xl font-medium bg-primary hover:bg-cyan-800 transition-colors text-white rounded-full"}>{locales[lang].button}</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}