const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// these are created tasks

// Task 1. Compile sass & inject into browser
gulp.task('sass', function() {
  // in array is sass files that we want to compile
  // * means that eveyrthing with .scss extention will be compiled
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});


// Task 2. Move JS files to src/js
gulp.task('js', function() {
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
  .pipe(gulp.dest("src/js"))
  .pipe(browserSync.stream());
});

// Task 3. Watch sass & server
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: "./src"
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
  gulp.watch(["src/*html"]).on('change', browserSync.reload);
});

// Task 4. move fonts (font-awesome) folder to src
gulp.task('fonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
  .pipe(gulp.dest("src/fonts"));
});


// Task 5. move font-awesome css to src/css
gulp.task('fa', function() {
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
  .pipe(gulp.dest("src/css"));
});


// Task 6. default gulp task; when we run gulp it runs all the tasks we need; it runs when we type 'gulp'
gulp.task('default', ['js', 'serve', 'fa', 'fonts']);
