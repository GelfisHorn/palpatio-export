
// Nextjs
import Link from 'next/link'
// Styles
import styles from './Index.module.css'

export default function FeaturedFeatures() {
    return (
        <div className={`${styles.container} py-20 px-6 sm:px-20`}>
            <div className={"flex flex-col justify-center gap-16 h-full"}>
                <div className={"flex flex-col gap-2 text-center"}>
                    <div className={"uppercase font-bold sm:text-lg text-primary"}>Caracteristicas Destacadas</div>
                    <h2 className={"text-2xl sm:text-4xl font-bold"}>Nuestros servicios destacados</h2>
                </div>
                <div className={"grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4"}>
                    <Card
                        icon={"fa-regular fa-hand-holding-dollar"}
                        title={"Calidad y ahorro en cada envío"}
                        description={"Ofrecemos precios competitivos y transparentes para adaptarnos a tu presupuesto. No tienes que comprometer la calidad por el precio. Envía con nosotros y obtén la mejor relación calidad-precio en cada envío."}
                    />
                    <Card
                        icon={"fa-solid fa-user-headset"}
                        title={"Soporte al cliente excepcional"}
                        description={"Nuestro equipo de atención al cliente está disponible para resolver cualquier consulta o problema que puedas tener. Ya sea por teléfono, correo electrónico o chat en línea, nuestro amable personal está listo para brindarte la asistencia que necesites."}
                    />
                    <Card
                        icon={"fa-solid fa-box-circle-check"}
                        title={"Envío seguro"}
                        description={"Tu tranquilidad es nuestra prioridad. Ofrecemos un seguro de envío completo que cubre cualquier pérdida, robo o daño que pueda ocurrir durante el transporte. Envía con confianza sabiendo que tus paquetes están protegidos."}
                    />
                    <Card
                        icon={"fa-solid fa-ship"}
                        title={"Rastreo en tiempo real"}
                        description={"Con nuestro sistema de seguimiento en tiempo real, puedes estar al tanto de la ubicación exacta de tus paquetes durante todo el proceso de envío. Mantente informado y tranquilo mientras tus envíos están en movimiento."}
                    />
                </div>
                {/* <div className={"flex justify-center"}>
                    <Link href={"/order"} className={"border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors py-2 px-6 rounded-md"}>Quiero enviar</Link>
                </div> */}
            </div>
        </div>
    )
}

function Card({ icon, title, description }) {

    return (
        <div className={"flex flex-col gap-3 text-center shadow-md p-8 rounded-2xl"}>
            <div className={"flex justify-center"}>
                <div className={"grid place-content-center border-[.2rem] border-primary rounded-full w-14 sm:w-20 h-14 sm:h-20"}>
                    <i className={`${icon} text-2xl sm:text-4xl text-primary`}></i>
                </div>
            </div>
            <div className={"flex flex-col gap-2"}>
                <div className={"text-lg sm:text-xl uppercase font-semibold text-primary"}>{title}</div>
                <div>{description}</div>
            </div>
        </div>
    )
}