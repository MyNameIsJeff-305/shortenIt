import React from 'react';
import './Splash.css';

const Splash = () => {
    return (
        <div className="splash-page">
            <header className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1>Shorten, Track, and Share Effortlessly</h1>
                    <p>Transform long URLs into manageable links and track their performance with ease. Simple, fast, and reliable.</p>
                    <button className="cta-button">Start Shortening</button>
                </div>
            </header>
            <section className="bento-features-section">
                <div className="feature feature-1">
                    <h2>Instant Shortening</h2>
                    <p>Get your shortened link instantly and start sharing with one click.</p>
                </div>
                <div className="feature feature-3">
                    <h2>Get Your Short Links with You</h2>
                    <p>Generate QR Codes for your shortened links and make them more accessible to people.</p>
                </div>
                <div className="feature feature-2">
                    <h2>Powerful Insights</h2>
                    <p>Track clicks, user locations, and more to gain insights into your audience.</p>
                </div>
            </section>
        </div>
    );
};

export default Splash;
