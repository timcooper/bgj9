var gulp = require("gulp"),
	uglify = require("gulp-uglify"),
	browserify = require("browserify"),
	source = require("vinyl-source-stream"),
	buffer = require("vinyl-buffer");

gulp.task("watch", function() {
	gulp.watch("./js/**/*.js", ["js"]);
});

gulp.task("js", function() {
	var b = browserify("./js/game.js");
	return b.bundle()
		.pipe(source("game.js"))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest("./build/"));
});

gulp.task("default", ["watch", "js"]);