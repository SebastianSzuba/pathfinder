import React, { useState } from 'react';
import './PlayerInfo.css';

// Empfängt gold, exp, damagePerSecond, damagePerClick und buyWeapon als Props
export default function PlayerInfo({ gold, exp, damagePerSecond, damagePerClick, buyWeapon }) {
    // State für Erfolgsmeldungen beim Kauf
    const [purchaseMessage, setPurchaseMessage] = useState('');

    // Funktion zum Kaufen einer Waffe
    const handlePurchase = (name, cost, dpsIncrease, dpcIncrease) => {
        const success = buyWeapon(cost, dpsIncrease, dpcIncrease);
        if (success) {
            setPurchaseMessage(`Du hast ${name} gekauft!`);
            // Nachricht nach 3 Sekunden ausblenden
            setTimeout(() => setPurchaseMessage(''), 3000);
        } else {
            setPurchaseMessage('Nicht genug Gold!');
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

            {/* Shop-Bereich */}
            <div className="shop-section">
                <h3>🛒 Waffenshop</h3>

                {/* Kaufmeldung anzeigen, wenn vorhanden */}
                {purchaseMessage && (
                    <div className="purchase-message">{purchaseMessage}</div>
                )}

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
            </div>
        </div>
    );
}
