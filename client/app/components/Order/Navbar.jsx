import Link from "next/link";

export default function OrderNavbar({ step }) {
    return (
        <div className={`relative flex items-center justify-between px-8 text-sm 2xl:text-base h-16 shadow-md`}>
            <div className={"flex items-center gap-3 cursor-default"}>
                <div className={`flex items-center gap-1 ${step == 1 ? "text-neutral-900 underline" : step > 1 ? "text-primary" : "text-neutral-400"} font-medium`}>
                    {step > 1 && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                    <span>Qué enviar</span>
                </div>
                <Arrow />
                <div className={`flex items-center gap-1 ${step == 2 ? "text-neutral-900 underline" : step > 2 ? "text-primary" : "text-neutral-400"} font-medium`}>
                    {step > 2 && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                    <span>Detalles del pedido</span>
                </div>
                <Arrow />
                <div className={`flex items-center gap-1 ${step == 3 ? "text-neutral-900 underline" : step > 3 ? "text-primary" : "text-neutral-400"} font-medium`}>
                    {step > 3 && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                    <span>Detalles de envío</span>
                </div>
            </div>
            {/* <div>
                <button className={"text-base 2xl:text-lg"}>Iniciar sesión</button>
            </div> */}
        </div>
    )
}

function Arrow() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 2xl:w-4 h-3 2xl:h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
    )
}