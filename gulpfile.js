var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    sass        = require('gulp-sass'),
    cssnano     = require('gulp-cssnano'),
    harp        = require('harp');

gulp.task('harp-server', function () {
  harp.server(__dirname + '/_harp', {
        port: 3002
    }, function () {
        browserSync({
            proxy: "http://localhost:3002",
            open: false
        });

        gulp.watch("_harp/css/**/*.scss", function () {
          reload(["main.css", "palette.css"], {stream: true});
        });

        gulp.watch([
            "_harp/**/*.ejs",
            "_harp/**/*.jade",
            "_harp/js/**/*.js",
            "_harp/**/*.json",
            "_harp/**/*.md"
        ], function () {
            reload();
        });
    })
});

gulp.task('sass', function() {
  return gulp.src('_harp/css/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('www/css'));
});

gulp.task('default', ['harp-server']);
