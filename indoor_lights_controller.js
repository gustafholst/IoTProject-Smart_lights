// Illuminance (lux) 	Surfaces illuminated by
// 0.0001 	            Moonless, overcast night sky (starlight)[4]
// 0.002              	Moonless clear night sky with airglow[4]
// 0.05–0.3          	Full moon on a clear night[5]
// 3.4 	              Dark limit of civil twilight under a clear sky[6]
// 20–50             	Public areas with dark surroundings[7]
// 50 	                Family living room lights (Australia, 1998)[8]
// 80 	                Office building hallway/toilet lighting[9][10]
// 100              	  Very dark overcast day[4]
// 150               	Train station platforms[11]
// 320–500 	          Office lighting[8][12][13][14]
// 400               	Sunrise or sunset on a clear day.
// 1000 	              Overcast day;[4] typical TV studio lighting
// 10,000–25,000     	Full daylight (not direct sun)[4]
// 32,000–100,000    	Direct sunlight

let dimmerState = 100;  // %
let MAX_INDOOR_LUX = 1000;  // Lux

function run() {
  var mqtt = require('mqtt');

  var options = {
    port: 1883,
    host: 'localhost'
  };

  var broker  = mqtt.connect(options);

  console.log('trying to connect...');

  broker.on('connect', function () {
    console.log('connected');
    this.subscribe('indoor_lights/sensor');
    this.subscribe('indoor_lights/dimmer');
  });

  broker.on('message', function(topic, message) {
    if (topic === 'indoor_lights/sensor') {
      adjustLights(this, message);
    }
    if (topic === 'indoor_lights/dimmer') {
      dimmerState = parseInt(message);
    }
  });
}

function adjustLights(client, message) {
    let lux = parseFloat(message);

    //lux is in range 0 - 1000
    // ratio between 'max' for indoor lights
    luxRatio = (lux / MAX_INDOOR_LUX) * 100;

    let adjustment = dimmerState - luxRatio;

    client.publish('indoor_lights/actuator', adjustment.toString());
    console.log("lights: " + adjustment);
}

run();
