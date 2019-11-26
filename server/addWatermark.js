const gm = require('gm');

// https://github.com/navjotdhanawat/dynamic-watermark/blob/master/index.js
const addWatermark = function(options, callback, errback) {
    let imageGM = gm(options.source);

    imageGM.size((err, value) => {
        if (err) { errback(err) }

        const logoX = 30;
        const logoY = value.height - options.logoSize.height - 30;

        imageGM = imageGM.draw(['image over ' + logoX + ',' + logoY + ' ' + options.logoSize.width + ',' + options.logoSize.height + ' "' + options.logo + '"']);

        imageGM.write(options.source, (err) => {
            if (err) {
                errback(err);
            } else {
                callback();
            }
        });
    });
};

module.exports = addWatermark;
