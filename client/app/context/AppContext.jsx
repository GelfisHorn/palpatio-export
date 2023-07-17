"use client"

import axios from "axios";
import { createContext,  useEffect,  useState } from "react";
const AppContext = createContext();

export function AppContextProvider({ children }) {

    const [ fetchingAuth, setFetchingAuth ] = useState(true);
    const [ auth, setAuth ] = useState({});

    useEffect(() => {
        getProfile();
    }, [])

    async function getProfile() {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            setFetchingAuth(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application-json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.post('/api/users/getProfile', { config });
            setAuth(data);
        } catch (error) {
            setAuth({});
            localStorage.removeItem("auth-token");
        } finally {
            setFetchingAuth(false);
        }
    }

    // Order form state
    const [ order, setOrder ] = useState({
        from: "",
        category: "",
        items: [],
        shipping: {
            from: {
                fullName: "",
                street: "",
                zipCode: "",
                city: "",
                phoneNumber: "",
                email: ""
            },
            to: {
                fullName: "",
                street: "",
                zipCode: "",
                city: "",
                phoneNumber: "",
                email: "",
                ci: ""
            },
            note: ""
        },
        total: 0
    })

    const [ step, setStep ] = useState(1);

    const handleNextStep = () => {
        if(step == 4) return;

        setStep(step + 1);
    }

    const handlePrevStep = () => {
        if (step == 1) return;

        setStep(step - 1);
    }

    return (
        <AppContext.Provider value={{
            fetchingAuth,
            auth,
            setAuth,
            order, 
            setOrder,
            step,
            handleNextStep,
            handlePrevStep
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;