import axios from 'axios';

import * as config from '../config/index.js';

const { min, max, round } = Math;
const clamp = (minVal, val, maxVal) => max(min(val, minVal), maxVal);

class Light {
  constructor(id, name, pos) {
    this.id = id;
    this.name = name;
    this.pos = pos;
    this.brightness = null;
  }

  /**
   * Turn the light on
   */
  async on() {
    await this.setState({ on: true, bri: config.maxBrightness });
  }

  /**
   * Turn the light off
   */
  async off(transitiontime = 0) {
    if (transitiontime > 0) {
      await this.setBrightness(0, transitiontime);
    }

    await this.setState({ on: false });
  }

  /**
   * Update the light's brightness
   * @param {number} brightness 0-255
   * @param {number} transitiontime in 1/10 seconds
   */
  async setBrightness(brightness, transitiontime = 0) {
    if (brightness === this.brightness) return;

    this.brightness = brightness;

    await this.setState({ on: true, bri: brightness, transitiontime });
  }

  /**
   * Update the light's state
   * @param {*} options https://dresden-elektronik.github.io/deconz-rest-doc/endpoints/lights/#parameters_2
   */
  async setState(options = {}) {
    try {
      await axios.put(`${config.baseUrl}/lights/${this.id}/state`, options);
    } catch (error) {
      console.error(error);
    }
  }

  static calculateBrightness(distance) {
    const falloff = max(config.falloff, 0);
    const maxBrightness = clamp(0, config.maxBrightness, 255);

    const brightness = round(
      -(maxBrightness / falloff) * distance + maxBrightness
    );
    return max(brightness, 0);
  }
}

export default Light;
