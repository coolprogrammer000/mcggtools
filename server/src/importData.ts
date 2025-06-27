const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

// Load heroes.json
const heroes = JSON.parse(fs.readFileSync("../server/data/heroes.json", 'utf-8'));

// Create SQLite DB
const db = new sqlite3.Database('heroes.db');

db.serialize(() => {
  // Drop old table if exists
  db.run(`DROP TABLE IF EXISTS heroes`);

  // Create new heroes table
  db.run(`
    CREATE TABLE heroes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      cost INTEGER,
      faction TEXT,
      role TEXT,
      skill_name TEXT,
      skill_description TEXT,
      scaling TEXT,
      attributes TEXT
    )
  `);

  const stmt = db.prepare(`
    INSERT INTO heroes (name, cost, faction, role, skill_name, skill_description, scaling, attributes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const hero of heroes) {
    stmt.run(
      hero.name,
      hero.cost,
      hero.faction,
      JSON.stringify(hero.role),
      hero.skill.name,
      hero.skill.description,
      JSON.stringify(hero.skill.scaling),
      JSON.stringify(hero.attributes)
    );
  }

  stmt.finalize();
});

db.close(() => {
  console.log("heroes.db created successfully.");
});