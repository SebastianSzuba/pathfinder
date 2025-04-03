import './EnemyComponent.css';
import React, { useState, useEffect, } from 'react'; //
import EnemyData from './EnemyData';

// Empfängt onEnemyDefeated als Prop
export default function EnemyComponent({ onEnemyDefeated }) {
    const [enemy, setEnemy] = useState(null);
    const [currentHealth, setCurrentHealth] = useState(0);
    // Kein Ref mehr nötig für die Prozesskontrolle

    // Funktion zum Holen und Setzen eines neuen Gegners
    const getNewEnemy = () => {
        console.log("getNewEnemy wird aufgerufen."); // Debugging
        const newEnemy = EnemyData();
        setEnemy(newEnemy);
        setCurrentHealth(newEnemy.health);
    };

    // Initialen Gegner beim ersten Rendern holen
    useEffect(() => {
        getNewEnemy();
    }, []); // Leeres Abhängigkeitsarray sorgt dafür, dass dies nur einmal beim Mounten ausgeführt wird

    // Effekt für automatischen Schaden jede Sekunde
    useEffect(() => {
        // Stoppt den Timer nur, wenn kein Gegner da ist oder Gesundheit <= 0
        if (!enemy || currentHealth <= 0) return;

        const intervalId = setInterval(() => {
            // Stellt sicher, dass die Gesundheit nicht unter 0 fällt
            setCurrentHealth(prevHealth => Math.max(0, prevHealth - 1));
        }, 1000); // Jede Sekunde

        // Aufräumfunktion
        return () => clearInterval(intervalId);

    }, [enemy, currentHealth]); // isDefeated entfernt

    // Effekt zum Prüfen, ob der Gegner besiegt ist, Belohnung geben und SOFORT respawnen
    useEffect(() => {
        // Prüft nur, ob Gegner existiert und besiegt ist
        if (enemy && currentHealth <= 0) {
            console.log(`${enemy.name} besiegt! Gebe Belohnung und hole neuen Gegner.`);

            // Belohnung geben (nur wenn Funktion existiert)
            if (onEnemyDefeated) {
                onEnemyDefeated(enemy.gold, enemy.exp);
            }

            // SOFORT neuen Gegner holen
            getNewEnemy();

            // Kein Timeout, kein Cleanup nötig, da der Zustand sich sofort ändert
            // und die Bedingung currentHealth <= 0 im nächsten Render nicht mehr zutrifft.
        }
    }, [currentHealth, enemy, onEnemyDefeated]); // Abhängigkeiten bleiben gleich

    // Klick-Handler für manuellen Angriff
    const handleAttack = () => {
        // Nur angreifen, wenn Gegner existiert und Gesundheit > 0
        if (!enemy || currentHealth <= 0) return;
        setCurrentHealth(prevHealth => Math.max(0, prevHealth - 3)); // Reduziere Gesundheit um 3
    };

    // Wenn noch kein Gegner geladen wurde
    if (!enemy) {
        return <div className='enemy-box'>Lade Gegner...</div>;
    }

    // Berechnung für den Lebensbalken
    const healthPercentage = enemy.health > 0 ? (currentHealth / enemy.health) * 100 : 0;

    return (
        <div className='enemy-box' onClick={handleAttack} style={{ cursor: 'pointer' }}> {/* Klick-Handler hinzugefügt */}
            <div key={enemy.id}>
                <h2>{enemy.name}</h2>

                {/* Dynamischer Lebensbalken */}
                <div className="health-bar-container"> {/* Container für bessere Kontrolle */}
                    <div
                        className="health-bar"
                        style={{ width: `${healthPercentage}%` }} // Breite basiert auf Prozent
                    ></div>
                    <div className="health-text">
                        {currentHealth} / {enemy.health}
                    </div>
                </div>

                <img src={enemy.image} alt={enemy.name} />

                {/* Einfaches Helden-SVG */}
                <div className="hero-icon" style={{ marginTop: '10px' }}>
                    <svg width="30" height="30" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="3" fill="lightblue" />
                        {/* Einfacher Kreis als Held */}
                    </svg>
                </div>
            </div>
        </div>
    );
}
