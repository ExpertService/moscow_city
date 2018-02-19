module.exports = function() {
    $.gulp.task('img:dev', function() {
        return $.gulp.src('./dev/img/**/*.*')
            .pipe($.gulp.dest('./build/img/'));
    });

    $.gulp.task('img:build', function() {
        return $.gulp.src('./dev/img/**/*.{png,jpg,gif}')
            .pipe($.gp.imagemin([
                $.gp.imagemin.optipng({optimizationLevel: 3}),
                $.gp.imagemin.jpegtran({progressive: true})
            ]))
            .pipe($.gulp.dest('./build/img/'));
    });


    $.gulp.task('svg:copy', function() {
        return $.gulp.src('./dev/img/common/*.svg')
            .pipe($.gulp.dest('./build/img/common/'));
    });
};
