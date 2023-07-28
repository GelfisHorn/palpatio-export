"use client"

// Nextjs
import Link from "next/link";
// Hooks
import useAppContext from '@/app/hooks/useAppContext'
// Locales
import locales from '@/app/langs/footer';

export default function Footer() {

    const { lang } = useAppContext();

    return (
        <div className={"flex items-center justify-center border-t h-20"} id={"contact"}>
            <div className={"flex items-center justify-center gap-4"}>
                <NavLink href={"#"} text={locales[lang].datenschutz} />
                <NavLink href={"#"} text={locales[lang].impressum} />
            </div>
        </div>
    )
}

function NavLink({ href, text }) {
    return (
        <Link className={"hover:text-primary transition-colors"} href={href}>{text}</Link>
    )
}