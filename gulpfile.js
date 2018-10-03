const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

let styleSource = './src/scss/style.scss';
let styleDestination = './build/css/';

gulp.task('styles',function(){
    gulp.src(styleSource)
        .pipe(sass({
            errorLogToConsole:true
        }))
        .on('error', console.error.bind(console))
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest(styleDestination));
});