const gulp = require('gulp');
const rename = require('gulp-rename');

let styleSource = './src/scss/style.scss';
let styleDestination = './build/css/';

gulp.task('styles',function(){
    gulp.src(styleSource)
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest(styleDestination));
});