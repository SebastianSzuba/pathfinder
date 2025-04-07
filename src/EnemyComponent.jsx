import './EnemyComponent.css';
import React, { useState, useEffect, useRef } from 'react'; //
import EnemyData from './EnemyData';

// Empfängt onEnemyDefeated, damagePerSecond und damagePerClick als Props
export default function EnemyComponent({ onEnemyDefeated, damagePerSecond, damagePerClick }) {
    const [enemy, setEnemy] = useState(null);
    const [currentHealth, setCurrentHealth] = useState(0);
    const [moveDuration, setMoveDuration] = useState(2); // Standarddauer für die Bewegungsanimation
    const [randomDuration, setRandomDuration] = useState(3); // Standarddauer für die zufällige Bewegungsanimation
    const [imageScale, setImageScale] = useState(1); // Standardgröße für das Bild (100%)
    const imageRef = useRef(null); // Ref für das Bild-Element

    // Funktion zum Holen und Setzen eines neuen Gegners
    const getNewEnemy = () => {
        console.log("getNewEnemy wird aufgerufen."); // Debugging
        const newEnemy = EnemyData();
        setEnemy(newEnemy);
        setCurrentHealth(newEnemy.health);
        setImageScale(1); // Setzt die Bildgröße zurück, wenn ein neuer Gegner erscheint
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
            // Verwendet den damagePerSecond-Wert aus den Props
            setCurrentHealth(prevHealth => Math.max(0, prevHealth - damagePerSecond));
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

    // Effekt zum Aktualisieren der Animationsdauer basierend auf der Gesundheit
    useEffect(() => {
        if (!enemy || currentHealth <= 0) return;

        // Berechne die Animationsdauer basierend auf der Gesundheit (je weniger Gesundheit, desto schneller)
        const healthRatio = currentHealth / enemy.health;
        const newMoveDuration = Math.max(0.5, healthRatio * 2); // Zwischen 0.5s und 2s
        const newRandomDuration = Math.max(1, healthRatio * 3); // Zwischen 1s und 3s

        setMoveDuration(newMoveDuration);
        setRandomDuration(newRandomDuration);

        // Aktualisiere die CSS-Variablen für die Animationsdauer
        if (imageRef.current) {
            imageRef.current.style.setProperty('--move-duration', `${newMoveDuration}s`);
            imageRef.current.style.setProperty('--random-duration', `${newRandomDuration}s`);
        }
    }, [currentHealth, enemy]);

    // Klick-Handler für manuellen Angriff
    const handleAttack = () => {
        // Nur angreifen, wenn Gegner existiert und Gesundheit > 0
        if (!enemy || currentHealth <= 0) return;

        // Reduziere Gesundheit um den damagePerClick-Wert aus den Props
        setCurrentHealth(prevHealth => Math.max(0, prevHealth - damagePerClick));

        // Reduziere die Bildgröße bei jedem Klick um 10%
        const newScale = Math.max(0.3, imageScale - 0.1); // Nicht kleiner als 30%
        console.log(`Bild wird kleiner: ${imageScale} -> ${newScale}`); // Debugging
        setImageScale(newScale);
    };

    // Wenn noch kein Gegner geladen wurde
    if (!enemy) {
        return <div className='enemy-box'>Lade Gegner...</div>;
    }

    // Berechnung für den Lebensbalken
    const healthPercentage = enemy.health > 0 ? (currentHealth / enemy.health) * 100 : 0;

    return (
        <div className='enemy-box' draggable="false" userSelect="none" onClick={handleAttack} style={{ cursor: 'pointer', height: '500px' }}> {/* Erhöhte Höhe für mehr Platz */}
            <div key={enemy.id} style={{ position: 'relative', width: '100%', height: '100%' }}> {/* Relative Positionierung für absolute Kinder */}
                <h2 className="enemy-name">{enemy.name}</h2>

                {/* Dynamischer Lebensbalken - jetzt mit korrektem z-index */}
                <div className="fixed-health-bar-container"> {/* Container am oberen Rand */}
                    <div
                        className="health-bar"
                        style={{ width: `${healthPercentage}%` }} // Breite basiert auf Prozent
                    ></div>
                    <div className="health-text">
                        {currentHealth} / {enemy.health}
                    </div>
                </div>

                {/* Container für die Bewegungsanimationen */}
                <div
                    className="image-container random-move-container"
                    ref={imageRef}
                    style={{
                        marginTop: '50px', /* Mehr Platz für den Lebensbalken */
                        position: 'relative', /* Für z-index */
                        zIndex: 3 /* Zwischen Lebensbalken und Held */
                    }}
                >
                    <img
                        userSelect="none" // Verhindert das Markieren des Bildes
                        draggable="false" // Verhindert das Ziehen des Bildes
                        src={enemy.image}
                        alt={enemy.name}
                        className="enemy-image animated-image"
                        style={{
                            transform: `scale(${imageScale})`, // Direkte Skalierung basierend auf imageScale
                            maxWidth: '100%', // Begrenzt auf Container-Größe
                            maxHeight: '100%', // Begrenzt auf Container-Größe
                            objectFit: 'contain' // Behält Seitenverhältnis bei
                        }}
                        onClick={(e) => {
                            e.stopPropagation(); // Verhindert Bubble-Up zum Container
                            handleAttack();
                            console.log("Bild wurde angeklickt!"); // Debugging
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
