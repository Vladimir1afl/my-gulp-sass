'use strict';

const del          = require('del');
const gulp         = require('gulp');
const sass         = require('gulp-sass');
const browserSync  = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('scss_first-screen', function () {
  return gulp.src('app/scss/first-screen.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});
 
gulp.task('scss_general', function () {
  return gulp.src('app/scss/general.scss')
    .pipe(sass({outputStyle: 'extended'}).on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true
        }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('watch', ['browser-sync'], function() {
	gulp.watch('app/scss/*.scss', ['scss_first-screen', 'scss_general']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/*.js', browserSync.reload);
});

gulp.task('clean-app', function() {
	return del.sync('app/**/*')
});

gulp.task('clean-dist', function() {
	return del.sync('dist/**/*')
});

gulp.task('new-project', ['clean-app'], function() {
	return gulp.src('template/**/*')
	.pipe(gulp.dest('app/'))
});

gulp.task('build', ['clean-dist'], function() {
	return gulp.src('app/**/*')
	.pipe(gulp.dest('dist/'))
});
