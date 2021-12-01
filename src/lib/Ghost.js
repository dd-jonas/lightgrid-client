import { ghostWalkSpeed } from '../constants/index.js';
import { bezierToPoints, sleep } from '../utils/index.js';

class Ghost {
  constructor() {
    this.interactables = [];
  }

  interactWithPresence(callback) {
    this.interactables.push(callback);
  }

  revealPresence(pos) {
    this.interactables.forEach((interaction) => interaction(pos));
  }

  async walk(path, steps = 10) {
    const points = bezierToPoints(path, steps);

    for (const point of points) {
      this.revealPresence(point);
      await sleep(1000 / ghostWalkSpeed);
    }
  }
}

export default Ghost;
