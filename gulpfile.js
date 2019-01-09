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
const minifycss = require("gulp-minify-css");
const pug = require("gulp-pug");
const gulpif = require("gulp-if");
const babel = require("gulp-babel");
const yargs = require("yargs"); //<---- console

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
exports.buildStyles = () => {
    src(sources.styles)
        .pipe(sass.sync().on("error", sass.logError))
        .pipe(gulpif(production, minifycss()))
        .pipe(dest(dirs.dest))
        .pipe(livereload());

};

// Views
exports.buildViews = () => {
    src(sources.views)
        .pipe(pug())
        .pipe(dest(dirs.dest))
        .pipe(livereload())
};

// Scripts
exports.buildScripts = () => {
    src(sources.scripts)
        .pipe(
            babel({
                presets: ["es2015"]
            })
        )
        .pipe(dest(dirs.dest))
        .pipe(livereload())
};

// Clean
exports.clean = () => {

    del(["build"]);
};

// Watch Task
exports.devWatch = () => {
    livereload.listen();
    watch(sources.styles, buildStyles);
    watch(sources.views, buildViews);
    watch(sources.scripts, buildScripts);
};

// Development Task
exports.dev = series(
    exports.clean,
    parallel(exports.buildStyles, exports.buildViews, exports.buildScripts),
    exports.devWatch
);

// Serve Task
exports.build = series(
    exports.clean,
    parallel(exports.buildStyles, exports.buildViews, exports.buildScripts)
);

// Default task
exports.default = exports.dev;