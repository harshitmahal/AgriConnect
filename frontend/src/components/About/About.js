import React from "react";
import "./About.css";
import Navigator from "../Navigator/Navigator"

function About() {
  return (
    <>
    <Navigator/>
    <div className="about-container">
      <div className="about-hero">
        <h1>About AgriConnect</h1>
        <p>Empowering farmers with real-time insights, fair trade, and digital access.</p>
      </div>

      <div className="about-content">
        <section>
          <h2>Who We Are</h2>
          <p>
            AgriConnect is a web-based platform designed to provide rural farmers with 
            <strong> real-time market prices</strong> and <strong>agricultural insights </strong> 
            while ensuring scalability, security, and reliability through 
            <strong> AWS Cloud services</strong>. 
          </p>
        </section>

        <section>
          <h2>Why We Exist</h2>
          <p>
            Farmers often face challenges such as <strong>price manipulation</strong>, 
            <strong> limited market access</strong>, and <strong>unreliable information</strong>, 
            which directly affect their profitability. AgriConnect was created to 
            solve these issues by delivering a <strong>cloud-powered, user-friendly application</strong> 
            where farmers can access <strong>live commodity prices</strong>, 
            <strong> weather forecasts</strong>, and <strong>expert insights</strong>.
          </p>
        </section>

        <section>
          <h2>What We Offer</h2>
          <ul>
            <li>📊 Live commodity prices with transparent updates</li>
            <li>🌦️ Weather forecasts to plan farming activities</li>
            <li>💡 Expert agricultural insights</li>
            <li>🤝 Direct farmer-to-buyer transactions (no middlemen)</li>
            <li>💳 Secure & transparent payment gateways</li>
          </ul>
        </section>

        <section>
          <h2>Our Mission</h2>
          <p>
            AgriConnect revolutionizes rural agriculture by bridging the 
            <strong> digital divide</strong>, empowering farmers with real-time insights, 
            and fostering a <strong>transparent, efficient, and profitable ecosystem</strong>.
          </p>
        </section>
      </div>
    </div>
    </>
    
  );
}

export default About;
