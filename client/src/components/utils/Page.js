import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Page({ children }) {
    const { pathname } = useLocation()

    return (
        <>
            {pathname !== '/login' && pathname !== '/register' && <Header />}
            <main style={{ minHeight: "80vh", display: 'flex', background: 'linear-gradient(to bottom, #85D8CE,#085078)' }}>
                {children}
            </main>
            { pathname !== '/login' && pathname !== '/register' && < Footer />}
        </>
    )
}
