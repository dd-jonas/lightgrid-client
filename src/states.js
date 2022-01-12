import { getPathByName } from './db.js';
import { ghost, group, lights } from './setup.js';
import { sleep } from './utils/index.js';

const DRAMATIC_PAUSE_DURATION = 2000;

const findLightByName = (name) => lights.find((light) => light.name === name);

const turnOnSingleLight = async (name) => {
  const light = findLightByName(name);

  await group.off();
  await light.on();
};

const states = {
  // Inactive
  0: async (res) => {
    await group.off();
    res(0);
  },

  // Active
  1: async (res) => {
    await group.on();
    res(1);
  },

  // Start
  10: async (res) => {
    const ceilingLight = findLightByName('ceiling');

    await group.off();
    await sleep(100);
    await ceilingLight.on();

    res(10);
  },

  // John seance (failed)
  11: async (res) => {
    res(11);

    await group.off();
    await sleep(DRAMATIC_PAUSE_DURATION * 2);
    await group.flicker(5);
    await sleep(500);

    await states[12](res);
  },

  // Jane search
  12: async (res) => {
    await group.on();
    res(12);
  },

  // Jane seance
  13: async (res) => {
    res(13);

    const jane = await getPathByName('Jane');

    await group.off();
    await sleep(DRAMATIC_PAUSE_DURATION);
    await ghost.walk(jane);

    await states[14](res);
  },

  // Jane waiting by tv
  14: async (res) => {
    const tvLight = findLightByName('tv-left');

    await tvLight.on();
    res(14);
  },

  // Mary search
  15: async (res) => {
    await group.on();
    res(15);
  },

  // Mary seance
  16: async (res) => {
    res(16);

    const mary = await getPathByName('Mary');

    await group.off();
    await sleep(DRAMATIC_PAUSE_DURATION);
    await ghost.walk(mary);

    await states[17](res);
  },

  // Mary waiting by tv
  17: async (res) => {
    const tvLight = findLightByName('tv-right');

    await tvLight.on();
    res(17);
  },

  // John search
  18: async (res) => {
    await group.on();
    res(18);
  },

  // John seance
  19: async (res) => {
    res(19);

    const john = await getPathByName('John');

    await group.off();
    await sleep(DRAMATIC_PAUSE_DURATION);
    await ghost.walk(john);

    await states[20](res);
  },

  // John waiting by tv
  20: async (res) => {
    const tvLightLeft = findLightByName('tv-left');
    const tvLightRight = findLightByName('tv-right');

    await tvLightLeft.on();
    await tvLightRight.on();
    res(20);
  },

  // End reunion
  21: async (res) => {
    res(21);

    const maryLight = findLightByName('chest');
    const janeLight = findLightByName('makeup');
    const johnLight = findLightByName('desk');
    const ceilingLight = findLightByName('ceiling');

    await group.off();

    await janeLight.setBrightness(255, 30);
    await sleep(DRAMATIC_PAUSE_DURATION);
    await maryLight.setBrightness(255, 30);
    await sleep(DRAMATIC_PAUSE_DURATION);
    await johnLight.setBrightness(255, 30);
    await sleep(DRAMATIC_PAUSE_DURATION);

    await Promise.all([
      janeLight.off(15),
      maryLight.off(15),
      johnLight.off(15),
      ceilingLight.setBrightness(255, 30),
    ]);

    await sleep(DRAMATIC_PAUSE_DURATION);
    await ceilingLight.off(DRAMATIC_PAUSE_DURATION);
    await sleep(DRAMATIC_PAUSE_DURATION * 2);

    await states[2341](res);
  },

  // WIN
  2341: async (res) => {
    await group.on();
    res(2341);
  },

  //
  // Test states
  //
  201: async (res) => {
    await turnOnSingleLight('chest');
    res(201);
  },

  202: async (res) => {
    await turnOnSingleLight('desk');
    res(202);
  },

  203: async (res) => {
    await turnOnSingleLight('wall-south');
    res(203);
  },

  204: async (res) => {
    await turnOnSingleLight('wall-east');
    res(204);
  },

  205: async (res) => {
    await turnOnSingleLight('bookcase');
    res(205);
  },

  206: async (res) => {
    await turnOnSingleLight('standing');
    res(206);
  },

  207: async (res) => {
    await turnOnSingleLight('makeup');
    res(207);
  },

  208: async (res) => {
    await turnOnSingleLight('tv-left');
    res(208);
  },

  209: async (res) => {
    await turnOnSingleLight('tv-right');
    res(209);
  },

  210: async (res) => {
    await turnOnSingleLight('ceiling');
    res(210);
  },
};

export default states;
