import { Outlet } from "react-router-dom";
const Layout = () => {
    return (
        <div>
            <header>
                <h1>My Application</h1>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <p>© 2024 My Application</p>
            </footer>
        </div>
    )
}
export default Layout;