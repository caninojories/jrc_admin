
module.exports = function( gulp, $) {
  gulp.task( 'watch', function () {
    gulp.watch('app/public/css/stylus/app.styl', ['stylus'])
  })
}
