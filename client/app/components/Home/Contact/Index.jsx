export default function Contact() {
    return (
        <div className={`${styles.container} py-20 px-6 sm:px-20`}>
            <div className={"flex flex-col justify-center gap-16 h-full"}>
                <div className={"flex flex-col gap-2 text-center"}>
                    <div className={"uppercase font-bold sm:text-lg text-primary"}>Contacto</div>
                    <h2 className={"text-2xl sm:text-4xl font-bold"}>Nuestros servicios destacados</h2>
                </div>
            </div>
        </div>
    )
}