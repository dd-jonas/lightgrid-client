import dotenv from 'dotenv';
dotenv.config();

import osc from 'osc';

import states from './src/states.js';

var udpPort = new osc.UDPPort({
  localAddress: process.env.LOCAL_ADDRESS,
  localPort: process.env.LOCAL_PORT,
  metadata: true,
});

// Send message to server function
const sendMessage = (state = 0) => {
  udpPort.send(
    {
      address: `/Client-${process.env.CLIENT_ID}`,
      args: {
        type: 'i',
        value: state,
      },
    },
    process.env.SERVER_ADDRESS,
    process.env.SERVER_PORT
  );
};

// Calculate response
const calculateResponse = async ({ value }) => {
  const action = states[value];

  if (!action) {
    console.error('Received wrong state.');
  }

  await action();
  sendMessage(value);
};

// Listen for incoming messages from server.
udpPort.on('message', function ({ args } = oscMsg, info) {
  // console.log("An OSC message just arrived!", oscMsg);
  // console.log("Remote info is: ", info);
  calculateResponse(args[0]);
});

// after startup send ready
udpPort.on('ready', function () {
  sendMessage(1);
});

// Open the socket.
udpPort.open();
console.log('running');
