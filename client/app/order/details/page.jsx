"use client"

// React
import { useEffect, useState, Fragment } from "react";
// Nextjs
import Link from "next/link";
import { useRouter } from "next/navigation";
// Components
import OrderLayout from "../../components/Order/Layout/Index";
// Styles
import styles from '../styles.module.css';
// Hooks
import useAppContext from "../../hooks/useAppContext";
import uploadImages from "@/app/hooks/uploadImages";
// Helpers
import randomId from "../../helpers/randomId";
// Toast
import toast from 'react-hot-toast';
import { formatMoney } from "../../helpers/formatMoney";
// Languages
import lang from '../../langs/order/page.json';
// HeadlessUI
import { Dialog, Transition } from '@headlessui/react'
// Settings
import { PRICE, UNITS_MAX, MAX_AMOUNT, VEHICLES, COUNTRIES, DISCOUNT, PRICE_DEFAULT, VEHICLE_PRICE } from "@/app/config/order/order";


export default function OrderIndex() {
    
    const router = useRouter();

    const { order, setOrder, handleNextStep, handlePrevStep } = useAppContext(); 
    
    useEffect(() => {
        if (!order.category) {
            router.push('/order')
        }
    }, [order])

    const [ items, setItems ] = useState([]);
    const [ showSelect, setShowSelect ] = useState(false);

    // When next step, check fields
    const [ checkFields, setCheckFields ] = useState(false);

    useEffect(() => {
        if (items.length != 0) {
            return;
        }
        setItems(order.items);
    }, [order]);

    useEffect(() => {
        if(items.length == 0) {
            return;
        }
        let total = items.reduce((total, item) => {
            return total + item.subTotal;
        }, 0);
        if (order.category == 'moving') {
            total = total - ((total * DISCOUNT) / 100)
        }
        setOrder(current => {
            return {...current, items, total}
        })
    }, [items])
    
    const handleVerifyNextStep = () => {
        setCheckFields(false);
        setCheckFields(true);
        if(!order.from) {
            toast.error("Debes seleccionar un país");
            return;
        }
        if(order.items.length == 0) {
            toast.error("Debes elegir qué vas a enviar");
            return;
        }
        // Check fields ready
        const fieldsReady = order.items.filter(item => item.ready == false);
        if(fieldsReady.length) {
            toast.error("Debes llenar todos los campos");
            return;
        }
        
        handleNextStep();
        router.push('/order/shipping');
    }

    // Modal
    const [isOpen, setIsOpen] = useState(true)
    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }

    return (
        order.category && (
            <OrderLayout step={2}>
                <div className={"flex flex-col gap-8 w-full px-3 sm:px-8"}>
                    <div className={"flex flex-col gap-7"}>
                        <div className={"flex flex-col gap-4"}>
                            <h2 className={"text-2xl font-bold uppercase"}>Datos iniciales</h2>
                            <div className={"flex flex-col gap-8"}>
                                <div>
                                    <div className={"text-lg font-semibold"}>Haz el proceso más fácil</div>
                                    <p className={"text-neutral-600"}><Link className={"text-primary underline"} href={"#"}>Inicia sesión</Link> para facilitar el proceso la próxima vez que envíes algo.</p>
                                </div>
                                <div className={"grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-10 p-5 bg-white rounded-md shadow-md"}>
                                    <div>
                                        <div className={"text-neutral-600"}>Desde</div>
                                        <div className={"relative"}>
                                            <div onClick={() => setShowSelect(!showSelect)} className={`flex items-center justify-between cursor-pointer border-b-2 ${showSelect ? "border-primary" : "border-transparent"} ${order.from ? "text-neutral-800" : "text-neutral-500"} transition-colors select-none`}>
                                                <div className={`font-semibold`}>{order.from ? COUNTRIES[order.from] : "Seleccionar país"}</div>
                                                <i className="fa-solid fa-angle-down"></i>
                                            </div>
                                            {showSelect && (
                                                <div className={"absolute top-7 bg-white rounded-b-md shadow-md border overflow-hidden w-full border-t-transparent z-10"}>
                                                    {Object.keys(COUNTRIES).map(country => (
                                                        <div key={country}
                                                            onClick={() => {
                                                                setOrder(current => {
                                                                    return { ...current, from: country }
                                                                })
                                                                setShowSelect(false);
                                                            }}
                                                            className={"p-4 w-full hover:bg-neutral-100 transition-colors cursor-pointer text-sm"}>
                                                            {COUNTRIES[country]}</div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <div className={"text-neutral-600"}>Hacia</div>
                                        <div className={"relative"}>
                                            <div className={"flex items-center justify-between text-neutral-800"}>
                                                <div className={"font-semibold"}>República Dominicana</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"flex flex-col gap-y-3"}>
                                {order.items.map((item) => (
                                    <Item key={item.id} item={item} items={{ state: items, setState: setItems }} checkFields={checkFields} />
                                ))}
                            </div>
                        </div>
                        <div className={"flex flex-col gap-4"}>
                            <div className={"text-2xl font-bold uppercase text-center"}>¿Quieres enviar algo más?</div>
                            <div className={"grid grid-cols-2 gap-2"}>
                                <AddItem
                                    type={"vehicle"}
                                    icon={"fa-solid fa-car"}
                                    text={"Añadir vehiculo"}
                                    items={{ state: items, setState: setItems }}
                                />
                                <AddItem
                                    type={"furniture"}
                                    icon={"fa-solid fa-loveseat"}
                                    text={"Añadir mueble"}
                                    items={{ state: items, setState: setItems }}
                                />
                                <AddItem
                                    type={"package"}
                                    icon={"fa-solid fa-box"}
                                    text={"Añadir paquete"}
                                    items={{ state: items, setState: setItems }}
                                />
                                <AddItem
                                    type={"pallet"}
                                    icon={"fa-solid fa-pallet-box"}
                                    text={"Añadir pallet"}
                                    items={{ state: items, setState: setItems }}
                                />
                                <AddItem
                                    type={"tank"}
                                    icon={"fa-solid fa-tank-water"}
                                    text={"Añadir tanque"}
                                    items={{ state: items, setState: setItems }}
                                />
                                <AddItem
                                    type={"other"}
                                    icon={"fa-sharp fa-regular fa-square-dashed"}
                                    text={"Añadir otro"}
                                    items={{ state: items, setState: setItems }}
                                />
                            </div>
                        </div>
                    </div>
                    <button onClick={handleVerifyNextStep} className={"flex items-center gap-1 justify-center px-10 py-3 rounded-md bg-primary hover:bg-cyan-800 text-white"}>
                        <span>Siguiente paso</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                    </button>
                </div>
                
            </OrderLayout>
        )
    )
}

function Item({ item, items, checkFields }) {

    const type = {
        "vehicle": {
            "title": "Vehiculo",
            "icon": "fa-solid fa-car"
        },
        "furniture": {
            "title": "Mueble",
            "icon": "fa-solid fa-loveseat"
        },
        "package": {
            "title": "Paquete",
            "icon": "fa-solid fa-box"
        },
        "pallet": {
            "title": "Pallet",
            "icon": "fa-solid fa-pallet-box"
        },
        "tank": {
            "title": "Tanque",
            "icon": "fa-solid fa-tank-water"
        },
        "other": {
            "title": "Otro",
            "icon": "fa-sharp fa-regular fa-square-dashed"
        }
    }

    const BUTTONS = {
        "vehicle": [
            {
                "id": "truck",
                "name": "Camión"
            },
            {
                "id": "car",
                "name": "Auto"
            },
            {
                "id": "engine",
                "name": "Motor"
            }
        ],
        "furniture": [
            {
                "id": "chair",
                "name": "Silla"
            },
            {
                "id": "table",
                "name": "Mesa"
            }
        ],
        "package": [
            {
                "id": "small",
                "name": "Chico"
            },
            {
                "id": "medium",
                "name": "Mediano"
            },
            {
                "id": "big",
                "name": "Grande"
            }
        ],
        "pallet": null,
        "tank": [
            {
                "id": "water",
                "name": "Agua"
            },
            {
                "id": "fuel",
                "name": "Combustible"
            },
            {
                "id": "storage",
                "name": "Almacenamiento"
            },
            {
                "id": "gas",
                "name": "Gas"
            }
        ],
        "other": [
            {
                "id": "tools",
                "name": "Herramientas"
            },
            {
                "id": "gardening",
                "name": "Jardinería"
            },
            {
                "id": "travel",
                "name": "Articulos de viaje"
            },
            {
                "id": "electronics",
                "name": "Electrónicos"
            }
        ]
    }

    // Item state
    const [ content, setContent ] = useState(item.content || "");
    const [ images, setImages ] = useState([]);
    // Input file (images)
    const [ imagesInput, setImagesInput ] = useState([]);

    const handleSetContent = (value) => {
        setContent(value)
    }

    const handleRemoveItem = () => {
        const newItems = items.state.filter(filterItem => filterItem.id != item.id);
        items.setState(newItems);
    }

    useEffect(() => {
        let ready = true;
        if ([content].includes("")) ready = false;
        if (content.length < 1) ready = false;
        const newState = items.state.map(mapItem => {
            if (mapItem.id == item.id) {
                return { ...mapItem, content, images, ready }
            }
            return mapItem;
        })
        items.setState(newState)
    }, [content, images]);

    // Modal
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if(imagesInput.length > 0) {
            openModal();
        }
    }, [imagesInput]);

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <div className={"shadow-md border rounded-md"}>
            <div className={"flex justify-between bg-neutral-100 rounded-t-md py-2 px-2 sm:px-5"}>
                <div className={"flex items-center gap-5"}>
                    <div className={"flex items-center gap-2"}>
                        <i className={type[item.type].icon} />
                        <div className={"font-semibold text-sm"}>{type[item.type].title}</div>
                    </div>
                </div>
                <button onClick={handleRemoveItem} className={"text-sm text-neutral-700 hover:text-red-500 transition-colors"}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
            <div className={"flex flex-col gap-1 py-2 sm:py-5 px-2 sm:px-6 bg-white rounded-b-md"}>
                <div className={"flex flex-col gap-3"}>
                    <div className={"grid grid-cols-2 gap-3"}>
                        <div className={"flex flex-col gap-1"}>
                            <div className={"flex flex-col gap-2"}>
                                <div className={"font-semibold text-lg"}>¿Tienes imágenes? <span className={"text-base font-normal text-neutral-600"}>(Opcional)</span></div>
                                <label className={"flex items-center justify-center gap-3 w-full bg-neutral-800 hover:bg-black transition-colors text-white py-3 rounded-full cursor-pointer"} htmlFor={`file${item.id}`}>
                                    <i class="fa-light fa-upload text-lg"></i>
                                    <span>Adjuntar imágen</span>
                                </label>
                                <input onChange={e => setImagesInput(e.target.files)} multiple={true} className={"hidden"} type="file" name="" id={`file${item.id}`} />
                            </div>
                            {imagesInput.length ? (
                                <div className={"text-center font-medium text-neutral-600"}>{imagesInput.length} {imagesInput.length == 1 ? "imágen adjunta" : "imágenes adjuntas"}</div>
                            ) : null}
                        </div>
                    </div>
                    {BUTTONS[item.type] && (
                        <div className={"flex flex-col gap-2"}>
                            <div className={"font-semibold text-lg"}>¿Qué vas a enviar? <span className={"text-base font-normal text-neutral-600"}>(Opcional)</span></div>
                            <div className={"grid grid-cols-2 gap-3"}>
                                {BUTTONS[item.type].map(btn => (
                                    <button key={btn.id} className={`border-[0.125rem] border-primary text-primary hover:bg-primary hover:text-white transition-colors py-[0.625rem] rounded-full font-semibold ${btn.id == content ? "text-white bg-primary" : null}`} onClick={() => handleSetContent(btn.id)}>
                                        <div>{btn.name}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Modal images={imagesInput} setImages={setImages} isOpen={isOpen} closeModal={closeModal} />
        </div>
    )
}

function AddItem({ type, icon, text, items }) {

    const handleAddItem = () => {
        items.setState(items.state.concat({
            id: randomId(),
            type,
            content: "",
        }));
    }

    return (
        <button onClick={handleAddItem} className={`flex items-center justify-center gap-2 w-full py-3 border-2 border-white hover:border-primary text-neutral-600 rounded-md bg-white shadow-md ${styles.item}`}>
            <i className={icon}></i>
            <div className={"text-sm font-semibold"}>{text}</div>
        </button>
    )
}

function Modal({ images, setImages, isOpen, closeModal }) {

    let uploaded = false;
    const handleUploadImages = async () => {
        if (uploaded) return;
        uploaded = true;
        if(images) {
            const imagesUrls = await uploadImages(images);
            setImages(imagesUrls);
            closeModal();
            toast.success(`${images.length == 1 ? "Imágen subida correctamente!" : "Imágenes subidas correctamente!"}`)
        }
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Subir imágenes
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        ¿Estás seguro que deseas subir estas imágenes?
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={closeModal}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={handleUploadImages}
                                    >
                                        Subir
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}