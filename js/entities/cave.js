var _ = require("lodash");

cave = function(game) {
	this.game = game;
	this.carved = false;
	this.map = [];
};

cave.prototype.create = function() {
	this.map = [];
	this.wallTiles = [];
	this.floorTiles = [];

	this.roomMaxSize = 4;
	this.roomMinSize = 2;

	this.maxRooms = 7;

	this.makeMap();

	this.renderMap();
};

cave.prototype.update = function() {
	for (var i = 0; i < this.wallTiles.length; i++) {
		for (var j = 0; j < this.floorTiles.length; j++) {
			if(this.game.physics.arcade.overlap(this.wallTiles[i], this.floorTiles[j])) {
				tile = this.wallTiles.splice(i, 1);
				tile[0].body = null;
				tile[0].destroy();
			}
		};
	};

	this.game.physics.arcade.collide(this.wallTiles, this.player);
};

cave.prototype.collision = function(obj1, obj2) {
	console.log(obj1, obj2);
};

cave.prototype.makeMap = function() {
	for (var y = 0; y < this.game.world.height; y+=16) {
		for (var x = 0; x < this.game.world.width; x+=16) {
			this.map.push(new this.Tile(x, y, true, true, "wall"));
		};
	};

	this.rooms = [];
	this.numRooms = 0;

	for(var r = 0; r < this.maxRooms; r++) {
		w = _.random(this.roomMinSize, this.roomMaxSize) * 32;
		h = _.random(this.roomMinSize, this.roomMaxSize) * 32;

		x = _.random(1, ((this.game.world.width) / 32) - (w/32 + 1)) * 32;
		y = _.random(1, ((this.game.world.height) / 32) - (h/32 + 1)) * 32;

		this.newRoom = new this.Room(x, y, w, h);

		this.createRoom(this.newRoom);

		if(this.numRooms == 0) {
			this.playerX = this.newRoom.centerCoords[0];
			this.playerY = this.newRoom.centerCoords[1];
		}else{
			this.newX = this.newRoom.centerCoords[0] - 16;
			this.newY = this.newRoom.centerCoords[1] - 16;

			this.prevX = this.rooms[this.numRooms - 1].centerCoords[0] - 16;
			this.prevY = this.rooms[this.numRooms - 1].centerCoords[1] - 16;

			this.createHTunnel(this.prevX, this.newX, this.prevY);
			this.createVTunnel(this.prevY, this.newY, this.newX);
		}

		this.rooms.push(this.newRoom);
		this.numRooms += 1;
	}
};

cave.prototype.renderMap = function() {
	this.floorTiles = [];
	this.wallTiles = [];
	for(var i = 0; i < this.map.length; i++) {
		if(this.map[i].image == "floor") {
			this.floorTile = this.game.add.sprite(this.map[i].x, this.map[i].y, this.map[i].image);
			this.game.physics.enable(this.floorTile, Phaser.Physics.ARCADE);
			this.floorTile.body.immovable = true;
			this.floorTiles.push(this.floorTile);
		} else if(this.map[i].image == "wall") {
			this.wallTile = this.game.add.sprite(this.map[i].x, this.map[i].y, this.map[i].image);
			this.game.physics.enable(this.wallTile, Phaser.Physics.ARCADE);
			this.wallTile.body.immovable = true;
			this.wallTiles.push(this.wallTile);
		}
	}
};

cave.prototype.createRoom = function(room) {
	for (var x = room.x1; x < room.x2; x+=32) {
		for (var y = room.y1; y < room.y2; y+=32) {
			this.map.push(new this.Tile(x, y, false, false, "floor"));
		};
	};
};

cave.prototype.createHTunnel = function(x1, x2, y) {
	this.min = Math.min(x1, x2);
	this.max = Math.max(x1, x2);
	for (var x = this.min; x < this.max + 32; x+=32) {
		this.map.push(new this.Tile(x, y, false, false, "floor"));
	};
};

cave.prototype.createVTunnel = function(y1, y2, x) {
	this.min = Math.min(y1, y2);
	this.max = Math.max(y1, y2);
	for (var y = this.min; y < this.max + 32; y+=32) {
		this.map.push(new this.Tile(x, y, false, false, "floor"));
	};
};

cave.prototype.Tile = function(x, y, moveBlock, sightBlock, image) {
	this.x = x;
	this.y = y;
	this.moveBlock = moveBlock;
	this.sightBlock = sightBlock;
	this.image = image;
	this.object;
};

cave.prototype.Room = function(x, y, w, h) {
	this.x1 = x;
	this.y1 = y;
	this.x2 = x + w;
	this.y2 = y + h;

	this.centerCoords = [];
	centerX = (this.x1 + this.x2) / 2;
	centerY = (this.y1 + this.y2) / 2;

	this.centerCoords.push(centerX);
	this.centerCoords.push(centerY);
};

cave.prototype.addPlayer = function(player) {
	this.player = player;
};

module.exports = cave;