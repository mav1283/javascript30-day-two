const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

let styleSource = 'src/scss/style.scss';
let styleDestination = './build/css/';
let styleWatch = 'src/scss/**/*.scss'; // watch every single file in every folder in the sub directory with the extension of .scss

let jsSource = 'main.js';
let jsFolder = 'src/js/';
let jsDestination = './build/js/';
let jsWatch = 'src/js/**/*.js'; // watch every single file in every folder in the sub directory with the extension of .js
let jsFILES = [jsSource];

let htmlWatch = '**/*.html'; // watch all the files in all the folders and all directories that ends with the html extension

/* Converting Sass to CSS */
gulp.task('styles',function(){
    return gulp.src(styleSource)
        .pipe(sourcemaps.init())
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({suffix:'.min'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(styleDestination));
});

/* Converting ES6 to Vanilla JS */
gulp.task('js',function(){
    // map for each js files loop through it and do this functions
    jsFILES.map(function(entry){
        return browserify({
            entries: [`${jsFolder}${entry}`]
        }) //Browserify is a development tool that allows us to write node.js-style modules that compile for use in the browser
        .transform(babelify, {presets:['env']})  // babel-preset-env, which allows us to target specific browser versions with the transpiled code.
        .bundle() // default package of gulp
        .pipe(source(entry))
        .pipe( rename({extname:'.min.js'}) )
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true})) 
        .pipe(uglify()) // similar to the output style compressed of sass
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(jsDestination))
    });
        
})

// default task to run all tasks
gulp.task('default', gulp.series(['styles','js']));

// watch default
gulp.task('watch', gulp.series(['default'], function(){ // ,'browser-sync'
    // keep running, watching and triggering gulp
    gulp.watch(styleWatch, gulp.parallel(['styles'])); //, reload
    gulp.watch(jsWatch, gulp.parallel(['js'])); //, reload
    gulp.watch(htmlWatch);
}));