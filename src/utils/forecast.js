const request = require('postman-request')


const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=d54983e07d97d1dc1119c7480144809f&query=' + latitude + ',' + longitude +'&units=f'
  request({ url, json: true}, (error, {body}) => {
    if(error) {
      callback('Unable to connect to weather service!', undefined)
    } else if(body.error) {
      callback('Unable to find location', undefined)
    } else{
      callback(undefined, body.current.weather_descriptions[0] + ', ' + ' and the humidity is ' + body.current.humidity + '%' + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out')
    }
  })
}






module.exports = forecast