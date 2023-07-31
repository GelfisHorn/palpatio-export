
import axios from "axios";
// React
import { useEffect, useState } from "react";
// Layout
import DashboardLayout from "@/app/components/Dashboard/Layout";
// Notifications
import { toast } from "react-hot-toast";
// Animations
import { motion } from "framer-motion";
// Styles
import styles from './Index.module.css'
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
            const sortedByDate = data.users.sort(function (a, b) {
                return new Date(b.updatedAt) - new Date(a.updatedAt);
            });
            setClients(sortedByDate);
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

    // Pagination handlers
    const handleSetPage = (newPage) => {
        if(page == newPage) {
            return;
        }
        setPage(newPage);
    }
    const handleNextPage = () => {
        if(page >= totalPages) {
            return;
        }
        setPage(page + 1);
    }
    const handlePrevPage = () => {
        if (page == 1) {
            return;
        }
        setPage(page - 1);
    }

    const [ showModal, setShowModal ] = useState(false);
    const handleShowModal = () => {
        setShowModal(!showModal);
    }

    return (
        <DashboardLayout tab={"clients"}>
            <div className={"flex flex-col h-full"}>
                <div className={"flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 lg:py-8 border-b"}>
                    <h2 className={"font-bold text-3xl mx-6 lg:mx-8"}>Clientes</h2>
                    <button onClick={handleShowModal} className={"rounded-md py-2 px-4 mx-6 lg:mx-8 border-2 border-primary hover:bg-primary font-medium text-primary hover:text-zinc-100 transition-colors"}>Nuevo cliente</button>
                </div>
                <div className={"flex flex-col overflow-y-scroll hide-scrollbar pt-6 gap-6 pb-6 lg:pb-8"}>
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
                            <h2 className={"text-xl"}>Aún no hay clientes que mostrar aquí.</h2>
                        </div>
                    )}
                    <div className={"flex justify-center items-center gap-2"}>
                        <button onClick={handlePrevPage} className={"grid place-content-center w-8 h-8 text-primary"}><i className="fa-solid fa-angle-left"></i></button>
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((mapPage, index) => (
                            <button key={index} onClick={() => handleSetPage(mapPage)} className={`${mapPage == page ? "bg-primary text-white" : null} grid place-content-center w-8 h-8 font-semibold border-2 border-primary text-primary hover:text-white hover:bg-primary transition-colors rounded-md`}>{mapPage}</button>
                        ))}
                        <button onClick={handleNextPage} className={"grid place-content-center w-8 h-8 text-primary"}><i className="fa-solid fa-angle-right"></i></button>
                    </div>
                </div>
            </div>
            {showModal && (
                <Modal handleClose={handleShowModal} handleAddClient={handleFetchClients} />
            )}
        </DashboardLayout>
    )
}

function Client({ client }) {

    const { _id: id, name, surname, email, confirmed, disabled, createdAt, updatedAt } = client;

    return (
        <motion.a
            href={`/dashboard/clients/${id}`}
            className={`px-4 md:px-8 py-4 md:py-6 border hover:border-primary transition-colors rounded-xl`}
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
                        <div className={"text-neutral-400"}><i className="fa-solid fa-user-slash"></i></div>
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
        </motion.a>
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

function Modal({ handleClose, handleAddClient }) {

    const [ name, setName ] = useState("");
    const [ surname, setSurname ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([name, surname, email, password].includes("")) {
            return toast.error("Debes llenar todos los campos");
        }

        const config = getConfig();

        try {
            const { data } = await axios.post('/api/dashboard/clients/create', { user: { name, surname, email, password }, config });
            handleAddClient(data);
            toast.success("Haz creado la cuenta correctamente!");
            resetForm();
            handleClose();
        } catch (error) {
            toast.error(error?.response?.data?.msg?.es || "Hubo un error al crear la cuenta");
        }
    }

    function resetForm() {
        setName("");
        setSurname("");
        setEmail("");
        setPassword("");
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
        <motion.div
            className={styles.modalContainer}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className={styles.modalBackdrop} onClick={handleClose}></div>
            <form onSubmit={handleSubmit} className={`${styles.modal} w-[95vw] md:w-[45rem] py-5 sm:py-6 px-5 sm:px-8 overflow-y-scroll hide-scrollbar`}>
                <div className={"pb-7 border-b"}>
                    <div className={"flex flex-col gap-4 sm:gap-7"}>
                        <div className={"flex items-center justify-between"}>
                            <div className={"text-2xl sm:text-3xl font-semibold"}>Crear cuenta</div>
                            <button type={"button"} onClick={handleClose} className={"text-2xl sm:text-3xl font-semibold hover:text-primary transition-colors"}><i className="fa-sharp fa-solid fa-xmark"></i></button>
                        </div>
                        <div className={"flex flex-col gap-2 sm:gap-4"}>
                            <div className={"text-lg sm:text-xl font-semibold"}>Información de cuenta</div>
                            <div className={"grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4"}>
                                <div className={"flex flex-col"}>
                                    <label className={"text-sm"} htmlFor="name">Nombre</label>
                                    <input onChange={e => setName(e.target.value)} value={name} className={`${styles.input} border py-2`} type="text" id="name" placeholder={"Escribe tu nombre"} />
                                </div>
                                <div className={"flex flex-col"}>
                                    <label className={"text-sm"} htmlFor="surname">Apellido</label>
                                    <input onChange={e => setSurname(e.target.value)} value={surname} className={`${styles.input} border py-2`} type="text" id="surname" placeholder={"Escribe tu apellido"} />
                                </div>
                                <div className={"flex flex-col"}>
                                    <label className={"text-sm"} htmlFor="email">Correo electrónico</label>
                                    <input onChange={e => setEmail(e.target.value)} value={email} className={`${styles.input} border py-2`} type="email" id="email" placeholder={"Escribe tu correo electrónico"} />
                                </div>
                                <div className={"flex flex-col"}>
                                    <label className={"text-sm"} htmlFor="pass">Contraseña</label>
                                    <input onChange={e => setPassword(e.target.value)} value={password} className={`${styles.input} border py-2`} type="password" id="pass" placeholder={"Escribe tu contraseña"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"flex items-center justify-end gap-2 pt-7"}>
                    <button type={"button"} onClick={handleClose} className={"py-2 px-4 font-semibold border border-primary hover:bg-primary text-primary hover:text-zinc-200 transition-colors rounded-md"}>Cancelar</button>
                    <button type={"submit"} className={"py-2 px-4 font-semibold bg-primary hover:bg-cyan-600 text-zinc-200 transition-colors rounded-md"}>Crear cuenta</button>
                </div>
            </form>
        </motion.div>
    )
}