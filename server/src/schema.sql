CREATE TABLE IF NOT EXISTS heroes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  cost INTEGER NOT NULL,
  origin TEXT,
  classes TEXT,
  skill_name TEXT,
  skill_description TEXT
);

CREATE TABLE IF NOT EXISTS skill_scaling (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  hero_id INTEGER,
  star_level TEXT,
  key TEXT,
  value REAL,
  FOREIGN KEY(hero_id) REFERENCES heroes(id)
);

CREATE TABLE IF NOT EXISTS attributes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  hero_id INTEGER,
  star_level TEXT,
  hp INTEGER,
  physical_atk INTEGER,
  magic_atk INTEGER,
  atk_speed REAL,
  atk_range INTEGER,
  initial_mana INTEGER,
  mana_cap INTEGER,
  FOREIGN KEY(hero_id) REFERENCES heroes(id)
);