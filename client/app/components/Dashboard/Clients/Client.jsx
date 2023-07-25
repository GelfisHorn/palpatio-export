import axios from "axios";
import { useState } from "react";
// Nextjs
import Link from "next/link";
// Components
import DashboardLayout from "@/app/components/Dashboard/Layout";
// Animations
import { AnimatePresence, motion } from "framer-motion";
// Notifications
import { toast } from "react-hot-toast";
// Date formatter
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import locale from 'dayjs/locale/es';
dayjs.locale(locale);
dayjs.extend(relativeTime);

export default function DashboardClient({ clientState, ordersState, loading }) {
    const client = clientState.get;
    const orders = ordersState.get;

    const [ orderInput, setOrderInput ] = useState("");
    async function handleAssignOrder() {
        if(!orderInput) {
            toast.error("Debes escribir un ID");
            return;
        }

        const config = getConfig();
        try {
            const { data } = await axios.post('/api/dashboard/clients/assignOrder', { userId: client._id, orderId: orderInput, config });
            ordersState.set(current => current.concat([data]));
            toast.success("Asignaste la orden correctamente!");
        } catch (error) {
            toast.error(error?.response?.data?.msg?.ES || "Hubo un error al asignar la orden");
        } finally {
            setOrderInput("");
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
        <DashboardLayout tab={"client"}>
            {!loading && Object.keys(client).length != 0 && (
                <motion.div
                    className={"flex flex-col gap-10 h-full overflow-y-scroll hide-scroll"}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                >
                    <div className={"flex flex-col gap-6 pt-6 lg:pt-8"}>
                        <h2 className={"font-bold text-3xl mx-4 md:mx-6 lg:mx-8"}>{client.name} {client.surname}</h2>
                    </div>
                    <div className={`px-4 md:px-8 py-4 md:py-6 rounded-xl transition-all`}>
                        <div className={"flex flex-col gap-8 border-b pb-4"}>
                            <div className={"flex flex-col gap-4"}>
                                <h3 className={"text-lg font-bold uppercase"}>Información de la cuenta</h3>
                                <div className={"flex items-center gap-2"}>
                                    <div className={"grid place-content-center text-primary w-6 text-lg"}><i className="fa-solid fa-user"></i></div>
                                    <div className={"font-medium text-neutral-700"}>{client.name} {client.surname}</div>
                                </div>
                                <div className={"flex items-center gap-2"}>
                                    <div className={"grid place-content-center text-primary w-6 text-lg"}><i className="fa-solid fa-envelope"></i></div>
                                    <div className={"font-medium text-neutral-700 break-all"}>{client.email}</div>
                                </div>
                                <div className={"flex items-center gap-2"}>
                                    <div className={"grid place-content-center text-primary w-6 text-lg"}><i className="fa-solid fa-circle-check"></i></div>
                                    <div className={"font-medium text-neutral-700 break-all"}>{client.confirmed ? "Sí" : "No"}</div>
                                </div>
                                <div className={"flex items-center gap-2"}>
                                    <div className={"grid place-content-center text-primary w-6 text-lg"}><i className="fa-solid fa-user-large-slash"></i></div>
                                    <div className={"font-medium text-neutral-700 break-all"}>{client.disabled ? "Sí" : "No"}</div>
                                </div>
                            </div>
                            <div className={"flex flex-col gap-4"}>
                                <h3 className={"text-lg font-bold uppercase"}>Historial de ordenes</h3>
                                {orders.length == 0 && (
                                    <div>Aún no hay ordenes que mostrar</div>
                                )}
                                {orders.length != 0 && (
                                    <div className={"flex flex-col gap-1"}>
                                        {orders.map((order, index) => (
                                            <div key={index} className={"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2 px-3 border rounded-xl"}>
                                                <div className={"font-semibold break-words"}>#{order.order._id}</div>
                                                <div className={"flex justify-end gap-2"}>
                                                    <span>{dayjs(order.order.createdAt).format('DD/MM/YYYY')}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className={"border-t"}></div>
                                <div className={"flex flex-col gap-2"}>
                                    <div className={"text-lg font-bold uppercase"}>Asignar orden</div>
                                    <div className={"flex flex-col sm:flex-row sm:items-center gap-1"}>
                                        <input value={orderInput} onChange={e => setOrderInput(e.target.value)} className={"py-2 px-3 border-2 focus:border-primary transition-colors rounded-md sm:w-[18.5rem]"} type="text" placeholder={"ID. ej: 64be8fd0d4ab6f804e2893da"} />
                                        <button onClick={handleAssignOrder} className={"select-none w-fit py-2 px-4 font-medium border-2 border-primary text-primary hover:text-white hover:bg-primary transition-colors rounded-md"}>Asignar orden</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"pt-4"}>
                            <div className={"flex items-center gap-1 text-neutral-600 uppercase text-sm sm:text-base"}>
                                <div className={"font-semibold"}>{client.createdAt == client.updatedAt ? "Creado hace" : "Actualizado hace"} {dayjs(client.createdAt == client.updatedAt ? client.createdAt : client.updatedAt).fromNow(true)}.</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </DashboardLayout>
    )
} 