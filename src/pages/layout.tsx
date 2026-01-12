import { Outlet } from 'react-router'
import Navbar from '../components/common/Header'
import Footer from '../components/common/Footer'
import GoogleAnalytics from '../GoogleAnalytics'
import { Helmet } from 'react-helmet'

function RootLayout() {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Discover the latest EAFC 25 players along with their up-to-date stats and prices on our website"
                />
            </Helmet>
            <Navbar />
            <Outlet />
            <GoogleAnalytics />
            <Footer />
        </>
    )
}

export default RootLayout