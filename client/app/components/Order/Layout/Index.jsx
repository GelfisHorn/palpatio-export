"use client"

// Helpers
import { formatMoney } from "@/app/helpers/formatMoney";
// Components
import OrderNavbar from "../Navbar";
import WhatsAppButton from "../../WhatsAppButton/Index";
// Styles
import styles from './Index.module.css'
// Hooks
import useAppContext from "@/app/hooks/useAppContext";
// Config
import { COUNTRIES } from "@/app/config/order/order";
// Toast
import { Toaster } from 'react-hot-toast';
// Locales
import locales from '@/app/langs/components/order/layout';

export default function OrderLayout({ children, step, showSidebar }) {

    const { lang } = useAppContext();
    
    const { order } = useAppContext();
    
    const TYPE = {
        "vehicle": "Vehiculo",
        "furniture": "Mueble",
        "package": "Paquete",
        "pallet": "Pallet",
        "tank": "Tanque",
        "other": "Otro"
    }

    return (
        <main>
            <OrderNavbar step={step} />
            <div className={`${styles.container} ${styles.height}`}>
                <div className={`${styles.height} ${styles.scrollbar} overflow-y-scroll ${showSidebar != false ? "w-full md:w-3/5 lg:w-2/3" : "w-full"} bg-neutral-100 py-8`}>{children}</div>
                {showSidebar != false && (
                    <div className={`${styles.height} w-full md:w-2/5 lg:w-1/3 border-l`}>
                        <div className={styles.sidebar}>
                            <div className={`flex flex-col p-8 ${styles.sidebarHeight} overflow-y-scroll`}>
                                <div className={"text-2xl"}>{locales[lang].title}</div>
                                <div className={"divide-y"}>
                                    <Step title={locales[lang].country.title}>
                                        <Option label={locales[lang].country.from} option={COUNTRIES[lang][order.from] || "Sin seleccionar"} />
                                        <Option label={locales[lang].country.to.title} option={locales[lang].country.to.country} />
                                    </Step>
                                    <Step title={locales[lang].order.title}>
                                        {order?.items?.length != 0 && order?.items?.map(item => (
                                            <div key={item.id} className={"grid grid-cols-2 py-2"}>
                                                <Option label={locales[lang].order.type} option={`1x ${TYPE[item.type]}`} />
                                                {/* <Option label={"Peso"} option={`${item.weight ? `${item.weight}kg` : "-"}`} /> */}
                                            </div>
                                        ))}
                                        {order?.items?.length == 0 && (
                                            <div>{locales[lang].order.noOrders}</div>
                                        )}
                                    </Step>
                                    {/* <div>
                                        <div className={"flex justify-between gap-2 pt-4"}>
                                            <div className={"text-lg font-semibold text-neutral-600 underline"}>Total</div>
                                            <div className={"text-xl font-semibold text-primary"}>{formatMoney(order.total)}</div>
                                        </div>
                                        {order?.category == 'moving' && (
                                            <div className={"flex justify-end font-semibold text-neutral-600 uppercase text-sm"}>20% de descuento</div>
                                        )}
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Toaster position={"top-right"} />
            <WhatsAppButton />
        </main>
    )
}

function Step({ children, title }) {
    return (
        <div className={"flex flex-col gap-2 py-4"}>
            <div className={"text-lg font-semibold text-neutral-600 underline"}>{title}</div>
            <div className={`flex flex-col text-neutral-500 divide-y`}>
                {children}
            </div>
        </div>
    )
}

function Option({ label, option }) {
    return (
        <div className={"py-1"}>
            <div className={styles.label}>{label}</div>
            <div className={styles.option}>{option}</div>
        </div>
    )
}