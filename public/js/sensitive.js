
var Sensitive = {

    socket: false,
    activeSensors: {},

    init: function(conf) {

        if(!Sensitive.socket) {
            Sensitive.socket = io.connect(conf.addr);
        } 

        for(var i in conf.sensors) {
            Sensitive.addSensor(conf.sensors[i]);
        }
    },

    addSensor: function(sensor) {
        Sensitive.activeSensors[sensor] = new Sensitive.Sensor(sensor);
    },

    watch: function(sensor) {
        Sensitive.activeSensors[sensor].watch();
    },

    stop: function(sensor) {
        Sensitive.activeSensors[sensor].stopWatching();
    },

    watchAll: function() {
        for(var sensor in Sensitive.activeSensors) {
            Sensitive.activeSensors[sensor].watch();
        }
    },

    stopAll: function() {
        for(var sensor in Sensitive.activeSensors) {
            Sensitive.activeSensors[sensor].stopWatching();
        }
    },

    sensors: {
        location: {
            event: 'geolocation',
            handler: navigator,
            onStart: function(data) {
                window.watchID = navigator.geolocation.watchPosition(data)
            },
            onEnd: function() {
                navigator.geolocation.clearWatch(window.watchID);
            }
        },
        motion: {
            event: 'DeviceMotionEvent',
            listener: 'devicemotion',
            handler: window,
            onSend: function(data) {
                return { x: data.acceleration.x, y: data.acceleration.y, z: data.acceleration.z }
            }
        },
        orientation: {
            event: 'DeviceOrientationEvent',
            listener: 'deviceorientation',
            handler: window,
            onSend: function(data) {
                return { alpha: data.alpha, beta: data.beta, gamma: data.gamma }
            }
        },
        compass: {
            event: 'DeviceOrientationEvent',
            listener: 'deviceorientation',
            handler: window,
            onSend: function(data) {
                return { compass: data.webkitCompassHeading }
            }
        }
    }
};

Sensitive.Sensor = function(sensor) {

    var that = this;

    this.onSend = function(e) { return e; };
    this.onSense = function(e) {};

    this.watch = function(callback) {

        if(Sensitive.sensors[sensor].event in Sensitive.sensors[sensor].handler) {

            if(typeof callback != 'undefined') {
                that.onSense = callback;
            }

            if(typeof Sensitive.sensors[sensor].onSend != 'undefined') {
                that.onSend = Sensitive.sensors[sensor].onSend;
            }

            if(typeof Sensitive.sensors[sensor].onStart != 'undefined') {
                Sensitive.sensors[sensor].onStart(function(data) {
                    that.success(data);
                });
            } else {

                var listenter = Sensitive.sensors[sensor].event;
                if(typeof Sensitive.sensors[sensor].listener != 'undefined') {
                    listener = Sensitive.sensors[sensor].listener;
                }

                window.addEventListener(listener, function(data) {
                    that.success(data);
                });
            }

        } else {
            this.error('The ' + Sensitive.sensors[sensor].event + ' event is not supported by this browser');
        }

    };

    this.stopWatching = function() {

        if(typeof Sensitive.sensors[sensor].onEnd != 'undefined') {
            Sensitive.sensors[sensor].onEnd();
        } else {
            Sensitive.sensors[sensor].handler.removeEventListener(Sensitive.sensors[sensor].event, function() {
                return that.success;
            });
        }
        
    };

    this.success = function(data) {
        Sensitive.socket.emit(sensor, this.onSend(data));
        this.onSense(data);
    };

    this.error = function(message) {
        console.error(sensor + ': ' + message);
    };
};


