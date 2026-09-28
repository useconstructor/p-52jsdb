import { db } from '@/lib/db';

export async function GET() {
  await db.execute(`CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    price TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  )`);

  const { rows } = await db.execute('SELECT * FROM menu_items ORDER BY category, id');

  if (rows.length === 0) {
    const defaultItems = [
      { category: 'Café de Origen', name: 'Etiopía Yirgacheffe', description: 'Notas de frutas rojas y flores silvestres', price: 'Desde €4.50' },
      { category: 'Café de Origen', name: 'Kenia AA', description: 'Cuerpo suave con toques de cítrico y chocolate negro', price: 'Desde €4.50' },
      { category: 'Café de Origen', name: 'Colombia Geisha', description: 'Delicado, floral, es el graal para amantes de café raro', price: 'Desde €6.00' },
      { category: 'Lattes Signature', name: 'Latte Vainilla Tahitiana', description: 'Preparado con leche de coco y vainilla real de Madagascar', price: 'Desde €5.50' },
      { category: 'Lattes Signature', name: 'Oat Milk Caramelo', description: 'Cremoso, equilibrado con toques de caramelo de sal', price: 'Desde €5.00' },
      { category: 'Lattes Signature', name: 'Cappuccino Clásico', description: 'Perfecto balance entre espresso y espuma de leche tibia', price: 'Desde €4.00' },
      { category: 'Pasteles Artesanales', name: 'Croissant de Chocolate', description: 'Masas laminadas rellenas de chocolate belga 70%', price: 'Desde €3.50' },
      { category: 'Pasteles Artesanales', name: 'Tarta de Limón y Merengue', description: 'Cítrica, fresca, bañada en merengue italiano', price: 'Desde €4.50' },
      { category: 'Pasteles Artesanales', name: 'Brownies de Café', description: 'Intensos, fudgy, con granos molidos de nuestro café insignia', price: 'Desde €3.00' },
      { category: 'Sándwiches del Día', name: 'Focaccia de Prosciutto e Higos', description: 'Con queso de cabra y miel casera', price: 'Desde €8.50' },
      { category: 'Sándwiches del Día', name: 'Sándwich Vegano Verde', description: 'Hummus, aguacate, rúcula, tomate en pan integral', price: 'Desde €7.50' },
      { category: 'Sándwiches del Día', name: 'Combinado Jamón Serrano', description: 'Queso manchego, jamón ibérico, pimentón en pan de semillas', price: 'Desde €9.00' },
    ];

    for (const item of defaultItems) {
      await db.execute({
        sql: 'INSERT INTO menu_items (category, name, description, price) VALUES (?, ?, ?, ?)',
        args: [item.category, item.name, item.description, item.price],
      });
    }

    const { rows: newRows } = await db.execute('SELECT * FROM menu_items ORDER BY category, id');
    return Response.json(newRows);
  }

  return Response.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json();

  await db.execute(`CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    price TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  )`);

  await db.execute({
    sql: 'INSERT INTO menu_items (category, name, description, price) VALUES (?, ?, ?, ?)',
    args: [body.category, body.name, body.description ?? null, body.price ?? null],
  });

  return Response.json({ ok: true });
}
