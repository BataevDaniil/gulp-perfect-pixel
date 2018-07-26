module.exports = (process.env.NODE_ENV === 'production')
                  ? 'production'
                  : (process.env.NODE_ENV === 'development-gulp-perfect-pixel')
                  ? 'development-gulp-perfect-pixel'
                  : 'development';
