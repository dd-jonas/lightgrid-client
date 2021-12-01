import { ghost, group } from './setup.js';

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
    [180, 190],
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
    [120, 110],
  ],
};

const states = {
  0: async () => await group.off(),
  1: async () => await group.on(),
  10: async () => ghost.walk(paths.jane),
  11: async () => ghost.walk(paths.mary),
};

export default states;
