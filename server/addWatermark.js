const sizeOf = require('image-size');
const gm = require('gm');

// https://github.com/navjotdhanawat/dynamic-watermark/blob/master/index.js
const addWatermark = function(options, callback, errback) {
    sizeOf(options.source, function (err, dimensions) {
        if (err) {
            errback(err);
        }

        const logoX = 30;
        const logoY = dimensions.height - options.logoSize.height - 30;

        gm(options.source)
            .draw(['image over ' + logoX + ',' + logoY + ' ' + options.logoSize.width + ',' + options.logoSize.height + ' "' + options.logo + '"'])
            .write(options.source, (err) => {
                if (err) {
                    errback(err);
                } else {
                    callback();
                }
            });
    });
};

module.exports = addWatermark;
