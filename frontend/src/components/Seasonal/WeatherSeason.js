import React, { useEffect, useState } from "react";
import "./WeatherSeason.css";

const seasonalCrops = {
    Winter: [
        // Vegetables
        "Carrot",
        "Spinach",
        "Beetroot",
        "Cabbage",
        "Cauliflower",
        "Radish",
        "Peas",
        "Onion",
        "Garlic",
        // Fruits
        "Apple" // mainly hill states: Himachal, Uttarakhand
    ],
    Spring: [
        // Vegetables
        "Tomato",
        "Cucumber",
        "Pumpkin",
        "Bottle Gourd",
        "Ridge Gourd",
        "Spinach",
        // Fruits
        "Papaya",
        "Strawberry" // limited areas
    ],
    Summer: [
        // Vegetables
        "Okra (Bhindi)",
        "Brinjal (Eggplant)",
        "Bitter Gourd",
        "Cucumber",
        "Watermelon",
        "Muskmelon",
        // Fruits
        "Mango",
        "Melon"
    ],
    Autumn: [
        // Vegetables
        "Wheat (as fodder / greens)",
        "Onion",
        "Potato",
        "Cauliflower",
        "Cabbage",
        // Fruits
        "Jamun (Black Plum)",
        "Guava"
    ]
};


function getCurrentSeasonIndia() {
    const month = new Date().getMonth() + 1;
    if ([11, 12, 1, 2].includes(month)) return "Winter";
    if ([3, 4, 5].includes(month)) return "Spring";
    if ([6, 7, 8].includes(month)) return "Summer";
    if ([9, 10].includes(month)) return "Autumn";
}

const WeatherSeason = () => {
    const [weather, setWeather] = useState(null);
    const [season, setSeason] = useState("");
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_KEY = "64ddc6bbe663fe6239a077a58377459d"; // Replace with your API key

    const fetchWeather = async (lat, lon) => {
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            );
            const data = await res.json();
            setWeather({
                temp: data.main.temp,
                description: data.weather[0].description
            });
        } catch (err) {
            console.error("Error fetching weather:", err);
        }
    };

    useEffect(() => {
        const seasonName = getCurrentSeasonIndia();
        setSeason(seasonName);
        setCrops(seasonalCrops[seasonName]);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeather(latitude, longitude).finally(() => setLoading(false));
                },
                () => {
                    fetchWeather(28.7041, 77.1025).finally(() => setLoading(false));
                }
            );
        } else {
            fetchWeather(28.7041, 77.1025).finally(() => setLoading(false));
        }
    }, []);

    if (loading)
        return <p className="weather-loading">Loading weather and season info...</p>;

    return (
        <div className="weather-wide-card">
            <div className="weather-overlay">
                <h1 className="weather-title">🌦 Live Weather Updates</h1>

                <div className="weather-section">
                    <h2>
                        Current Season: <span className="season-name">{season}</span>
                    </h2>
                    <h3>Seasonal Produce:</h3>
                    <ul className="crop-list">
                        {crops.map((crop) => (
                            <li key={crop}>{crop}</li>
                        ))}
                    </ul>
                </div>

                {weather && (
                    <div className="weather-section">
                        <h3>Current Weather:</h3>
                        <p>🌡 Temperature: <strong>{weather.temp} °C</strong></p>
                        <p>☁ Condition: <strong>{weather.description}</strong></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherSeason;
