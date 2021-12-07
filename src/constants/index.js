import dotenv from 'dotenv';
dotenv.config();

const baseUrl = `http://${process.env.LOCAL_ADDRESS}:80/api/F1AB34A49D`;

const ghostWalkSpeed = 50; // Steps per second

const lightsData = [
  {
    id: 2,
    name: 'Light Jonas',
    pos: [100, 100],
  },
  {
    id: 3,
    name: 'Light Kobe',
    pos: [300, 150],
  },
];

export { baseUrl, ghostWalkSpeed, lightsData };
