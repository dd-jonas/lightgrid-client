import dotenv from 'dotenv';
dotenv.config();

const baseUrl = `http://${process.env.LOCAL_ADDRESS}:80/api/8C2FF47893`;

const maxBrightness = 200; // How bright a light will be when completely on, value between 0-255
const falloff = 100; // Distance in cm to start triggering a light
const ghostWalkSpeed = 5; // Steps per second

const lightsData = [
  {
    id: 4,
    name: 'chest', // 1A3F CC5C
    pos: [30, 0],
  },
  {
    id: 5,
    name: 'desk', // 40E0 07B9
    pos: [30, 270],
  },
  {
    id: 6,
    name: 'wall-south', // 7965 013F
    pos: [120, 3],
  },
  {
    id: 7,
    name: 'wall-east', // 3AFF 2F86
    pos: [295, 135],
  },
  {
    id: 8,
    name: 'bookcase', // 46EB F6A1
    pos: [260, 40],
  },
  {
    id: 9,
    name: 'standing', // 4F0F 51B0
    pos: [10, 150],
  },
  {
    id: 10,
    name: 'makeup', // 3819 F0AC
    pos: [290, 276],
  },
  {
    id: 11,
    name: 'tv-left', // 5798 17E8
    pos: [115, 290],
  },
  {
    id: 12,
    name: 'tv-right', // 3CCF 6B88
    pos: [215, 290],
  },
  {
    id: 13,
    name: 'ceiling', // ??
    pos: [150, 150],
  },
];

export { baseUrl, falloff, ghostWalkSpeed, lightsData, maxBrightness };
