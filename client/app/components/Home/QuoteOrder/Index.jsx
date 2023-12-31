"use client"

import { useState } from 'react'
// Nextjs
import Link from 'next/link';
// Styles
import styles from './Index.module.css'
// Notifications
import { toast, Toaster } from 'react-hot-toast';
// Settings
import { PRICE, PRICE_DEFAULT, UNITS_MAX } from '@/app/config/order/order';
import { formatMoney } from '@/app/helpers/formatMoney';
// Hooks
import useAppContext from '@/app/hooks/useAppContext'
// Locales
import locales from '@/app/langs/components/home/quoteOrder';

export default function QuoteOrder() {

    const { lang } = useAppContext();
    
    const [ weight, setWeight ] = useState("");
    const [ length, setLength ] = useState("");
    const [ width, setWidth ] = useState("");
    const [ height, setHeight ] = useState("");
    const [ total, setTotal ] = useState(0);

    const handleQuote = () => {
        if ([weight, length, width, height].includes("") || [weight, length, width, height].includes(0)) {
            toast.error(locales[lang].notifications.error.dimensions)
            return;
        }
        const DEFAULT = PRICE_DEFAULT.package;
        const weightTotal = Math.floor(weight / PRICE.weight.each) * PRICE.weight.price;
        const lengthTotal = Math.floor(length / PRICE.length.each) * PRICE.length.price;
        const widthTotal = Math.floor(width / PRICE.width.each) * PRICE.width.price;
        const heightTotal = Math.floor(height / PRICE.height.each) * PRICE.height.price;
        const total = (DEFAULT + (weightTotal + lengthTotal + widthTotal + heightTotal));
        setTotal(total);
    }

    return (
        <div className={`${styles.container} p-6 sm:p-20`}>
            <div className={"flex flex-col gap-16 w-full md:w-2/3 lg:w-1/2"}>
                <div className={"flex flex-col gap-2 text-center"}>
                    <div className={"uppercase font-bold sm:text-lg text-primary"}>{locales[lang].subtitle}</div>
                    <h2 className={"text-2xl sm:text-4xl font-bold"}>{locales[lang].title}</h2>
                </div>
                <div className={"flex flex-col gap-10 items-center"}>
                    <div className={"flex flex-col gap-2 w-full"}>
                        <div className={"grid grid-cols-1 sm:grid-cols-2 gap-4"}>
                            <Input id={"weight"} placeholder={locales[lang].inputs.weight.placeholder} label={locales[lang].inputs.weight.label} state={{ get: weight, set: setWeight }} unit={"kg"} unitsMax={UNITS_MAX.weight} />
                            <Input id={"length"} placeholder={locales[lang].inputs.length.placeholder} label={locales[lang].inputs.length.label} state={{ get: length, set: setLength }} unit={"cm"} unitsMax={UNITS_MAX.length} />
                            <Input id={"width"} placeholder={locales[lang].inputs.width.placeholder} label={locales[lang].inputs.width.label} state={{ get: width, set: setWidth }} unit={"cm"} unitsMax={UNITS_MAX.width} />
                            <Input id={"height"} placeholder={locales[lang].inputs.height.placeholder} label={locales[lang].inputs.height.label} state={{ get: height, set: setHeight }} unit={"cm"} unitsMax={UNITS_MAX.height} />
                        </div>
                        {total ? (
                            <div className={"flex items-center justify-between"}>
                                <div className={"uppercase font-semibold"}>{locales[lang].estimatedPrice}:</div>
                                <span className={"text-primary font-semibold text-xl"}>{formatMoney(total)}</span></div>
                        ) : null}
                    </div>
                    <button onClick={handleQuote} className={"border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors w-fit py-3 px-12 rounded-md"}>{locales[lang].button}</button>
                </div>
            </div>
            <Toaster position={"top-right"} />
        </div>
    )
}

function Input({ id, label, placeholder, state, unit, unitsMax }) {
    return (
        <div>
            <label className={"font-semibold text-sm"} htmlFor={`${id}`}>{label}</label>
            <div className={"relative"}>
                <input value={state.get} onChange={e => state.set(e.target.value > unitsMax ? unitsMax : Number(e.target.value))} placeholder={placeholder} className={`${styles.input} py-2 sm:py-[0.65rem]`} type="number" id={`${id}`} max={unitsMax} min={1} />
                <span className={"absolute top-1/2 -translate-y-1/2 right-2 text-xs font-bold text-neutral-500"}>{unit}</span>
            </div>
        </div>
    )
}