var mqtt = require('mqtt');

function run() {
  let options = {
    port: 1883,
    host: 'demo.thingsboard.io',
    username: 'QZko1i6A0135hpt9tFBp'
  };

  let thingsboard  = mqtt.connect(options);

  console.log('trying to connect...');

  thingsboard.on('connect', function () {
    console.log('connected');
    subscribeToBroker(this);
  });
 }

 function subscribeToBroker(thingsboard) {

   let broker = mqtt.connect('mqtt://127.0.0.1');

   let topics = ['temperature',
                 'sunlight',
                 'blinds',
                 'indoor_lights/sensor',
                 'indoor_lights/dimmer',
                 'indoor_lights/actuator'
               ];

   broker.subscribe(topics);

   broker.subscribe(topics, [0], function(err, granted) {
     console.log("subscribed to all topics");
   });

   broker.on('message', function(topic, message) {
     let msg = '{\'' + topic + '\':\'' + message + '\'}';
     thingsboard.publish('v1/devices/me/telemetry', msg);
     console.log(msg.toString());
   })

 }

run();
