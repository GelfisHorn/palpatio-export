
// Styles
import styles from './Index.module.css'

export default function Process() {
    return (
        <div className={`${styles.container} py-20 px-6 sm:px-20`}>
            <div className={"flex flex-col justify-center items-center gap-16 h-full"}>
                <div className={"flex flex-col gap-2 text-center"}>
                    <div className={"uppercase font-bold sm:text-lg text-primary"}>Proceso</div>
                    <h2 className={"text-2xl sm:text-4xl font-bold"}>Nuestro proceso de envío</h2>
                </div>
                <div className={"grid grid-cols-1 divide-y w-full lg:w-2/3"}>
                    <Card
                        side={"left"}
                        icon={"fa-solid fa-box"}
                        number={1}
                        title={"Solicitud del pedido"}
                        description={"Durante esta etapa, recibimos la solicitud de compra del cliente, donde recopilamos todos los detalles necesarios, como productos, cantidades y dirección de envío. Nuestro objetivo es garantizar una comunicación clara y precisa con el cliente para entender sus necesidades y asegurar una experiencia de compra satisfactoria."}
                    />
                    <Card
                        side={"right"}
                        icon={"fa-solid fa-truck-fast"}
                        number={2}
                        title={"Recoger el pedido"}
                        description={"Una vez que hemos recibido la solicitud del pedido, procedemos a reunir todos los productos requeridos en nuestro almacén. Nuestro equipo de logística se encarga de localizar y seleccionar los artículos con cuidado, verificando su calidad y asegurando que se encuentren en óptimas condiciones para el envío."}
                    />
                    <Card
                        side={"left"}
                        icon={"fa-solid fa-ship"}
                        number={3}
                        title={"Envío"}
                        description={"En esta etapa, preparamos el paquete de envío de manera segura y eficiente. Empaquetamos los productos de forma adecuada, utilizando materiales resistentes y protegiendo los artículos frágiles. Además, generamos la documentación necesaria, como etiquetas de envío y facturas, para garantizar un proceso de envío sin contratiempos."}
                    />
                    <Card
                        side={"right"}
                        icon={"fa-solid fa-hand-holding-box"}
                        number={4}
                        title={"Entrega"}
                        description={"Una vez que el paquete ha sido preparado para su envío, lo entregamos al servicio de mensajería o empresa de transporte seleccionada. Nos aseguramos de colaborar con proveedores confiables y eficientes que garanticen la entrega puntual y segura de los productos al destino indicado por el cliente. Mantenemos una comunicación constante con el cliente para proporcionar información actualizada sobre el estado de entrega y resolver cualquier duda o incidencia que pueda surgir."}
                    />
                </div>
            </div>
        </div>
    )
}

function Card({ side, icon, number, title, description }) {

    return (
        <div className={`flex items-center gap-4 md:gap-8 ${side == 'left' ? "flex-col sm:flex-row text-center sm:text-left" : "flex-col sm:flex-row-reverse text-center sm:text-right"} py-6 sm:py-10`}>
            <div className={`grid place-content-center min-w-[4rem] md:min-w-[6rem] h-16 md:h-24 rounded-full border-2 md:border-[.2rem] border-primary text-primary`}>
                <i className={`${icon} text-3xl md:text-5xl`}></i>
            </div>
            <div className={"w-auto"}>
                <div className={"md:text-xl uppercase font-bold"}>{title}</div>
                <div className={"text-sm md:text-base"}>{description}</div>
            </div>
        </div>
    )
}