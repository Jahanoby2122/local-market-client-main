import React, { Suspense } from 'react';
import NavBar from '../components/NavBar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import LoadingPages from '../Pages/LoadingPages';

const MainLayout = () => {
    const location = useLocation();
    const isDashboard = location.pathname.startsWith('/dashbord');
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
    const shouldHideHeaderFooter = isDashboard || isAuthPage;

    return (
        <div className='min-h-screen flex flex-col'>
            {!shouldHideHeaderFooter && <NavBar></NavBar>}
            <div className='flex-grow'>
               <Suspense fallback={<LoadingPages></LoadingPages>}>
                 <Outlet></Outlet>
               </Suspense>
            </div>
            {!shouldHideHeaderFooter && <Footer></Footer>}
        </div>
    );
};

export default MainLayout;