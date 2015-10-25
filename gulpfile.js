var gulp = require("gulp"),
		connect = require("gulp-connect"),
		opn = require("opn"),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    bourbon = require('node-bourbon'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    rename = require("gulp-rename"),
    gulpif = require('gulp-if'),
    clean = require('gulp-clean'),
    useref = require('gulp-useref');

// Server
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true,
    port: 8888
  });
  opn("http://localhost:8888");
});

// HTML
gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

// CSS
gulp.task('scss', function () {
  gulp.src('./app/sass/*.scss')
    .pipe(sass({includePaths: require('node-bourbon').includePaths}).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 5 versions'], cascade: false}))
    .pipe(gulp.dest('app/css'))
    .pipe(connect.reload());
});

// JS
gulp.task('js', function() {
  return gulp.src('./app/js/common.js')
    .pipe(connect.reload()); 
});

// images
gulp.task('images', function () {
    return gulp.src('./app/img/**/*')
        .pipe(gulp.dest('dist/img'))
});

// fonts
gulp.task('fonts', function () {
    return gulp.src('./app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});

// libs-dev
gulp.task('libs-dev', function () {
    return gulp.src('./app/libs-dev/**/*')
        .pipe(gulp.dest('dist/libs-dev'))
});

// Watch
gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['html']),
  gulp.watch(['./app/sass/*.scss'], ['scss']),
  gulp.watch(['./app/js/*.js'], ['js']);
});

//Clean
gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

//Build
gulp.task('build', ['clean'], function () {
    gulp.start('images');
    gulp.start('fonts');
    gulp.start('libs-dev');
    var assets = useref.assets();
     return gulp.src('app/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('./dist'));
});

// Local
gulp.task('default', ['connect', 'watch']);