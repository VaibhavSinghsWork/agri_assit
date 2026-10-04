import { Link } from "react-router-dom";

import "./Home.css";

function Home() {
  return (
    <div className="home-page">

      {/* ================= HERO ================= */}
      <section className="farm-hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <div className="hero-badge">
            🌾 AGRI ASSIST · AGRICULTURE INFORMATION
          </div>

          <h1>
            Better Information.
            <span>Better Farming.</span>
          </h1>

          <p>
            Agri Assist brings useful agricultural information together
            in one simple platform — from soil and fertilizers to
            mandi prices and irrigation techniques.
          </p>

          <div className="hero-buttons">
            <Link to="/fertilizer" className="hero-btn primary-btn">
              Explore Fertilizer & Soil →
            </Link>

            <Link to="/mandi-prices" className="hero-btn secondary-btn">
              Check Mandi Prices
            </Link>
          </div>

          <div className="hero-trust">
            <div>
              <strong>01</strong>
              <span>Soil & Fertilizers</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Market Information</span>
            </div>

            <div>
              <strong>03</strong>
              <span>Irrigation Methods</span>
            </div>
          </div>
        </div>

        <div className="hero-bottom-label">
          AGRICULTURE • INFORMATION • TECHNOLOGY
        </div>
      </section>


      {/* ================= INTRO STRIP ================= */}
      <section className="intro-strip">

        <div className="intro-item">
          <span>🌱</span>

          <div>
            <strong>Know Your Soil</strong>
            <p>
              Understand NPK and the importance of soil testing.
            </p>
          </div>
        </div>

        <div className="intro-item">
          <span>📊</span>

          <div>
            <strong>Know Your Market</strong>
            <p>
              Access useful mandi price information.
            </p>
          </div>
        </div>

        <div className="intro-item">
          <span>💧</span>

          <div>
            <strong>Manage Water</strong>
            <p>
              Learn about different irrigation techniques.
            </p>
          </div>
        </div>

      </section>


      {/* ================= WHY AGRI ASSIST ================= */}
      <section className="problem-section">

        <div className="section-container">

          <div className="section-heading">

            <span className="section-label">
              WHY AGRI ASSIST?
            </span>

            <h2>
              Agriculture information
              <span> made simpler.</span>
            </h2>

            <p>
              Farming involves many decisions. Understanding soil,
              fertilizers, market prices and irrigation methods can
              help farmers make more informed choices.
            </p>

          </div>


          <div className="problem-grid">

            <div className="problem-card">

              <div className="problem-number">
                01
              </div>

              <h3>
                Understand Soil & NPK
              </h3>

              <p>
                Learn about nitrogen, phosphorus and potassium,
                soil testing and why soil information matters
                for agriculture.
              </p>

            </div>


            <div className="problem-card">

              <div className="problem-number">
                02
              </div>

              <h3>
                Understand Fertilizers
              </h3>

              <p>
                Explore information about fertilizers, government
                fertilizer brands and organic alternatives.
              </p>

            </div>


            <div className="problem-card">

              <div className="problem-number">
                03
              </div>

              <h3>
                Understand Farming Practices
              </h3>

              <p>
                Learn about irrigation methods and real-world
                examples of sustainable agriculture.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= MAIN SOLUTIONS ================= */}
      <section className="solutions-section">

        <div className="section-container">

          <div className="section-heading center-heading">

            <span className="section-label">
              EXPLORE AGRI ASSIST
            </span>

            <h2>
              Information for
              <span> better farming.</span>
            </h2>

            <p>
              Explore the major sections of Agri Assist and learn
              about important aspects of modern agriculture.
            </p>

          </div>


          <div className="solutions-grid">

            {/* FERTILIZER */}
            <div className="solution-card fertilizer-bg">

              <div className="solution-icon">
                🌱
              </div>

              <div className="solution-number">
                01
              </div>

              <h3>
                Fertilizer & Soil
              </h3>

              <p>
                Learn about NPK nutrients, soil testing, fertilizers,
                government fertilizer brands and organic fertilizers.
              </p>

              <div className="solution-topics">
                <span>NPK</span>
                <span>Soil Testing</span>
                <span>Organic</span>
              </div>

              <Link
                to="/fertilizer"
                className="solution-link"
              >
                Explore Fertilizer & Soil →
              </Link>

            </div>


            {/* MANDI */}
            <div className="solution-card mandi-bg">

              <div className="solution-icon">
                📈
              </div>

              <div className="solution-number">
                02
              </div>

              <h3>
                Mandi Prices
              </h3>

              <p>
                Access agricultural market-price information and
                understand the prices available for different
                commodities.
              </p>

              <div className="solution-topics">
                <span>Markets</span>
                <span>Commodities</span>
                <span>Prices</span>
              </div>

              <Link
                to="/mandi-prices"
                className="solution-link"
              >
                Explore Mandi Prices →
              </Link>

            </div>


            {/* IRRIGATION */}
            <div className="solution-card irrigation-bg">

              <div className="solution-icon">
                💧
              </div>

              <div className="solution-number">
                03
              </div>

              <h3>
                Irrigation
              </h3>

              <p>
                Explore different irrigation techniques and learn
                how appropriate water management can support
                agricultural productivity.
              </p>

              <div className="solution-topics">
                <span>Methods</span>
                <span>Water</span>
                <span>Efficiency</span>
              </div>

              <Link
                to="/irrigation"
                className="solution-link"
              >
                Explore Irrigation →
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FERTILIZER & SOIL ================= */}
      <section className="fertilizer-info-section">

        <div className="section-container fertilizer-layout">

          <div className="fertilizer-info-content">

            <span className="section-label">
              SOIL & FERTILIZERS
            </span>

            <h2>
              Start with the
              <span> foundation of farming.</span>
            </h2>

            <p>
              Healthy soil is an important foundation of agricultural
              production. Understanding soil nutrients and fertilizer
              use can help farmers better understand their crops'
              nutritional requirements.
            </p>

            <div className="fertilizer-points">

              <div>
                <span>01</span>
                <div>
                  <strong>NPK</strong>
                  <p>
                    Understand the role of nitrogen, phosphorus
                    and potassium.
                  </p>
                </div>
              </div>

              <div>
                <span>02</span>
                <div>
                  <strong>Soil Testing</strong>
                  <p>
                    Learn why testing soil can provide useful
                    information about its nutrient status.
                  </p>
                </div>
              </div>

              <div>
                <span>03</span>
                <div>
                  <strong>Fertilizers</strong>
                  <p>
                    Explore different fertilizer information and
                    government fertilizer brands.
                  </p>
                </div>
              </div>

              <div>
                <span>04</span>
                <div>
                  <strong>Organic Farming</strong>
                  <p>
                    Learn about organic fertilizers and
                    Sikkim's organic farming journey.
                  </p>
                </div>
              </div>

            </div>

            <Link
              to="/fertilizer"
              className="dark-btn"
            >
              Explore Fertilizer & Soil →
            </Link>

          </div>


          <div className="npk-visual">

            <div className="npk-card">

              <div className="npk-header">
                <span>SOIL NUTRIENTS</span>
                <span> N • P • K </span>
              </div>

              <div className="npk-items">

                <div className="npk-item">
                  <div className="npk-circle">
                    N
                  </div>

                  <div>
                    <strong>Nitrogen</strong>
                    <span>Plant growth</span>
                  </div>
                </div>


                <div className="npk-item">
                  <div className="npk-circle">
                    P
                  </div>

                  <div>
                    <strong>Phosphorus</strong>
                    <span>Root development</span>
                  </div>
                </div>


                <div className="npk-item">
                  <div className="npk-circle">
                    K
                  </div>

                  <div>
                    <strong>Potassium</strong>
                    <span>Plant health</span>
                  </div>
                </div>

              </div>

              <div className="npk-footer">
                Soil knowledge → Better understanding
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= SIKKIM STORY ================= */}
      <section className="sikkim-section">

        <div className="section-container">

          <div className="sikkim-card">

            <div className="sikkim-number">
              REAL-WORLD EXAMPLE
            </div>

            <div className="sikkim-content">

              <span className="section-label">
                SIKKIM'S ORGANIC STORY
              </span>

              <h2>
                A state that
                <span> chose organic farming.</span>
              </h2>

              <p>
                Sikkim became India's first fully organic state
                in 2016. Its journey provides an important
                real-world example of a large-scale transition
                towards organic agriculture.
              </p>

              <p>
                Explore the story, the organic farming approach
                and the lessons that can be understood from
                Sikkim's agricultural transformation.
              </p>

              <Link
                to="/fertilizer"
                className="sikkim-link"
              >
                Explore the Sikkim Story →
              </Link>

            </div>

            <div className="sikkim-stat">

              <strong>
                2016
              </strong>

              <span>
                India's first fully
                organic state
              </span>

              <small>
                Sikkim
              </small>

            </div>

          </div>

        </div>

      </section>


      {/* ================= MARKET ================= */}
      <section className="market-section">

        <div className="section-container market-layout">

          <div className="market-content">

            <span className="section-label">
              MARKET INFORMATION
            </span>

            <h2>
              Know the market
              <span> before you decide.</span>
            </h2>

            <p>
              Agricultural markets are an important part of the
              farming system. Agri Assist provides a simple way
              to explore available mandi price information.
            </p>

            <div className="market-points">

              <div>
                <span>✓</span>
                <p>
                  Search agricultural commodities
                </p>
              </div>

              <div>
                <span>✓</span>
                <p>
                  Explore available mandi prices
                </p>
              </div>

              <div>
                <span>✓</span>
                <p>
                  Understand market information
                </p>
              </div>

            </div>

            <Link
              to="/mandi-prices"
              className="dark-btn"
            >
              Explore Mandi Prices →
            </Link>

          </div>


          <div className="market-visual">

            <div className="market-box">

              <div className="market-box-top">
                <span>
                  AGRICULTURAL MARKET
                </span>

                <span className="market-indicator">
                  ● MARKET
                </span>
              </div>

              <div className="market-chart">

                <div className="chart-line"></div>

                <div className="chart-point point-one"></div>
                <div className="chart-point point-two"></div>
                <div className="chart-point point-three"></div>
                <div className="chart-point point-four"></div>

              </div>

              <div className="market-box-bottom">

                <strong>
                  Mandi Prices
                </strong>

                <span>
                  Agricultural market information
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= IRRIGATION ================= */}
      <section className="irrigation-info-section">

        <div className="section-container">

          <div className="section-heading center-heading">

            <span className="section-label">
              WATER MANAGEMENT
            </span>

            <h2>
              Every drop
              <span> matters.</span>
            </h2>

            <p>
              Different crops, soils and farming conditions can
              require different approaches to irrigation.
            </p>

          </div>


          <div className="irrigation-preview-grid">

            <div className="irrigation-preview-card">

              <div className="preview-icon">
                💧
              </div>

              <h3>
                Drip Irrigation
              </h3>

              <p>
                Water is delivered close to the plant root zone.
              </p>

            </div>


            <div className="irrigation-preview-card">

              <div className="preview-icon">
                🌧️
              </div>

              <h3>
                Sprinkler Irrigation
              </h3>

              <p>
                Water is distributed over crops in the form of
                droplets.
              </p>

            </div>


            <div className="irrigation-preview-card">

              <div className="preview-icon">
                🌾
              </div>

              <h3>
                Traditional Methods
              </h3>

              <p>
                Explore traditional approaches alongside
                modern irrigation techniques.
              </p>

            </div>

          </div>


          <div className="irrigation-button">
            <Link
              to="/irrigation"
              className="dark-btn"
            >
              Explore Irrigation Methods →
            </Link>
          </div>

        </div>

      </section>


      {/* ================= ABOUT ================= */}
      <section className="about-section">

        <div className="section-container about-layout">

          <div className="about-image">

            <div className="about-image-overlay">

              <span>
                AGRI ASSIST
              </span>

              <strong>
                Technology for Agriculture
              </strong>

            </div>

          </div>


          <div className="about-content">

            <span className="section-label">
              ABOUT AGRI ASSIST
            </span>

            <h2>
              Connecting
              <span> information with farming.</span>
            </h2>

            <p>
              Agriculture involves decisions about soil,
              nutrients, fertilizers, water and markets.
              Finding useful information should not have to
              be complicated.
            </p>

            <p>
              Agri Assist brings important agricultural
              information together through simple,
              easy-to-understand sections.
            </p>

            <div className="about-highlight">

              <span>
                “
              </span>

              <p>
                Better information can lead to better
                agricultural decisions.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FINAL CTA ================= */}
      <section className="final-cta">

        <div className="cta-decoration cta-one"></div>
        <div className="cta-decoration cta-two"></div>

        <div className="cta-content">

          <span className="section-label light-label">
            EXPLORE AGRI ASSIST
          </span>

          <h2>
            Understand agriculture.
            <span>Make informed decisions.</span>
          </h2>

          <p>
            Explore soil and fertilizer information, check
            mandi prices and learn about irrigation techniques.
          </p>

          <div className="cta-buttons">

            <Link
              to="/fertilizer"
              className="cta-primary"
            >
              Explore Fertilizer & Soil →
            </Link>

            <Link
              to="/irrigation"
              className="cta-secondary"
            >
              Explore Irrigation
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;

