var gulp = require("gulp"),
	uglify = require("gulp-uglify"),
	browserify = require("browserify"),
	source = require("vinyl-source-stream"),
	buffer = require("vinyl-buffer"),
	reactify = require("reactify");;

var dependencies = [
	'react',
	'react/addons'
];

var reactifyTask = function (options) {

  /* First we define our application bundler. This bundle is the
     files you create in the "app" folder */
    var appBundler = browserify({
        entries: [options.src], // The entry file, normally "main.js"
        transform: [reactify], // Convert JSX style
        debug: options.development, // Sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });

    /* We set our dependencies as externals of our app bundler.
     For some reason it does not work to set these in the options above */
  appBundler.external(options.development ? dependencies : []);

  /* This is the actual rebundle process of our application bundle. It produces
    a "main.js" file in our "build" folder. */
  var rebundle = function () {
    var start = Date.now();
    console.log('Building APP bundle');
    appBundler.bundle()
      .pipe(source('./app.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest(options.dest));
  };

  /* When we are developing we want to watch for changes and
    trigger a rebundle */
  //if (options.development) {
  //  appBundler = watchify(appBundler);
  //  appBundler.on('update', rebundle);
  //}

  // And trigger the initial bundling
  rebundle();

  if (options.development) {

    // We need to find all our test files to pass to our test bundler
    //var testFiles = glob.sync('./specs/**/*-spec.js');

    /* This bundle will include all the test files and whatever modules
       they require from the application */
    //var testBundler = browserify({
    //  entries: testFiles,
    //  debug: true,
    //  transform: [reactify],
    //  cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    //});
//
    //// Again we tell this bundle about our external dependencies
    //testBundler.external(dependencies);

    /* Now this is the actual bundle process that ends up in a "specs.js" file
      in our "build" folder */
    //var rebundleTests = function () {
    //  var start = Date.now();
    //  console.log('Building TEST bundle');
    //  testBundler.bundle()
    //    .on('error', gutil.log)
    //    .pipe(source('specs.js'))
    //    .pipe(gulp.dest(options.dest))
    //    .pipe(livereload()) // Every time it rebundles it triggers livereload
    //    .pipe(notify(function () {
    //      console.log('TEST bundle built in ' + (Date.now() - start) + 'ms');
    //    }));
    //};
//
    //// We watch our test bundle
    //testBundler = watchify(testBundler);
//
    //// We make sure it rebundles on file change
    //testBundler.on('update', rebundleTests);
//
    //// Then we create the first bundle
    //rebundleTests();

    /* And now we have to create our third bundle, which are our external dependencies,
      or vendors. This is React JS, underscore, jQuery etc. We only do this when developing
      as our deployed code will be one file with all application files and vendors */
    //var vendorsBundler = browserify({
    //  debug: true, // It is nice to have sourcemapping when developing
    //  require: dependencies
    //});
//
    ///* We only run the vendor bundler once, as we do not care about changes here,
    //  as there are none */
    //var start = new Date();
    //console.log('Building VENDORS bundle');
    //vendorsBundler.bundle()
    //  .on('error', gutil.log)
    //  .pipe(source('vendors.js'))
    //  .pipe(gulpif(!options.development, streamify(uglify())))
    //  .pipe(gulp.dest(options.dest))
    //  .pipe(notify(function () {
    //    console.log('VENDORS bundle built in ' + (Date.now() - start) + 'ms');
    //  }));

  }

};

gulp.task("react", function() {
	reactifyTask({
		development: true,
		src: './app/js/main.js',
		dest: './build'
	});
})

gulp.task("watch", function() {
	gulp.watch("./js/**/*.js", ["js"]);
	gulp.watch("./app/js/**/*.js", ["react"]);
});

gulp.task("js", function() {
	var b = browserify("./js/main.js");
	return b.bundle()
		.pipe(source("main.js"))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest("./build/"));
});

gulp.task("default", ["watch", "js"]);