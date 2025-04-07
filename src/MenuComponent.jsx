


import React from 'react';
import './MenuComponent.css';

// Empfängt die Zustandsdaten als Props
export default function MenuComponent({ playerGold, playerExp, damagePerSecond, damagePerClick }) {

    const handleSave = () => {
        const gameState = {
            playerGold,
            playerExp,
            damagePerSecond,
            damagePerClick
        };
        try {
            localStorage.setItem('pathfinderGameState', JSON.stringify(gameState));
            console.log('Spielstand gespeichert:', gameState);
            alert('Spielstand gespeichert!'); // Einfaches Feedback
        } catch (error) {
            console.error('Fehler beim Speichern des Spielstands:', error);
            alert('Fehler beim Speichern!');
        }
    };

    const handleReset = () => {
        try {
            localStorage.removeItem('pathfinderGameState');
            console.log('Gespeicherter Spielstand gelöscht.');
            alert('Gespeicherter Spielstand gelöscht!'); // Einfaches Feedback
        } catch (error) {
            console.error('Fehler beim Löschen des Spielstands:', error);
            alert('Fehler beim Löschen!');
        }
    };

    return (
        <div className='menu-box'>
            <span>Menu</span>
            <button onClick={handleSave}>Speichern</button>
            <button onClick={handleReset}>Reset Save</button> {/* Geänderter Text zur Klarheit */}
        </div>
    );
}
