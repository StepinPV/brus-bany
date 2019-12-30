const path = require('path');
const gm = require('gm');

const MAX_WIDTH = 1200;

const LOGO_PATH = path.join(__dirname, './watermark.png');
const LOGO_SIZE = {
    width: 384,
    height: 84
};

const prepareImage = async function(imageURL, callback, errback) {
    let imageGM = gm(imageURL);

    imageGM.size((err, size) => {
        if (err) { errback(err) }

        // Обрезаем
        if (size.width > MAX_WIDTH) {
            imageGM = imageGM.resize(MAX_WIDTH);
        }

        imageGM.write(imageURL, (err) => {
            if (err) {
                errback(err);
            } else {
                imageGM = gm(imageURL);
                imageGM.size((err, size) => {
                    if (err) { errback(err) }

                    const logoWidth = size.width / 2 < LOGO_SIZE.width ? size.width / 2 * 0.8 : LOGO_SIZE.width;
                    const logoHeight = logoWidth / (LOGO_SIZE.width / LOGO_SIZE.height);


                    // Добавляем логотип
                    let logoPadding = size.height / 15;
                    logoPadding = logoPadding > 30 ? 30 : logoPadding;
                    const logoX = logoPadding;
                    const logoY = size.height - logoHeight - logoPadding;

                    imageGM = imageGM.draw(['image over ' + logoX + ',' + logoY + ' ' + logoWidth + ',' + logoHeight + ' "' + LOGO_PATH + '"']);

                    // Cжимаем
                    imageGM = imageGM.quality(45);

                    imageGM.write(imageURL, (err) => {
                        if (err) {
                            errback(err);
                        } else {
                            callback();
                        }
                    });
                });
            }
        });
    });
};

module.exports = prepareImage;
