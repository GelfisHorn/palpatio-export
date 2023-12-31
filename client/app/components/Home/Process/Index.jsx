"use client"

// Styles
import styles from './Index.module.css'
// Hooks
import useAppContext from '@/app/hooks/useAppContext'
// Locales
import locales from '@/app/langs/components/home/process';

export default function Process() {

    const { lang } = useAppContext();

    return (
        <div className={`${styles.container} py-20 px-6 sm:px-20`}>
            <div className={"flex flex-col justify-center items-center gap-16 h-full"}>
                <div className={"flex flex-col gap-2 text-center"}>
                    <div className={"uppercase font-bold sm:text-lg text-primary"}>{locales[lang].subtitle}</div>
                    <h2 className={"text-2xl sm:text-4xl font-bold"}>{locales[lang].title}</h2>
                </div>
                <div className={"grid grid-cols-1 divide-y w-full lg:w-2/3"}>
                    <Card
                        side={"left"}
                        icon={"fa-solid fa-box"}
                        number={1}
                        title={locales[lang].items[0].title}
                        description={locales[lang].items[0].description}
                    />
                    <Card
                        side={"right"}
                        icon={"fa-solid fa-truck-fast"}
                        number={2}
                        title={locales[lang].items[1].title}
                        description={locales[lang].items[1].description}
                    />
                    <Card
                        side={"left"}
                        icon={"fa-solid fa-ship"}
                        number={3}
                        title={locales[lang].items[2].title}
                        description={locales[lang].items[2].description}
                    />
                    <Card
                        side={"right"}
                        icon={"fa-solid fa-hand-holding-box"}
                        number={4}
                        title={locales[lang].items[3].title}
                        description={locales[lang].items[3].description}
                    />
                </div>
            </div>
        </div>
    )
}

function Card({ side, icon, number, title, description }) {

    return (
        <div className={`flex items-center gap-4 md:gap-8 ${side == 'left' ? "flex-col sm:flex-row text-center sm:text-left" : "flex-col sm:flex-row-reverse text-center sm:text-right"} py-6 sm:py-10`}>
            <div className={`grid place-content-center min-w-[4rem] md:min-w-[6rem] h-16 md:h-24 rounded-full border-2 md:border-[.2rem] border-primary text-primary`}>
                <i className={`${icon} text-3xl md:text-5xl`}></i>
            </div>
            <div className={"w-auto"}>
                <div className={"md:text-xl uppercase font-bold"}>{title}</div>
                <div className={"text-sm md:text-base"}>{description}</div>
            </div>
        </div>
    )
}