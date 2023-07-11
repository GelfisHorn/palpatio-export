"use client"

import { createContext,  useState } from "react";
const AppContext = createContext();

export function AppContextProvider({ children }) {

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