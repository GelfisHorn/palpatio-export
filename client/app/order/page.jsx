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
// Locales
import locales from '@/app/langs/order/Page';

export default function OrderShipping() {

    const { lang } = useAppContext();

    return (
        <OrderLayout step={1}>
            <div className={"w-full px-3 sm:px-8"}>
                <div className={"flex flex-col gap-8"}>
                    <h2 className={"text-2xl font-bold uppercase"}>{locales[lang].title}</h2>
                    <div className={"grid grid-cols-1 lg:grid-cols-2 gap-4"}>
                        <Category category={"vehicle"} classes={`${styles.carCard} aspect-video`} title={locales[lang].items[0].title} price={{from: 200, to: 5000}}>
                            {locales[lang].items[0].categories.map((cat, index) => (
                                <div key={index}>{cat}</div>
                            ))}
                        </Category>
                        <Category category={"furniture"} classes={`${styles.furnitureCard} aspect-video`} title={locales[lang].items[1].title} price={{ from: 80, to: 350 }}>
                            {locales[lang].items[1].categories.map((cat, index) => (
                                <div key={index}>{cat}</div>
                            ))}
                        </Category>
                        <Category category={"box"} classes={`${styles.boxCard} aspect-video`} title={locales[lang].items[2].title} price={{ from: 60, to: 250 }}>
                            {locales[lang].items[2].categories.map((cat, index) => (
                                <div key={index}>{cat}</div>
                            ))}
                        </Category>
                        <Category category={"tank"} classes={`${styles.tankCard} aspect-video`} title={locales[lang].items[3].title} price={{ from: 80, to: 250 }}>
                            {locales[lang].items[3].categories.map((cat, index) => (
                                <div key={index} className={"col-start-1 col-end-3"}>{cat}</div>
                            ))}
                        </Category>
                        <Category category={"pallet"} classes={`${styles.palletCard} aspect-video`} title={locales[lang].items[4].title} price={{ from: 160, to: 300 }}>
                            {locales[lang].items[4].categories.map((cat, index) => (
                                <div key={index} className={"col-start-1 col-end-3"}>{cat}</div>
                            ))}
                        </Category>
                        <Category category={"moving"} classes={`${styles.movingCard} aspect-video border-[.35rem] border-orange-400`} title={locales[lang].items[5].title} subtitle={"20% de descuento"}>
                            {locales[lang].items[5].categories.map((cat, index) => (
                                <div key={index}>{cat}</div>
                            ))}
                        </Category>
                        <Category category={"other"} classes={`${styles.otherCard} lg:col-start-1 lg:col-end-3 aspect-video lg:aspect-[3/1]`} title={locales[lang].items[6].title}>
                            {locales[lang].items[6].categories.map((cat, index) => (
                                <div key={index}>{cat}</div>
                            ))}
                        </Category>
                    </div>
                </div>
            </div>
        </OrderLayout>
    )
}

function Category({ children, category, classes, title, subtitle, price }) {

    const { lang } = useAppContext();

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
                    {children}     
                </div>
                <div className={"flex items-center gap-2 text-lg absolute -bottom-2 md:bottom-2"}>
                    {price?.from ? (
                        <>
                            <div className={"text-neutral-100"}>{locales[lang].priceRange}:</div>
                            <div className={"font-semibold"}>{formatMoney(price.from)}</div>
                            <div className={"text-neutral-100"}>-</div>
                            <div className={"font-semibold"}>{formatMoney(price.to)}</div>
                        </>
                    ) : (
                        <div className={"font-semibold"}>{locales[lang].requestBudget}</div>
                    )}
                </div>
            </div>
        </div>
    )
}