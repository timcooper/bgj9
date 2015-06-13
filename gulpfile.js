var gulp = require("gulp"),
	browserify = require("browserify"),
	source = require("vinyl-source-stream");

gulp.task("default", function() {
	var b = browserify("./js/game.js");
	return b.bundle()
		.pipe(source("game.js"))
		.pipe(gulp.dest("./build/"));
});