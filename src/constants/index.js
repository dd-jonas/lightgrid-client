import dotenv from 'dotenv';
dotenv.config();

const baseUrl = `http://${process.env.LOCAL_ADDRESS}:80/api/8C2FF47893`;

const ghostWalkSpeed = 5; // Steps per second

const lightsData = [
  /*{
    id: 1,
    name: 'Light Niels 1',
    pos: [10, 10],
  },
  {
    id: 2,
    name: 'Light Niels 2',
    pos: [50, 10],
  },*/
  {
    id: 4,
    name: '1A3F CC5C',
    pos: [30, 0],
  },
  {
    id: 5,
    name: '40E0 07B9',
    pos: [30, 270],
  },
  {
    id: 6,
    name: '7965 013F',
    pos: [120, 3],
  },
  {
    id: 7,
    name: '3AFF 2F86',
    pos: [295, 135],
  },
  {
    id: 8,
    name: '46EB F6A1',
    pos: [260, 40],
  },
  {
    id: 9,
    name: '4F0F 51B0',
    pos: [10, 150],
  },
  {
    id: 10,
    name: '3819 F0AC',
    pos: [290, 276],
  },
  {
    id: 11,
    name: '5798 17E8',
    pos: [115, 290],
  },
  {
    id: 12,
    name: '3CCF 6B88',
    pos: [215, 290],
  },
];

export { baseUrl, ghostWalkSpeed, lightsData };
