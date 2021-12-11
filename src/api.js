import express, { json } from 'express';
import { JSONFile, Low } from 'lowdb';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Database
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, '../db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

await db.read();
db.data ??= { paths: [] };

// Middleware
app.use(json());

// Routes
app.get('/api/paths', async (req, res) => {
  const { paths } = db.data;

  return res.status(200).json({ paths });
});

app.put('/api/paths/:pathName', async (req, res, next) => {
  const { pathName } = req.params;
  const newPath = req.body;
  const { paths } = db.data;

  const path = paths.find((p) => p.name === pathName);
  if (!path) {
    return next(new Error(`No path found with name ${pathName}.`));
  }

  try {
    db.data.paths = paths.map((p) =>
      p.name === pathName ? { ...p, ...newPath } : p
    );

    await db.write();

    return res.status(200).json({ ...path, ...newPath });
  } catch (error) {
    return next(new Error('Failed to update path.'));
  }
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.message);
  return res.status(400).json({ error: err.message });
});

// Start the server
app.listen(3000, () => console.info('Server listening on port 3000.'));

// Stop the server
const closeServer = () => process.exit();
process.on('SIGINT', closeServer);
process.on('SIGTERM', closeServer);
