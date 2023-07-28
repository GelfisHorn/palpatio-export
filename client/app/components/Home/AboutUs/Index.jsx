"use client"

// Styles
import styles from './Index.module.css'
// Hooks
import useAppContext from '@/app/hooks/useAppContext'
// Locales
import locales from '@/app/langs/components/home/aboutus';

export default function AboutUs() {

    const { lang } = useAppContext();

    const handleScrollToElement = () => {
        var element = document.querySelector("#contact");

        // smooth scroll to element and align it at the bottom
        element.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    return (
        <div className={`${styles.container} h-fit py-24 md:py-32`}>
            <div className={"flex flex-col items-center gap-10 w-full lg:w-2/3 px-6 lg:px-0 mx-auto text-center text-white"}>
                <div className={"flex flex-col gap-4"}>
                    <h2 className={"text-2xl lg:text-4xl uppercase font-bold"}>{locales[lang].title}</h2>
                    <p className={"text-sm sm:text-base lg:text-lg text-zinc-200"}>{locales[lang].description}</p>
                </div>
                <button onClick={handleScrollToElement} className={"text-sm sm:text-base border-2 border-zinc-200 text-zinc-200 hover:text-white hover:border-primary hover:bg-primary transition-colors w-fit py-2 px-6 rounded-md font-semibold uppercase"}>{locales[lang].button}</button>            
            </div>
        </div>
    )
}