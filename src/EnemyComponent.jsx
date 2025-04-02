import './EnemyComponent.css';
import React from 'react';
import EnemyData from './EnemyData';

export default function EnemyComponent() {
    const randomEnemy = EnemyData(); // Zufälligen Gegner erhalten

    return (
        <div className='enemy-box'>

            <div key={randomEnemy.id}>
                <h2>{randomEnemy.name}</h2>


                {/* Rote Linie für den Lebensbalken */}
                <div className="health-line" >
                    <div className="health-text">
                        {randomEnemy.health} / {randomEnemy.health}
                    </div>
                </div>
                <img src={randomEnemy.image} alt={randomEnemy.name} />
            </div>
        </div>
    );
}
