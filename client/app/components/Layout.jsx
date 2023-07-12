import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children, styles }) {
    return (
        <main>
            <Navbar styles={styles?.navbar} />
            {children}
            <Footer />
        </main>
    )   
}