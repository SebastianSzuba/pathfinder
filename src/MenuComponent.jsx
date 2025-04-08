import React from 'react';
import './MenuComponent.css';

// Empfängt nur noch die resetGameState Funktion als Prop
export default function MenuComponent({ resetGameState }) {

    // handleSave Funktion und Logik entfernt

    // handleReset ruft jetzt die übergebene Funktion auf
    const handleReset = () => {
        // Bestätigungsdialog hinzufügen (optional aber empfohlen)
        if (window.confirm('Möchtest du wirklich den Spielstand zurücksetzen? Alle Fortschritte gehen verloren!')) {
            resetGameState(); // Ruft die Funktion aus App.jsx auf
        }
    };

    return (
        <div className='menu-box'>
            <span>Menu</span>
            {/* Speicherbutton entfernt */}
            <button onClick={handleReset}>Reset Save</button>
        </div>
    );
}
