const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'assets/',
    },
  });
}

function cleandist() {
  return del('dist');
}

function images() {
  return src('assets/img/**/*')
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest('dist/img'));
}

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'assets/js/script.js',
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('assets/js'))
    .pipe(browserSync.stream());
}

function styles() {
  return src('assets/scss/main.scss')
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 10 version'],
        grid: true,
      })
    )
    .pipe(dest('assets/css'))
    .pipe(browserSync.stream());
}

function watching() {
  watch(['assets/scss/**/*.scss'], styles);
  watch(['assets/js/**/*.js', '!assets/js/main.min.js'], scripts);
  watch(['assets/*.html']).on('change', browserSync.reload);
}
function build() {
  return src(
    [
      'assets/css/style.min.css',
      'assets/fonts/**/*',
      'assets/js/main.min.js',
      'assets/*.html',
    ],
    { base: 'assets' }
  ).pipe(dest('dist'));
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.cleandist = cleandist;

exports.images = images;
exports.build = series(cleandist, images, build);
exports.default = parallel(styles, scripts, browsersync, watching);
