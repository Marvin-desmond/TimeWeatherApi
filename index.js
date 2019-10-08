const axios = require('axios')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
readline.question(`Place and Zipcode:`, (place) => {
	//input is as below
	//Los Angeles,90001
	//without spaces between the comma
  let cityZip = place.split(",")
  let city = cityZip[0].trim()
  let zipCode = cityZip[1].trim()
  readline.close()
  getTimeWeather(city,zipCode)
})

function getTimeWeather(city,zipCode){
axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.fe2391a17a2fd1924dfc3f6715fc5e0f&q=${city}&format=json`)
	.then((response)=>{
		let lon=response.data[0].lon
		let lat=response.data[0].lat
		return axios.get(`http://api.timezonedb.com/v2.1/get-time-zone?key=4VRQA06KR1W6&format=json&by=position&lat=${lat}&lng=${lon}`)
	})
	.then((response)=>{
		console.log(`${city} current time : ${response.data.formatted}`)
	}).catch(error => {
    console.log(error)
  })
axios.get(`https://weather.cit.api.here.com/weather/1.0/report.json?product=observation&zipcode=${zipCode}&oneobservation=true&app_id=EVe5VedlfpE9w6aH5HTx&app_code=AG_1ON97BUzX-dPzQ52DAQ`)
.then((response)=>{
	let describe = response.data.observations.location[0].observation[0]
	console.log(`Sky conditions : ${describe.skyDescription}`)
	console.log(`Temperature : ${describe.temperature}`)
	console.log(`Humidity : ${describe.humidity}`)
	console.log(`Pressure : ${describe.barometerPressure}`)
	console.log(`Wind speed : ${describe.windSpeed}`)
})  .catch(error => {
    console.log(error);
  });

}
