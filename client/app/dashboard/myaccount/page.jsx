"use client"

// Components
import DashboardLayout from "@/app/components/Dashboard/Layout";
// Hooks
import useAppContext from "@/app/hooks/useAppContext";
// Styles
import styles from './page.module.css'

const TAB = {
    personalInfo: {
        "icon": "fa-regular fa-user",
        "text": "Cuenta",
        color: {
            text: "text-cyan-500", border: "hover:border-cyan-500", active: "border-cyan-500"
        }
    },
    address: {
        "icon": "fa-regular fa-location-dot",
        "text": "Direcciones",
        color: {
            text: "text-orange-500", border: "hover:border-orange-500", active: "border-orange-500"
        }
    }
}

export default function DashboardMyAccount() {

    const { auth } = useAppContext();

    return (
        <DashboardLayout tab={"myaccount"}>
            <div className={"flex flex-col h-full bg-neutral-100"}>
                <div className={"flex flex-col gap-6 pt-6 sm:pt-8"}>
                    <h2 className={"font-bold text-3xl mx-3 sm:mx-8 text-center sm:text-left"}>Ajustes de cuenta</h2>
                    <div className={"flex justify-center sm:justify-start gap-2 border-b px-3 sm:px-8"}>
                        <Tab active={true} icon={TAB.personalInfo.icon} color={TAB.personalInfo.color} title={TAB.personalInfo.text} />
                        <Tab icon={TAB.address.icon} color={TAB.address.color} title={TAB.address.text} />
                    </div>
                </div>
                {Object.keys(auth).length != 0 && (
                    <div className={"overflow-y-scroll hide-scroll pt-6 gap-6 pb-4 sm:pb-8 px-3 sm:px-8 text-center sm:text-left"}>
                        <div className={`${styles.card} shadow-md`}>
                            <div className={"flex flex-col sm:flex-row items-center gap-4 sm:gap-6 py-6 sm:py-7 px-6 sm:px-8"}>
                                <div className={"grid place-content-center bg-primary rounded-full text-white w-10 min-w-[2.5rem] h-10 mt-1 sm:mt-0"}>
                                    <i className="fa-solid fa-user sm:text-xl"></i>
                                </div>
                                <div className={"flex flex-col gap-1 w-full"}>
                                    <h4 className={"text-xl sm:text-2xl font-semibold"}>Información de cuenta</h4>
                                    <p className={"text-neutral-500"}>Modifica la información de tu cuenta</p>
                                </div>
                            </div>
                            <div className={"flex items-start flex-col sm:flex-row gap-6 sm:gap-0 justify-between py-6 sm:py-7 px-6 sm:px-8 border-t relative"}>
                                <div className={"flex flex-col gap-2 w-full"}>
                                    <div className={"flex sm:items-center flex-col sm:flex-row sm:gap-1"}>
                                        <span className={"text-neutral-500"}>Nombre:</span>
                                        <span className={"font-medium"}>{auth.name}</span>
                                    </div>
                                    <div className={"flex sm:items-center flex-col sm:flex-row sm:gap-1"}>
                                        <span className={"text-neutral-500"}>Apellido:</span>
                                        <span className={"font-medium"}>{auth.surname}</span>
                                    </div>
                                    <div className={"flex sm:items-center flex-col sm:flex-row sm:gap-1"}>
                                        <span className={"text-neutral-500"}>Correo electrónico:</span>
                                        <span className={"font-medium break-all"}>{auth.email}</span>
                                    </div>
                                    <div className={"flex sm:items-center flex-col sm:flex-row sm:gap-1"}>
                                        <span className={"text-neutral-500"}>Contraseña:</span>
                                        <span className={"font-medium"}>********</span>
                                    </div>
                                </div>
                                <div className={"flex justify-center sm:justify-end w-full sm:w-fit sm:absolute right-6"}>
                                    <button className={"border font-medium border-primary text-primary py-2 px-4 rounded-md hover:bg-primary hover:text-white transition-colors"}>Editar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

function Tab({ active, icon, color, title }) {
    return (
        <div className={`cursor-pointer px-6 sm:px-2 py-3 border-b-2 ${active ? color.active : "border-transparent"} ${color.border} transition-colors select-none`}>
            <div className={"flex items-center gap-2"}>
                <i className={`${icon} ${color.text}`}></i>
                <div className={"hidden sm:block"}>{title}</div>
            </div>
        </div>
    )
}