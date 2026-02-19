/* Gulp configuration */

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const plumber = require("gulp-plumber");
const browserSync = require("browser-sync");
const reload = browserSync.reload;
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer =
  require("gulp-autoprefixer").default || require("gulp-autoprefixer");

/* Concatenate and minify vendor scripts */
function scripts() {
  return gulp
    .src([
      "js/jquery.min.js",
      "js/jquery.easing.1.3.js",
      "js/jquery.stellar.min.js",
      "js/jquery.flexslider-min.js",
      "js/bootstrap.min.js",
      "js/jquery.waypoints.min.js",
    ])
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest("js"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(uglify())
    .pipe(gulp.dest("js"));
}

/* Minify custom JavaScript */
function minifyCustom() {
  return gulp
    .src("js/custom.js")
    .pipe(rename({ suffix: ".min" }))
    .pipe(uglify())
    .pipe(gulp.dest("js"));
}

/* Compile SCSS to CSS */
function sassCompile() {
  return gulp
    .src("scss/style.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "expanded",
        precision: 10,
      }).on("error", sass.logError),
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      }),
    )
    .pipe(gulp.dest("css"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("css"))
    .pipe(reload({ stream: true }));
}

/* Merge vendor CSS files */
function mergeStyles() {
  return gulp
    .src([
      "css/bootstrap.min.css",
      "css/animate.css",
      "css/icomoon.css",
      "css/flexslider.css",
      "css/default-skin.css",
    ])
    .pipe(concat("styles-merged.css"))
    .pipe(gulp.dest("css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("css"))
    .pipe(reload({ stream: true }));
}

/* Reload browser */
function bsReload(done) {
  browserSync.reload();
  done();
}

/* Initialize BrowserSync server */
function browserSyncInit(done) {
  browserSync.init({
    server: {
      baseDir: "./",
    },
    files: ["css/*.css", "js/*.js"],
  });
  done();
}

/* Watch files for changes */
function watchFiles() {
  gulp.watch(["scss/*.scss", "scss/**/*.scss"], sassCompile);
  gulp.watch(["js/custom.js"], minifyCustom);
  gulp.watch(["*.html"], bsReload);
}

/* Export tasks */
exports.scripts = scripts;
exports.minifyCustom = minifyCustom;
exports.sass = sassCompile;
exports.mergeStyles = mergeStyles;
exports.watch = watchFiles;

/* Default task */
exports.default = gulp.series(
  gulp.parallel(sassCompile, scripts),
  browserSyncInit,
  watchFiles,
);
