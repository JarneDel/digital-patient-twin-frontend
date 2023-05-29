// plugins/mqtt.js

import {Mqtt} from 'azure-iot-device-mqtt';
import { Client, Message } from 'azure-iot-device'
export default function (context) {
  console.log("MQTT Loaded")
  const hostName = 'mqtt://industryProject.azure-devices.net:1883'
  const connectionString = "HostName=industryProject.azure-devices.net;DeviceId=testdatagenerator;SharedAccessKey=91KKqmt2vuAHJqrMIQa4s1tkewLP/p6InfoQlEW7ayE="
  const topic = 'devices/testdatagenerator/messages/events/';
  const sas = "SharedAccessSignature sr=industryProject.azure-devices.net%2Fdevices%2Ftestdatagenerator&sig=XH6Btd6Gg%2BXrNQ%2BjC57Je6LzfIcSvVOH946pG546y1U%3D&se=2284762512"

  const client = Client.fromSharedAccessSignature(sas, Mqtt)
  console.log("client created")
  client.open(function (err) {
    if (err) {
      console.error('Could not connect: ' + err.message);
    } else {
      console.log('Client connected');
      client.on('error', function (err) {
        console.error(err.message);
      });
      client.on('disconnect', function () {
        console.log('Client disconnected')
        // clearInterval(sendInterval);
        // client.removeAllListeners();
        // client.open(connectCallback);
      });
      // receive message sent by device
      client.on('message', function (msg) {
        console.log('Id: ' + msg.messageId + ' Body: ' + msg.data);
        // client.complete(msg, printResultFor('completed'));
        // reject and abandon follow the same pattern.
        // /!\ reject and abandon are not available with MQTT
      });
    }
  });

// Create an MQTT client instance
//   const client = mqtt.connect(hostName, {
//     clientId: 'testdatagenerator',
//     username: 'industryProject.azure-devices.net/testdatagenerator/api-version=2018-06-30',
//     password: 'SharedAccessSignature sr=industryProject.azure-devices.net%2Fdevices%2Ftestdatagenerator&sig=XH6Btd6Gg%2BXrNQ%2BjC57Je6LzfIcSvVOH946pG546y1U%3D&se=2284762512'
//   });
//   console.log("client connected")
  

  // client.on('connect', function () {
  //   console.log('Connected to Azure IoT Hub');
  //   console.log(client.connected)
  //
  //   client.subscribe(topic, function (err) {
  //     if (err) {
  //       console.error('Error while subscribing:', err);
  //     } else {
  //       console.log('Subscribed to topic:', topic);
  //     }
  //   });
  // });
  //
  // client.on('message', function (topic, message) {
  //   console.log('Received message on topic:', topic);
  //   console.log('Message:', message.toString());
  //   // Process the received message as needed
  // });
  //
  // client.on('error', function (error) {
  //   console.error('MQTT client error:', error);
  // });

  // Attach the MQTT client instance to the Nuxt.js app context
  context.mqtt = client;
}
