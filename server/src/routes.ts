import { Router, Request, Response } from 'express';
import { db } from './db';

const router = Router();

/* GET all */
router.get('/items', async (_, res: Response) => {
  const rows = await db.all('SELECT * FROM items');
  res.json(rows);
});

/* POST add */
router.post('/items', async (req: Request<{}, {}, { name: string }>, res) => {
  const { name } = req.body;
  const { lastID } = await db.run('INSERT INTO items (name) VALUES (?)', name);
  res.status(201).json({ id: lastID, name });
});

/* DELETE by id */
router.delete('/items/:id', async (req, res) => {
  await db.run('DELETE FROM items WHERE id = ?', req.params.id);
  res.status(204).end();
});

export default router;