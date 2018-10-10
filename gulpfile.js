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
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

let styleDestination = './build/css/';
let jsDestination = './build/js/';
let imgDestination = './build/images/';

let paths = {
    scripts: 'src/js/main.js',
    styles: 'src/scss/style.scss',
    images: 'src/images/Day-2-ClockIcon.png'
}

/* Converting Sass to CSS */
gulp.task('convertocss',function(done){
    return gulp.src(paths.styles)
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
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(styleDestination));
        done();
});

/* Converting images */
gulp.task('convertoimg', function () {
    return gulp.src('src/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(imgDestination));
});

/* Converting ES6 to Vanilla JS */
gulp.task('convertojs',function(done){
    return browserify({
            entries: paths.scripts
        })
        .transform(babelify, {presets:['@babel/preset-env']})
        .bundle() 
        .pipe(source('main.js'))
        .pipe( rename({extname:'.min.js'}) )
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true})) 
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(jsDestination));
        done();    
});

// run all tasks
gulp.task('run',gulp.parallel('convertocss','convertoimg','convertojs'));

// watch
gulp.task('watch', function(){
    gulp.watch(paths.styles, gulp.series('convertocss')); 
    gulp.watch(paths.scripts, gulp.series('convertojs'));
    gulp.watch(paths.images, gulp.series('convertojs')); 
});

gulp.task('default',gulp.series('run','watch'));








