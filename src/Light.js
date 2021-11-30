import axios from 'axios';
import { baseUrl } from './const.js';

class Light {
    constructor(id, name, pos) {
        this.id = id;
        this.name = name;
        this.pos = pos;
        this.bri = null;
    }

    async setBrightness(bri) {
        if (bri === this.bri) return;

        this.bri = bri;

        try {
            const state = bri === 0 ? { on: false, bri: 0 } : { on: true, bri}
            console.log('sending request')
            await axios.put(`${baseUrl}/lights/${this.id}/state`, state);
            console.log('sent')
        } catch (error) {
            console.error(error);
        }
    }
} 

export default Light;
