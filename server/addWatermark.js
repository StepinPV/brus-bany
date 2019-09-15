const gm = require('gm');

// https://github.com/navjotdhanawat/dynamic-watermark/blob/master/index.js
const addWatermark = function(options, callback, errback) {
    gm(options.source)
        .size(function(err, size) {
            if (!err) {
                const logoX = 20;
                const logoY = size.height - options.logoSize.height - 10;

                gm(options.source)
                    .draw(['image over ' + logoX + ',' + logoY + ' ' + options.logoSize.width + ',' + options.logoSize.height + ' "' + options.logo + '"'])
                    .write(options.source, callback);
            } else {
                errback(err);
            }
        });
};

module.exports = addWatermark;
