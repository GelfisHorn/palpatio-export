"use client"

import { useState } from "react";
// Nextjs
import { useRouter } from "next/navigation";
// Components
import OrderLayout from "@/app/components/Order/Layout/Index";
// Styles
import styles from './styles.module.css';
// Hooks
import useAppContext from "@/app/hooks/useAppContext";
// Helpers
import randomId from "../helpers/randomId";
import { formatMoney } from "../helpers/formatMoney";

export default function OrderShipping() {

    return (
        <OrderLayout step={1}>
            <div className={"w-full px-3 sm:px-8"}>
                <div className={"flex flex-col gap-8"}>
                    <h2 className={"text-2xl font-bold uppercase"}>¿Qué quieres enviar?</h2>
                    <div className={"grid grid-cols-1 lg:grid-cols-2 gap-4"}>
                        <Category category={"vehicle"} classes={`${styles.carCard} aspect-video`} title={"Vehiculos"} price={{from: 200, to: 5000}}>
                            <div>Camiones</div>
                            <div>Automoviles</div>
                            <div>Motores</div>
                        </Category>
                        <Category category={"furniture"} classes={`${styles.furnitureCard} aspect-video`} title={"Muebles"} price={{ from: 80, to: 350 }}>
                            <div>Mesas</div>
                            <div>Sillones</div>
                            <div>Estanterías</div>
                            <div>Sillas</div>
                        </Category>
                        <Category category={"box"} classes={`${styles.boxCard} aspect-video`} title={"Cajas"} price={{ from: 60, to: 250 }}>
                            <div>Ropa</div>
                            <div>Regalos</div>
                            <div>Juguetes</div>
                            <div>Herramientas</div>
                        </Category>
                        <Category category={"tank"} classes={`${styles.tankCard} aspect-video`} title={"Tanques"} price={{ from: 80, to: 250 }}>
                            <div>Almacenamiento</div>
                            <div>Combustible</div>
                            <div>Agua</div>
                            <div>Gas</div>
                        </Category>
                        <Category category={"pallet"} classes={`${styles.palletCard} aspect-video`} title={"Pallet"} price={{ from: 160, to: 300 }}>
                            <div>Madera</div>
                            <div>Plástico</div>
                            <div>Metal</div>
                            <div>Cartón</div>
                        </Category>
                        <Category category={"moving"} classes={`${styles.movingCard} aspect-video border-[.35rem] border-orange-400`} title={"Mudanzas"} subtitle={"20% de descuento"}>
                            <div>Electrodomésticos</div>
                            <div>Muebles</div>
                            <div>Decoración</div>
                            <div>Ropa</div>
                        </Category>
                        <Category category={"other"} classes={`${styles.otherCard} lg:col-start-1 lg:col-end-3 aspect-video lg:aspect-[3/1]`} title={"Otros"}>
                            <div>Herramientas</div>
                            <div>Jardinería</div>
                            <div>Artículos de viaje</div>
                            <div>Electrónicos</div>
                        </Category>
                    </div>
                </div>
            </div>
        </OrderLayout>
    )
}

function Category({ children, category, classes, title, subtitle, price }) {

    const router = useRouter();

    const { order, setOrder, handleNextStep } = useAppContext();
    
    const handleVerifyNextStep = () => {
        if(category != order.category) {
            if (category == 'vehicle') {
                setOrder({
                    ...order, category, items: [{
                        id: randomId(),
                        type: "vehicle",
                        content: ""
                    }]
                });
                handleNextStep();
                router.push('/order/details');
                return;
            }
            if (category == 'box') {
                setOrder({
                    ...order, category, items: [{
                        id: randomId(),
                        type: "package",
                        content: ""
                    }]
                });
                handleNextStep();
                router.push('/order/details');
                return;
            }
            if (category == 'moving') {
                setOrder({
                    ...order, category, items: [{
                        id: randomId(),
                        type: "furniture",
                        content: ""
                    }]
                });
                handleNextStep();
                router.push('/order/details');
                return;
            }
            setOrder({
                ...order, category, items: [{
                    id: randomId(),
                    type: category,
                    content: ""
                }]
            });
            handleNextStep();
            router.push('/order/details');
            return;
        }
        handleNextStep();
        router.push('/order/details');
    }

    return (
        <div className={`${styles.cardBg} ${classes} rounded-md overflow-hidden cursor-pointer shadow-md hover:scale-[102%] transition-transform`} onClick={handleVerifyNextStep}>
            <div className={"flex flex-col items-center justify-center text-center gap-1 sm:gap-3 lg:gap-0 2xl:gap-3 absolute z-10 top-4 bottom-4 text-white w-full"}>
                <div className={"flex flex-col"}>
                    <div className={"font-semibold text-2xl sm:text-3xl lg:text-2xl 2xl:text-3xl"}>{title}</div>
                    {subtitle && (<div className={"text-sm sm:text-base lg:text-sm xl:text-base 2xl:text-lg italic bg-orange-400 text-white px-2 rounded-full"}>{subtitle}</div>)}
                </div>
                <div className={"grid grid-cols-2 gap-x-5 text-lg"}>
                    {children || (
                        <>
                            <div>Ejemplo 1</div>
                            <div>Ejemplo 2</div>
                            <div>Ejemplo 3</div>
                            <div>Ejemplo 4</div>
                        </>
                    )}     
                </div>
                <div className={"flex items-center gap-2 text-lg absolute -bottom-2 md:bottom-2"}>
                    {price?.from ? (
                        <>
                            <div className={"text-neutral-100"}>Rango de precio:</div>
                            <div className={"font-semibold"}>{formatMoney(price.from)}</div>
                            <div className={"text-neutral-100"}>a</div>
                            <div className={"font-semibold"}>{formatMoney(price.to)}</div>
                        </>
                    ) : (
                        <div className={"font-semibold"}>Solicitar presupuesto</div>
                    )}
                </div>
            </div>
        </div>
    )
}