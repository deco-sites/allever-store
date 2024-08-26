import gulp from "gulp";
import uglify from "gulp-uglify";
import cssnano from "gulp-cssnano";
import browserify from "gulp-browserify";
import dartSass from "sass";
import gulpSass from "gulp-sass";

const sass = gulpSass(dartSass);

const js = () =>
  gulp
    .src("./src/js/*.js")
    .pipe(
      browserify({
        transform: ["babelify"],
      }),
    )
    .pipe(uglify())
    .pipe(gulp.dest("dist/"));

const css = () =>
  gulp
    .src("./src/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cssnano({ zindex: false }))
    .pipe(gulp.dest("dist/"));

const watch = () => {
  gulp.watch("./src/js/**/*.js", gulp.series(js));
  gulp.watch("./src/scss/**/*.scss", gulp.series(css));
};

exports.watch = gulp.series(js, css, watch);
exports.default = gulp.series(js, css);
