// EnemyData.js
export default function EnemyData() {
    const enemies = [
        { id: 1, name: "Snake", health: 100, image: "/snake.png", exp: 50, gold: 20 },
        { id: 2, name: "Ghost", health: 200, image: "/ghost.png", exp: 100, gold: 50 },
        { id: 3, name: "Dragon", health: 250, image: "/dragon.png", exp: 200, gold: 100 },
        { id: 4, name: "Goblin", health: 120, image: "/goblin.png", exp: 60, gold: 25 },
    ];

    // Zufälligen Gegner auswählen
    const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];

    return randomEnemy; // Gibt den zufälligen Gegner zurück
}

/*      { id: 5, name: "Zombie", health: 150, image: "/zombie.png", exp: 80, gold: 30 },
        { id: 6, name: "Skeleton", health: 130, image: "/skeleton.png", exp: 70, gold: 28 },
        { id: 7, name: "Bat", health: 90, image: "/bat.png", exp: 40, gold: 15 },
        { id: 8, name: "Slime", health: 110, image: "/slime.png", exp: 55, gold: 22 },
        { id: 9, name: "Imp", health: 140, image: "/imp.png", exp: 75, gold: 35 },
        { id: 10, name: "Troll", health: 180, image: "/troll.png", exp: 95, gold: 45 },
        { id: 11, name: "Orc", health: 220, image: "/orc.png", exp: 120, gold: 60 },
        { id: 12, name: "Werewolf", health: 240, image: "/werewolf.png", exp: 140, gold: 75 },
        { id: 13, name: "Witch", health: 230, image: "/witch.png", exp: 135, gold: 70 },
        { id: 14, name: "Golem", health: 300, image: "/golem.png", exp: 160, gold: 90 },
        { id: 15, name: "Vampire", health: 280, image: "/vampire.png", exp: 170, gold: 100 },
        { id: 16, name: "Harpy", health: 200, image: "/harpy.png", exp: 110, gold: 55 },
        { id: 17, name: "Minotaur", health: 310, image: "/minotaur.png", exp: 180, gold: 110 },
        { id: 18, name: "Basilisk", health: 260, image: "/basilisk.png", exp: 150, gold: 85 },
        { id: 19, name: "Wraith", health: 270, image: "/wraith.png", exp: 155, gold: 90 },
        { id: 20, name: "Demon", health: 350, image: "/demon.png", exp: 220, gold: 130 },
        { id: 21, name: "Hellhound", health: 320, image: "/hellhound.png", exp: 200, gold: 120 },
        { id: 22, name: "Chimera", health: 380, image: "/chimera.png", exp: 230, gold: 135 },
        { id: 23, name: "Manticore", health: 400, image: "/manticore.png", exp: 250, gold: 150 },
        { id: 24, name: "Dark Knight", health: 420, image: "/darkknight.png", exp: 260, gold: 160 },
        { id: 25, name: "Necromancer", health: 390, image: "/necromancer.png", exp: 240, gold: 145 },
        { id: 26, name: "Cyclops", health: 360, image: "/cyclops.png", exp: 210, gold: 125 },
        { id: 27, name: "Specter", health: 280, image: "/specter.png", exp: 150, gold: 90 },
        { id: 28, name: "Shade", health: 300, image: "/shade.png", exp: 165, gold: 95 },
        { id: 29, name: "Griffin", health: 330, image: "/griffin.png", exp: 190, gold: 110 },
        { id: 30, name: "Elemental", health: 370, image: "/elemental.png", exp: 220, gold: 130 },
        { id: 31, name: "Behemoth", health: 450, image: "/behemoth.png", exp: 280, gold: 170 },
        { id: 32, name: "Lich", health: 430, image: "/lich.png", exp: 270, gold: 165 },
        { id: 33, name: "Hydra", health: 470, image: "/hydra.png", exp: 300, gold: 180 },
        { id: 34, name: "Phoenix", health: 500, image: "/phoenix.png", exp: 320, gold: 190 },
        { id: 35, name: "Kraken", health: 550, image: "/kraken.png", exp: 350, gold: 200 },
        { id: 36, name: "Banshee", health: 260, image: "/banshee.png", exp: 140, gold: 80 },
        { id: 37, name: "Djinn", health: 340, image: "/djinn.png", exp: 200, gold: 120 },
        { id: 38, name: "Cerberus", health: 460, image: "/cerberus.png", exp: 290, gold: 175 },
        { id: 39, name: "Succubus", health: 310, image: "/succubus.png", exp: 185, gold: 105 },
        { id: 40, name: "Warlock", health: 390, image: "/warlock.png", exp: 240, gold: 140 },
        { id: 41, name: "Archdemon", health: 600, image: "/archdemon.png", exp: 400, gold: 250 },
        { id: 42, name: "Titan", health: 650, image: "/titan.png", exp: 450, gold: 280 },
        { id: 43, name: "Death Knight", health: 500, image: "/deathknight.png", exp: 350, gold: 220 } */