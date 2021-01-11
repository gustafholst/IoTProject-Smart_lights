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

let states = {
  CLOSED: "closed",
  HALF_OPEN: "half open",
  FULLY_OPEN: "fully open"
}

let currentState = states.CLOSED;

function run() {
  var mqtt = require('mqtt');
  //var client  = mqtt.connect('localhost');

  var options = {
    port: 1883,
    host: 'localhost'
  };

  var broker  = mqtt.connect(options);

  console.log('trying to connect...');

  broker.on('connect', function () {
    console.log('connected');
    this.subscribe('sunlight');
  });

  broker.on('message', function(topic, message) {
    if (topic === 'sunlight') {
      adjustBlinds(this, message);
    }
  });
}

function determinePosition(lux) {
  if (lux < 1000) {
    return states.FULLY_OPEN;
  }
  if (lux < 25000) {
    return states.HALF_OPEN;
  }

  return blindsPosition = states.CLOSED;
}

function adjustBlinds(client, message) {
    let lux = parseFloat(message);
    let blindsPosition = determinePosition(lux);

    if (blindsPosition !== currentState) {
      currentState = blindsPosition;
      client.publish('blinds', currentState);
      console.log("Changed position to " + currentState);
    }
}

run();
