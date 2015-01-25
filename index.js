var five = require('johnny-five'),
  temperature = null,
  restService = require('node-rest-client'), 
  gData = null;

var Client = require('node-rest-client').Client;

client = new Client();

function registerTemperature(temp){
  try{
    var req = client.put("http://localhost:3000/fido/api/temperature/"+temp.fahrenheit, function(data, response){
      // parsed response body as js object
      //console.log(data);
      // raw response
      //console.log(response);
      console.log("done");
    });
    req.on('error', function(error){
      //console.dir(error);
      console.log('Error updating temperature')
    });
  }
  catch(ex){

  }
}

five.Board().on("ready", function() {
  temperature = new five.Temperature({
    controller: "TMP36",
    pin: "A0"
  });

  temperature.on("data", function(err, data) {
    //console.log(data.celsius + "°C", data.fahrenheit + "°F");
    gData = data;
  });

  setInterval(function(){
    registerTemperature(gData);
    console.dir(gData);
  }, 1500);
});