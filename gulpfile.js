var gulp = require("gulp"),
	browserify = require("browserify"),
	source = require("vinyl-source-stream");

gulp.task("watch", function() {
	gulp.watch("./js/**/*.js", ["js"]);
});

gulp.task("js", function() {
	var b = browserify("./js/game.js");
	return b.bundle()
		.pipe(source("game.js"))
		.pipe(gulp.dest("./build/"));
});

gulp.task("default", ["watch", "js"]);