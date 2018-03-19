const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');


/* GULP TASKS */ 

// #1 Compile Sass and inject into browser
gulp.task('sass', function() {
  // in array is sass files that we want to compile
  // * means that eveyrthing with .scss extention will be compiled
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});


// #2 Move JS files to src/js
gulp.task('js', function() {
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
  .pipe(gulp.dest("src/js"))
  .pipe(browserSync.stream());
});

// #3 Watch Sass and server
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: "./src"
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
  gulp.watch(["src/*html"]).on('change', browserSync.reload);
});

// #4 Move fonts (font-awesome) folder to src folder
gulp.task('fonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
  .pipe(gulp.dest("src/fonts"));
});


// #5 Move font-awesome css to src/css folder
gulp.task('fa', function() {
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
  .pipe(gulp.dest("src/css"));
});


// #6 Default gulp task. To run default default Gulp task: in your terminal/command line type: "npm start"
gulp.task('default', ['js', 'serve', 'fa', 'fonts']);
