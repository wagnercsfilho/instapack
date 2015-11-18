var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gulpFilter = require('gulp-filter');
var flatten = require('gulp-flatten');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserSync = require('browser-sync').create();
var mainBowerFiles = require('main-bower-files');

gulp.task('bower', function() {
    var jsFilter = gulpFilter('**/*.js', {
        restore: true
    });
    var cssFilter = gulpFilter('**/*.css', {
        restore: true
    });
    var fontFilter = gulpFilter(['**/*.eot', '**/*.woff', '**/*.woff2', '**/*.svg', '**/*.ttf'], {
        restore: true
    });
    var dest_path = 'www/libs/';

    return gulp.src(mainBowerFiles())

    // grab vendor js files from bower_components, minify and push in /public
    .pipe(jsFilter)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(dest_path + '/js/'))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(dest_path + '/js/'))
        .pipe(jsFilter.restore)

    // grab vendor css files from bower_components, minify and push in /public
    .pipe(cssFilter)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(dest_path + '/css'))
        .pipe(minifycss())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(dest_path + '/css'))
        .pipe(cssFilter.restore)

    // grab vendor font files from bower_components and push in /public
    .pipe(fontFilter)
        .pipe(flatten())
        .pipe(gulp.dest(dest_path + '/fonts'));
});

function compile(watch) {
    var bundler = watchify(browserify('./src/app/index.js', {
        debug: true,
        insertGlobals: true
    }).transform(babel));

    function rebundle() {
        bundler.bundle()
            .on('error', function(err) {
                console.error(err);
                this.emit('end');
            })
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({
                loadMaps: true
            }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./www/js/'))
            .pipe(browserSync.stream());
    }

    if (watch) {
        bundler.on('update', function() {
            console.log('-> bundling...');
            rebundle();
        });
    }

    rebundle();

}

function watch() {
    return compile(true);
};

gulp.task('assets', function() {
    var dest_path = 'www/';

    gulp.src('src/assets/fonts/**/*')
        .pipe(gulp.dest(dest_path + '/fonts'));

    gulp.src('src/assets/js/**/*.js')
        .pipe(concat('assets.js'))
        .pipe(gulp.dest(dest_path + '/js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(dest_path + '/js'));

    gulp.src('src/assets/css/**/*.css')
        .pipe(concat('assets.css'))
        .pipe(gulp.dest(dest_path + '/css'))
        .pipe(minifycss())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(dest_path + '/css'));

    gulp.src('src/assets/images/**/*')
        //.pipe(cache(imagemin({
        //    optimizationLevel: 3,
        //    progressive: true,
        //    interlaced: true
        //})))
        .pipe(gulp.dest('www/images'));

});

gulp.task('build', function() {
    return compile();
});

gulp.task('watch', function() {
    gulp.watch('./src/**/*.html', ['html']);
    gulp.watch('./src/**/*.scss', ['sass']);
    gulp.watch('./src/assets/**/*', ['assets']);
    return watch();
});


gulp.task('html', function() {
    gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./www'))
        .pipe(browserSync.stream());
})

gulp.task('server', function() {
    var port = {
        server: "./www"
    };

    if (process.env.PORT) {
        port.port = process.env.PORT,
            port.host = process.env.IP
    }

    browserSync.init(port);
});

gulp.task('sass', function() {
    gulp.src('src/scss/styles.scss')
        .pipe(sass())
        .on('error', sass.logError)
        //.pipe(autoprefixer("last 2 versions"))
        .pipe(gulp.dest('www/css'))
        .pipe(browserSync.stream());
});

gulp.task('dist', ['bower', 'assets', 'sass', 'html', 'build', 'watch']);

gulp.task('default', ['bower', 'assets', 'sass', 'html', 'server', 'watch']);