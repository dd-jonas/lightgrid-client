import axios from 'axios';

import { baseUrl } from '../constants/index.js';

class Group {
  constructor(name) {
    this.name = name;
  }

  on() {
    return this.updateState({ on: true, bri: 255 });
  }

  off() {
    return this.updateState({ on: false, bri: 0 });
  }

  async updateState(state) {
    try {
      await axios.put(`${baseUrl}/groups/${this.name}/action`, state);
    } catch (error) {
      console.error(error);
    }
  }
}

export default Group;
