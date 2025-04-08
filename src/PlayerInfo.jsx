import React, { useState } from 'react';
import './PlayerInfo.css';

// Empfängt Props, erweitert um Krit-Werte und Upgrade-Funktion
export default function PlayerInfo({
    gold,
    exp,
    damagePerSecond,
    damagePerClick,
    critMultiplier, // Neu
    critUpgradeCost, // Neu
    buyWeapon,
    buyCritUpgrade // Neu
}) {
    // State für Erfolgsmeldungen beim Kauf (kann für beide Käufe genutzt werden)
    const [purchaseMessage, setPurchaseMessage] = useState('');

    // Funktion zum Kaufen einer Waffe
    const handlePurchase = (name, cost, dpsIncrease, dpcIncrease) => {
        const success = buyWeapon(cost, dpsIncrease, dpcIncrease);
        if (success) {
            setPurchaseMessage(`Du hast ${name} gekauft!`);
            // Nachricht nach 3 Sekunden ausblenden
            setTimeout(() => setPurchaseMessage(''), 3000);
        }
    };

    // Funktion zum Kaufen eines Krit-Upgrades
    const handleCritUpgradePurchase = (name, cost, multiplierIncrease) => {
        const success = buyCritUpgrade(cost, multiplierIncrease); // Ruft die neue Funktion auf
        if (success) {
            setPurchaseMessage(`Du hast ${name} gekauft! Krit-Multiplikator erhöht.`);
            // Nachricht nach 3 Sekunden ausblenden
            setTimeout(() => setPurchaseMessage(''), 3000);
        }
    };

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
            <div>
                <span>💥 Krit-Multiplikator: {critMultiplier.toFixed(1)}x</span> {/* Anzeige Krit-Multiplikator */}
            </div>

            {/* Shop-Bereich */}
            <div className="shop-section">
                <h3>🛒 Waffenshop</h3>

                {/* Container für Kaufmeldung mit relativer Positionierung */}
                <div className="purchase-message-container">
                    {/* Kaufmeldung anzeigen, wenn vorhanden */}
                    {purchaseMessage && (
                        <div className="purchase-message">{purchaseMessage}</div>
                    )}
                </div>

                <div className="weapons-container">
                    <h4>DPS-Waffen</h4>
                    <div className="weapon-item">
                        <span>🗡️ Dolch (+1 DPS)</span>
                        <button
                            onClick={() => handlePurchase('Dolch', 50, 1, 0)}
                            disabled={gold < 50}
                            className={gold < 50 ? 'disabled' : ''}
                        >
                            Kaufen 💰 50
                        </button>
                    </div>

                    <div className="weapon-item">
                        <span>⚔️ Schwert (+3 DPS)</span>
                        <button
                            onClick={() => handlePurchase('Schwert', 150, 3, 0)}
                            disabled={gold < 150}
                            className={gold < 150 ? 'disabled' : ''}
                        >
                            Kaufen 💰 150
                        </button>
                    </div>

                    <div className="weapon-item">
                        <span>🪄 Zauberstab (+5 DPS)</span>
                        <button
                            onClick={() => handlePurchase('Zauberstab', 300, 5, 0)}
                            disabled={gold < 300}
                            className={gold < 300 ? 'disabled' : ''}
                        >
                            Kaufen 💰 300
                        </button>
                    </div>

                    <h4>DPC-Waffen</h4>

                    <div className="weapon-item">
                        <span>🦴 Knochen (+1 DPC)</span>
                        <button
                            onClick={() => handlePurchase('Knochen', 50, 0, 1)}
                            disabled={gold < 50}
                            className={gold < 50 ? 'disabled' : ''}
                        >
                            Kaufen 💰 50
                        </button>
                    </div>

                    <div className="weapon-item">
                        <span>🧤 Handschuhe (+2 DPC)</span>
                        <button
                            onClick={() => handlePurchase('Handschuhe', 75, 0, 2)}
                            disabled={gold < 75}
                            className={gold < 75 ? 'disabled' : ''}
                        >
                            Kaufen 💰 75
                        </button>
                    </div>

                    <div className="weapon-item">
                        <span>🪓 Axt (+5 DPC)</span>
                        <button
                            onClick={() => handlePurchase('Axt', 200, 0, 5)}
                            disabled={gold < 200}
                            className={gold < 200 ? 'disabled' : ''}
                        >
                            Kaufen 💰 200
                        </button>
                    </div>

                    <div className="weapon-item">
                        <span>🔨 Hammer (+10 DPC)</span>
                        <button
                            onClick={() => handlePurchase('Hammer', 500, 0, 10)}
                            disabled={gold < 500}
                            className={gold < 500 ? 'disabled' : ''}
                        >
                            Kaufen 💰 500
                        </button>
                    </div>
                </div>

                {/* Krit-Upgrade Bereich */}
                <h4>✨ Upgrades</h4>
                <div className="weapon-item">
                    <span>Krit-Multiplikator (+0.2x)</span>
                    <button
                        onClick={() => handleCritUpgradePurchase('Krit-Upgrade', critUpgradeCost, 0.2)}
                        disabled={gold < critUpgradeCost}
                        className={gold < critUpgradeCost ? 'disabled' : ''}
                    >
                        Kaufen 💰 {critUpgradeCost} {/* Dynamische Kosten */}
                    </button>
                </div>
            </div>
        </div>
    );
}
