"use client"

// Components
import axios from "axios";
import DashboardLayout from "@/app/components/Dashboard/Layout";
// Hooks
import useAppContext from "@/app/hooks/useAppContext";
// Styles
import styles from './Index.module.css'
import { useRef, useState } from "react";
// Notifications
import { toast } from "react-hot-toast";
// Animations 
import { motion, AnimatePresence } from "framer-motion";

const TAB = {
    personalInfo: {
        "icon": "fa-regular fa-user",
        "text": "Cuenta",
        color: {
            text: "text-cyan-500", border: "hover:border-cyan-500", active: "border-cyan-500"
        }
    },
    address: {
        "icon": "fa-regular fa-location-dot",
        "text": "Direcciones",
        color: {
            text: "text-orange-500", border: "hover:border-orange-500", active: "border-orange-500"
        }
    }
}

export default function DashboardMyAccount() {

    const { auth } = useAppContext();

    const [ showModal, setShowModal ] = useState(false);
    const handleModal = {
        open: () => {
            setShowModal(true);
        },
        close: () => {
            setShowModal(false);
        }
    }

    return (
        <DashboardLayout tab={"myaccount"}>
            <div className={"flex flex-col h-full bg-neutral-100"}>
                <div className={"flex flex-col gap-6 pt-6 sm:pt-8"}>
                    <h2 className={"font-bold text-3xl mx-3 sm:mx-8 text-center sm:text-left"}>Ajustes de cuenta</h2>
                    <div className={"flex justify-center sm:justify-start gap-2 border-b px-3 sm:px-8"}>
                        <Tab active={true} icon={TAB.personalInfo.icon} color={TAB.personalInfo.color} title={TAB.personalInfo.text} />
                        <Tab icon={TAB.address.icon} color={TAB.address.color} title={TAB.address.text} />
                    </div>
                </div>
                {Object.keys(auth).length != 0 && (
                    <motion.div 
                        className={"overflow-y-scroll hide-scroll pt-6 gap-6 pb-4 sm:pb-8 px-3 sm:px-8 text-center sm:text-left"}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        <div className={`${styles.card} shadow-md`}>
                            <div className={"flex flex-col sm:flex-row items-center gap-4 sm:gap-6 py-6 sm:py-7 px-6 sm:px-8"}>
                                <div className={"grid place-content-center bg-primary rounded-full text-white w-10 min-w-[2.5rem] h-10 mt-1 sm:mt-0"}>
                                    <i className="fa-solid fa-user sm:text-xl"></i>
                                </div>
                                <div className={"flex flex-col gap-1 w-full"}>
                                    <h4 className={"text-xl sm:text-2xl font-semibold"}>Información de cuenta</h4>
                                    <p className={"text-neutral-500"}>Modifica la información de tu cuenta</p>
                                </div>
                            </div>
                            <div className={"flex items-start flex-col sm:flex-row gap-6 sm:gap-0 justify-between py-6 sm:py-7 px-6 sm:px-8 border-t relative"}>
                                <div className={"flex flex-col gap-2 w-full"}>
                                    <div className={"flex sm:items-center flex-col sm:flex-row sm:gap-1"}>
                                        <span className={"text-neutral-500"}>Nombre:</span>
                                        <span className={"font-medium"}>{auth.name}</span>
                                    </div>
                                    <div className={"flex sm:items-center flex-col sm:flex-row sm:gap-1"}>
                                        <span className={"text-neutral-500"}>Apellido:</span>
                                        <span className={"font-medium"}>{auth.surname}</span>
                                    </div>
                                    <div className={"flex sm:items-center flex-col sm:flex-row sm:gap-1"}>
                                        <span className={"text-neutral-500"}>Correo electrónico:</span>
                                        <span className={"font-medium break-all"}>{auth.email}</span>
                                    </div>
                                    <div className={"flex sm:items-center flex-col sm:flex-row sm:gap-1"}>
                                        <span className={"text-neutral-500"}>Contraseña:</span>
                                        <span className={"font-medium"}>********</span>
                                    </div>
                                </div>
                                <div className={"flex justify-center sm:justify-end w-full sm:w-fit sm:absolute right-6"}>
                                    <button onClick={handleModal.open} className={"border font-medium border-primary text-primary py-2 px-4 rounded-md hover:bg-primary hover:text-white transition-colors"}>Editar</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
            <AnimatePresence>
                {showModal && (
                    <Modal handleClose={handleModal.close} />
                )}
            </AnimatePresence>
        </DashboardLayout>
    )
}

function Tab({ active, icon, color, title }) {
    return (
        <div className={`cursor-pointer px-6 sm:px-2 py-3 border-b-2 ${active ? color.active : "border-transparent"} ${color.border} transition-colors select-none`}>
            <div className={"flex items-center gap-2"}>
                <i className={`${icon} ${color.text}`}></i>
                <div className={"hidden sm:block"}>{title}</div>
            </div>
        </div>
    )
}

function Modal({ handleClose }) {

    const { auth, setAuth } = useAppContext();

    const nameRef = useRef(null);
    const surnameRef = useRef(null);
    const emailRef = useRef(null);
    const currentPasswordRef = useRef(null);
    const newPasswordRef = useRef(null);
    const repeatPasswordRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fields = {
            name: nameRef?.current?.value,
            surname: surnameRef?.current?.value,
            email: emailRef?.current?.value,
            currentPassword: currentPasswordRef?.current?.value,
            newPassword: newPasswordRef?.current?.value,
            repeatPassword: repeatPasswordRef?.current?.value
        }

        const accountRes = checkAccountInfoFields({ name: fields.name, surname: fields.surname, email: fields.email });
        if (!accountRes.success) {
            toast.error(accountRes.msg);
            return;
        }
        
        const passwordRes = checkNewPasswordFields({ currentPassword: fields.currentPassword, newPassword: fields.newPassword, repeatPassword: fields.repeatPassword });
        if (!passwordRes.success) {
            toast.error(passwordRes.msg);
            return;
        }

        const reqBody = getReqBody(fields);
        if (Object.keys(reqBody).length == 0) return;
        const config = getConfig();

        try {
            await axios.post('/api/users/edit', { reqBody, config });
            toast.success("Se actualizó la información correctamente");
            setAuth({ ...auth, name: fields.name, surname: fields.surname, email: fields.email });
            handleClose();
        } catch (error) {
            toast.error(error.response.data.msg.es || "Hubo un error al actualizar la información");
        }
    }

    const checkAccountInfoFields = (fields) => {
        const { name, surname, email } = fields || {};
        if(!name) {
            return { success: false, msg: "Nombre no puede estar vacío" }
        }
        if (!surname) {
            return { success: false, msg: "Apellido no puede estar vacío" }
        }
        if (!email) {
            return { success: false, msg: "Correo electrónico no puede estar vacío" }
        }
        return { success: true };
    }

    const checkNewPasswordFields = (fields) => {
        const { currentPassword, newPassword, repeatPassword } = fields || {};
        if(!currentPassword && !newPassword && !repeatPassword) {
            return { success: true, modified: false };
        }
        if (!currentPassword) {
            return { success: false, msg: "Contraseña actual no puede estar vacío" }
        }
        if (!newPassword) {
            return { success: false, msg: "Nueva contraseña no puede estar vacío" }
        }
        if (!repeatPassword) {
            return { success: false, msg: "Repetir contraseña no puede estar vacío" }
        }
        if(currentPassword == newPassword) {
            return { success: false, msg: "Tu nueva contraseña no puede ser la misma que ya tenías" }
        }
        if (newPassword != repeatPassword) {
            return { success: false, msg: "Las contraseñas no coinciden" }
        }
        return { success: true, modified: true };
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

    function getReqBody(fields) {
        const reqBody = {};

        if (fields.name != auth.name) reqBody.name = fields.name;
        if (fields.surname != auth.surname) reqBody.surname = fields.surname;
        if (fields.email != auth.email) reqBody.email = fields.email;
        if (fields.currentPassword) reqBody.currentPassword = fields.currentPassword;
        if (fields.newPassword) reqBody.password = fields.newPassword;
        if (Object.keys(reqBody).length == 0) {
            toast.error("No hay cambios que guardar");
            return {};
        }

        return reqBody;
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
                            <div className={"text-2xl sm:text-3xl font-semibold"}>Editar cuenta</div>
                            <button type={"button"} onClick={handleClose} className={"text-2xl sm:text-3xl font-semibold hover:text-primary transition-colors"}><i className="fa-sharp fa-solid fa-xmark"></i></button>
                        </div>
                        <div className={"flex flex-col gap-2 sm:gap-4"}>
                            <div className={"text-lg sm:text-xl font-semibold"}>Información de la cuenta</div>
                            <div className={"grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4"}>
                                <div className={"flex flex-col"}>
                                    <label className={"text-sm"} htmlFor="name">Nombre</label>
                                    <input defaultValue={auth.name} ref={nameRef} className={`${styles.input} border py-2`} type="text" id="name" placeholder={"Escribe tu nombre"} />
                                </div>
                                <div className={"flex flex-col"}>
                                    <label className={"text-sm"} htmlFor="surname">Apellido</label>
                                    <input defaultValue={auth.surname} ref={surnameRef} className={`${styles.input} border py-2`} type="text" id="surname" placeholder={"Escribe tu apellido"} />
                                </div>
                                <div className={"flex flex-col sm:col-start-1 sm:col-end-3"}>
                                    <label className={"text-sm"} htmlFor="email">Correo electrónico</label>
                                    <input defaultValue={auth.email} ref={emailRef} className={`${styles.input} border py-2`} type="email" id="email" placeholder={"Escribe tu correo electrónico"} />
                                </div>
                            </div>
                        </div>
                        <div className={"flex flex-col gap-2 sm:gap-4"}>
                            <div className={"text-lg sm:text-xl font-semibold"}>Cambiar contraseña</div>
                            <div className={"grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4"}>
                                <div className={"flex flex-col"}>
                                    <label className={"text-sm"} htmlFor="currentPassword">Contraseña actual</label>
                                    <input ref={currentPasswordRef} className={`${styles.input} border py-2`} type="password" id="currentPassword" placeholder={"Contraseña actual"} />
                                </div>
                                <div className={"flex flex-col"}>
                                    <label className={"text-sm"} htmlFor="newPassword">Nueva contraseña</label>
                                    <input ref={newPasswordRef} className={`${styles.input} border py-2`} type="password" id="newPassword" placeholder={"Nueva contraseña"} />
                                </div>
                                <div className={"flex flex-col sm:col-start-1 sm:col-end-3"}>
                                    <label className={"text-sm"} htmlFor="repeatPassword">Repetir contraseña</label>
                                    <input ref={repeatPasswordRef} className={`${styles.input} border py-2`} type="password" id="repeatPassword" placeholder={"Repetir contraseña"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"flex items-center justify-end gap-2 pt-7"}>
                    <button type={"button"} onClick={handleClose} className={"py-2 px-4 font-semibold border border-primary hover:bg-primary text-primary hover:text-zinc-200 transition-colors rounded-md"}>Cancelar</button>
                    <button type={"submit"} className={"py-2 px-4 font-semibold bg-primary hover:bg-cyan-600 text-zinc-200 transition-colors rounded-md"}>Editar</button>
                </div>
            </form>
        </motion.div>
    )
}