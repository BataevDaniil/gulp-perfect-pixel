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
    .pipe(perfectPixel({}, {
        rootPathImage: './perfectPixel',
    }))
    .pipe(gulp.dest('build'));
});
```
and add image name which comprises 
```name_html_page.size.extension_image```. By default
all image searcher by url ```/perfectPixel/size.extension_image``` when ```size``` this 
1. ```|number_px``` image will show on display with resolution more ```number_px```
2. ```number_px|``` image will show on display with resolution less ```number_px```
3. ```|number_one_px-number_two_px|``` image will show on display with resolution between ```number_one_px```
and ```number_two_px```

Example:
1. ```index.|1200.jpg```
2. ```index.720|.jpg```
2. ```index.|720-1200|.jpg```

If you use [browsersync](https://browsersync.io/) then just add in him config
```
browsersyncConfig = {
  server: {
    routes: {
      '/perfectPixel': 'you_path_to_image',
    }
  }
}
```
