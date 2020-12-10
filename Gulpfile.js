// Include gulp
var gulp = require('gulp');

// Gulp load plugins
var $ = require('gulp-load-plugins')();

// Gulp load JS plugins
var pluginsjs = require('./plugins.js').scripts;

// Include plugins
var gutil = require('gulp-util');
var flipper = require('gulp-css-flipper');
var changed = require('gulp-changed');
var browserSync = require('browser-sync').create();

// Error handler
var onError = function (error) {
    $.notify.onError({
        title: "Gulp Error in " + error.plugin,
        message: "\nError: " + error.message.substr(error.message.indexOf('static'))
    })(error);
    gutil.log();
    this.emit('end');
};

// Autoprefix config
var autoprefixConfig = {
    browsers: ['last 3 versions'],
    cascade: false
};

// Browsersync function
var bsync = function (proxy) {
    if (proxy) {
        browserSync.init({
            proxy: {
                target: proxy,
                ws: true
            },
            startPath: 'www.yapp.loc'
        });
    }
    else {
        browserSync.init({
            server: {
                baseDir: './'
            },
            online: true
        });
    }
};

// Paths
var paths = {

    dist: 'static/dist',

    img: {
        src: 'static/**/*.{png,jpg,svg}',
        dest: 'static/'
    },

    css: {
        src: 'static/css',
        file: 'static/css/style.css'
    },

    scss: {
        src: 'static/scss/**/*',
        main: 'static/scss/style.scss'
    },

    js: {
        src: 'static/js/',
        main: 'static/js/js.js',
        watch: 'static/js/**/*'
    },
    php: {
        watch: '**/*.php'
    }

};

// Name
var filename = {

    mincss: {
        css: 'style.min.css',
    },

    minjs: {
        file: 'js.js',
        dist: 'js.min.js'
    }

};

// Default Task
gulp.task('default', function () {

    // with localhost
    //bsync();

    // with proxy
    bsync('http://www.yapp.loc/may-1st-reboot-2017/karlo-videk');

    gulp.watch(paths.scss.src, ['sass']);
    gulp.watch(paths.js.watch, ['scripts']);
    gulp.watch(paths.php.watch).on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("static/js/*.js").on('change', browserSync.reload);

});

// Build CSS and JS
gulp.task('build', ['buildCSS', 'buildJS']);

// Build CSS-LTR
gulp.task('buildCSS', function () {
    return gulp.src(paths.css.file)
        .pipe($.combineMq())
        .pipe($.autoprefixer(autoprefixConfig))
        .pipe($.cssnano())
        .pipe($.rename(filename.mincss.css))
        .pipe(gulp.dest(paths.dist))
});

// Build JS
gulp.task('buildJS', function () {
    return gulp.src(paths.js.main)
        .pipe($.uglify())
        .pipe($.rename(filename.minjs.dist))
        .pipe(gulp.dest(paths.dist))
});

// Image min
gulp.task('imagemin', function () {
    return gulp.src(paths.img.src)
        .pipe($.imagemin({expand: true}))
        .pipe(gulp.dest(paths.img.dest))
});

// Compile SCSS to CSS
gulp.task('sass', function () {
    return gulp.src(paths.scss.main)
        .pipe(changed(paths.css.src))
        .pipe($.plumber({errorHandler: onError}))
        .pipe($.sourcemaps.init())
        .pipe($.sass())
        .pipe($.autoprefixer(autoprefixConfig))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(paths.css.src))
        .pipe(browserSync.stream({
            match: '**/*.css'
        }));
});

// Concat JS
gulp.task('scripts', function () {
    return gulp.src(pluginsjs)
        .pipe($.concat(filename.minjs.file))
        .pipe(gulp.dest(paths.js.src))
});