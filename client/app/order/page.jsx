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

export default function OrderShipping() {

    return (
        <OrderLayout step={1}>
            <div className={"w-full px-3 sm:px-8"}>
                <div className={"flex flex-col gap-8"}>
                    <h2 className={"text-2xl font-bold uppercase"}>¿Qué quieres enviar?</h2>
                    <div className={"grid grid-cols-1 lg:grid-cols-2 gap-4"}>
                        <Category category={"vehicle"} classes={`${styles.carCard} aspect-video`} title={"Vehiculos"}>
                            <div>Camiones</div>
                            <div>Automoviles</div>
                            <div>Motores</div>
                            <div>Bicicletas</div>
                        </Category>
                        <Category category={"furniture"} classes={`${styles.furnitureCard} aspect-video`} title={"Muebles"}></Category>
                        <Category category={"box"} classes={`${styles.boxCard} aspect-video`} title={"Cajas"}></Category>
                        <Category category={"tank"} classes={`${styles.tankCard} aspect-video`} title={"Tanques"}></Category>
                        <Category category={"pallet"} classes={`${styles.palletCard} aspect-video`} title={"Pallet"}></Category>
                        <Category category={"moving"} classes={`${styles.movingCard} aspect-video border-[.35rem] border-primary`} title={"Mudanzas"} subtitle={"20% de descuento"}></Category>
                        <Category category={"other"} classes={`${styles.otherCard} lg:col-start-1 lg:col-end-3 aspect-video lg:aspect-[3/1]`} title={"Otros"}></Category>
                    </div>
                </div>
            </div>
        </OrderLayout>
    )
}

function Category({ children, category, classes, title, subtitle }) {

    const router = useRouter();

    const { order, setOrder, handleNextStep } = useAppContext();
    
    const handleVerifyNextStep = () => {
        if(category != order.category) {
            if (category == 'vehicle') {
                setOrder({
                    ...order, category, items: [{
                        id: randomId(),
                        type: "vehicle",
                        weight: "",
                        length: "",
                        width: "",
                        height: "",
                        content: "",
                        value: "",
                        amount: 1,
                        subTotal: 0
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
                        weight: "",
                        length: "",
                        width: "",
                        height: "",
                        content: "",
                        value: "",
                        amount: 1,
                        subTotal: 0
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
                        weight: "",
                        length: "",
                        width: "",
                        height: "",
                        content: "",
                        value: "",
                        amount: 1,
                        subTotal: 0
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
                    weight: "",
                    length: "",
                    width: "",
                    height: "",
                    content: "",
                    value: "",
                    amount: 1,
                    subTotal: 0
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
                    {subtitle && (<div className={"text-sm sm:text-base lg:text-sm xl:text-base 2xl:text-lg italic bg-primary text-white px-2 rounded-full"}>{subtitle}</div>)}
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
            </div>
        </div>
    )
}