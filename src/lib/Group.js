import axios from 'axios';

import { baseUrl, maxBrightness } from '../constants/index.js';
import { sleep } from '../utils/index.js';

class Group {
  constructor(id) {
    this.id = id;
  }

  on() {
    return this.updateState({ on: true, bri: maxBrightness });
  }

  off() {
    return this.updateState({ on: false });
  }

  setBrightness(brightness) {
    return this.updateState({ bri: brightness, transitiontime: 0 });
  }

  async flicker(n) {
    try {
      for (let i = 0; i < n; i++) {
        await this.updateState({ on: true, bri: maxBrightness, transitiontime: 0 });
        await sleep(500);
        await this.updateState({ on: true, bri: 50, transitiontime: 0 });
        await sleep(500);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async updateState(state) {
    try {
      await axios.put(`${baseUrl}/groups/${this.id}/action`, state);
    } catch (error) {
      console.error(error);
    }
  }
}

export default Group;
