import React from 'react';
import './PlayerInfo.css';

// Empfängt gold und exp als Props
export default function PlayerInfo({ gold, exp }) {
    return (
        <div className='player-box'>
            <h3>Spielerwerte</h3>
            <div>
                <span>💰 Gold: {gold}</span>
            </div>
            <div>
                <span>✨ EXP: {exp}</span>
            </div>
            {/* Hier könnten später weitere Spielerinfos hinzukommen (z.B. Level, HP) */}
        </div>
    );
}
