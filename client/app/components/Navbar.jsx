import Link from "next/link";

export default function Navbar({ styles }) {
    return (
        <div className={`relative flex items-center justify-between px-6 sm:px-20 2xl:px-28 h-20 ${styles || ""} z-10 text-lg 2xl:text-xl`}>
            <div className={"flex items-center gap-14"}>
                <Link href={'/'} className={"text-xl 2xl:text-2xl font-medium"}>Pal Patio Export</Link>
                {/* <nav>
                    <ul className={"flex items-center gap-3"}>
                        <li>
                            <Link href={"#"}>Inicio</Link>
                        </li>
                        <li>
                            <Link href={"#"}>Servicios</Link>
                        </li>
                    </ul>
                </nav> */}
            </div>
            <div>
                <div className={"hidden sm:flex items-center gap-5 text-lg"}>
                    <Link href={"/login"}>Iniciar sesión</Link>
                    <Link href={"/register"} className={"py-2 px-4 rounded-md bg-primary hover:bg-cyan-800 transition-colors text-white"}>Crear cuenta</Link>
                </div>
                <button className={"block sm:hidden"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>
        </div>
    )
}