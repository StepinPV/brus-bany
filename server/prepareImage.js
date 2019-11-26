const path = require('path');
const gm = require('gm');

const MAX_WIDTH = 1200;

const LOGO = path.join(__dirname, './watermark.png');
const LOGO_PADDING = 30;
const LOGO_SIZE = {
    width: 400,
    height: 100
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

                    // Добавляем логотип
                    const logoX = LOGO_PADDING;
                    const logoY = size.height - LOGO_SIZE.height - LOGO_PADDING;
                    imageGM = imageGM.draw(['image over ' + logoX + ',' + logoY + ' ' + LOGO_SIZE.width + ',' + LOGO_SIZE.height + ' "' + LOGO + '"']);

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
