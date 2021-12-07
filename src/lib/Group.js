import axios from 'axios';

import { baseUrl } from '../constants/index.js';

class Group {
  constructor(id) {
    this.id = id;
  }

  on() {
    return this.updateState({ on: true, bri: 255 });
  }

  off() {
    return this.updateState({ on: false });
  }

  setBrightness(brightness) {
    return this.updateState({ bri: brightness, transitiontime: 0 });
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
