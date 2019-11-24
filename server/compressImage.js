const compressImages = require('compress-images');

// gm("img.png").compress(type) http://aheckmann.github.io/gm/docs.html#compress
const compressImage = function(sourceUrl, targetFolder, callback, errback) {
    compressImages(sourceUrl, targetFolder, {
        compress_force: false,
        statistic: true,
        autoupdate: false
    }, false, {
        jpg: { engine: 'mozjpeg', command: ['-quality', '60'] }
    }, {
        png: { engine: 'pngquant', command: ['--quality=20-50'] }
    }, {
        svg: { engine: 'svgo', command: '--multipass' }
    }, {
        gif: {engine: 'gifsicle', command: ['--colors', '64', '--use-col=web']}
    }, function(error){
        if (error) {
            errback(error);
        } else {
            callback();
        }
    });
};

module.exports = compressImage;
