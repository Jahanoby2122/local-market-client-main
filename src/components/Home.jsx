import React, { Suspense } from 'react';
import Banner from './Banner';
import ProductSection from '../Pages/ProductSection';
import AdvertiseMentSection from '../Pages/AdvertiseMentSection';
import DealBanner from '../Pages/DealBanner';
import TestimonialCarousel from '../Pages/TestimonialCarousel';
import LoadingPages from '../Pages/LoadingPages';
import FeaturesSection from '../Pages/FeaturesSection';
import useScrollToTop from '../Hooks/useScrollToTop';

const Home = () => {
    useScrollToTop();
    return (
        <div>
           <Suspense fallback={<LoadingPages></LoadingPages>}>
             <Banner></Banner>
            <ProductSection></ProductSection>
            <AdvertiseMentSection></AdvertiseMentSection>
            <FeaturesSection></FeaturesSection>
            <TestimonialCarousel></TestimonialCarousel>
            
           </Suspense>
            
        </div>
    );
};

export default Home;