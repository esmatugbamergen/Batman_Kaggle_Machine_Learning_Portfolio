"use client";

import React, { useEffect, useRef, useState } from 'react';

// Panel butonları için görselle uyumlu stil
const masterButtonStyle = {
  backgroundColor: '#facd05',
  color: '#000',
  padding: '20px 15px',
  borderRadius: '12px',
  fontWeight: '950',
  fontSize: '0.95rem',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px solid #facd05',
  letterSpacing: '1px',
  boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
  cursor: 'pointer',
  textAlign: 'center',
  height: '100%',
  width: '100%'
};

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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log("Music error:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#1a1a1a', 
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url('/gotham-bg.jpeg')`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      color: '#ffffff',
      fontFamily: 'Inter, system-ui, sans-serif',
      paddingBottom: '40px',
      minHeight: '100vh',
    }}>

      {/* --- AUDIO --- */}
      <audio ref={audioRef} loop><source src="/batman-theme.mp3" type="audio/mpeg" /></audio>

      {/* --- FLOATING MUSIC BUTTON --- */}
      <button onClick={toggleMusic} style={{ position: 'fixed', bottom: '40px', right: '40px', zIndex: 9999, backgroundColor: '#facd05', border: 'none', borderRadius: '50%', width: '70px', height: '70px', cursor: 'pointer', boxShadow: isPlaying ? '0 0 30px #facd05' : '0 10px 20px rgba(0,0,0,0.5)', fontSize: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {isPlaying ? '🔇' : '🦇'}
      </button>
      
      {/* HEADER */}
      <header style={{ padding: '120px 40px 100px 40px', textAlign: 'center', background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)' }}>
        <div onClick={toggleMusic} style={{ display: 'inline-block', border: '2px solid #facd05', padding: '12px 35px', marginBottom: '40px', backgroundColor: 'rgba(250, 205, 5, 0.1)', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.3s ease' }}>
          <p style={{ color: '#facd05', fontSize: '0.9rem', fontWeight: '900', letterSpacing: '3px', margin: 0 }}>
            {isPlaying ? "● SYSTEM STATUS: ONLINE" : "🦇 BATMAN AUDIO UPLINK"}
          </p>
        </div>

        <h1 style={{ color: '#facd05', fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', fontWeight: '950', marginBottom: '40px', textShadow: '4px 4px 20px rgba(0,0,0,0.8)' }}>
          Batman Kaggle Machine <br/>Learning Portfolio
        </h1>

        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p style={{ color: '#fff', fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: '500', marginBottom: '30px', lineHeight: '1.6', textShadow: '2px 2px 10px rgba(0,0,0,1)' }}>
              Inspired by real-world machine learning engineering portfolios, this project integrates Kaggle datasets and notebook-based experiments into a structured, production-style presentation format. The Batman theme serves as a creative user interface layer designed to make data science storytelling more engaging without compromising on technical depth or analytical rigor.
           </p>
       </div>
      </header>

      {/* PROJECT LIST */}
      <main style={{ maxWidth: '1700px', margin: '0 auto', padding: '0 20px' }}>
       {myProjects.map((p, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse', alignItems: 'center', gap: '5vw', marginBottom: '160px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ flex: '1.7', minWidth: '320px', maxWidth: '900px', padding: '12px', background: 'linear-gradient(45deg, #d4af37, #f9f295, #d4af37)', borderRadius: '50px', boxShadow: '0 40px 80px rgba(0,0,0,0.7)' }}>
             <img src={p.image} alt={p.title} style={{ width: '100%', height: 'auto', borderRadius: '40px' }} />
           </div>
            <div style={{ flex: '1', textAlign: i % 2 === 0 ? 'left' : 'right', minWidth: '320px', padding: '20px' }}>
             <span style={{ color: '#facd05', fontWeight: '900', fontSize: '1.2rem', letterSpacing: '6px', display: 'block' }}>{p.type}</span>
             <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)', fontWeight: '900', color: '#fff' }}>{p.title}</h2>
              <p style={{ fontSize: '1.4rem', color: '#eee', marginBottom: '60px' }}>{p.desc}</p>
             <div style={{ display: 'flex', gap: '30px', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end' }}>
               <a href={p.kaggle} target="_blank" rel="noreferrer" style={{ backgroundColor: '#facd05', color: '#000', padding: '20px 40px', borderRadius: '100px', fontWeight: '950', textDecoration: 'none' }}>KAGGLE</a>
               <a href={p.hf} target="_blank" rel="noreferrer" style={{ border: '3px solid #fff', color: '#fff', padding: '20px 40px', borderRadius: '100px', fontWeight: '950', textDecoration: 'none' }}>SPACES</a>
             </div>
           </div>
         </div>
        ))}
      </main>

      {/* REPOSITORY SECTION */}
      <section style={{ maxWidth: '1100px', margin: '80px auto 120px auto', padding: '60px 20px', textAlign: 'center', background: 'rgba(250, 205, 5, 0.05)', border: '1px solid rgba(250, 205, 5, 0.3)', borderRadius: '40px', backdropFilter: 'blur(15px)' }}>
        <div style={{ color: '#facd05', fontSize: '1.1rem', fontWeight: '900', letterSpacing: '8px', marginBottom: '10px' }}>BATMAN</div>
        <h3 style={{ color: '#facd05', fontSize: '2.2rem', fontWeight: '900', marginBottom: '40px' }}>Gotham Central Data Repository</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          <a href="https://www.kaggle.com/esmatugbamergen/code" target="_blank" rel="noreferrer" style={masterButtonStyle}>KAGGLE MASTER PROFILE</a>
          <a href="https://huggingface.co/ESMATUGBA" target="_blank" rel="noreferrer" style={masterButtonStyle}>HUGGING FACE SPACES</a>
          <a href="https://github.com/esmatugbamergen" target="_blank" rel="noreferrer" style={masterButtonStyle}>GITHUB REPOSITORY</a>
       </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ width: 'clamp(250px, 35%, 400px)' }}><a href="/Batman_Proje_Portfolyosu_Final.xlsx" download style={masterButtonStyle}>DOWNLOAD EXCEL DATABASE</a></div>
          <div style={{ width: 'clamp(250px, 35%, 400px)' }}><a href="/Batman-Machine-Learning-and-Data-Science-Portfolio-2026_compressed.pdf" download style={masterButtonStyle}>PROJECT PRESENTATION FILE</a></div>
       </div>
      </section>

      {/* FOOTER */}
      <footer style={{ textAlign: 'center', padding: '80px 20px', borderTop: '1px solid rgba(250, 205, 5, 0.2)' }}>
        <p style={{ color: '#facd05', fontSize: '1.4rem', fontWeight: '800', marginBottom: '15px' }}>
          © 2026 Esma Tuğba MERGEN — Data Science & Machine Learning Portfolio
        </p>
        <p style={{ color: '#888', letterSpacing: '6px', marginBottom: '20px', fontWeight: '700' }}>
          WAYNE ENTERPRISES ARCHIVES // SECURED DATA // GOTHAM CITY
        </p>
        <div style={{ maxWidth: '900px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px' }}>
          <p style={{ color: '#777', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
            This portfolio and the projects contained within are for educational and demonstrative purposes. All data processed is handled under fair use for analytical research. Unauthorized access to encrypted WayneTech datasets is strictly prohibited by Gotham City cyber-laws.
          </p>
        </div>
      </footer>
    </div>
  );
}