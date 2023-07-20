import axios from "axios";
// Nextjs
import Link from "next/link";
// Components
import DashboardLayout from "@/app/components/Dashboard/Layout";
// Config
import { COUNTRIES } from '@/app/config/order/order';
import { STATUS, TYPE, CATEGORY, CONTENT } from "@/pages/dashboard/orders/config/order";
// Animations
import { AnimatePresence, motion } from "framer-motion";
// Notifications
import { toast } from "react-hot-toast";
// Date formatter
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import locale from 'dayjs/locale/es';
import Image from "next/image";
import { useState } from "react";
dayjs.locale(locale);
dayjs.extend(relativeTime);

export default function DashboardOrder({ order, setOrder, loading }) {

    const [ showDropdown, setShowDropdown ] = useState(false);
    const handleShowDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    async function handleChangeStatus(newStatus) {
        handleShowDropdown();
        const config = getConfig();
        try {
            await axios.post('/api/orders/changeStatus', { id: order._id, status: newStatus, config });
            setOrder({...order, status: newStatus});
            toast.success("Cambiaste el estado de la orden");
        } catch (error) {
            console.log(error)
            toast.error("Hubo un error al cambiar el estado de la orden");
        }
    }

    function getConfig() {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            setFetchingAuth(false);
            return;
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
        <DashboardLayout tab={"order"}>
            {!loading && Object.keys(order).length != 0 && (
                <motion.div
                    className={"flex flex-col gap-10 h-full overflow-y-scroll hide-scroll"}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                >
                    <div className={"flex flex-col gap-6 pt-6 lg:pt-8"}>
                        <h2 className={"font-bold text-3xl mx-4 md:mx-6 lg:mx-8"}>Orden de {order.contact.name}</h2>
                    </div>
                    <div className={`px-4 md:px-8 py-4 md:py-6 rounded-xl transition-all`}>
                        <div className={"flex flex-col gap-4 border-b pb-4"}>
                            <div className={"flex flex-col sm:flex-row sm:items-center gap-1 lg:gap-3 text-xl border-b pb-4"}>
                                <div className={"flex items-center gap-2"}>
                                    <div className={"grid place-content-center text-neutral-400 w-6"}><i className={`${STATUS[order.status].icon} ${STATUS[order.status].color.text}`}></i></div>
                                    <div className={"font-extrabold uppercase text-black"}>{STATUS[order.status].text}</div>
                                </div>
                                <div className={"relative flex flex-col text-lg"}>
                                    <button onClick={handleShowDropdown} className={"flex items-center justify-center gap-2 border w-48 h-10 rounded-md"}>
                                        <span>Cambiar estado</span>
                                        <i className={`fa-regular fa-angle-down transition-transform ${showDropdown ? "rotate-180" : "rotate-0"}`}></i>
                                    </button>
                                    <AnimatePresence>
                                        {showDropdown && (
                                            <motion.div
                                                className={"absolute flex flex-col bg-white top-10 w-48 divide-y rounded-b-lg overflow-hidden border border-t-0"}
                                                initial={{ opacity: 0, y: -5 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -5 }}
                                            >
                                                {Object.keys(STATUS).map(status => (
                                                    <button onClick={() => handleChangeStatus(status)} className={"px-4 py-2 hover:bg-neutral-100 w-full"}>{STATUS[status].text}</button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                            <div className={"flex flex-col gap-4 border-b pb-4"}>
                                <h3 className={"text-lg font-bold uppercase"}>Información de contacto</h3>
                                <div className={"flex items-center gap-2"}>
                                    <div className={"grid place-content-center text-primary w-6 text-lg"}><i className="fa-solid fa-location-dot"></i></div>
                                    <div className={"font-medium text-neutral-700"}>{COUNTRIES[order.fromCountry]}</div>
                                </div>
                                <div className={"flex items-center gap-2"}>
                                    <div className={"grid place-content-center text-primary w-6 text-lg"}><i className="fa-solid fa-user"></i></div>
                                    <div className={"font-medium text-neutral-700 break-all"}>{order.contact.name}</div>
                                </div>
                                <div className={"flex items-center gap-2"}>
                                    <div className={"grid place-content-center text-primary w-6 text-lg"}><i className="fa-solid fa-envelope"></i></div>
                                    <div className={"font-medium text-neutral-700 break-all"}>{order.contact.email}</div>
                                </div>
                                <div className={"flex items-center gap-2"}>
                                    <div className={"grid place-content-center text-primary w-6 text-lg"}><i className="fa-solid fa-phone"></i></div>
                                    <div className={"font-medium text-neutral-700 break-all"}>{order.contact.phoneNumber}</div>
                                </div>
                            </div>
                            <div className={"flex flex-col gap-4 border-b pb-4"}>
                                <h3 className={"text-lg font-bold uppercase"}>Orden</h3>
                                <div className={"flex flex-col gap-1"}>
                                    {order.items.map((item, index) => (
                                        <div key={index} className={"flex flex-col gap-2 px-4 py-3 rounded-xl border"}>
                                            <div className={"flex flex-col"}>
                                                <div className={"flex items-center gap-1"}>
                                                    <div className={"text-neutral-700"}>Tipo:</div>
                                                    <div className={"font-semibold text-black"}>{TYPE[item.type]}</div>
                                                </div>
                                                {item.category && (
                                                    <div className={"flex items-center gap-1"}>
                                                        <div className={"text-neutral-700"}>Categoría:</div>
                                                        <div className={"font-semibold text-black break-all"}>{CATEGORY[item.category]}</div>
                                                    </div>
                                                )}
                                                <div className={"flex items-center gap-1"}>
                                                    <div className={"text-neutral-700"}>Contenido:</div>
                                                    <div className={"font-semibold text-black"}>{CONTENT[item.type].find(i => i.id == item.content)?.name || item.content}</div>
                                                </div>
                                            </div>
                                            {item.images.length != 0 && (
                                                <div className={`w-full lg:w-2/3 xl:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-2 font-medium text-primary break-all`}>{item.images.map((img, index) => (
                                                    <Link key={index} href={img} className={"grid place-content-center image-container w-fit border rounded-xl"} target={"_blank"}>
                                                        <Image src={img} className={"image rounded-xl"} fill />
                                                    </Link>
                                                ))}</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={"flex flex-col gap-4"}>
                                <h3 className={"text-lg font-bold uppercase"}>Detalles de envío</h3>
                                <div className={"flex flex-col gap-1"}>
                                    <div className={"font-bold uppercase text-neutral-600 pl-2"}>Desde</div>
                                    <div className={"flex flex-col gap-2 border px-4 py-3 rounded-xl"}>
                                        <div className={"flex items-center gap-2"}>
                                            <div className={"grid place-content-center text-primary w-6 text-lg"}><i className="fa-solid fa-user"></i></div>
                                            <div className={"font-medium text-neutral-700 break-all"}>{order.shipping.from.fullName}</div>
                                        </div>
                                        <div className={"flex items-center gap-2"}>
                                            <div className={"grid place-content-center text-primary w-6 text-lg"}><i className="fa-solid fa-location-dot"></i></div>
                                            <div className={"font-medium text-neutral-700"}>{order.shipping.from.street}, {order.shipping.from.city}, {order.shipping.from.zipCode}</div>
                                        </div>
                                        <div className={"flex items-center gap-2"}>
                                            <div className={"grid place-content-center text-primary w-6 text-lg"}><i className="fa-solid fa-envelope"></i></div>
                                            <div className={"font-medium text-neutral-700 break-all"}>{order.shipping.from.email}</div>
                                        </div>
                                        <div className={"flex items-center gap-2"}>
                                            <div className={"grid place-content-center text-primary w-6 text-lg"}><i className="fa-solid fa-phone"></i></div>
                                            <div className={"font-medium text-neutral-700 break-all"}>{order.shipping.from.phoneNumber}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={"flex flex-col gap-1"}>
                                    <div className={"font-bold uppercase text-neutral-600 pl-2"}>Hacia</div>
                                    <div className={"flex flex-col gap-2 border px-4 py-3 rounded-xl"}>
                                        <div className={"flex items-center gap-2"}>
                                            <div className={"grid place-content-center text-primary w-6 text-lg"}><i className="fa-solid fa-user"></i></div>
                                            <div className={"font-medium text-neutral-700 break-all"}>{order.shipping.to.fullName}</div>
                                        </div>
                                        <div className={"flex items-center gap-2"}>
                                            <div className={"grid place-content-center text-primary w-6 text-lg"}><i className="fa-solid fa-location-dot"></i></div>
                                            <div className={"font-medium text-neutral-700"}>{order.shipping.to.street}, {order.shipping.to.city}, {order.shipping.to.zipCode}</div>
                                        </div>
                                        <div className={"flex items-center gap-2"}>
                                            <div className={"grid place-content-center text-primary w-6 text-lg"}><i className="fa-solid fa-envelope"></i></div>
                                            <div className={"font-medium text-neutral-700 break-all"}>{order.shipping.to.email}</div>
                                        </div>
                                        <div className={"flex items-center gap-2"}>
                                            <div className={"grid place-content-center text-primary w-6 text-lg"}><i className="fa-solid fa-phone"></i></div>
                                            <div className={"font-medium text-neutral-700 break-all"}>{order.shipping.to.phoneNumber}</div>
                                        </div>
                                    </div>
                                </div>
                                {order.shipping.note && (
                                    <div className={"flex flex-col gap-2"}>
                                        <div className={"font-bold uppercase text-neutral-600"}>Nota</div>
                                        <p>{order.shipping.note}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={"pt-4"}>
                            <div className={"flex items-center gap-1 text-neutral-600 uppercase"}>
                                <div className={"font-medium"}>{order.createdAt == order.updatedAt ? "Creado hace" : "Actualizado hace"}</div>
                                <div className={"font-bold"}>{dayjs(order.createdAt == order.updatedAt ? order.createdAt : order.updatedAt).fromNow(true)}.</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </DashboardLayout>   
    )
} 