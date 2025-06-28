import express from 'express';
import cors from 'cors';
import path from 'path';
import { initDB } from './db';
import api from './routes';

(async () => {
  await initDB();                 
  const app = express();
  const PORT = process.env.PORT ?? 5000;

  app.use(cors());
  app.use(express.json());
  app.use('/api', api);          

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('../build')));
    app.get('*', (_, res) =>
      res.sendFile(path.resolve('../build/index.html'))
    );
  }

  app.listen(PORT, () => console.log(`API ready on http://localhost:${PORT}`));
})();
