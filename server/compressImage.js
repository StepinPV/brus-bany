const gm = require('gm');
const shell = require('shelljs');
const path = require('path');

const compressImage = function(sourceUrl, targetPath, imageName, callback, errback) {
    let imageGM = gm(sourceUrl);

    shell.mkdir('-p', path.join(__dirname, targetPath));

    imageGM = imageGM.quality(45);

    imageGM.write(path.join(__dirname, `${targetPath}${imageName}`), (err) => {
        if (err) {
            errback(err);
        } else {
            callback();
        }
    });
};

module.exports = compressImage;
