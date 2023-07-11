import Navbar from "./Navbar";

export default function Layout({ children, styles }) {
    return (
        <main>
            <Navbar styles={styles?.navbar} />
            {children}
        </main>
    )   
}