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
                                    item.type != 'vehicle' ? (
                                        <Item key={item.id} item={item} items={{ state: items, setState: setItems }} checkFields={checkFields} />
                                    ) : (
                                        <ItemVehicle key={item.id} item={item} items={{ state: items, setState: setItems }} checkFields={checkFields} />
                                    )
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

    // Price state
    const [ subTotal, setSubTotal ] = useState(PRICE_DEFAULT[item.type]); 
    // Item state
    const [ amount, setAmount ] = useState(item.amount || 1);
    const [ weight, setWeight ] = useState(item.weight || "");
    const [ length, setLength] = useState(item.length || "");
    const [ width, setWidth ] = useState(item.width || "");
    const [ height, setHeight ] = useState(item.height || "");
    const [ content, setContent ] = useState(item.content || "");
    const [ value, setValue ] = useState(item.value || "");
    const [ images, setImages ] = useState([]);
    // Input file (images)
    const [ imagesInput, setImagesInput ] = useState([]);

    // Add remove amount
    const handleAddOne = () => {
        if (amount >= MAX_AMOUNT) return;

        setAmount(current => current + 1);
    }
    const handleRemoveOne = () => {
        if (amount == 1) return;

        setAmount(current => current - 1);
    }

    const handleRemoveItem = () => {
        const newItems = items.state.filter(filterItem => filterItem.id != item.id);
        items.setState(newItems);
    }

    const calculateSubTotal = (type) => {
        const weightTotal = Math.floor(weight / PRICE.weight.each) * PRICE.weight.price;
        const lengthTotal = Math.floor(length / PRICE.length.each) * PRICE.length.price;
        const widthTotal = Math.floor(width / PRICE.width.each) * PRICE.width.price;
        const heightTotal = Math.floor(height / PRICE.height.each) * PRICE.height.price;
        const total = (PRICE_DEFAULT[type] + (weightTotal + lengthTotal + widthTotal + heightTotal)) * amount;
        return total;
    }

    useEffect(() => {
        let ready = true;
        if ([content, value].includes("")) ready = false;
        if (content.length < 1) ready = false;
        if (Number(value) < 1) ready = false;
        const newState = items.state.map(mapItem => {
            if (mapItem.id == item.id) {
                return { ...mapItem, amount, weight, length, width, height, content, value, images, subTotal: calculateSubTotal(item.type), ready }
            }
            return mapItem;
        })
        items.setState(newState);
        setSubTotal(calculateSubTotal(item.type));
    }, [amount, weight, length, width, height, content, value, images]);

    const handleCheckNumberInput = (field) => {
        /* if([field].includes("")) {
            return [field].includes("")
        } */
        if (field < 1) {
            return field < 1
        }

        return false;
    }

    const handleCheckTextInput = (textarea) => {
        if ([textarea].includes("")) {
            return [textarea].includes("");
        }
        if (textarea.length < 1) {
            return textarea.length < 1;
        }

        return false;
    }

    // Modal
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (imagesInput.length > 0) {
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
                    <div className={"flex items-center gap-2 text-sm"}>
                        <button onClick={handleRemoveOne} className={`${amount > 1 ? "text-black" : "text-neutral-500 cursor-default"}`}>
                            <i className="fa-solid fa-minus"></i>
                        </button>
                        <div className={"font-semibold w-4 text-center"}>{amount}</div>
                        <button onClick={handleAddOne} className={`${amount < MAX_AMOUNT ? "text-primary" : "text-neutral-500 cursor-default"}`}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
                <button onClick={handleRemoveItem} className={"text-sm text-neutral-700 hover:text-red-500 transition-colors"}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
            <div className={"flex flex-col gap-3 py-2 sm:py-5 px-2 sm:px-6 bg-white rounded-b-md"}>
                <div className={'flex flex-col gap-2'}>
                    <div className={"flex flex-col"}>
                        <div className={"font-semibold text-lg"}>¿Conoces las dimensiones?</div>
                        <p className={"text-neutral-600 text-sm"}>Si no conoces las dimensiones, simplemente haz click en siguiente.</p>
                    </div>
                    <div className={"grid grid-cols-4 grid-rows-2 gap-2"}>
                        <div>
                            <label className={"font-semibold text-sm"} htmlFor={`weight${item.id}`}>Peso</label>
                            <div className={"relative"}>
                                <input value={weight} onChange={e => setWeight(e.target.value > UNITS_MAX.weight ? UNITS_MAX.weight : e.target.value)} className={`${styles.input}`} type="number" id={`weight${item.id}`} max={1000} min={1} />
                                <span className={"absolute top-1/2 -translate-y-1/2 right-2 text-xs font-bold text-neutral-500"}>kg</span>
                            </div>
                        </div>
                        <div>
                            <label className={"font-semibold text-sm"} htmlFor={`length${item.id}`}>Largo</label>
                            <div className={"relative"}>
                                <input value={length} onChange={e => setLength(e.target.value > UNITS_MAX.length ? UNITS_MAX.length : e.target.value)} className={`${styles.input}`} type="number" id={`length${item.id}`} max={1000} min={1} />
                                <span className={"absolute top-1/2 -translate-y-1/2 right-2 text-xs font-bold text-neutral-500"}>cm</span>
                            </div>
                        </div>
                        <div>
                            <label className={"font-semibold text-sm"} htmlFor={`width${item.id}`}>Ancho</label>
                            <div className={"relative"}>
                                <input value={width} onChange={e => setWidth(e.target.value > UNITS_MAX.width ? UNITS_MAX.width : e.target.value)} className={`${styles.input}`} type="number" id={`width${item.id}`} max={1000} min={1} />
                                <span className={"absolute top-1/2 -translate-y-1/2 right-2 text-xs font-bold text-neutral-500"}>cm</span>
                            </div>
                        </div>
                        <div>
                            <label className={"font-semibold text-sm"} htmlFor={`height${item.id}`}>Alto</label>
                            <div className={"relative"}>
                                <input value={height} onChange={e => setHeight(e.target.value > UNITS_MAX.height ? UNITS_MAX.height : e.target.value)} className={`${styles.input}`} type="number" id={`height${item.id}`} max={1000} min={1} />
                                <span className={"absolute top-1/2 -translate-y-1/2 right-2 text-xs font-bold text-neutral-500"}>cm</span>
                            </div>
                        </div>
                        <div className={"col-start-1 col-end-4"}>
                            <label className={"font-semibold text-sm"} htmlFor={`content${item.id}`}>Contenido</label>
                            <input value={content} onChange={e => setContent(e.target.value)} className={`${styles.input} ${checkFields ? handleCheckTextInput(content) ? styles.inputError : styles.inputCheck : ""}`} type="text" id={`content${item.id}`} />
                        </div>
                        <div className={"col-start-4 col-end-5"}>
                            <label className={"font-semibold text-sm"} htmlFor={`value${item.id}`}>Valor (€)</label>
                            <input value={value} onChange={e => setValue(e.target.value)} className={`${styles.input} ${checkFields ? handleCheckNumberInput(value) ? styles.inputError : styles.inputCheck : ""}`} type="number" id={`value${item.id}`} min={1} />
                        </div>
                    </div>
                </div>
                <div className={"flex items-center gap-2"}>
                    <div className={"w-fit"}>
                        <label className={"text-primary cursor-pointer"} htmlFor={`file${item.id}`}>Adjuntar imágen</label>
                        <input onChange={e => setImagesInput(e.target.files)} multiple={true} className={"hidden"} type="file" name="" id={`file${item.id}`} />
                    </div>
                    {imagesInput.length ? (
                        <>
                            <div><i className="fa-solid fa-hyphen"></i></div>
                            <div className={""}>{imagesInput.length} imágenes adjuntas</div>
                        </>
                    ) : null}
                </div>
                <div>
                    <div className={"text-sm text-neutral-600"}>Precio estimado: <span className={"text-neutral-800 font-bold"}>{formatMoney(subTotal)}</span></div>
                    {[weight, length, width, height].includes("") && (<div className={"text-xs text-neutral-600"}>{"(Excluyendo dimensiones)"}</div>)}
                </div>
            </div>
            <Modal images={imagesInput} setImages={setImages} isOpen={isOpen} closeModal={closeModal} />
        </div>
    )
}

function ItemVehicle({ item, items, checkFields }) {

    // Price state
    const [ subTotal, setSubTotal ] = useState(PRICE_DEFAULT[item.type]); 
    // Item state
    const [ amount, setAmount ] = useState(item.amount || 1);
    const [ weight, setWeight ] = useState(item.weight || "");
    const [ length, setLength] = useState(item.length || "");
    const [ width, setWidth ] = useState(item.width || "");
    const [ height, setHeight ] = useState(item.height || "");
    const [ content, setContent ] = useState(item.content || "");
    const [ value, setValue ] = useState(item.value || "");
    const [ category, setCategory ] = useState(item.category || "");
    const [ images, setImages ] = useState([]);
    // Input file (images)
    const [ imagesInput, setImagesInput ] = useState([]);

    // Select state
    const [ showSelect, setShowSelect ] = useState(false);

    // Add remove amount
    const handleAddOne = () => {
        if(amount >= MAX_AMOUNT) return;

        setAmount(current => current + 1);
    }
    const handleRemoveOne = () => {
        if (amount == 1) return;

        setAmount(current => current - 1);
    }

    const handleRemoveItem = () => {
        const newItems = items.state.filter(filterItem => filterItem.id != item.id);
        items.setState(newItems);
    }

    const calculateSubTotal = (type) => {
        const weightTotal = Math.floor(weight / VEHICLE_PRICE.weight.each) * VEHICLE_PRICE.weight.price;
        const lengthTotal = Math.floor(length / VEHICLE_PRICE.length.each) * VEHICLE_PRICE.length.price;
        const widthTotal = Math.floor(width / VEHICLE_PRICE.width.each) * VEHICLE_PRICE.width.price;
        const heightTotal = Math.floor(height / VEHICLE_PRICE.height.each) * VEHICLE_PRICE.height.price;
        const total = PRICE_DEFAULT[type] + (weightTotal + lengthTotal + widthTotal + heightTotal);
        return total;
    }

    useEffect(() => {
        let ready = true;
        if ([content, value, category].includes("")) ready = false;
        if (content.length < 1) ready = false;
        if (Number(value) < 1) ready = false;
        const newState = items.state.map(mapItem => {
            if (mapItem.id == item.id) {
                return { ...mapItem, category, amount, weight, length, width, height, content, value, images, subTotal: calculateSubTotal(category || item.type), content, ready }
            }
            return mapItem;
        })
        items.setState(newState)
        setSubTotal(calculateSubTotal(category || item.type));
    }, [amount, weight, length, width, height, content, value, category, images]);

    const handleCheckNumberInput = (field) => {
        if (field < 1) {
            return field < 1;
        }

        return false;
    }

    const handleCheckTextInput = (textarea) => {
        if ([textarea].includes("")) {
            return [textarea].includes("");
        }
        if(textarea.length < 1) {
            return textarea.length < 1;
        }

        return false;
    }

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
                        <i className={"fa-solid fa-car"} />
                        <div className={"font-semibold text-sm"}>Vehiculo</div>
                    </div>
                    <div className={"flex items-center gap-2 text-sm"}>
                        <button onClick={handleRemoveOne} className={`${amount > 1 ? "text-black" : "text-neutral-500 cursor-default"}`}>
                            <i className="fa-solid fa-minus"></i>
                        </button>
                        <div className={"font-semibold w-4 text-center"}>{amount}</div>
                        <button onClick={handleAddOne} className={`${amount < MAX_AMOUNT ? "text-primary" : "text-neutral-500 cursor-default"}`}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
                <button onClick={handleRemoveItem} className={"text-sm text-neutral-700 hover:text-red-500 transition-colors"}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
            <div className={"flex flex-col gap-1 py-2 sm:py-5 px-2 sm:px-6 bg-white rounded-b-md"}>
                <div className={"flex flex-col gap-3"}>
                    <div className={"flex flex-col gap-1"}>
                        <div className={"font-semibold text-lg"}>Tipo de Vehiculo</div>
                        <div className={"grid grid-cols-1 sm:grid-cols-2 gap-5"}>
                            <div className={"relative"}>
                                <div onClick={() => setShowSelect(!showSelect)} className={`flex items-center justify-between cursor-pointer ${category ? "text-neutral-800" : "text-neutral-500"} transition-colors select-none bg-zinc-100 px-3 py-1 rounded-md text-base`}>
                                    <div className={`font-semibold`}>{category ? VEHICLES[category] : "Selecciona una opción"}</div>
                                    <i className="fa-solid fa-angle-down"></i>
                                </div>
                                {showSelect && (
                                    <div className={"absolute top-8 bg-white rounded-b-md shadow-md border overflow-hidden w-full border-t-transparent z-10"}>
                                        {Object.keys(VEHICLES).map(vehicle => (
                                            <div key={vehicle}
                                                onClick={() => {
                                                    setCategory(vehicle)
                                                    setShowSelect(false);
                                                }}
                                                className={"p-4 w-full hover:bg-neutral-100 transition-colors cursor-pointer text-sm"}>
                                                {VEHICLES[vehicle]}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <div className={"flex flex-col"}>
                            <div className={"font-semibold text-lg"}>¿Conoces las dimensiones?</div>
                            <p className={"text-neutral-600 text-sm"}>Si no conoces las dimensiones, simplemente haz click en siguiente.</p>
                        </div>
                        <div className={"grid grid-cols-4 gap-2"}>
                            <div>
                                <label className={"font-semibold text-sm"} htmlFor={`weight${item.id}`}>Peso</label>
                                <div className={"relative"}>
                                    <input value={weight} onChange={e => setWeight(e.target.value > UNITS_MAX.vehicle_weight ? UNITS_MAX.vehicle_weight : e.target.value)} className={`${styles.input}`} type="number" id={`weight${item.id}`} max={UNITS_MAX.vehicle_weight} min={1} />
                                    <span className={"absolute top-1/2 -translate-y-1/2 right-2 text-xs font-bold text-neutral-500"}>kg</span>
                                </div>
                            </div>
                            <div>
                                <label className={"font-semibold text-sm"} htmlFor={`length${item.id}`}>Largo</label>
                                <div className={"relative"}>
                                    <input value={length} onChange={e => setLength(e.target.value > UNITS_MAX.length ? UNITS_MAX.length : e.target.value)} className={`${styles.input}`} type="number" id={`length${item.id}`} max={1000} min={1} />
                                    <span className={"absolute top-1/2 -translate-y-1/2 right-2 text-xs font-bold text-neutral-500"}>cm</span>
                                </div>
                            </div>
                            <div>
                                <label className={"font-semibold text-sm"} htmlFor={`width${item.id}`}>Ancho</label>
                                <div className={"relative"}>
                                    <input value={width} onChange={e => setWidth(e.target.value > UNITS_MAX.width ? UNITS_MAX.width : e.target.value)} className={`${styles.input}`} type="number" id={`width${item.id}`} max={1000} min={1} />
                                    <span className={"absolute top-1/2 -translate-y-1/2 right-2 text-xs font-bold text-neutral-500"}>cm</span>
                                </div>
                            </div>
                            <div>
                                <label className={"font-semibold text-sm"} htmlFor={`height${item.id}`}>Alto</label>
                                <div className={"relative"}>
                                    <input value={height} onChange={e => setHeight(e.target.value > UNITS_MAX.height ? UNITS_MAX.height : e.target.value)} className={`${styles.input}`} type="number" id={`height${item.id}`} max={1000} min={1} />
                                    <span className={"absolute top-1/2 -translate-y-1/2 right-2 text-xs font-bold text-neutral-500"}>cm</span>
                                </div>
                            </div>
                            <div className={"col-start-1 col-end-4"}>
                                <label className={"font-semibold text-sm"} htmlFor={`content${item.id}`}>Modelo</label>
                                <input value={content} onChange={e => setContent(e.target.value)} className={`${styles.input} ${checkFields ? handleCheckTextInput(content) ? styles.inputError : styles.inputCheck : ""} resize-none`} type="text" id={`content${item.id}`} />
                            </div>
                            <div className={"col-start-4 col-end-5"}>
                                <label className={"font-semibold text-sm"} htmlFor={`value${item.id}`}>Valor (€)</label>
                                <input value={value} onChange={e => setValue(e.target.value)} className={`${styles.input} ${checkFields ? handleCheckNumberInput(value) ? styles.inputError : styles.inputCheck : ""}`} type="number" id={`value${item.id}`} min={1} />
                            </div>
                        </div>
                    </div>
                    <div className={"flex flex-col sm:flex-row sm:items-center sm:gap-2"}>
                        <div className={"w-fit"}>
                            <label className={"text-primary cursor-pointer"} htmlFor={`file${item.id}`}>Adjuntar imágen</label>
                            <input onChange={e => setImagesInput(e.target.files)} multiple={true} className={"hidden"} type="file" name="" id={`file${item.id}`} />
                        </div>
                        {imagesInput.length ? (
                            <>
                                <div className={"hidden sm:block"}><i className="fa-solid fa-hyphen"></i></div>
                                <div className={""}>{imagesInput.length} imágenes adjuntas</div>
                            </>
                        ) : null}
                    </div>
                    <div className={"text-sm text-neutral-600"}>Precio estimado: <span className={"text-neutral-800 font-bold"}>{formatMoney(subTotal)}</span></div>
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
            weight: "",
            length: "",
            width: "",
            height: "",
            content: "",
            value: "",
            amount: 1,
            subTotal: 0
        }));
    }

    return (
        <button onClick={handleAddItem} className={`flex items-center justify-center gap-2 w-full py-3 border border-dashed border-neutral-400 text-neutral-600 rounded-md hover:bg-white hover:border-transparent hover:shadow-md ${styles.item}`}>
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