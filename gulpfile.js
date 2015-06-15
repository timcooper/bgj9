var gulp = require("gulp"),
	uglify = require("gulp-uglify"),
	browserify = require("browserify"),
	source = require("vinyl-source-stream"),
	buffer = require("vinyl-buffer"),
	reactify = require("reactify"),
  minify = require('gulp-minify-css');

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
    appBundler.bundle()
      .pipe(source('./bundle.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest(options.dest));
  };

  rebundle();

};

gulp.task("react", function() {
	reactifyTask({
		development: false,
		src: './src/js/app.js',
		dest: './js'
	});
})

gulp.task("css", function() {
  gulp.src("./src/css/main.css")
    .pipe(minify())
    .pipe(gulp.dest('./css'));
})

gulp.task("watch", function() {
	gulp.watch("./src/js/**/*.js", ["react"]);
});

gulp.task("default", ["watch", "react"]);