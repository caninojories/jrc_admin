
  var nib     = require('nib'),
      stylus  = require('gulp-stylus');

  module.exports = function ( gulp, handleErrors ) {
    gulp.task('stylus', function () {
      return gulp.src( 'front-end/resources/css/stylus/app.styl' )
        .pipe( stylus({use: [nib()]}) )
        .on( 'error', handleErrors )
        .pipe(gulp.dest( 'front-end/.tmp/stylus' ))
    })
  }
