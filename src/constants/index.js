import dotenv from 'dotenv';
dotenv.config();

const baseUrl = `http://${process.env.LOCAL_ADDRESS}:80/api/8C2FF47893`;

const ghostWalkSpeed = 1; // Steps per second
const falloff = 0.75;
const maxBrightness = 200;

const lightsData = [
  // Aap
  {
    id: 13,
    name: '1A3F CC5C',
    pos: [0.3, 0],
  },
  // Burealamp
  {
    id: 5,
    name: '40E0 07B9',
    pos: [0.3, 2.70],
  },
  // Wandlamp Z
  {
    id: 6,
    name: '7965 013F',
    pos: [1.20, .05],
  },
  // Wandlamp O
  {
    id: 7,
    name: '3AFF 2F86',
    pos: [2.95, 1.35],
  },
  // Boekenkast lamp
  {
    id: 8,
    name: '46EB F6A1',
    pos: [2.70, 0.4],
  },
  // Vloerlamp
  {
    id: 9,
    name: '4F0F 51B0',
    pos: [0.1, 1.5],
  },
  // Make-up lamp
  {
    id: 10,
    name: '3819 F0AC',
    pos: [2.90, 2.76],
  },
  // TV-kast L
  {
    id: 11,
    name: '5798 17E8',
    pos: [1.15, 2.90],
  },
  // TV-kast R
  {
    id: 12,
    name: '3CCF 6B88',
    pos: [2.15, 2.90],
  },
];

export { baseUrl, falloff, ghostWalkSpeed, lightsData, maxBrightness };
