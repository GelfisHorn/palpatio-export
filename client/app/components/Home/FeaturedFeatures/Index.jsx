"use client"

// Nextjs
import Link from 'next/link'
// Styles
import styles from './Index.module.css'
// Hooks
import useAppContext from '@/app/hooks/useAppContext'
// Locales
import locales from '@/app/langs/components/home/featuredFeatures';

export default function FeaturedFeatures() {

    const { lang } = useAppContext();
 
    return (
        <div className={`${styles.container} py-20 px-6 sm:px-20`}>
            <div className={"flex flex-col justify-center gap-16 h-full"}>
                <div className={"flex flex-col gap-2 text-center"}>
                    <div className={"uppercase font-bold sm:text-lg text-primary"}>{locales[lang].subtitle}</div>
                    <h2 className={"text-2xl sm:text-4xl font-bold"}>{locales[lang].title}</h2>
                </div>
                <div className={"grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4"}>
                    <Card
                        icon={"fa-regular fa-hand-holding-dollar"}
                        title={locales[lang].items[0].title}
                        description={locales[lang].items[0].description}
                    />
                    <Card
                        icon={"fa-solid fa-user-headset"}
                        title={locales[lang].items[1].title}
                        description={locales[lang].items[1].description}
                    />
                    <Card
                        icon={"fa-solid fa-box-circle-check"}
                        title={locales[lang].items[2].title}
                        description={locales[lang].items[2].description}
                    />
                    <Card
                        icon={"fa-solid fa-ship"}
                        title={locales[lang].items[3].title}
                        description={locales[lang].items[3].description}
                    />
                </div>
                {/* <div className={"flex justify-center"}>
                    <Link href={"/order"} className={"border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors py-2 px-6 rounded-md"}>Quiero enviar</Link>
                </div> */}
            </div>
        </div>
    )
}

function Card({ icon, title, description }) {

    return (
        <div className={"flex flex-col gap-3 text-center shadow-md p-8 rounded-2xl"}>
            <div className={"flex justify-center"}>
                <div className={"grid place-content-center border-[.2rem] border-primary rounded-full w-14 sm:w-20 h-14 sm:h-20"}>
                    <i className={`${icon} text-2xl sm:text-4xl text-primary`}></i>
                </div>
            </div>
            <div className={"flex flex-col gap-2"}>
                <div className={"text-lg sm:text-xl uppercase font-semibold text-primary"}>{title}</div>
                <div>{description}</div>
            </div>
        </div>
    )
}