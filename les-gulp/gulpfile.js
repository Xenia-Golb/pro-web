const gulp = require('gulp');
gulp.task('first', (callback) => {
    console.log('hello from gulp 1')
    callback();
});
gulp.task('second', (callback) => {
    console.log('hello from gulp 2')
    callback();
});
gulp.task('third', (callback) => {
    console.log('hello from gulp 3')
    callback();
});
gulp.task('fourth', (callback) => {
    console.log('hello from gulp 4')
    callback();
});

// gulp.task('default', gulp.series('first', 'second', 'third')); //последовательное выполнение задач
// gulp.task('default', gulp.parallel('first', 'second', 'third')); //одновременный запуск задач


gulp.task('default', gulp.series('first', gulp.parallel('second', 'third'), 'fourth')); 