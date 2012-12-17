Sensitive.js
============

Sensitive.js is a small Node.js app that reads sensor data from your mobile phone and sends it to an Arduino.
Note: The Arduino part is still quite buggy, but it works :)

### How it works
Sensitive.js has to run on a computer that has an Arduino attached to a USB port (this could be a RaspberryPi for instance).
When you access the node.js server from your phone, a Sensitive.js client opens a Websocket connection and starts sending the sensor readings. The node app then forwards them to your Arduino, using the serial port.

### Get it running
1. Get the sources
```
git clone git@github.com:alanreid/Sensitive.js.git 

cd Sensitive.js

npm install

```
2. Open app.js and change the serial port to the one your Arduino is using
3. Upload the demo sketch to your Arduino
4. Run the app
```
node app.js
```
5. Access to your machine's IP from your mobile device.

### Contact me
Twitter: ([@alan_reid](http://twitter.com/alan_reid))

### License
This software is distributed under the Apache 2.0 License: http://www.apache.org/licenses/LICENSE-2.0