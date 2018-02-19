module.exports = function () {
    $.gulp.task('watch', function () {
        $.gulp.watch('./dev/pug/**/*.pug', $.gulp.series('pug'));
        $.gulp.watch('./dev/sass/**/*.sass', $.gulp.series('styles:dev'));
        $.gulp.watch('./dev/img/svg/*.svg', $.gulp.series('svg'));
        $.gulp.watch('./dev/js/**/*.js', $.gulp.series('libsJS:dev', 'js:copy'));
        $.gulp.watch(['./dev/img/common/**/*.{png,jpg,gif}',
                     './dev/img/content/**/*.{png,jpg,gif}'], $.gulp.series('img:dev'));
    });
};