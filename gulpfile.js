"use strict";
// Gulp module imports
const {
    src,
    dest,
    watch,
    parallel,
    series
} = require('gulp');
const del = require("del");
const livereload = require("gulp-livereload");
const sass = require("gulp-sass");
// const minifycss = require("gulp-minify-css");
const cleanCSS = require('gulp-clean-css');
const pug = require("gulp-pug");
const gulpif = require("gulp-if");
const babel = require("gulp-babel");
const yargs = require("yargs"); //<---- console
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();


// Build Directories
// ----
const dirs = {
    src: "src", //development
    dest: "build" //public
};

// File Sources
// ----
const sources = {
    styles: `${dirs.src}/**/*.scss`,
    views: `${dirs.src}/**/*.pug`, //<----pug!!!
    scripts: `${dirs.src}/**/*.js`
};

// Recognise `--production` argument
const argv = yargs.argv;
const production = !!argv.production;

// Main Tasks
// ----

// Styles
exports.buildStyles = () =>
    src(sources.styles)
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(gulpif(production, cleanCSS({
        compatibility: 'ie8'
    })))
    .pipe(dest(dirs.dest))
    .pipe(browserSync.reload({
        stream: true
    }));

// Autoprefixer
exports.autoprefixer = () =>
    src(sources.styles)
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(dest(dirs.dest));

// Views
exports.buildViews = () =>
    src(dirs.src + '/views/index.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(dest(dirs.dest))
    .pipe(src(sources.views))
    .pipe(pug({
        pretty: true
    }))
    .pipe(dest(dirs.dest))
    .pipe(livereload());
//.pipe(browserSync.reload());


// Scripts
exports.buildScripts = () =>
    src(sources.scripts)
    .pipe(
        babel({
            presets: ["@babel/env"]
        })
    )
    .pipe(dest(dirs.dest))
//.pipe(browserSync.reload());

// Clean
exports.clean = () =>
    del(["build\scripts\**", "build\styles\**",
        "build\views\**", "build\*.*", "!build/images"
    ]);

// Watch Task
exports.devWatch = () => {
    livereload.listen();
    watch(sources.styles, exports.buildStyles);
    watch(sources.views, exports.buildViews);
    watch(sources.scripts, exports.buildScripts);

}

// Server run
exports.server = () => {
    browserSync.init({
        server: {
            baseDir: dirs.dest
        },
        notify: false
    });
};

// Development Task
exports.dev = series(
    exports.clean,
    parallel(exports.buildStyles, exports.autoprefixer, exports.buildViews, exports.buildScripts),
    parallel(exports.devWatch, exports.server)
);

// Serve Task
exports.build = series(
    exports.clean,
    parallel(exports.buildStyles, exports.autoprefixer, exports.buildViews, exports.buildScripts)
);

// Default task
exports.default = exports.dev;