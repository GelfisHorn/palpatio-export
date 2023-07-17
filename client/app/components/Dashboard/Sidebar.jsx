"use client"

// Nextjs
import Link from "next/link";
// Hooks
import useAppContext from "@/app/hooks/useAppContext"
// Styles
import styles from './Sidebar.module.css'

export function DashboardSidebar({ tab }) {
    
    const { setAuth } = useAppContext();

    function handleLogOut() {
        setAuth({});
        localStorage.removeItem('auth-token');
    }
    
    return (
        <div className={"flex flex-col gap-6 w-16 lg:w-72 h-screen overflow-y-scroll hide-scrollbar py-6 border-r border-neutral-200"}>
            <div className={"flex items-center h-12 lg:px-6"}>
                <div className={"hidden lg:block text-xl font-semibold"}>Pal Patio Export</div>
                <div className={"block lg:hidden text-xl font-semibold text-center w-full"}>PPE</div>
            </div>
            <div className={"flex flex-col justify-between h-full"}>
                <div className={"flex flex-col gap-2 lg:gap-5"}>
                    <div className={"flex flex-col gap-2"}>
                        <div className={"hidden lg:block uppercase font-semibold ml-6 text-neutral-600 text-sm"}>Ordenes</div>
                        <Item href={"/dashboard/orders"} icon="fa-regular fa-clipboard-list" active={tab == "orders" ? true : false}>Ordenes</Item>
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <div className={"hidden lg:block uppercase font-semibold ml-6 text-neutral-600 text-sm"}>Clientes</div>
                        <Item href={"#"} icon="fa-solid fa-users" active={tab == "clients" ? true : false}>Clientes</Item>
                    </div>
                </div>
                <div className={"flex flex-col gap-2 mx-1 lg:mx-5"}>
                    <Link href={"/dashboard/myaccount"} className={`flex items-center justify-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded-lg h-11 ${tab == 'myaccount' ? "bg-primary text-white" : null}`}>
                        <div><i className={"fa-regular fa-user"}></i></div>
                        <div className={"hidden lg:block font-medium"}>Mi Cuenta</div>
                    </Link>
                    <button onClick={handleLogOut} className={"flex items-center justify-center gap-2 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors rounded-lg h-11 cursor-pointer"}>
                        <div><i className={"fa-regular fa-arrow-left-from-line"}></i></div>
                        <div className={"hidden lg:block font-medium"}>Cerrar sesión</div>
                    </button>
                </div>
            </div>
        </div>
    )
}

function Item({ active, href, handleClick, icon, children }) {
    return (
        href ? (
            <Link href={href} className={`${styles.icon} flex items-center hover:text-primary transition-colors hover:bg-neutral-100 cursor-pointer h-11`}>
                <div className={`w-[.3rem] h-8 rounded-r-full ${active ? "bg-primary" : null} transition-colors`}></div>
                <div className={`flex items-center gap-4 ${active ? "text-primary" : null} pl-[1.2rem] pr-6`}>
                    <div className={`${styles.icon}`}><i className={`${icon} text-xl lg:text-lg ${active ? "text-primary" : null}`}></i></div>
                    <div className={`hidden lg:block font-semibold ${active ? "text-primary" : null}`}>{children}</div>
                </div>
            </Link>
        ) : (
            <button onClick={handleClick} className={`${styles.icon} flex items-center hover:text-primary transition-colors hover:bg-neutral-100 cursor-pointer h-11`}>
                <div className={`w-[.3rem] h-8 rounded-r-full ${active ? "bg-primary" : null} transition-colors`}></div>
                <div className={`flex items-center gap-4 ${active ? "text-primary" : null} pl-[1.2rem] pr-6`}>
                    <div className={`${styles.icon}`}><i className={`${icon} text-xl lg:text-lg`}></i></div>
                    <div className={"hidden lg:block font-medium"}>{children}</div>
                </div>
            </button>
        )
    )
}