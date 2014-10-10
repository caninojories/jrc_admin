
var nib           = require('nib');
var handleErrors 	= require('./util/handleErrors');

module.exports = function( gulp, $ ) {
  gulp.task('stylus', function () {
    return gulp.src( 'app/public/css/stylus/app.styl' )
      .pipe( $.stylus({use: [nib()]}) )
      .on( 'error', handleErrors )
      .pipe(gulp.dest( '.tmp/stylus' ))
  })
}
