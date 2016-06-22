var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),    
    sass = require('gulp-sass'),
    compass = require('gulp-compass'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'), 
    browserSync = require('browser-sync'), 
    reload = browserSync.reload,
    del = require('del'),
    modernizr = require('gulp-modernizr'),
    addsrc = require('gulp-add-src');

// ///////////////////////////////////////
// Managing All js files 
// ///////////////////////////////////////
gulp.task('scripts', function() {
    gulp.src(['javascripts/**/*.js', '!javascripts/**/*.min.js'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
     }}))
    .pipe(rename({suffix:'.min'}))    
    .pipe(uglify())
    .pipe(plumber.stop())
    .pipe(gulp.dest('js'))
    .pipe(reload({stream:true}));
});

// ///////////////////////////////////////
// Compass Sass Scss Tasks 
// ///////////////////////////////////////

gulp.task('compass',function(){
    gulp.src('scss/*.scss')
    .pipe(plumber({
          errorHandler: function (error) {
            console.log(error.message);
            this.emit('end');
    }}))
    .pipe(compass({
        config_file: './config.rb',
        css: 'css',
        sass: 'scss',
        image: 'images',
        require: ['susy']
    }))
    .pipe(plumber.stop())
    .pipe(autoprefixer())    
    .pipe(gulp.dest('css'))
    .pipe(reload({stream:true}));

});
// ///////////////////////////////////////
// html Task Runner for LIVE RELOAD 
// ///////////////////////////////////////

gulp.task('html',function(){
    gulp.src('*.html')
    .pipe(reload({stream:true}));
});

// ///////////////////////////////////////
// Static server for LIVE RELOAD 
// ///////////////////////////////////////
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});


// ////////////////////////////////////////////////
// Build Tasks
// // /////////////////////////////////////////////

// clean out all files and folders from build folder
gulp.task('build:clean', function (cb) {
    del([
        'lib/**'
    ], cb);
});

gulp.task('build:jquery', function(){
    return gulp.src(['node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('lib/js'));
});
gulp.task('build:owl', function(){
    return gulp.src(['node_modules/owl.carousel/dist/**'])
    .pipe(gulp.dest('lib/owl'));
});

gulp.task('build', [ 'build:jquery','build:owl']);

// ///////////////////////////////////////
// Watching Recommended Task For change
// ///////////////////////////////////////
gulp.task('watch',function(){
    gulp.watch(['js/**/*.js','!js/**/*.min..js'],['scripts']);
    gulp.watch('scss/*.scss',['compass']);
    gulp.watch('**/*.html',['html']);
});

// Clean Library

gulp.task('reset',['build:clean']);

// ///////////////////////////////////////
// Setting up Default Tasks. 
// ///////////////////////////////////////


gulp.task('default', ['build','scripts','compass','browser-sync','watch']);
