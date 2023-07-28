import axios from "axios";
import { createContext,  useEffect,  useState } from "react";
const AppContext = createContext();

export function AppContextProvider({ children }) {

    // Language
    const [ lang, setLang ] = useState(localStorage.getItem('lang') || 'es');
    const handleSetLang = (newLang) => {
        if(newLang == lang) {
            return;
        }
        setLang(newLang)
        localStorage.setItem('lang', newLang);
    };

    const [ fetchingAuth, setFetchingAuth ] = useState(true);
    const [ auth, setAuth ] = useState({});

    useEffect(() => {
        // Get auth
        if(Object.keys(auth).length != 0) {
            return;
        }
        getProfile();
    }, [])

    async function getProfile() {
        if (Object.keys(auth).length != 0) {
            return;
        }

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

    // Order step
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
            lang,
            handleSetLang,
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