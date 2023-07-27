
import axios from "axios";
// React
import { useEffect, useState } from "react";
// Layout
import DashboardLayout from "@/app/components/Dashboard/Layout";
// Hooks
import useAppContext from "@/app/hooks/useAppContext";
// Notifications
import { toast } from "react-hot-toast";
// Animations
import { motion } from "framer-motion";
// Config
import { COUNTRIES } from '@/app/config/order/order';
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

export default function DashboardMyOrders() {

    const { auth } = useAppContext();

    const [ fetching, setFetching ] = useState(true);
    const [ orders, setOrders ] = useState([]);

    useEffect(() => {
        if(!auth._id) {
            return;
        }
        handleFetchOrders();
    }, [auth]);

    async function handleFetchOrders() {
        const config = getConfig();

        try {
            const { data } = await axios.post('/api/dashboard/client/getAll', { id: auth._id, config });
            setOrders(data);
        } catch (error) {
            toast.error("Hubo un error al obtener las ordenes");
        } finally {
            setFetching(false);
        }
    }

    function getConfig() {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            setFetching(false);
            return null;
        }

        const config = {
            headers: {
                "Content-Type": "application-json",
                Authorization: `Bearer ${token}`
            }
        }

        return config;
    }

    return (
        <DashboardLayout tab={"myorders"}>
            <div className={"flex flex-col h-full"}>
                <div className={"flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 lg:py-8 border-b"}>
                    <h2 className={"font-bold text-3xl mx-6 lg:mx-8"}>Mis ordenes</h2>
                </div>
                <div className={"flex flex-col overflow-y-scroll hide-scrollbar pt-6 gap-6 pb-6 lg:pb-8"}>
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
                            {orders.map((order, index) => (
                                <Order key={index} order={order}/>
                            ))}
                        </div>
                    )}
                    {!fetching && orders.length == 0 && (
                        <div className={"grid place-content-center h-full"}>
                            <h2 className={"text-xl"}>Aún no hay ordenes que mostrar aquí.</h2>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}

function Order({ order }) {

    const { _id: id, fromCountry: country, shipping, status, createdAt } = order.order;
    console.log(order)

    return (
        <motion.div
            className={`px-4 md:px-8 py-4 md:py-6 border rounded-xl`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
        >
            <div className={"flex flex-col gap-4 border-b pb-4"}>
                <div className={"flex flex-col-reverse lg:flex-row lg:items-center gap-1 lg:gap-3"}>
                    <div className={"hidden lg:block text-lg text-neutral-600 font-medium"}>{`#${id}`}</div>
                    <div className={"flex items-center gap-2 px-2 border rounded-md w-fit"}>
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
                        <div className={"font-medium text-neutral-700 break-all"}>{shipping.from.fullName}</div>
                    </div>
                    <div className={"flex items-center gap-2"}>
                        <div className={"text-neutral-400"}><i className="fa-solid fa-envelope"></i></div>
                        <div className={"font-medium text-neutral-700 break-all"}>{shipping.from.email}</div>
                    </div>
                    <div className={"flex items-center gap-2"}>
                        <div className={"text-neutral-400"}><i className="fa-solid fa-phone"></i></div>
                        <div className={"font-medium text-neutral-700 break-all"}>{shipping.from.phoneNumber}</div>
                    </div>
                </div>
            </div>
            <div className={"pt-4"}>
                <div className={"flex items-center gap-1 text-neutral-600"}>
                    <div>{"Ordenado hace"}</div>
                    <div className={"font-semibold"}>{dayjs(createdAt).fromNow(true)}.</div>
                </div>
            </div>
        </motion.div>
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
                </div>
            </div>
            <div className={"flex items-center gap-2 rounded-md w-full h-[1px] bg-neutral-200 animate-pulse"}></div>
            <div className={"pt-4"}>
                <div className={"flex items-center gap-1 rounded-md w-36 h-5 bg-neutral-200 animate-pulse"}></div>
            </div>
        </div>
    )
}