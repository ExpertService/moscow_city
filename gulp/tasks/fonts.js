module.exports = function() {
    $.gulp.task('fonts', function () {
        return $.gulp.src('./dev/fonts/**/*.*')
            .pipe($.gulp.dest('./build/fonts/'));
    });
};
