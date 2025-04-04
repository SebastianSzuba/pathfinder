import React, { useState } from 'react'; // Import useState
import './App.css'
import EnemyComponent from './EnemyComponent'
import MenuComponent from './MenuComponent'
import PlayerInfo from './PlayerInfo'

function App() {
  // Zustand für Spieler-Gold und EXP
  const [playerGold, setPlayerGold] = useState(0);
  const [playerExp, setPlayerExp] = useState(0);

  // State für Schaden pro Sekunde und pro Klick
  const [damagePerSecond, setDamagePerSecond] = useState(1);
  const [damagePerClick, setDamagePerClick] = useState(3);

  // Funktion zum Hinzufügen von Belohnungen, wenn ein Gegner besiegt wird
  const handleEnemyDefeated = (gold, exp) => {
    setPlayerGold(prevGold => prevGold + gold);
    setPlayerExp(prevExp => prevExp + exp);
    console.log(`Spieler erhält ${gold} Gold und ${exp} EXP!`);
  };

  // Funktion zum Kaufen von Waffen
  const buyWeapon = (cost, dpsIncrease, dpcIncrease) => {
    if (playerGold >= cost) {
      setPlayerGold(prevGold => prevGold - cost);

      if (dpsIncrease > 0) {
        setDamagePerSecond(prevDPS => prevDPS + dpsIncrease);
      }

      if (dpcIncrease > 0) {
        setDamagePerClick(prevDPC => prevDPC + dpcIncrease);
      }

      return true; // Kauf erfolgreich
    }
    return false; // Nicht genug Gold
  };

  return (
    <>
      <MenuComponent />
      {/* Übergibt die Handler-Funktion und Schadenswerte an EnemyComponent */}
      <EnemyComponent
        onEnemyDefeated={handleEnemyDefeated}
        damagePerSecond={damagePerSecond}
        damagePerClick={damagePerClick}
      />
      {/* Übergibt Gold, EXP, Schadenswerte und Kauffunktion an PlayerInfo */}
      <PlayerInfo
        gold={playerGold}
        exp={playerExp}
        damagePerSecond={damagePerSecond}
        damagePerClick={damagePerClick}
        buyWeapon={buyWeapon}
      />
    </>
  )
}

export default App
