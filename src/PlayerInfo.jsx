import React, { useState } from 'react';
import './PlayerInfo.css';

// Empfängt Props, erweitert um Krit-Werte, Waffenpreise und Upgrade-Funktion
export default function PlayerInfo({
    gold,
    exp,
    damagePerSecond,
    damagePerClick,
    critMultiplier, // Neu
    critUpgradeCost, // Neu
    weaponPrices, // Neu: Objekt mit allen Waffenpreisen
    buyWeapon,
    buyCritUpgrade // Neu
}) {
    // State für Erfolgsmeldungen beim Kauf (kann für beide Käufe genutzt werden)
    const [purchaseMessage, setPurchaseMessage] = useState('');

    // Funktion zum Kaufen einer Waffe
    const handlePurchase = (weaponId, name, cost, dpsIncrease, dpcIncrease) => {
        const success = buyWeapon(weaponId, cost, dpsIncrease, dpcIncrease);
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
                            onClick={() => handlePurchase('dagger', 'Dolch', weaponPrices.dagger, 1, 0)}
                            disabled={gold < weaponPrices.dagger}
                            className={gold < weaponPrices.dagger ? 'disabled' : ''}
                        >
                            Kaufen 💰 {weaponPrices.dagger}
                        </button>
                    </div>

                    <div className="weapon-item">
                        <span>⚔️ Schwert (+3 DPS)</span>
                        <button
                            onClick={() => handlePurchase('sword', 'Schwert', weaponPrices.sword, 3, 0)}
                            disabled={gold < weaponPrices.sword}
                            className={gold < weaponPrices.sword ? 'disabled' : ''}
                        >
                            Kaufen 💰 {weaponPrices.sword}
                        </button>
                    </div>

                    <div className="weapon-item">
                        <span>🪄 Zauberstab (+5 DPS)</span>
                        <button
                            onClick={() => handlePurchase('wand', 'Zauberstab', weaponPrices.wand, 5, 0)}
                            disabled={gold < weaponPrices.wand}
                            className={gold < weaponPrices.wand ? 'disabled' : ''}
                        >
                            Kaufen 💰 {weaponPrices.wand}
                        </button>
                    </div>

                    <h4>DPC-Waffen</h4>

                    <div className="weapon-item">
                        <span>🦴 Knochen (+1 DPC)</span>
                        <button
                            onClick={() => handlePurchase('bone', 'Knochen', weaponPrices.bone, 0, 1)}
                            disabled={gold < weaponPrices.bone}
                            className={gold < weaponPrices.bone ? 'disabled' : ''}
                        >
                            Kaufen 💰 {weaponPrices.bone}
                        </button>
                    </div>

                    <div className="weapon-item">
                        <span>🧤 Handschuhe (+2 DPC)</span>
                        <button
                            onClick={() => handlePurchase('gloves', 'Handschuhe', weaponPrices.gloves, 0, 2)}
                            disabled={gold < weaponPrices.gloves}
                            className={gold < weaponPrices.gloves ? 'disabled' : ''}
                        >
                            Kaufen 💰 {weaponPrices.gloves}
                        </button>
                    </div>

                    <div className="weapon-item">
                        <span>🪓 Axt (+5 DPC)</span>
                        <button
                            onClick={() => handlePurchase('axe', 'Axt', weaponPrices.axe, 0, 5)}
                            disabled={gold < weaponPrices.axe}
                            className={gold < weaponPrices.axe ? 'disabled' : ''}
                        >
                            Kaufen 💰 {weaponPrices.axe}
                        </button>
                    </div>

                    <div className="weapon-item">
                        <span>🔨 Hammer (+10 DPC)</span>
                        <button
                            onClick={() => handlePurchase('hammer', 'Hammer', weaponPrices.hammer, 0, 10)}
                            disabled={gold < weaponPrices.hammer}
                            className={gold < weaponPrices.hammer ? 'disabled' : ''}
                        >
                            Kaufen 💰 {weaponPrices.hammer}
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
