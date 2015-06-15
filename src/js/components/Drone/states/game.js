var game = {},
	message = require("../entities/message"),
	AppDispatcher = require("../../../dispatcher/AppDispatcher"),
	fragmentSrc = [

        "precision mediump float;",

        "uniform float     time;",
        "uniform vec2      resolution;",
        "uniform vec2      mouse;",

        "float noise(vec2 pos) {",
            "return fract(sin(dot(pos, vec2(12.9898 - time,78.233 + time))) * 43758.5453);",
        "}",

        "void main( void ) {",

            "vec2 normalPos = gl_FragCoord.xy / resolution.xy;",
            "float pos = (gl_FragCoord.y / resolution.y);",
            "float mouse_dist = length(vec2((mouse.x - normalPos.x) * (resolution.x / resolution.y) , mouse.y - normalPos.y));",
            "float distortion = clamp(1.0 - (mouse_dist + 0.1) * 3.0, 0.0, 1.0);",

            "pos -= (distortion * distortion) * 0.1;",

            "float c = sin(pos * 400.0) * 0.4 + 0.4;",
            "c = pow(c, 0.2);",
            "c *= 0.2;",

            "float band_pos = fract(time * 0.1) * 3.0 - 1.0;",
            "c += clamp( (1.0 - abs(band_pos - pos) * 10.0), 0.0, 1.0) * 0.1;",

            "c += distortion * 0.08;",
            "// noise",
            "c += (noise(gl_FragCoord.xy) - 0.5) * (0.09);",


            "gl_FragColor = vec4( 0.03, c, 0.08, 1.0 );",
        "}"
    ];

game.create = function() {
	this.filter = this.game.add.filter("Glow", this.game.width, this.game.height);
	this.music = this.game.add.audio("tenseLoop");
	this.music.play("", 0, 1, true);

	this.game.world.setBounds(0, 0, 960, 768);
	this.game.renderer.renderSession.roundPixels = true;

	if(typeof this.cave === "undefined") {
		this.cave = new (require("../entities/cave.js"))(this.game);
		this.cave.create();
	}else{
		this.cave.renderMap();
	}

	this.sub = require("../entities/sub.js");
	this.sub.create(this.cave.playerX-40, this.cave.playerY-40, this.game);
	this.sub.filters = [ this.game.add.filter('Glow') ];

	filter = new Phaser.Filter(this.game, null, fragmentSrc);
    filter.setResolution(320, 256);
    sprite = this.game.add.sprite();
	sprite.fixedToCamera = true;
    sprite.width = 320;
    sprite.height = 256;
    sprite.filters = [ filter ];
    sprite.blendMode = PIXI.blendModes.SCREEN;
    console.log("new2");

	var bg = this.game.add.tileSprite(0, 0, 320, 256, 'droneBG');
	bg.fixedToCamera = true;

	var player = require("../entities/drone.js");
	this.player = player.create(this.cave.playerX, this.cave.playerY, this.game);
	this.player.sprite.blendMode = PIXI.blendModes.ADD;
	this.player.sprite.filters = [ this.game.add.filter('Glow') ];
	this.cave.addPlayer(this.player.sprite);

	this.game.camera.bounds = null;
	this.game.camera.follow(this.player.sprite);
};

game.update = function() {
	this.cave.update();
	this.player.update();

	playerData = this.player.getData();
	if(playerData.dead) {
		this.music.stop();
		this.game.state.start("dead");
	}

	this.game.physics.arcade.overlap(this.player.sprite, this.sub.sprite, this.dockDrone, null, this);
};

game.dockDrone = function() {
	this.music.stop();
	this.game.sound.play("dockDrone");
	this.game.state.start("docked");
	message.create("Drone docked");
	AppDispatcher.dispatch({
		action: "drone-dock"
	});
};

module.exports = game;