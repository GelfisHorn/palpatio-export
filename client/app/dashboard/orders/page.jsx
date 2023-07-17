"use client"

import axios from "axios";
// React
import { useEffect, useState } from "react";
// Components
import DashboardLayout from "../../components/Dashboard/Layout";
// Notifications
import { toast } from "react-hot-toast";
// Helpers
import { formatMoney } from "@/app/helpers/formatMoney";
// Config
import { COUNTRIES } from '../../config/order/order';
// Date formatter
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import locale from 'dayjs/locale/es';
dayjs.locale(locale);
dayjs.extend(relativeTime);

const STATUS = {
    onhold: {
        icon: "fa-regular fa-arrows-spin",
        text: "En espera",
        color: {
            text: "text-sky-500", border: "hover:border-sky-500", active: "border-sky-500"
        }
    },
    sending: {
        icon: "fa-sharp fa-regular fa-truck-fast",
        text: "Enviando",
        color: {
            text: "text-orange-500", border: "hover:border-orange-500", active: "border-orange-500"
        }
    },
    received: {
        icon: "fa-regular fa-box-circle-check",
        text: "Recibido",
        color: {
            text: "text-green-500", border: "hover:border-green-500", active: "border-green-500"
        }
    },
    cancelled: {
        icon: "fa-regular fa-circle-xmark",
        text: "Cancelado",
        color: {
            text: "text-red-500", border: "hover:border-red-500", active: "border-red-500"
        }
    }
}

export default function DashboardOrders() {

    const [ fetching, setFetching ] = useState(true);
    const [ orders, setOrders ] = useState([]);

    useEffect(() => {
        handleFetchOrders();
    }, [])

    async function handleFetchOrders() {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            setFetching(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application-json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.post('/api/orders/getAll', { config });
            setOrders(data);
        } catch (error) {
            console.log(error);
            toast.error("Hubo un error al obtener las ordenes");
        } finally {
            setFetching(false);
        }
    }
    
    return (
        <DashboardLayout tab={"orders"}>
            <div className={"flex flex-col h-full"}>
                <div className={"flex flex-col gap-6 pt-6 lg:pt-8"}>
                    <h2 className={"font-bold text-3xl mx-6 lg:mx-8"}>Ordenes</h2>
                    <div className={"flex gap-2 border-b px-3 lg:px-8"}>
                        <Tab icon={STATUS.onhold.icon} color={STATUS.onhold.color} title={STATUS.onhold.text} count={"5"} />
                        <Tab active={true} icon={STATUS.sending.icon} color={STATUS.sending.color} title={STATUS.sending.text} count={"5"} />
                        <Tab icon={STATUS.received.icon} color={STATUS.received.color} title={STATUS.received.text} count={"5"} />
                        <Tab icon={STATUS.cancelled.icon} color={STATUS.cancelled.color} title={STATUS.cancelled.text} count={"5"} />
                    </div>
                </div>
                <div className={"overflow-y-scroll hide-scroll pt-6 gap-6 pb-6 lg:pb-8"}>
                    {fetching && (
                        <div className={"flex flex-col gap-4 mx-6 lg:mx-8"}>
                            <OrderSkeleton />
                            <OrderSkeleton />
                            <OrderSkeleton />
                            <OrderSkeleton />
                        </div>
                    )}
                    {!fetching && orders.length != 0 && (
                        <div className={"flex flex-col gap-4 mx-3 lg:mx-8"}>
                            {orders.map(order => (
                                <Order 
                                    key={order._id} 
                                    id={order._id} 
                                    country={order.fromCountry} 
                                    name={"Mathias Benigno"} 
                                    email={"email@email.com"}
                                    phoneNumber={"+1234567890"}
                                    status={"sending"} 
                                    createdAt={order.createdAt} 
                                    updatedAt={order.updatedAt} 
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}

function Tab({ active, icon, color, title, count }) {
    return (
        <div className={`cursor-pointer px-4 md:px-2 py-3 border-b-2 ${active ? color.active : "border-transparent"} ${color.border} transition-colors select-none`}>
            <div className={"flex items-center gap-2"}>
                <i className={`${icon} ${color.text}`}></i>
                <div className={"hidden md:block"}>{title}</div>
                <div className={"hidden md:grid place-content-center w-7 h-5 rounded-full text-neutral-500 border font-semibold text-sm"}>{count}</div>
            </div>
        </div>
    )
}

function Order({ id, country, name, email, phoneNumber, status, createdAt, updatedAt }) {

    return (
        <div className={`px-4 md:px-8 py-4 md:py-6 border ${STATUS[status].color.border} rounded-xl transition-all cursor-pointer select-none`}>
            <div className={"flex flex-col gap-4 border-b pb-4"}>
                <div className={"flex flex-col-reverse lg:flex-row lg:items-center gap-1 lg:gap-3"}>
                    <div className={"hidden lg:block text-lg text-neutral-600 font-medium"}>{`#${id}`}</div>
                    <div className={"flex items-center gap-1 px-2 border rounded-md w-fit"}>
                        <i className={`${STATUS[status].icon} ${STATUS[status].color.text}`}></i>
                        <div>{STATUS[status].text}</div>
                    </div>
                </div>
                <div className={"flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6"}>
                    <div className={"flex items-center gap-2"}>
                        <div className={"text-neutral-400"}><i className="fa-solid fa-location-dot"></i></div>
                        <div className={"font-medium text-neutral-700"}>{COUNTRIES[country]}</div>
                    </div>
                    <div className={"flex items-center gap-2"}>
                        <div className={"text-neutral-400"}><i className="fa-solid fa-user"></i></div>
                        <div className={"font-medium text-neutral-700 break-all"}>{name}</div>
                    </div>
                    <div className={"flex items-center gap-2"}>
                        <div className={"text-neutral-400"}><i className="fa-solid fa-envelope"></i></div>
                        <div className={"font-medium text-neutral-700 break-all"}>{email}</div>
                    </div>
                    <div className={"flex items-center gap-2"}>
                        <div className={"text-neutral-400"}><i className="fa-solid fa-phone"></i></div>
                        <div className={"font-medium text-neutral-700 break-all"}>{phoneNumber}</div>
                    </div>
                </div>
            </div>
            <div className={"pt-4"}>
                <div className={"flex items-center gap-1 text-neutral-600"}>
                    <div>{createdAt == updatedAt ? "Creado hace" : "Actualizado hace"}</div>
                    <div className={"font-semibold"}>{dayjs(createdAt).fromNow(true)}.</div>
                </div>
            </div>
        </div>
    )
}

function OrderSkeleton() {
    return (
        <div className={`px-8 py-6 rounded-xl transition-all select-none border border-neutral-200 bg-neutral-100 animate-pulse`}>
            <div className={"flex flex-col items-start gap-6 pb-4"}>
                <div className={"flex items-center gap-3"}>
                    <div className={"text-lg font-medium rounded-md w-64 h-6 bg-neutral-200 animate-pulse"}></div>
                    <div className={"flex items-center gap-1 px-2 border rounded-md w-20 h-6 bg-neutral-200 animate-pulse"}></div>
                </div>
                <div className={"flex items-center gap-6"}>
                    <div className={"flex items-center gap-2 rounded-md w-24 h-5 bg-neutral-200 animate-pulse"}></div>
                    <div className={"flex items-center gap-2 rounded-md w-24 h-5 bg-neutral-200 animate-pulse"}></div>
                    <div className={"flex items-center gap-2 rounded-md w-24 h-5 bg-neutral-200 animate-pulse"}></div>
                    <div className={"flex items-center gap-2 rounded-md w-24 h-5 bg-neutral-200 animate-pulse"}></div>
                </div>
            </div>
            <div className={"flex items-center gap-2 rounded-md w-full h-[1px] bg-neutral-200 animate-pulse"}></div>
            <div className={"pt-4"}>
                <div className={"flex items-center gap-1 rounded-md w-36 h-5 bg-neutral-200 animate-pulse"}></div>
            </div>
        </div>
    )
}