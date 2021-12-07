import { ghost, group } from './setup.js';
import { sleep } from './utils/index.js';

const paths = {
  jane: [
    [0, 10],
    [20, 30],
    [40, 50],
    [60, 70],
    [80, 90],
    [100, 110],
    [120, 130],
    [140, 150],
    [160, 170],
    [200, 180],
    [260, 190],
    [350, 210],
    [380, 170],
    [420, 130],
    [450, 110],
    [470, 100],
    [500, 90],
    [520, 80],
    [560, 80],
  ],
  mary: [
    [300, 290],
    [280, 270],
    [260, 250],
    [240, 230],
    [220, 210],
    [200, 190],
    [180, 170],
    [160, 150],
    [140, 130],
  ],
};

const states = {
  0: async (res) => {
    await group.off();
    res(0);
  },
  1: async (res) => {
    await group.on();
    res(1);
  },
  10: async (res) => {
    res(10);
    await group.off(); 
    await ghost.walk(paths.jane);
    await group.off();
    res(0);
  },
  11: async (res) => {
    res(11);
    await group.off();
    await ghost.walk(paths.mary);
    await group.off();
    res(0);
  }
};

export default states;
