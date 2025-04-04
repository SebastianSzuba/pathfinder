import React from 'react';
import './PlayerInfo.css';

// Empfängt gold, exp, damagePerSecond und damagePerClick als Props
export default function PlayerInfo({ gold, exp, damagePerSecond, damagePerClick }) {
    return (
        <div className='player-box'>
            <h3>Spielerwerte</h3>
            <div>
                <span>💰 Gold: {gold}</span>
            </div>
            <div>
                <span>✨ EXP: {exp}</span>
            </div>
            <div>
                <span>🔥 DPS: {damagePerSecond}</span>
            </div>
            <div>
                <span>👆 DPC: {damagePerClick}</span>
            </div>
        </div>
    );
}
