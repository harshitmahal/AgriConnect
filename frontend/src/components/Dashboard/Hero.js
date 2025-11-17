import React from 'react';
import './dashboard.css'
import Navigator from '../Navigator/Navigator';
import CTA from './CTA';
import WeatherSeason from '../Seasonal/WeatherSeason';


function Hero() {
    


    return (
        <>
            <Navigator />
            <section className="bg-green-100 home-container">
                <img className='img-home' src={require("../../utils/farming.jpg")} />
                {/* <WeatherSeason/> */}
                <div className='text-container'>
                    <h2 className="text-4xl font-bold mb-4 z-3">Fresh Produce. Direct from Farm to Table.</h2>
                    <p className="text-lg mb-6 max-w-2xl mx-auto">
                        Empowering farmers to sell fruits and vegetables directly to consumers with no middlemen. Fair prices, fresh food.
                    </p>
                </div> 
                <CTA />
                
            </section>
        </>

    );
}

export default Hero;
