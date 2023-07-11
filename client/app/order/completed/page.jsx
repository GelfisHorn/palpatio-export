"use client"

// Nextjs
import Link from "next/link";
// Components
import OrderLayout from "@/app/components/Order/Layout/Index";

export default function OrderShipping() {


    return (
        <OrderLayout step={4} showSidebar={false}>
            <div className={"flex flex-col gap-8 w-full px-3 sm:px-8 h-full"}>
                <div className={"grid place-content-center h-full"}>
                    <div className={"flex flex-col gap-6 bg-white shadow-md p-10 rounded-xl text-center"}>
                        <div className={"text-5xl text-primary"}><i className="fa-thin fa-circle-check"></i></div>
                        <div className={"flex flex-col gap-2"}>
                            <h2 className={"text-2xl font-bold uppercase"}>¡Gracias por tu orden!</h2>
                            <p>Nos pondremos en contacto contigo lo antes posible!</p>
                        </div>
                        <Link href="/" className={"flex items-center justify-center gap-2 text-primary hover:text-white border border-primary hover:bg-primary transition-colors py-2 rounded-md font-semibold"}>Volver a Inicio</Link>
                    </div>
                </div>
            </div>
        </OrderLayout>
    )
}