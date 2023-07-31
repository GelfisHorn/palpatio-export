import Link from "next/link";

const PHONE_NUMBER = "+49 1525 3409644"

export default function ContactButton({ mobileMode }) {
    return (
        mobileMode ? (
            <Link href={`tel:${PHONE_NUMBER}`} className={"flex items-center gap-2 px-2 py-2 bg-primary text-white rounded-md"}>
                <i className="fa-solid fa-phone"></i>
            </Link>
        ) : (
            <Link href = {`tel:${PHONE_NUMBER}`} className = { "flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-md"} >
                <i className="fa-solid fa-phone"></i>
                <div>{PHONE_NUMBER}</div>
            </Link >
        )
    )
}