// React
import { useContext } from "react"
// Context
import AppContext from "../context/AppContext"

export default function useAppContext() {
    return useContext(AppContext);
}