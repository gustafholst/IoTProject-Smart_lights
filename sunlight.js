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

var updateInterval = 1000;

async function run() {
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
    startSending(this);
  });

}

async function startSending(client) {
  var topic = "sunlight";
  var maxValue = 100000.0;

  let lux = 0.0;

  while (true) {

  lux = Math.random() * maxValue;

    client.publish(topic, lux.toString());
    console.log(lux);
    await new Promise(r => setTimeout(r, updateInterval));
  }
}

run();
