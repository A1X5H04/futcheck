import { Outlet, useLocation, useNavigation } from 'react-router'
import Footer from '../components/common/Footer'
import GoogleAnalytics from '../GoogleAnalytics'
import { Helmet } from 'react-helmet'
import Header from '../components/layout/header'
import OverlayLoader from '@/components/common/overlay-loader'

function RootLayout() {
    const navigation = useNavigation();
    const isNavigating = !!navigation.location;

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Discover the latest EAFC 25 players along with their up-to-date stats and prices on our website"
                />
            </Helmet>
            <Header />
            {isNavigating && <OverlayLoader />}
            <main className='container mx-auto px-6 pt-16'>
                <Outlet />
            </main>
            <GoogleAnalytics />
            <Footer />
        </>
    )
}

export default RootLayout