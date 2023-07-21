
import axios from "axios";
// React
import { useEffect, useState } from "react";
// Layout
import DashboardLayout from "@/app/components/Dashboard/Layout";
// Notifications
import { toast } from "react-hot-toast";
// Animations
import { motion } from "framer-motion";
// Date formatter
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import locale from 'dayjs/locale/es';
dayjs.locale(locale);
dayjs.extend(relativeTime);

const CONFIRMED = {
    true: {
        icon: "fa-solid fa-check",
        text: "Confirmado",
        color: {
            text: "text-green-500", border: "hover:border-green-500", active: "border-green-500"
        }
    },
    false: {
        icon: "fa-solid fa-xmark",
        text: "Sin confirmar",
        color: {
            text: "text-red-500", border: "hover:border-red-500", active: "border-red-500"
        }
    }
}

// TODO: Pagination component
export default function DashboardClients() {

    const [ fetching, setFetching ] = useState(true);
    const [ clients, setClients ] = useState([]);
    // Pagination
    const [ page, setPage ] = useState(1);
    const [ totalPages, setTotalPages ] = useState(1);

    useEffect(() => {
        handleFetchClients();
    }, [page]);

    async function handleFetchClients() {
        const config = getConfig();

        try {
            const { data } = await axios.post('/api/dashboard/clients/getAll', { page, config });
            setClients(data.users);
            setTotalPages(data.totalPages);
        } catch (error) {
            toast.error("Hubo un error al obtener los clientes");
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
        <DashboardLayout tab={"clients"}>
            <div className={"flex flex-col h-full"}>
                <div className={"flex flex-col gap-6 py-6 lg:py-8 border-b"}>
                    <h2 className={"font-bold text-3xl mx-6 lg:mx-8"}>Ordenes de cajas</h2>
                </div>
                <div className={"overflow-y-scroll hide-scrollbar pt-6 gap-6 pb-6 lg:pb-8"}>
                    {fetching && (
                        <div className={"flex flex-col gap-4 mx-6 lg:mx-8"}>
                            <ClientSkeleton />
                            <ClientSkeleton />
                            <ClientSkeleton />
                            <ClientSkeleton />
                        </div>
                    )}
                    {!fetching && clients.length != 0 && (
                        <div className={"flex flex-col gap-4 mx-3 lg:mx-8"}>
                            {clients.map((client, index) => (
                                <Client key={index} client={client}/>
                            ))}
                        </div>
                    )}
                    {!fetching && clients.length == 0 && (
                        <div className={"grid place-content-center h-full"}>
                            <h2 className={"text-xl"}>Aún no hay ordenes que mostrar aquí.</h2>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}

function Client({ client }) {

    const { _id: id, name, surname, email, confirmed, disabled, createdAt, updatedAt } = client;

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
                        <i className={`${CONFIRMED[confirmed].icon} ${CONFIRMED[confirmed].color.text}`}></i>
                        <div>{CONFIRMED[confirmed].text}</div>
                    </div>
                </div>
                <div className={"flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6"}>
                    <div className={"flex items-center gap-2"}>
                        <div className={"text-neutral-400"}><i className="fa-solid fa-user"></i></div>
                        <div className={"font-medium text-neutral-700 break-all"}>{name} {surname}</div>
                    </div>
                    <a href={`mailto:${email}`} className={"flex items-center gap-2 text-neutral-700 hover:text-primary hover:underline transition-colors"}>
                        <div className={"text-neutral-400"}><i className="fa-solid fa-envelope"></i></div>
                        <div className={"font-medium break-all"}>{email}</div>
                    </a>
                    <div className={"flex items-center gap-2"}>
                        <div className={"text-neutral-400"}><i class="fa-solid fa-user-slash"></i></div>
                        <div className={"font-medium text-neutral-700 break-all"}>{disabled ? "Sí" : "No"}</div>
                    </div>
                </div>
            </div>
            <div className={"pt-4"}>
                <div className={"flex items-center gap-1 text-neutral-600"}>
                    <div>{createdAt == updatedAt ? "Creado hace" : "Actualizado hace"}</div>
                    <div className={"font-semibold"}>{dayjs(createdAt == updatedAt ? createdAt : updatedAt).fromNow(true)}.</div>
                </div>
            </div>
        </motion.div>
    )
}

function ClientSkeleton() {
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