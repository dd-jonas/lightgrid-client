import { ghost, group, lights } from './setup.js';
import { sleep } from './utils/index.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { JSONFile, Low } from 'lowdb';
import { maxBrightness } from './constants/index.js';

// Database
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, '../db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

const findLight = (id) => lights.find((light) => light.id === id);

const states = {
  0: async (res) => {
    await group.off();
    res(0);
  },

  1: async (res) => {
    await group.on();
    res(1);
  },

  // Startfase
  10: async (res) => {
    await group.off();
    await findLight(13).setBrightness(maxBrightness); // TODO: find id of ceiling light
    res(10);
  },
  
  // Seance John 1
  11: async (res) => {
    res(11);
    await group.off();
    await sleep(5000);
    await group.flicker(5);
    await sleep(500);
    await states[12](res);
  },
  
  // Search Jane
  12: async (res) => {
    await group.on();
    res(12);
  },
  
  // Seance Jane
  13: async (res) => {
    res(13);

    await db.read();
    const { paths } = db.data;
    const jane = paths.find(path => path.name === 'Jane');

    await group.off();
    await sleep(2000);
    await ghost.walk(jane.points);

    await states[14](res);
  },

  // Jane waiting at the tv
  14: async (res) => {
    await findLight(11).setBrightness(maxBrightness);
    res(14);
  },
  
  // Search Mary
  15: async (res) => {
    await group.on();
    res(15);
  },
  
  // Seance Mary
  16: async (res) => {
    res(16);

    await db.read();
    const { paths } = db.data;
    const mary = paths.find(path => path.name === 'Mary');

    await group.off();
    await sleep(2000);
    await ghost.walk(mary.points);

    await states[17](res);
  },

  // Mary waiting at the tv
  17: async (res) => {
    await findLight(11).setBrightness(maxBrightness);
    res(17);
  },

  // ???
  
  // Seance John 2
  18: async (res) => {
    await group.on();
    res(18);
  },
  
  // Endfase
  19: async (res) => {
    await group.on();
    res(19);
  },
};

export default states;
