import { lightsData } from "./const.js";
import Light from "./Light.js";
import distance from "./utils/distance.js";
import sleep from "./utils/sleep.js";

const lights = lightsData.map(({ id, name, pos }) => (
    new Light(id, name, pos)
));

const calculateDimValues = (ghost) => {
    lights.forEach((light) => {
      const d = distance(ghost, light.pos);
      const falloff = 75; // Max distance in cm to trigger light
      const maxBri = 255;
      const bri = Math.max(-(maxBri / falloff) * d + maxBri, 0);
      console.log(bri);
      
      light.setBrightness(bri);
    });
}

const step = 5;

const main = async () => {
  const ghost = [0, 100];
  while (true) {
    calculateDimValues(ghost);
    ghost[0] += step;
    console.log(ghost);
    await sleep(50);

    if (ghost[0] > 600) break;
  }
}

main();

//calculateDimValues([300, 250]);
