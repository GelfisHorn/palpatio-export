
// Styles
import styles from './Index.module.css'

export default function AboutUs() {
    return (
        <div className={`${styles.container} h-[35rem] md:h-[30rem]`}>
            <div className={"flex flex-col items-center gap-10 w-full lg:w-2/3 px-6 lg:px-0 mx-auto text-center text-white"}>
                <div className={"flex flex-col gap-4"}>
                    <h2 className={"text-2xl lg:text-4xl uppercase font-bold"}>Acerca de nosotros</h2>
                    <p className={"text-sm sm:text-base lg:text-lg text-zinc-200"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <button className={"text-sm sm:text-base border-2 border-zinc-200 text-zinc-200 hover:text-white hover:border-primary hover:bg-primary transition-colors w-fit py-2 px-6 rounded-md font-semibold uppercase"}>Contactanos</button>            
            </div>
        </div>
    )
}