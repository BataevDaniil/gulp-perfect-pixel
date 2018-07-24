# gulp-perfect-pixel

This plugin analog [PerfectPixel](http://www.welldonecode.com/perfectpixel/) but is different
1. Do not upload photos every time if you want to compare the 
design layout and web layout.
2. Photos adapt to the screen resolution (mobile, tablet, desktop)
3. Begin position each image you cat setting

# Install

```
yarn add gulp-perfect-pixel -D
```
or
```
npm install --save-dev gulp-perfect-pixel
```
# Usage

Add in you gulpfile
```js
const gulp = require('gulp');
const perfectPixel = require('gulp-perfect-pixel');
 
gulp.task('html-build', function () {
  return gulp.src('./html/*.html')
    .pipe(perfectPixel())
    .pipe(gulp.dest('build'));
});
```
and add image name which comprises 
```name_html_page.desktop_or_tablet_or_mobile.jpg```. By default
all image searcher by url ```/perfectPixel/name_html_page.desktop_or_tablet_or_mobile.jpg```. If you use 
[browsersync](https://browsersync.io/) then just add in him config
```
browsersyncConfig = {
  server: {
    routes: {
      '/perfectPixel': 'you_path_to_image',
    }
  }
}
```
