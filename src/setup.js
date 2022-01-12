import { lightsData } from './config/index.js';
import { Ghost, Group, Light } from './lib/index.js';
import { distance } from './utils/index.js';

const ghost = new Ghost();
const group = new Group(1);
const lights = lightsData.map(({ id, name, pos }) => new Light(id, name, pos));

lights.forEach((light) => {
  ghost.interactWithPresence((pos) => {
    const d = distance(pos, light.pos);
    const brightness = Light.calculateBrightness(d);
    light.setBrightness(brightness);
  });
});

export { ghost, group, lights };
