"use client";

import React, { useState, useRef } from 'react';

const myProjects = [
  { title: "1. Food Delivery Time Prediction", type: "Regression Analysis", image: "/1.png", kaggle: "https://www.kaggle.com/code/esmatugbamergen/food-delivery-time-prediction-regresyon/", hf: "https://huggingface.co/spaces/ESMATUGBA/food-delivery-prediction-app", desc: "Predicting delivery times using XGBoost and real-time logistics data to optimize urban food delivery chains." },
  { title: "2. Diamond Price Prediction", type: "Regression / Market Analysis", image: "/2.png", kaggle: "https://www.kaggle.com/code/esmatugbamergen/diamond-price-prediction-regresyon/", hf: "https://huggingface.co/spaces/ESMATUGBA/diamond-price-predictor", desc: "Estimating market values of diamonds based on the 4Cs (Carat, Cut, Color, Clarity) using Random Forest models." },
  { title: "3. Electricity Price Prediction", type: "Time Series Forecasting", image: "/3.png", kaggle: "https://www.kaggle.com/code/esmatugbamergen/electricity-price-prediction-regresyon/", hf: "https://huggingface.co/spaces/ESMATUGBA/energy-price-predictor", desc: "Analyzing and forecasting energy costs using ARIMA and seasonal trend analysis for smart grid optimization." },
  { title: "4. Online Payments Fraud Detection", type: "Classification / Security", image: "/4.png", kaggle: "https://www.kaggle.com/code/esmatugbamergen/online-payments-fraud-detection-classification/", hf: "https://huggingface.co/spaces/ESMATUGBA/online-fraud-detection", desc: "Detecting fraudulent transactions in high-volume financial systems using supervised machine learning." },
  { title: "5. Fake News Detection", type: "NLP / Deep Learning", image: "/5.png", kaggle: "https://www.kaggle.com/code/esmatugbamergen/fake-news-detection-classification/", hf: "https://huggingface.co/spaces/ESMATUGBA/fake-news-detector", desc: "A sophisticated NLP project using BERT to distinguish between credible news and misinformation." },
  { title: "6. Corporate Bankruptcy Prediction", type: "Financial Intelligence", image: "/6.png", kaggle: "https://www.kaggle.com/code/esmatugbamergen/corporate-bankruptcy-prediction-classification/", hf: "https://huggingface.co/spaces/ESMATUGBA/Corporate_Bankruptcy_Prediction", desc: "Predicting financial distress and bankruptcy risk for corporations using multi-layered financial indicators." },
  { title: "7. Customer Personality Segmentation", type: "Clustering / Marketing", image: "/7.png", kaggle: "https://www.kaggle.com/code/esmatugbamergen/customer-personality-segmentation/", hf: "https://huggingface.co/spaces/ESMATUGBA/customer-segmentation-app", desc: "Grouping customers based on purchasing behavior and psychographics to drive targeted marketing campaigns." },
  { title: "8. Spotify Music Clustering", type: "Unsupervised Learning", image: "/8.png", kaggle: "https://www.kaggle.com/code/esmatugbamergen/spotify-music-clustering-analysis/", hf: "https://huggingface.co/spaces/ESMATUGBA/spotify-music-clustering", desc: "Analyzing audio features of songs to perform automated genre discovery and mood-based clustering." },
  { title: "9. Credit Card Customer Segmentation", type: "Clustering / Finance", image: "/9.png", kaggle: "https://www.kaggle.com/code/esmatugbamergen/credit-card-customer-segmentation/", hf: "https://huggingface.co/spaces/ESMATUGBA/credit-card-clustering", desc: "Applying PCA and K-Means to cluster credit card users for specialized financial service offerings." },
  { title: "10. Computer Vision: Gender Detection", type: "CV / Neural Networks", image: "/10.png", kaggle: "https://www.kaggle.com/code/esmatugbamergen/computer-vision-gender-detection/", hf: "https://huggingface.co/spaces/ESMATUGBA/Gender_Prediction", desc: "Deploying deep learning models to perform gender classification from real-time video and image feeds." },
  { title: "11. Photos to Pencil Sketches", type: "OpenCV / Image Processing", image: "/11.png", kaggle: "https://www.kaggle.com/code/esmatugbamergen/convert-photos-to-pencil-sketches-with-opencv/", hf: "https://huggingface.co/spaces/ESMATUGBA/pencil-sketch-face-recognition", desc: "Developing a custom pipeline for transforming digital photographs into high-quality pencil sketch art." },
  { title: "12. Automotive Logo Recognition", type: "CV / Object Detection", image: "/12.png", kaggle: "https://www.kaggle.com/code/esmatugbamergen/computer-vision-for-automotive-advanced-car-logo-r/", hf: "https://huggingface.co/spaces/ESMATUGBA/car-logo-recognition", desc: "Implementing YOLOv8 for precise vehicle brand identification in various lighting and environment conditions." },
  { title: "13. NextGen HR-Tech: Resume Analysis", type: "NLP / Dashboard", image: "/13.png", kaggle: "https://www.kaggle.com/code/esmatugbamergen/nextgen-hr-tech-resume-analysis-dashboard/", hf: "https://huggingface.co/spaces/ESMATUGBA/Ai-Resume-Classifier", desc: "An end-to-end recruitment tool that parses, ranks, and analyzes resumes using advanced NLP techniques." },
  { title: "14. Amazon Product Reviews NLP", type: "Sentiment Analysis", image: "/14.png", kaggle: "https://www.kaggle.com/code/esmatugbamergen/amazon-product-reviews-dataset-nlp/", hf: "https://huggingface.co/spaces/ESMATUGBA/amazon-sentiment-analysis", desc: "Mining customer feedback to extract sentiment insights and product quality metrics at scale." },
  { title: "15. Multidisciplinary Categorization", type: "NLP / Classification", image: "/15.png", kaggle: "https://www.kaggle.com/code/esmatugbamergen/multidisciplinary-text-categorization-project/", hf: "https://huggingface.co/spaces/ESMATUGBA/Multidisciplinary-News-Classifier", desc: "Training models to automatically categorize text across a wide variety of news and academic domains." },
  { title: "16. CastMatch AI Talent System", type: "Recommendation Systems", image: "/16.png", kaggle: "https://www.kaggle.com/code/esmatugbamergen/castmatch-ai-talent-matching-system/", hf: "https://huggingface.co/spaces/ESMATUGBA/CastMatchAITalentMatchingSystem", desc: "Bridging the gap between actors and production needs using vector-based talent matching algorithms." },
  { title: "17. Movies Recommender System", type: "RecSys / Collaborative", image: "/17.png", kaggle: "https://www.kaggle.com/code/esmatugbamergen/movies-and-tv-shows-recommender/", hf: "https://huggingface.co/spaces/ESMATUGBA/MovieRecommendationSystem", desc: "Building a personalized movie recommendation engine based on user preferences and content similarity." },
  { title: "18. Heart Disease Risk Prediction", type: "Healthcare Analytics", image: "/18.png", kaggle: "https://www.kaggle.com/code/esmatugbamergen/heart-disease-prediction-with-pyspark/", hf: "https://huggingface.co/spaces/ESMATUGBA/HeartDiseasePredictor", desc: "Leveraging PySpark for high-performance predictive analytics in identifying cardiovascular risks." },
  { title: "19. Delhi Weather Time Series", type: "Deep Learning / LSTM", image: "/19.png", kaggle: "https://www.kaggle.com/code/esmatugbamergen/daily-weather-time-series/", hf: "https://huggingface.co/spaces/ESMATUGBA/Delhi_Weather_Lstm", desc: "Forecasting metropolitan weather conditions using Long Short-Term Memory neural networks." },
  { title: "20. Workforce Optimization", type: "Time Series / Management", image: "/20.png", kaggle: "https://www.kaggle.com/code/esmatugbamergen/time-series-based-workforce-optimization/", hf: "https://huggingface.co/spaces/ESMATUGBA/Workforce_Optimizer", desc: "Strategizing workforce distribution by predicting peak demand hours through time-series data." },
  { title: "21. Hotel Reservation Demand", type: "Hybrid Modeling", image: "/21.png", kaggle: "https://www.kaggle.com/code/esmatugbamergen/hotel-reservation-demand-predictionwith-arima-lstm/", hf: "https://huggingface.co/spaces/ESMATUGBA/Hotel-Demand-Forecasting", desc: "Predicting hotel booking trends and cancellation risks using a combination of ARIMA and LSTM models." },
  { title: "22. Gold Price Analysis", type: "Data Visualization", image: "/22.png", kaggle: "https://www.kaggle.com/code/esmatugbamergen/gold-price-analysis-with-data-visualization/", hf: "https://huggingface.co/spaces/ESMATUGBA/Gold_Price_Analysis", desc: "In-depth visual analysis of decades of gold market data to reveal economic cycles and trends." },
  { title: "23. Global Pollution Dashboard", type: "Geo-Spatial Data Viz", image: "/23.png", kaggle: "https://www.kaggle.com/code/esmatugbamergen/global-pollution-dev-world-data-viz-dashboard/", hf: "https://huggingface.co/spaces/ESMATUGBA/World-Data-Analysis", desc: "Mapping and analyzing environmental pollution levels globally through interactive geographical dashboards." },
  { title: "24. Nutrition Visualization", type: "EDA / Health Viz", image: "/24.png", kaggle: "https://www.kaggle.com/code/esmatugbamergen/nutrition-visualization-fast-food-drinks-analys/", hf: "https://huggingface.co/spaces/ESMATUGBA/Global-Fast-Food-Nutrition-Analysis", desc: "Comprehensive analysis of nutritional content across the fast food industry using advanced visualization techniques." }
];

export default function WayneFinalPortfolio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const startGotham = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.error("Müzik çalma hatası:", err));
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.error("Müzik çalma hatası:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div style={{ 
      backgroundColor: '#000',
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url('/gotham-bg.jpeg')`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      color: '#ffffff',
      fontFamily: 'Inter, system-ui, sans-serif',
      paddingBottom: '120px',
      minHeight: '100vh',
    }}>
      
      {/* Müzik Dosyası */}
      <audio ref={audioRef} src="/batman-theme.mp3" loop />

      {/* Header Bölümü */}
      <header style={{ 
        padding: '160px 20px 100px 20px', 
        textAlign: 'center',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 100%)'
      }}>
        {!isPlaying && (
          <button 
            onClick={startGotham}
            style={{
              backgroundColor: '#facd05',
              color: '#000',
              padding: '15px 35px',
              borderRadius: '8px',
              fontSize: '1.2rem',
              fontWeight: '950',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '50px',
              boxShadow: '0 0 30px rgba(250, 205, 5, 0.5)',
              animation: 'pulse 2s infinite',
              textTransform: 'uppercase'
            }}
          >
            ⚡ INITIALIZE WAYNETECH AUDIO ⚡
          </button>
        )}

        <h1 style={{ 
          color: '#facd05', 
          fontSize: '5.5rem', 
          fontWeight: '950', 
          margin: '0 auto 40px auto',
          maxWidth: '1400px',
          letterSpacing: '-2px',
          lineHeight: '1.1',
          textShadow: '4px 4px 20px rgba(0,0,0,1)'
        }}>
          Batman Kaggle Machine <br/>Learning Portfolio
        </h1>
        
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <p style={{ color: '#fff', fontSize: '2.2rem', fontWeight: '600', marginBottom: '30px', lineHeight: '1.4' }}>
                Inspired by real-world machine learning engineering portfolios, this project integrates Kaggle datasets and notebook-based experiments into a structured, production-style presentation format.
            </p>
            <p style={{ color: '#facd05', fontSize: '1.6rem', fontWeight: '400', opacity: 0.9, fontStyle: 'italic', lineHeight: '1.6' }}>
                The Batman theme serves as a creative user interface layer designed to make data science storytelling more engaging without compromising on technical depth or analytical rigor.
            </p>
        </div>
      </header>

      {/* Ana İçerik */}
      <main style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 20px' }}>
        {myProjects.map((p, i) => (
          <div key={i} style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            backgroundColor: 'rgba(15, 15, 15, 0.8)',
            borderRadius: '50px',
            marginBottom: '80px',
            overflow: 'hidden',
            border: '1px solid rgba(250, 205, 5, 0.3)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
            backdropFilter: 'blur(10px)' 
          }}>
            <div style={{ flex: '1.2', padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ color: '#facd05', fontWeight: '900', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '20px' }}>{p.type}</span>
              <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '25px', color: '#fff' }}>{p.title}</h2>
              <p style={{ fontSize: '1.6rem', color: '#ccc', marginBottom: '50px', lineHeight: '1.5' }}>{p.desc}</p>
              <div style={{ display: 'flex', gap: '20px' }}>
                <a href={p.kaggle} target="_blank" rel="noreferrer" style={{ backgroundColor: '#facd05', color: '#000', padding: '18px 40px', borderRadius: '50px', fontWeight: '900', textDecoration: 'none' }}>KAGGLE</a>
                <a href={p.hf} target="_blank" rel="noreferrer" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', padding: '18px 40px', borderRadius: '50px', fontWeight: '900', textDecoration: 'none', border: '1px solid #fff' }}>APP</a>
              </div>
            </div>
            <div style={{ flex: '1' }}>
              <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        ))}
      </main>

      {/* Müzik Butonu */}
      <button 
        onClick={toggleMusic}
        style={{
          position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999,
          backgroundColor: isPlaying ? '#facd05' : 'rgba(20, 20, 20, 0.9)',
          color: isPlaying ? '#000' : '#facd05',
          border: '2px solid #facd05', borderRadius: '50px', padding: '15px 30px',
          fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 0 20px rgba(0,0,0,0.5)'
        }}
      >
        {isPlaying ? "🔈 MUTE" : "🔊 PLAY"}
      </button>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '100px 20px', background: 'rgba(0,0,0,0.8)' }}>
        <p style={{ color: '#facd05', fontSize: '1.4rem', fontWeight: '800', marginBottom: '15px' }}>
          © 2026 Esma Tuğba MERGEN — Data Science & Machine Learning Portfolio
        </p>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ color: '#777', fontSize: '0.9rem', fontStyle: 'italic', lineHeight: '1.5' }}>
            Disclaimer: This project is a non-commercial, educational portfolio. 
            All Batman-related imagery, music, and characters are the property of 
            DC Comics and Warner Bros. No copyright infringement is intended.
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}