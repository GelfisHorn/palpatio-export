import Link from "next/link";

export default function Footer() {
    return (
        <div className={"border-t py-6"} id={"contact"}>
            <div className={"flex items-center justify-center gap-4"}>
                <NavLink href={"#"} text={"Datenschutz"} />
                <NavLink href={"#"} text={"Impressum"} />
            </div>
        </div>
    )
}

function NavLink({ href, text }) {
    return (
        <Link className={"hover:text-primary transition-colors"} href={href}>{text}</Link>
    )
}