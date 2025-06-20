import React, { useState } from 'react';
import './App.css';

function App() {
  const [investment, setInvestment] = useState(1000);
  const [goal, setGoal] = useState(10000);
  const [duration, setDuration] = useState(10);
  const [risk, setRisk] = useState('medium');
  const [advice, setAdvice] = useState(null);

  const calculateAdvice = () => {
    // Logique de calcul basique (à compléter)
    const monthlyReturn = Math.pow(goal / investment, 1/duration) - 1;
    
    setAdvice({
      monthlyReturn: (monthlyReturn * 100).toFixed(2),
      recommendedETFs: getRecommendedETFs(risk, monthlyReturn),
      feasibility: monthlyReturn > 0.1 ? 'Très risqué' : 'Réalisable'
    });
  };

  const getRecommendedETFs = (riskLevel, requiredReturn) => {
    // Cette fonction devrait interroger le backend en réalité
    if (requiredReturn > 0.25) {
      return ["ETF à très haut risque (ex: ARKK)", "ETF de crypto"];
    } else if (requiredReturn > 0.15) {
      return ["ETF technologiques (ex: QQQ)", "ETF émergents"];
    } else {
      return ["ETF S&P 500 (ex: VOO)", "ETF mondial (ex: VT)"];
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Conseiller d'Investissement ETF</h1>
      </header>
      
      <div className="calculator">
        <div className="input-group">
          <label>Montant initial (€):</label>
          <input 
            type="number" 
            value={investment} 
            onChange={(e) => setInvestment(Number(e.target.value))} 
          />
        </div>
        
        <div className="input-group">
          <label>Objectif (€):</label>
          <input 
            type="number" 
            value={goal} 
            onChange={(e) => setGoal(Number(e.target.value))} 
          />
        </div>
        
        <div className="input-group">
          <label>Durée (mois):</label>
          <input 
            type="number" 
            value={duration} 
            onChange={(e) => setDuration(Number(e.target.value))} 
          />
        </div>
        
        <div className="input-group">
          <label>Profil de risque:</label>
          <select value={risk} onChange={(e) => setRisk(e.target.value)}>
            <option value="low">Faible</option>
            <option value="medium">Moyen</option>
            <option value="high">Élevé</option>
          </select>
        </div>
        
        <button onClick={calculateAdvice}>Obtenir des conseils</button>
      </div>
      
      {advice && (
        <div className="advice">
          <h2>Conseils d'Investissement</h2>
          <p>Rendement mensuel requis: {advice.monthlyReturn}%</p>
          <p>Faisabilité: {advice.feasibility}</p>
          <h3>ETF Recommandés:</h3>
          <ul>
            {advice.recommendedETFs.map((etf, index) => (
              <li key={index}>{etf}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;