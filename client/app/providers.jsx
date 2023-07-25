'use client';

import { AppContextProvider } from "@/app/context/AppContext";

export function Providers({ children }) {
    return (
        <AppContextProvider>{children}</AppContextProvider>
    );
}