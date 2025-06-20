const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Données factices sur les ETF (en production, utiliser une vraie base de données)
const etfDatabase = {
  low: [
    { name: "Vanguard S&P 500 (VOO)", historicalReturn: 0.08, risk: "low" },
    { name: "iShares Core MSCI World (IWDA)", historicalReturn: 0.07, risk: "low" }
  ],
  medium: [
    { name: "Invesco QQQ Trust (QQQ)", historicalReturn: 0.12, risk: "medium" },
    { name: "iShares MSCI Emerging Markets (EEM)", historicalReturn: 0.10, risk: "medium" }
  ],
  high: [
    { name: "ARK Innovation ETF (ARKK)", historicalReturn: 0.15, risk: "high" },
    { name: "Bitcoin ETF (ex: BITO)", historicalReturn: 0.20, risk: "very high" }
  ]
};

app.post('/api/advice', (req, res) => {
  const { investment, goal, duration, risk } = req.body;
  
  // Validation basique
  if (!investment || !goal || !duration || !risk) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  // Calcul du rendement mensuel requis
  const monthlyReturn = Math.pow(goal / investment, 1/duration) - 1;
  
  // Filtrage des ETF selon le risque
  const recommendedETFs = etfDatabase[risk] || [];
  
  // Ajout d'une analyse de faisabilité
  let feasibility;
  if (monthlyReturn > 0.15) {
    feasibility = "Très risqué - Objectif peu réaliste";
  } else if (monthlyReturn > 0.08) {
    feasibility = "Risqué - Possible mais incertain";
  } else {
    feasibility = "Réalisable - Objectif raisonnable";
  }

  res.json({
    monthlyReturn: (monthlyReturn * 100).toFixed(2),
    recommendedETFs: recommendedETFs.map(etf => etf.name),
    feasibility,
    requiredReturn: monthlyReturn,
    historicalReturn: recommendedETFs.reduce((acc, etf) => acc + etf.historicalReturn, 0) / recommendedETFs.length
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});