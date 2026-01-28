import React from 'react';
import Lottie from 'lottie-react';  // <-- Import Lottie component
import imgData from '../assets/Farmers.json';

const MyLottee = () => {
    return (
        <div>
            <Lottie animationData={imgData} loop={true} />
        </div>
    );
};

export default MyLottee;
