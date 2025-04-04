import React, { useState } from 'react'; // Import useState
import './App.css'
import EnemyComponent from './EnemyComponent'
import MenuComponent from './MenuComponent'
import PlayerInfo from './PlayerInfo'

function App() {
  // Zustand für Spieler-Gold und EXP
  const [playerGold, setPlayerGold] = useState(0);
  const [playerExp, setPlayerExp] = useState(0);

  // Konstanten für Schaden pro Sekunde und pro Klick
  const damagePerSecond = 1;
  const damagePerClick = 3;

  // Funktion zum Hinzufügen von Belohnungen, wenn ein Gegner besiegt wird
  const handleEnemyDefeated = (gold, exp) => {
    setPlayerGold(prevGold => prevGold + gold);
    setPlayerExp(prevExp => prevExp + exp);
    console.log(`Spieler erhält ${gold} Gold und ${exp} EXP!`);
  };

  return (
    <>
      <MenuComponent />
      {/* Übergibt die Handler-Funktion an EnemyComponent */}
      <EnemyComponent onEnemyDefeated={handleEnemyDefeated} />
      {/* Übergibt Gold, EXP und Schadenswerte an PlayerInfo */}
      <PlayerInfo
        gold={playerGold}
        exp={playerExp}
        damagePerSecond={damagePerSecond}
        damagePerClick={damagePerClick}
      />
    </>
  )
}

export default App
