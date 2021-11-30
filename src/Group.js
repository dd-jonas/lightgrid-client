import axios from 'axios';
import { baseUrl } from './const.js';

class Group {
  constructor(name) {
    this.name = name;
  }

  async on() {
    try {
      await axios.put(`${baseUrl}/groups/${this.name}/action`, {
        on: true,
        bri: 255
      });
    } catch (error) {
      console.error(error);
    }
  }
}