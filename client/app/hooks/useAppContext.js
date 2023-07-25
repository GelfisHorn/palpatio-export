// React
import { useContext } from "react"
// Context
import AppContext from "@/app/context/AppContext"

export default function useAppContext() {
    return useContext(AppContext);
}