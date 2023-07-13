export default function DashboardSidebar() {
    return (
        <div className={"flex flex-col gap-6 w-72 h-screen overflow-y-scroll hide-scrollbar py-6 border-r"}>
            <div className={"flex items-center h-12 px-6"}>
                <div className={"text-xl"}>Pal Patio Export</div>
            </div>
            <div className={"flex flex-col justify-between h-full"}>
                <div className={"flex flex-col gap-2"}>
                    <Item icon="fa-regular fa-box-archive" active={true}>Ordenes</Item>
                </div>
                <div className={"flex flex-col gap-2"}>
                    <Item icon="fa-regular fa-user">Mi cuenta</Item>
                    <Item icon="fa-regular fa-arrow-left-from-line">Cerrar sesión</Item>
                </div>
            </div>
        </div>
    )
}

function Item({ active, icon, children }) {
    return (
        <div className={`flex items-center hover:text-primary transition-colors hover:bg-neutral-100 cursor-pointer h-11`}>
            <div className={`w-1 h-full rounded-r-md ${active ? "bg-primary" : null} transition-colors`}></div>
            <div className={`flex items-center gap-4 ${active ? "text-primary" : null} pl-5 pr-6`}>
                <div><i className={`${icon} text-lg`}></i></div>
                <div className={"font-medium"}>{children}</div>
            </div>
        </div>
    )
}