import './EnemyComponent.css';
import React, { useState, useEffect, useRef } from 'react';
import EnemyData from './EnemyData';
import './EnemyComponent.css'; // Stelle sicher, dass CSS importiert wird

// Empfängt Props, erweitert um critMultiplier
export default function EnemyComponent({ onEnemyDefeated, damagePerSecond, damagePerClick, critMultiplier }) {
    const [enemy, setEnemy] = useState(null);
    const [currentHealth, setCurrentHealth] = useState(0);
    const [moveDuration, setMoveDuration] = useState(2); // Standarddauer für die Bewegungsanimation
    const [randomDuration, setRandomDuration] = useState(3); // Standarddauer für die zufällige Bewegungsanimation
    const [imageScale, setImageScale] = useState(1); // Standardgröße für das Bild (100%)
    const [damageNumbers, setDamageNumbers] = useState([]); // State für schwebende Schadenszahlen
    const imageRef = useRef(null); // Ref für das Bild-Element
    const enemyBoxRef = useRef(null); // Ref für den Container, um Klick-Koordinaten relativ zu bekommen
    const [defeatedEnemies, setDefeatedEnemies] = useState(0);

    // Funktion zum Holen und Setzen eines neuen Gegners
    const getNewEnemy = () => {
        console.log("getNewEnemy wird aufgerufen."); // Debugging
        const newEnemy = EnemyData();
        // Skaliere die Gesundheit abhängig von besiegten Gegnern
        const scaledHealth = Math.round(newEnemy.health * Math.pow(1.5, defeatedEnemies));

        newEnemy.health = scaledHealth; // Optional, damit du später drauf zugreifen kannst
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

            // 👇 Gegnerzähler erhöhen
            setDefeatedEnemies(prev => prev + 1);

            // SOFORT neuen Gegner holen
            getNewEnemy();

            // Kein Timeout, kein Cleanup nötig, da der Zustand sich sofort ändert
            // und die Bedingung currentHealth <= 0 im nächsten Render nicht mehr zutrifft.
        }
    }, [currentHealth, enemy, onEnemyDefeated]); // Abhängigkeiten bleiben gleich


    // Effekt zum Entfernen von Schadenszahlen nach einer Weile
    useEffect(() => {
        const timers = damageNumbers.map(dn =>
            setTimeout(() => {
                setDamageNumbers(prev => prev.filter(num => num.id !== dn.id));
            }, 1000) // Zahl verschwindet nach 1 Sekunde
        );
        // Cleanup-Funktion, um Timer zu löschen, wenn die Komponente unmountet oder sich damageNumbers ändert
        return () => timers.forEach(clearTimeout);
    }, [damageNumbers]);


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
    const handleAttack = (event) => { // Event-Objekt hinzufügen
        // Nur angreifen, wenn Gegner existiert und Gesundheit > 0
        if (!enemy || currentHealth <= 0 || !enemyBoxRef.current) return;

        const critChance = 0.1; // 10% Krit-Chance
        let damageDealt = damagePerClick;
        let isCrit = false;

        if (Math.random() < critChance) {
            damageDealt = Math.round(damagePerClick * critMultiplier);
            isCrit = true;
            console.log("KRITISCHER TREFFER!", damageDealt); // Debugging
        }

        // Reduziere Gesundheit um den berechneten Schaden
        setCurrentHealth(prevHealth => Math.max(0, prevHealth - damageDealt));

        // Füge schwebende Schadenszahl hinzu
        const rect = enemyBoxRef.current.getBoundingClientRect(); // Position des Containers
        const clickX = event.clientX - rect.left; // X relativ zum Container
        const clickY = event.clientY - rect.top;  // Y relativ zum Container

        const newDamageNumber = {
            id: Date.now() + Math.random(), // Eindeutige ID
            value: damageDealt,
            isCrit: isCrit,
            x: clickX,
            y: clickY
        };
        setDamageNumbers(prev => [...prev, newDamageNumber]);


        // Reduziere die Bildgröße bei jedem Klick um 5% (weniger aggressiv)
        const newScale = Math.max(0.3, imageScale - 0.05); // Nicht kleiner als 30%
        // console.log(`Bild wird kleiner: ${imageScale} -> ${newScale}`); // Debugging (optional)
        setImageScale(newScale);
    };

    // Wenn noch kein Gegner geladen wurde
    if (!enemy) {
        return <div className='enemy-box'>Lade Gegner...</div>;
    }

    // Berechnung für den Lebensbalken
    const healthPercentage = enemy.health > 0 ? (currentHealth / enemy.health) * 100 : 0;

    return (
        // Ref zum Container hinzufügen und onClick anpassen
        <div ref={enemyBoxRef} className='enemy-box' draggable="false" userSelect="none" onClick={handleAttack} style={{ cursor: 'pointer', height: '500px', position: 'relative' }}> {/* Position relative für absolute Kinder */}
            {/* Schwebende Schadenszahlen rendern */}
            {damageNumbers.map(dn => (
                <span
                    key={dn.id}
                    className={`damage-number ${dn.isCrit ? 'crit-damage' : ''}`}
                    style={{
                        left: `${dn.x}px`, // Position X
                        top: `${dn.y}px`,  // Position Y
                    }}
                >
                    {dn.value}
                </span>
            ))}

            {/* Originaler Inhalt */}
            <div key={enemy.id} style={{ position: 'relative', width: '100%', height: '100%' }}>
                <h2 className="enemy-name">{enemy.name}</h2>

                {/* Dynamischer Lebensbalken */}
                <div className="fixed-health-bar-container">
                    <div
                        className="health-bar"
                        style={{ width: `${healthPercentage}%` }}
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
                        marginTop: '50px',
                        position: 'relative',
                        zIndex: 1 // Muss nicht mehr über anderen Elementen sein
                    }}
                >
                    <img
                        userSelect="none"
                        draggable="false"
                        src={enemy.image}
                        alt={enemy.name}
                        className="enemy-image animated-image"
                        style={{
                            transform: `scale(${imageScale})`,
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain'
                        }}
                    // onClick vom Bild entfernen, da der Container den Klick fängt
                    />
                </div>
            </div>
        </div>
    );
}
