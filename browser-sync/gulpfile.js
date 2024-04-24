const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const gulpWatch = require('gulp-watch');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const gcmq = require('gulp-group-css-media-queries');
const sassGlob = require('gulp-sass-glob');
const fileinclude = require('gulp-file-include');


// Таск для компиляции SCSS в CSS
gulp.task('scss', function (callback) {
    return gulp.src('./app/scss/main.scss')
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: 'Styles',
                    sound: false,
                    message: err.message
                }
            })
        }))
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass({
            indentType: 'tab',
            indentWidth: 1,
            outputStyle: 'expanded'
        }))
        .pipe(gcmq())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/css/'))
    callback();
});
gulp.task('html', (callback) => {
    return gulp.src('./app/html/*.html')
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: 'HTML Include',
                    sound: false,
                    message: err.message
                }
            })
        }))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./app/'))
    callback();
});

// Слежение за HTML и CSS и обновление браузера
gulp.task('watch', () => {
    gulp.watch(['./app/*.html', './app/css/**/*.css']), gulp.parallel(browserSync.reload);
})
// Задача для старта сервера из папки app
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./app/"
        }
    })
});

gulp.task('default', gulp.parallel('server', 'watch'));
