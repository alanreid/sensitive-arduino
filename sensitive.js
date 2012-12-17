
var Sensitive = {
	sensors: {},
	serialPort: {},
	init: function(io, serialPort) {
		
		this.serialPort = serialPort;

		var that = this;

		io.sockets.on('connection', function(socket) {
			for(var e in that.sensors) {
				socket.on(e, that.sensors[e]);
			}
		});

	},
	emit: function(e, data) {
		var k = [];
		for(var key in data) {
			k.push(key + ':' + data[key]);
		}
		console.log(e + "." + k.join(',') + "\n")
		this.serialPort.write(e + "." + k.join(',') + "\n");
	}
};

Sensitive.sensors.location = function(data) {
	var precision = 6;

    var lat = Math.round(data.coords.latitude  * Math.pow(10, precision)) / Math.pow(10, precision);
    var lng = Math.round(data.coords.longitude * Math.pow(10, precision)) / Math.pow(10, precision);

    return Sensitive.emit('location', { lat: lat, lng: lng });
};

Sensitive.sensors.motion = function(data) {
	var precision = 3;

    var x = Math.round(data.x  * Math.pow(10, precision)) / Math.pow(10, precision);
    var y = Math.round(data.y * Math.pow(10, precision)) / Math.pow(10, precision);
    var z = Math.round(data.z * Math.pow(10, precision)) / Math.pow(10, precision);
 
    return Sensitive.emit('motion', { x: x, y: y, z: z });
};

Sensitive.sensors.orientation = function(data) {
	var precision = 1;

    var alpha = Math.round(data.alpha * Math.pow(10, precision)) / Math.pow(10, precision);
    var beta  = Math.round(data.beta  * Math.pow(10, precision)) / Math.pow(10, precision);
    var gamma = Math.round(data.gamma * Math.pow(10, precision)) / Math.pow(10, precision);

    return Sensitive.emit('orientation', { a: alpha, b: beta, g: gamma });
};

Sensitive.sensors.compass = function(data) {

	var precision = 1;

    var compass = Math.round(data.compass  * Math.pow(10, precision)) / Math.pow(10, precision);

    var direction = '';
    if(data.compass <= 22.5 && data.compass >= 0 || data.compass <= 360 && data.compass >= 337.5) {
        direction = 'N';
    } 
    else if(data.compass <= 67.5 && data.compass > 22.5) {
        direction = 'NE';
    }
    else if(data.compass <= 112.5 && data.compass > 67.5) {
        direction = 'E';
    }
    else if(data.compass <= 157.5 && data.compass > 112.5) {
        direction = 'SE';
    }
    else if(data.compass <= 202.5 && data.compass > 157.5) {
        direction = 'S';
    }
    else if(data.compass <= 247.5 && data.compass > 202.5) {
        direction = 'SW';
    }
    else if(data.compass <= 292.5 && data.compass > 247.5) {
        direction = 'W';
    }
    else if(data.compass <= 337.5 && data.compass > 292.5) {
        direction = 'NW';
    }

    return Sensitive.emit('compass', { degrees: compass, direction: direction });
};

exports.Sensitive = Sensitive;

