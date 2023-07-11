"use client"

import axios from "axios";
// React
import { useEffect, useState } from "react";
// Nextjs
import { useRouter } from "next/navigation";
// Components
import OrderLayout from "@/app/components/Order/Layout/Index";
// Styles
import styles from '../styles.module.css';
// Hooks
import useAppContext from "@/app/hooks/useAppContext";
// Notifications
import { toast } from "react-hot-toast";

export default function OrderShipping() {
    
    const { order, setOrder, handleNextStep } = useAppContext();

    const [ orderCompleted, setOrderCompleted ] = useState(false);

    const router = useRouter();
    useEffect(() => {
        if(order.items.length == 0 && !orderCompleted) {
            router.push('/order')
        }
    }, [order, orderCompleted])

    const [ shipping, setShipping ] = useState(order.shipping);
    const [ checkFields, setCheckFields ] = useState(false);

    const handleVerifyNextStep = (e) => {
        e.preventDefault();
        setCheckFields(false);
        setCheckFields(true);
        const { from, to } = shipping;
        if([from.fullName, from.street, from.zipCode, from.city, from.phoneNumber, from.email].includes("")) {
            toast.error("Debes llenar todos los campos");
            return;
        }
        if ([to.fullName, to.street, to.zipCode, to.city, to.phoneNumber, to.email, to.ci].includes("")) {
            toast.error("Debes llenar todos los campos");
            return;
        }
        const valuesMinLength = [from.fullName, from.street, from.zipCode, from.city, from.phoneNumber, from.email, to.fullName, to.street, to.zipCode, to.city, to.phoneNumber, to.email, to.ci].filter(value => value.length <= 3);
        if(valuesMinLength.length) {
            toast.error("Debes llenar todos los campos");
            return;
        }
        setOrder({...order, shipping});

        handleNextStep();
        handleSubmitForm(shipping)
    }

    async function handleSubmitForm(shipping) {
        const updatedOrder = { fromCountry: order.from, items: order.items, shipping, total: order.total };
        
        try {
            await axios.post('/api/order/create', updatedOrder);
            setOrderCompleted(true);
            resetForm();
            router.push('/order/completed');
        } catch (error) {
            toast.error("Hubo un error al enviar la orden");
        }
    } 

    function resetForm() {
        setOrder({
            from: "",
            category: "",
            items: [],
            shipping: {
                from: {
                    fullName: "",
                    street: "",
                    zipCode: "",
                    city: "",
                    phoneNumber: "",
                    email: ""
                },
                to: {
                    fullName: "",
                    street: "",
                    zipCode: "",
                    city: "",
                    phoneNumber: "",
                    email: "",
                    ci: ""
                },
                note: ""
            },
            total: 0
        })
    }

    return (
        order?.items?.length != 0 && (
            <OrderLayout step={3}>
                <form className={"flex flex-col gap-8 w-full px-3 sm:px-8"} onSubmit={handleVerifyNextStep}>
                    <div className={"flex flex-col gap-4"}>
                        <h2 className={"text-2xl font-bold uppercase"}>Opciones de envío</h2>
                        <div className={"flex flex-col gap-4"}>
                            <div className={"flex flex-col gap-3 py-2 sm:py-5 px-2 sm:px-6 bg-white rounded-md shadow-md"}>
                                <div className={"font-bold"}>Dirección de retiro</div>
                                <div className={"flex flex-col gap-2"}>
                                    <Input id={"01"} label={"Nombre completo"} checkFields={checkFields} state={{
                                        get: shipping.from.fullName,
                                        set: (value) => setShipping({ ...shipping, from: { ...shipping.from, fullName: value } })
                                    }} />
                                    <Input id={"02"} label={"Calle y número de puerta"} checkFields={checkFields} state={{
                                        get: shipping.from.street,
                                        set: (value) => setShipping({ ...shipping, from: { ...shipping.from, street: value } })
                                    }} />
                                    <Input id={"03"} label={"Código postal"} type={"number"} checkFields={checkFields} state={{
                                        get: shipping.from.zipCode,
                                        set: (value) => setShipping({ ...shipping, from: { ...shipping.from, zipCode: value } })
                                    }} />
                                    <Input id={"04"} label={"Ciudad"} checkFields={checkFields} state={{
                                        get: shipping.from.city,
                                        set: (value) => setShipping({ ...shipping, from: { ...shipping.from, city: value } })
                                    }} />
                                    <Input id={"05"} label={"Número de teléfono"} type={"number"} checkFields={checkFields} state={{
                                        get: shipping.from.phoneNumber,
                                        set: (value) => setShipping({ ...shipping, from: { ...shipping.from, phoneNumber: value } })
                                    }} />
                                    <Input id={"06"} label={"Correo electrónico"} type={"email"} checkFields={checkFields} state={{
                                        get: shipping.from.email,
                                        set: (value) => setShipping({ ...shipping, from: { ...shipping.from, email: value } })
                                    }} />
                                </div>
                            </div>
                            <div className={"flex flex-col gap-3 py-2 sm:py-5 px-2 sm:px-6 bg-white rounded-md shadow-md"}>
                                <div className={"font-bold"}>Dirección de entrega</div>
                                <div className={"flex flex-col gap-2"}>
                                    <Input id={"07"} label={"Nombre completo"} checkFields={checkFields} state={{
                                        get: shipping.to.fullName,
                                        set: (value) => setShipping({ ...shipping, to: { ...shipping.to, fullName: value } })
                                    }} />
                                    <Input id={"08"} label={"Calle y número de puerta"} checkFields={checkFields} state={{
                                        get: shipping.to.street,
                                        set: (value) => setShipping({ ...shipping, to: { ...shipping.to, street: value } })
                                    }} />
                                    <Input id={"09"} label={"Código postal"} type={"number"} checkFields={checkFields} state={{
                                        get: shipping.to.zipCode,
                                        set: (value) => setShipping({ ...shipping, to: { ...shipping.to, zipCode: value } })
                                    }} />
                                    <Input id={"10"} label={"Ciudad"} checkFields={checkFields} state={{
                                        get: shipping.to.city,
                                        set: (value) => setShipping({ ...shipping, to: { ...shipping.to, city: value } })
                                    }} />
                                    <Input id={"11"} label={"Número de teléfono"} type={"number"} checkFields={checkFields} state={{
                                        get: shipping.to.phoneNumber,
                                        set: (value) => setShipping({ ...shipping, to: { ...shipping.to, phoneNumber: value } })
                                    }} />
                                    <Input id={"12"} label={"Correo electrónico"} type={"email"} checkFields={checkFields} state={{
                                        get: shipping.to.email,
                                        set: (value) => setShipping({ ...shipping, to: { ...shipping.to, email: value } })
                                    }} />
                                    <Input id={"13"} label={"Cédula de identidad"} type={"number"} checkFields={checkFields} state={{
                                        get: shipping.to.ci,
                                        set: (value) => setShipping({ ...shipping, to: { ...shipping.to, ci: value } })
                                    }} />
                                </div>
                            </div>
                            <div className={"flex flex-col gap-3 py-2 sm:py-5 px-2 sm:px-6 bg-white rounded-md shadow-md"}>
                                <div className={"font-bold"}>{"Agregar una nota (opcional)"}</div>
                                <Textarea id={"14"} checkFields={checkFields} state={{
                                    get: shipping.note,
                                    set: (value) => setShipping({ ...shipping, note: value })
                                }} />
                            </div>
                        </div>
                    </div>
                    <button type={"submit"} className={"flex items-center gap-1 justify-center px-10 py-3 rounded-md bg-primary hover:bg-cyan-800 text-white"}>
                        <span>Siguiente paso</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                    </button>
                </form>
            </OrderLayout>
        )
    )
}

function Input({ id, type, label, placeholder, checkFields, state }) {

    const handleCheckTextInput = () => {
        if ([state.get].includes("")) {
            return [state.get].includes("");
        }
        if (state.get.length <= 3) {
            return state.get.length <= 3;
        }

        return false;
    }

    return (
        <div>
            <label className={"font-semibold text-sm"} htmlFor={`input${id}`}>{label}</label>
            <input placeholder={placeholder || ""} value={state.get} onChange={e => state.set(e.target.value)} className={`${styles.input} ${checkFields ? handleCheckTextInput() ? styles.inputError : styles.inputCheck : ""}`} type={type || "text"} id={`input${id}`} />
        </div>
    )
}

function Textarea({ id, type, label, placeholder, checkFields, state }) {

    const handleCheckTextInput = () => {
        /* if ([state.get].includes("")) {
            return [state.get].includes("");
        }
        if (state.get.length <= 10) {
            return state.get.length < 10;
        } */

        return false;
    }

    return (
        <div>
            {label && (<label className={"font-semibold text-sm"} htmlFor={`input${id}`}>{label}</label>)}
            <textarea placeholder={placeholder || ""} value={state.get} onChange={e => state.set(e.target.value)} className={`resize-none ${styles.input} ${checkFields ? handleCheckTextInput() ? styles.inputError : styles.inputCheck : ""}`} type={type || "text"} id={`input${id}`} rows={4} />
        </div>
    )
}