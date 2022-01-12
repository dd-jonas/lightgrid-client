import { JSONFile, Low } from 'lowdb';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, '../db.json');
const adapter = new JSONFile(file);

const db = new Low(adapter);

export const getPathByName = async (name) => {
  await db.read();

  const { paths } = db.data;
  return paths?.find((path) => path.name === name);
};
