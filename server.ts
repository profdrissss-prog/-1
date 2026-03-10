import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("electro.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_ar TEXT NOT NULL,
    name_fr TEXT NOT NULL,
    description_ar TEXT,
    description_fr TEXT,
    price REAL NOT NULL,
    image_url TEXT,
    category_ar TEXT,
    category_fr TEXT,
    is_best_seller INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    quantity INTEGER,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);

// Seed initial data if empty
const productCount = db.prepare("SELECT COUNT(*) as count FROM products").get() as { count: number };
if (productCount.count === 0) {
  const insert = db.prepare(`
    INSERT INTO products (name_ar, name_fr, description_ar, description_fr, price, image_url, category_ar, category_fr, is_best_seller)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  insert.run("آيفون 15 برو", "iPhone 15 Pro", "أحدث هاتف من آبل مع كاميرا احترافية", "Le dernier iPhone d'Apple avec un appareil photo professionnel", 12000, "https://picsum.photos/seed/iphone/400/400", "هواتف", "Téléphones", 1);
  insert.run("سماعات سوني XM5", "Sony XM5 Headphones", "سماعات عازلة للضوضاء بجودة عالية", "Casque à réduction de bruit de haute qualité", 3500, "https://picsum.photos/seed/sony/400/400", "سماعات", "Écouteurs", 1);
  insert.run("شاحن سريع 65 واط", "Fast Charger 65W", "شاحن سريع متوافق مع جميع الأجهزة", "Chargeur rapide compatible avec tous les appareils", 450, "https://picsum.photos/seed/charger/400/400", "شواحن", "Chargeurs", 0);
  insert.run("بلايستيشن 5", "PlayStation 5", "جهاز الألعاب الأقوى من سوني", "La console de jeu la plus puissante de Sony", 5500, "https://picsum.photos/seed/ps5/400/400", "أجهزة ألعاب", "Consoles", 1);
}

const settingsCount = db.prepare("SELECT COUNT(*) as count FROM settings").get() as { count: number };
if (settingsCount.count === 0) {
  const insert = db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)");
  insert.run("currency_ar", "د.م.");
  insert.run("currency_fr", "DH");
  insert.run("primary_color", "#2563eb"); // blue-600
  insert.run("secondary_color", "#1e3a8a"); // blue-900
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/products", (req, res) => {
    const products = db.prepare("SELECT * FROM products").all();
    res.json(products);
  });

  app.get("/api/settings", (req, res) => {
    const settings = db.prepare("SELECT * FROM settings").all();
    const settingsMap = settings.reduce((acc: any, curr: any) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.json(settingsMap);
  });

  app.post("/api/settings", (req, res) => {
    const { settings, admin_token } = req.body;
    if (admin_token !== "electro_admin_2026") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const upsert = db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");
    const transaction = db.transaction((data) => {
      for (const [key, value] of Object.entries(data)) {
        upsert.run(key, value);
      }
    });
    transaction(settings);
    res.json({ success: true });
  });

  app.post("/api/products", (req, res) => {
    const { name_ar, name_fr, description_ar, description_fr, price, image_url, category_ar, category_fr, is_best_seller, admin_token } = req.body;
    
    // Simple admin protection
    if (admin_token !== "electro_admin_2026") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const insert = db.prepare(`
      INSERT INTO products (name_ar, name_fr, description_ar, description_fr, price, image_url, category_ar, category_fr, is_best_seller)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = insert.run(name_ar, name_fr, description_ar, description_fr, price, image_url, category_ar, category_fr, is_best_seller ? 1 : 0);
    res.json({ id: result.lastInsertRowid });
  });

  app.delete("/api/products/:id", (req, res) => {
    const { admin_token } = req.body;
    if (admin_token !== "electro_admin_2026") {
      return res.status(403).json({ error: "Unauthorized" });
    }
    
    const { id } = req.params;
    db.prepare("DELETE FROM products WHERE id = ?").run(id);
    res.json({ success: true });
  });

  app.post("/api/orders", (req, res) => {
    const { product_id, quantity, full_name, phone, address } = req.body;
    const insert = db.prepare(`
      INSERT INTO orders (product_id, quantity, full_name, phone, address)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = insert.run(product_id, quantity, full_name, phone, address);
    res.json({ id: result.lastInsertRowid });
  });

  app.get("/api/orders", (req, res) => {
    const { admin_token } = req.query;
    if (admin_token !== "electro_admin_2026") {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const orders = db.prepare(`
      SELECT o.*, p.name_ar, p.name_fr 
      FROM orders o 
      LEFT JOIN products p ON o.product_id = p.id
      ORDER BY o.created_at DESC
    `).all();
    res.json(orders);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
