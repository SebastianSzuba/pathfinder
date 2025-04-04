// EnemyData.js
export default function EnemyData() {
    const enemies = [
        {
            id: 1,
            name: "Snake",
            health: 100,
            image: "/public/snake.png",
            exp: 50,
            gold: 20
        },
        {
            id: 2,
            name: "Ghost",
            health: 200,
            image: "/public/ghost.png",
            exp: 100,
            gold: 50
        },
        {
            id: 3,
            name: "Dragon",
            health: 250,
            image: "/public/dragon.png",
            exp: 200,
            gold: 100
        }
    ];

    // Zufälligen Gegner auswählen
    const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];

    return randomEnemy; // Gibt den zufälligen Gegner zurück
}
