var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

DEST = 'vendor';
var IS_DEV = process.env.DEV || false;

gulp.task('copy', function(){
    gulp.src('src/**/*.+(md|gif|png|jpg)')
        .pipe(gulp.dest(DEST))
});

gulp.task('minify-css', function() {
    if (IS_DEV) {
        gulp.src('src/**/*.css')
            .pipe(gulp.dest(DEST));
    } else {
        gulp.src('src/**/*.css')
            .pipe(minifyCss())
            .pipe(gulp.dest(DEST));
    }

});

gulp.task('compress', function() {
    if (IS_DEV) {
        gulp.src('src/**/*.js')
            .pipe(gulp.dest(DEST));
    } else {
        gulp.src('src/**/*.js')
            .pipe(uglify())
            .pipe(gulp.dest(DEST));
    }

});

gulp.task('concat-js',['compress'], function(){
    gulp.src(['vendor/highlight/highlight.pack.js',
              'vendor/marked-0.3.5.min.js',
              'vendor/blog.js'])
        .pipe(concat('core.js'))
        .pipe(gulp.dest(DEST))
});

gulp.task('concat-css',['minify-css'], function(){
    gulp.src(['vendor/highlight/styles/main.css',
              'vendor/github-markdown.css',
              'vendor/blog.css'])
        .pipe(concat('core.css'))
        .pipe(gulp.dest(DEST))
});

gulp.task('build', ['concat-css', 'concat-js', 'copy'])

gulp.task('watch', ['build'],function() {
    gulp.watch('src/**/*', ['build'])
});

gulp.task('default', ['watch'])