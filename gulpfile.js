var gulp = require('gulp'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer');
const sass = require('gulp-sass');
var uglifyjs = require('gulp-uglify-es').default;
var BUILD_DIR = '../js/';

function compile() {
  var bundler = browserify('app/quizzapp/quizzmainapp.js');
  
  return bundler
    .transform('babelify', { presets: ['es2015', 'react', 'stage-2', 'stage-0'], plugins: ['transform-class-properties'] })
    .bundle()
    .pipe(source('quizzmainapp.js'))
    .pipe(buffer())
    .pipe(gulp.dest(BUILD_DIR));
}
function compileProd() {
  var bundler = browserify('app/quizzapp/quizzmainapp.js');
  
  return bundler
    .transform('babelify', { presets: ['es2015', 'react', 'stage-2', 'stage-0'], plugins: ['transform-class-properties'] })
    .bundle()
    .pipe(source('quizzmainapp.js'))
    .pipe(buffer())
    .pipe(uglifyjs())
    .pipe(gulp.dest(BUILD_DIR));
}

gulp.task('build:js', function() {
  return compile();
})
gulp.task('build:js:prod', function() {
  return compileProd();
})
gulp.task('buildcss', function() {
    return gulp.src(['./app/global/scss/style.scss'])
        .pipe(sass())
        .pipe(gulp.dest('../css'))
})
gulp.task('apply-prod-environment', function() {
  process.env.NODE_ENV = 'production';
});
gulp.task('buildprod', ['apply-prod-environment', 'build:js:prod'])
gulp.task('watch', function() {
    gulp.watch('**/*.*', {cwd: 'app'}, [ 'build:js', 'buildcss'])
})