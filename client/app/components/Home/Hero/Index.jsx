"use client"

import Link from 'next/link'
// Styles
import styles from '../Hero/Index.module.css'
import Image from 'next/image'

export default function HeroSection() {
    
    return (
        <section className={`flex items-center px-6 sm:px-20 2xl:px-28 ${styles.section}`}>
            <div className={`flex items-center ${styles.background} w-screen h-screen`}>
                <div className={"flex flex-col gap-10"}>
                    {/* <div className={`flex lg:hidden ${styles.imageContainer}`}>
                        <Image className={styles.image} src={"/hero/background.webp"} fill alt={"Hero background"} />
                    </div> */}
                    <div className={"flex flex-col gap-12 lg:w-1/2 text-center lg:text-left items-center lg:items-start"}>
                        <div className={"flex flex-col gap-4"}>
                            <h1 className={"text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[5.3rem] font-bold text-primary"}>Lorem ipsum dolor sit amet consectetur</h1>
                            <p className={"text-lg 2xl:text-xl text-cyan-900"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                        </div>
                        <Link href={"/order"} className={"w-fit px-6 lg:px-8 2xl:px-10 py-2 lg:py-3 2xl:py-4 text-lg 2xl:text-xl font-medium bg-primary hover:bg-cyan-800 transition-colors text-white rounded-full"}>Cotizar envío</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}