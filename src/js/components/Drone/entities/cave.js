var AppDispatcher = require("../../../dispatcher/AppDispatcher"),
	message = require("../entities/message");

function get2DArray(x, y) {
    var map = [];
    for (var i = 0; i < x; i++) {
        map.push([]);
        for (var j = 0; j < y; j++) {
            map[i].push(0);
        }
    }

    return map;
}

cave = function(game) {
	this.game = game;
};

cave.prototype.create = function() {
	this.map = [];
	this.wallTiles = [];
	this.floorTiles = [];

	this.pickups = [];

	this.roomMaxSize = 4;
	this.roomMinSize = 2;

	this.maxRooms = 7;

	this.makeMap();

	this.renderMap();
};

cave.prototype.update = function() {
	this.game.physics.arcade.collide(this.wallTiles, this.player, this.collide);
	this.game.physics.arcade.overlap(this.pickups, this.player, this.pickup);
};

cave.prototype.collide = function(wall, player) {
	AppDispatcher.dispatch({
		action: "drone-crash",
		data: {wall: wall, player: player}
	});
}
cave.prototype.pickup = function(obj1, obj2) {
	AppDispatcher.dispatch({
		action: "drone-pickup",
		data: obj1
	});

	obj1.body = null;
	obj1.destroy();
}

cave.prototype.makeMap = function() {
	this.map = get2DArray(this.game.world.width / 32, this.game.world.height / 32);

	for (var x = 0; x < this.map.length; x++) {
		for (var y = 0; y < this.map[x].length; y++) {
			this.map[x][y] = new this.Tile(x, y, "wall");
		};
	};

	this.rooms = [];
	this.numRooms = 0;

	for(var r = 0; r < this.maxRooms; r++) {
		var w = this.roomMinSize + this.game.rnd.between(0, this.roomMaxSize - this.roomMinSize),
			h = this.roomMinSize + this.game.rnd.between(0, this.roomMaxSize - this.roomMinSize),
			x = this.game.rnd.between(0, (this.game.world.width/32) - w - 2) + 1,
			y = this.game.rnd.between(0, (this.game.world.height/32) - h - 2) + 1;

		this.newRoom = new this.Room(x, y, w, h);

		var failed = false;
		for(i in this.rooms) {
			if(this.newRoom.intersects(this.rooms[i])) {
				failed = true;
				break;
			}
		}
		if(!failed) {
			this.createRoom(this.newRoom);

			if(this.numRooms == 0) {
				this.playerX = this.newRoom.centerPoint[0];
				this.playerY = this.newRoom.centerPoint[1];
			}else{
				this.newX = this.newRoom.centerCoords[0];
				this.newY = this.newRoom.centerCoords[1];

				this.prevX = this.rooms[this.numRooms - 1].centerCoords[0];
				this.prevY = this.rooms[this.numRooms - 1].centerCoords[1];
				if(this.game.rnd.between(0, 1) == 1) {
					this.createHTunnel(this.prevX, this.newX, this.prevY);
					this.createVTunnel(this.prevY, this.newY, this.newX);
				}else{
					this.createVTunnel(this.prevY, this.newY, this.prevX);
					this.createHTunnel(this.prevX, this.newX, this.newY);
				}
			}

			this.rooms.push(this.newRoom);
			this.numRooms++;
		}
	}
};

cave.prototype.renderMap = function() {
	this.floorTiles = [];
	this.wallTiles = [];
	for(var x = 0, xLength = this.map.length; x < xLength; x++) {
		for(var y = 0, yLength = this.map[x].length; y < yLength; y++) {
			if(this.map[x][y].image == "floor") {
				this.floorTile = this.game.add.sprite(this.map[x][y].x, this.map[x][y].y, this.map[x][y].image);
				this.game.physics.enable(this.floorTile, Phaser.Physics.ARCADE);
				this.floorTile.body.immovable = true;
				this.floorTiles.push(this.floorTile);
			} else if(this.map[x][y].image == "wall") {
				this.wallTile = this.game.add.sprite(this.map[x][y].x, this.map[x][y].y, this.map[x][y].image);
				this.game.physics.enable(this.wallTile, Phaser.Physics.ARCADE);
				this.wallTile.body.immovable = true;
				this.wallTiles.push(this.wallTile);
			}
		}
	}

	this.spawnPickups();
};

cave.prototype.spawnPickups = function() {
	for(var i = 1; i < this.rooms.length; i++) {
		var pickup = this.game.add.sprite(this.rooms[i].centerPoint[0], this.rooms[i].centerPoint[1], "pickup");
		this.game.physics.enable(pickup, Phaser.Physics.ARCADE);
		pickup.anchor.setTo(0.5, 0.5);
		pickup.body.immovable = true;
		var distance = this.game.physics.arcade.distanceToXY(pickup, this.playerX, this.playerY);
		val = distance / 100;
		pickup.value = val < 1 ? 1 : parseInt(val);
		this.pickups.push(pickup);
	};
}

cave.prototype.createRoom = function(room) {
	for (var x = room.x1; x < room.x2; x++) {
		for (var y = room.y1; y < room.y2; y++) {
			this.map[x][y] = new this.Tile(x, y, "floor");
		};
	};
};

cave.prototype.createHTunnel = function(x1, x2, y) {
	this.min = Math.min(x1, x2);
	this.max = Math.max(x1, x2) + 1;
	for (var x = this.min; x < this.max; x++) {
		this.map[x][y] = new this.Tile(x, y, "floor");
	};
};

cave.prototype.createVTunnel = function(y1, y2, x) {
	this.min = Math.min(y1, y2);
	this.max = Math.max(y1, y2) + 1;
	for (var y = this.min; y < this.max; y++) {
		this.map[x][y] = new this.Tile(x, y, "floor");
	};
};

cave.prototype.Tile = function(x, y, image) {
	this.x = x*32;
	this.y = y*32;
	this.image = image;
};

cave.prototype.Room = function(x, y, w, h) {
	this.x1 = x;
	this.y1 = y;
	this.x2 = x + w;
	this.y2 = y + h;

	this.w = w;
	this.h = h;

	var centerX = (this.x1 + this.x2) / 2,
		centerY = (this.y1 + this.y2) / 2;

	this.centerCoords = [
		Math.floor(centerX),
		Math.floor(centerY)
	];

	this.centerPoint = [
		centerX*32,
		centerY*32
	];

	this.intersects = function(otherRoom) {
		return (this.x1 <= otherRoom.x2 && this.x2 >= otherRoom.x1 &&
			this.y1 <= otherRoom.y2 && this.y2 >= otherRoom.y1);
	};
};

cave.prototype.addPlayer = function(player) {
	this.player = player;
};

module.exports = cave;