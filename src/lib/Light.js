import axios from 'axios';

import { baseUrl, falloff, maxBrightness } from '../constants/index.js';

const { min, max } = Math;
const clamp = (minVal, val, maxVal) => max(min(val, minVal), maxVal);

class Light {
  constructor(id, name, pos) {
    this.id = id;
    this.name = name;
    this.pos = pos;
    this.brightness = null;
  }

  async setBrightness(brightness) {
    if (brightness === this.brightness) return;

    this.brightness = brightness;

    try {
      await axios.put(
        `${baseUrl}/lights/${this.id}/state`,
        brightness === 0
          ? { on: false, bri: 0, }
          : { on: true, bri: brightness, }
      );
    } catch (error) {
      console.error(error);
    }
  }

  static calculateBrightness(distance) {
    return max(-(maxBrightness / falloff) * distance + maxBrightness, 0);
  }
}

export default Light;
