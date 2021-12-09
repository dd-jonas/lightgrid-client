import { ghost, group } from './setup.js';
import { sleep } from './utils/index.js';

const paths = {
  jane: [
    [0, 10],
    [33, 10],
    [66, 30],
    [99, 80],
    [132, 160],
    [165, 200],
    [198, 240],
    [231, 260],
    [270, 300],
  ],

  mary: [
    [280, 290],
    [200, 270],
    [180, 250],
    [150, 230],
    [130, 210],
    [110, 190],
    [60, 170],
    [30, 150],
    [10, 130],
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
    await sleep(100);
    await group.off(); 
    await ghost.walk(paths.jane);
    // await group.off();
    // res(0);
  },

  11: async (res) => {
    res(11);
    await sleep(100);
    await group.off();
    await ghost.walk(paths.mary);
    // await group.off();
    // res(0);
  },

  20: async (res) => {
    res(20);
    await group.on();
    for (let i = 0; i < 3; i++) {
      await group.off();
      await sleep(200);
      await group.on();
    }
    
    res(0);
  }
};

export default states;
