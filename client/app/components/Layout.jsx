import Footer from "./Footer";
import Navbar from "./Navbar";
import WhatsAppButton from "./WhatsAppButton/Index";

export default function Layout({ children, styles }) {
    return (
        <main>
            <Navbar styles={styles?.navbar} />
            {children}
            <Footer />
            <WhatsAppButton />
        </main>
    )   
}