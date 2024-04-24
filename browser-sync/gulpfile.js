const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const gulpWatch = require('gulp-watch');


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
