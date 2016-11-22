var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');

gulp.task('script', function() {
    return gulp.src(['js/jquery.js', 'js/style.js'])
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('server', function() {
    connect.server({
        root: 'dist',
        livereload: true
    });
});

gulp.task('copy-index', function() {
    return gulp.src('index.html')
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    return gulp.src('js/*.js')
        .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function() {
    return gulp.src('css/*.css')
        .pipe(gulp.dest('dist/css'));
});

gulp.task('images', function() {
    return gulp.src('images/**/*')
        .pipe(gulp.dest('dist/images'));
});

gulp.task('data', function() {
    return gulp.src(['xml/*.xml', 'json/*.json', '!json/secret-*.json'])
        .pipe(gulp.dest('dist/data'));
});

gulp.task('sass', function() {
    return gulp.src('stylesheets/**/*.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('build', ['css', 'images', 'js', 'data', 'copy-index'], function() {
    console.log('编译成功');
});

gulp.task('watch', function() {
    gulp.watch('index.html', ['copy-index']);
    gulp.watch('js/*.js', ['js']);
    gulp.watch('images/**/*.{jpg,png}', ['images']);
    gulp.watch(['xml/*.xml', 'json/*.json', '!json/secret-*.json'], ['data']);
    gulp.watch('css/*.css', ['css']);
    gulp.watch('stylesheets/*.scss', ['sass']);
});

gulp.task('default', ['server', 'watch']);
