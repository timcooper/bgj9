var gulp = require("gulp"),
	uglify = require("gulp-uglify"),
	browserify = require("browserify"),
	source = require("vinyl-source-stream"),
	buffer = require("vinyl-buffer"),
	reactify = require("reactify"),
  minify = require('gulp-minify-css'),
  del = require('del');

var dependencies = [
	'react',
	'react/addons'
];

var reactifyTask = function (options) {

    var appBundler = browserify({
        entries: [options.src], // The entry file, normally "main.js"
        transform: [reactify], // Convert JSX style
        debug: false, // Sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });

  appBundler.external(options.development ? dependencies : []);

  var rebundle = function () {
    return appBundler.bundle()
      .pipe(source('./bundle.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest(options.dest));
  };

  return rebundle();

};

gulp.task("clean:js", function(cb) {
  del([
    "./js/*.js"
  ], cb)
});

gulp.task("clean:css", function(cb) {
  del([
    "./css/*"
  ], cb)
});

gulp.task("js", ["clean:js"], function() {
	return reactifyTask({
		development: false,
		src: './src/js/app.js',
		dest: './js'
	});
})

gulp.task("css", ["clean:css"], function() {
  gulp.src("./src/css/main.css")
    .pipe(minify())
    .pipe(gulp.dest('./css'));
})

gulp.task("watch", function() {
	gulp.watch("./src/js/**/*.js", ["js"]);
  gulp.watch("./src/css/**/*.css", ["css"]);
});

gulp.task("default", ["js", "css", "watch"]);