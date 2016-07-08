var gulp = require('gulp'),
    path = require('path'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    csso = require('gulp-csso'),
    del = require('del'),
    config  = require(path.join(__dirname,'') + '/config.json');


// Config
var guide = {
    css: './guide/assets/css',
    fonts: './guide/assets/fonts',
    imgs: './guide/assets/imgs',
    js: './guide/assets/js'
};

var theme = {
    css: './' + config.style + '/assets/css',
    fonts: './' + config.style + '/assets/fonts',
    imgs: './' + config.style + '/assets/imgs',
    js: './' + config.style + '/assets/js'
};

var minify = true;

var AUTOPREFIXER_BROWSERS = [
    'ie >= 11',
    'edge >= 20',
    'ff >= 40',
    'chrome >= 35',
    'safari >= 8',
    'opera >= 35',
    'ios >= 8'
];

var render = function(layer){
    'use strict';

    var css = gulp
        .src('./guide/assets/scss/' + layer + '.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            precision: 10,
            onError: console.error.bind(console, 'Sass error:')
        }))
        .pipe(autoprefixer(AUTOPREFIXER_BROWSERS));

    if (minify) {
       css = css
       .pipe(csso())
       .pipe(rename({
           suffix: '.min',
           extname: '.css'
       }));
    }

    css = css
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(theme.css));

    return css;
}

gulp.task('css', function(){
    render('style');
});

gulp.task('js', function(){
    gulp.src('node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest(guide.js + '/vendor/'));
});

gulp.task('core', function(){
    render('core');
});

gulp.task('main', function(){
    render('main');
});

gulp.task('utilities', function(){
    render('utilities');
});

gulp.task('clean', function(){
    'use strict';
    del(['guide']);
    del([theme.css]);
});

gulp.task('watch', function(){
    'use strict';
    gulp.watch('./guide/assets/**/*.scss', ['css']);
});

gulp.task('serve', ['watch']);
gulp.task('default', ['css', 'js', 'watch']);
