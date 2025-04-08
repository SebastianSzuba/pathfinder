import React, { useState, useEffect } from 'react'; // Import useState and useEffect
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

  // State für Krit-Multiplikator und Upgrade-Kosten
  const [critMultiplier, setCritMultiplier] = useState(1.5); // Startwert 1.5x
  const [critUpgradeCost, setCritUpgradeCost] = useState(200); // Startkosten 200 Gold

  // State für Waffenpreise
  const [weaponPrices, setWeaponPrices] = useState({
    dagger: 50,      // Dolch
    sword: 150,      // Schwert
    wand: 300,       // Zauberstab
    bone: 50,        // Knochen
    gloves: 75,      // Handschuhe
    axe: 200,        // Axt
    hammer: 500      // Hammer
  });

  // Load game state from Local Storage on initial mount
  useEffect(() => {
    const savedState = localStorage.getItem('pathfinderGameState');
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        setPlayerGold(state.playerGold || 0);
        setPlayerExp(state.playerExp || 0);
        setDamagePerSecond(state.damagePerSecond || 1);
        setDamagePerClick(state.damagePerClick || 3);
        setCritMultiplier(state.critMultiplier || 1.5); // Krit-Multiplikator laden
        setCritUpgradeCost(state.critUpgradeCost || 200); // Krit-Upgrade-Kosten laden
        // Waffenpreise laden, falls vorhanden, sonst Standardwerte verwenden
        if (state.weaponPrices) {
          setWeaponPrices(state.weaponPrices);
        }
        console.log("Spielstand geladen:", state);
      } catch (error) {
        console.error("Fehler beim Laden des Spielstands:", error);
        // Optional: Clear invalid state from local storage
        localStorage.removeItem('pathfinderGameState');
      }
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Save game state to Local Storage whenever relevant state changes
  useEffect(() => {
    const gameState = {
      playerGold,
      playerExp,
      damagePerSecond,
      damagePerClick,
      critMultiplier,
      critUpgradeCost, // Krit-Werte hinzufügen
      weaponPrices // Waffenpreise speichern
    };
    localStorage.setItem('pathfinderGameState', JSON.stringify(gameState));
    // console.log("Spielstand gespeichert:", gameState); // Optional: Zum Debuggen
  }, [playerGold, playerExp, damagePerSecond, damagePerClick, critMultiplier, critUpgradeCost, weaponPrices]); // Abhängigkeiten erweitern

  // Funktion zum Hinzufügen von Belohnungen, wenn ein Gegner besiegt wird
  const handleEnemyDefeated = (gold, exp) => {
    setPlayerGold(prevGold => prevGold + gold);
    setPlayerExp(prevExp => prevExp + exp);
    console.log(`Spieler erhält ${gold} Gold und ${exp} EXP!`);
  };

  // Funktion zum Kaufen von Waffen
  const buyWeapon = (weaponId, cost, dpsIncrease, dpcIncrease) => {
    if (playerGold >= cost) {
      setPlayerGold(prevGold => prevGold - cost);

      if (dpsIncrease > 0) {
        setDamagePerSecond(prevDPS => prevDPS + dpsIncrease);
      }

      if (dpcIncrease > 0) {
        setDamagePerClick(prevDPC => prevDPC + dpcIncrease);
      }

      // Preis für die gekaufte Waffe erhöhen (um 50%)
      setWeaponPrices(prevPrices => ({
        ...prevPrices,
        [weaponId]: Math.round(prevPrices[weaponId] * 1.5)
      }));

      return true; // Kauf erfolgreich
    }
    return false; // Nicht genug Gold
  };

  // Funktion zum Kaufen von Krit-Upgrades
  const buyCritUpgrade = (cost, multiplierIncrease) => {
    if (playerGold >= cost) {
      setPlayerGold(prevGold => prevGold - cost);
      setCritMultiplier(prevMultiplier => prevMultiplier + multiplierIncrease);
      // Kosten für das nächste Upgrade erhöhen (z.B. um 50%)
      setCritUpgradeCost(prevCost => Math.round(prevCost * 1.5));
      return true; // Kauf erfolgreich
    }
    return false; // Nicht genug Gold
  };

  // Funktion zum Zurücksetzen des Spielstands
  const resetGameState = () => {
    try {
      localStorage.removeItem('pathfinderGameState');
      // Setze alle relevanten States auf ihre Initialwerte zurück
      setPlayerGold(0);
      setPlayerExp(0);
      setDamagePerSecond(1);
      setDamagePerClick(3);
      setCritMultiplier(1.5);
      setCritUpgradeCost(200);
      // Waffenpreise zurücksetzen
      setWeaponPrices({
        dagger: 50,
        sword: 150,
        wand: 300,
        bone: 50,
        gloves: 75,
        axe: 200,
        hammer: 500
      });
      console.log('Spielstand zurückgesetzt.');
      alert('Spielstand zurückgesetzt!'); // Feedback für den Benutzer
    } catch (error) {
      console.error('Fehler beim Zurücksetzen des Spielstands:', error);
      alert('Fehler beim Zurücksetzen!');
    }
  };


  return (
    <>
      {/* Übergibt Reset-Funktion an MenuComponent */}
      <MenuComponent
        resetGameState={resetGameState} // Reset-Funktion übergeben
      // playerGold, playerExp etc. werden nicht mehr benötigt, da sie nicht angezeigt werden
      />
      {/* Übergibt die Handler-Funktion und Schadenswerte an EnemyComponent */}
      <EnemyComponent
        onEnemyDefeated={handleEnemyDefeated}
        damagePerSecond={damagePerSecond}
        damagePerClick={damagePerClick}
        critMultiplier={critMultiplier} // Krit-Multiplikator übergeben
      />
      {/* Übergibt Gold, EXP, Schadenswerte und Kauffunktionen an PlayerInfo */}
      <PlayerInfo
        gold={playerGold}
        exp={playerExp}
        damagePerSecond={damagePerSecond}
        damagePerClick={damagePerClick}
        critMultiplier={critMultiplier} // Krit-Multiplikator übergeben
        critUpgradeCost={critUpgradeCost} // Krit-Upgrade-Kosten übergeben
        weaponPrices={weaponPrices} // Waffenpreise übergeben
        buyWeapon={buyWeapon}
        buyCritUpgrade={buyCritUpgrade} // Krit-Upgrade-Kauffunktion übergeben
      />
    </>
  )
}

export default App
