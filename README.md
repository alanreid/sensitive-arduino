Sensitive Arduino
============

Sensitive Arduino is a small Node.js app that reads sensor data from your mobile phone and sends it to an Arduino.
It's still quite buggy, but it works :)

### How it works
Sensitive Arduino has to run on a computer that has an Arduino attached to a USB port (this could be a RaspberryPi for instance).

When you access the node.js server from your phone, a Sensitive Arduino client opens a Websocket connection and starts sending the sensor readings. The node app then forwards them to your Arduino, using the serial port.

### Supported Sensors
* Geolocation (lat, lng)
* Accelerometer (x, y, z)
* Orientation (alpha, beta, gamma)
* Compass (degrees, direction)

### Demo app
The demo app is quite simple. It's a two part app that allows you to start and stop reading sensors. 
The first part is an HTML file and the other is an Arduino sketch. 

Note that the demo sketch needs a Liquid Crystal display to show the data. This is of course not required for Sensitive Arduno, but you will have to strip the code a bit to run it without the display.

### Get it running
1. Get the sources and dependences

```
git clone git@github.com:alanreid/Sensitive-Arduino.git 
cd Sensitive-Arduino
npm install
```

2. Open app.js and change the serial port to the one your Arduino is using
3. Upload the demo sketch to your Arduino
4. Run the app with 
```
node app.js
```
5. Access to your node's IP & port from your mobile device.

### Contact me
Contact me on Twitter: [@alan_reid](http://twitter.com/alan_reid)

### License
This software is distributed under the Apache 2.0 License: http://www.apache.org/licenses/LICENSE-2.0
