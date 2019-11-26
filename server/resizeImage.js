const path = require('path');
const shell = require('shelljs');
const gm = require('gm');

const MAX_WIDTH = 1200;

const resizeImage = async function(sourcePath, imageName, targetPath, callback, errback) {
    shell.mkdir('-p', path.join(__dirname, targetPath));

    let imageGM = gm(path.join(__dirname, `${sourcePath}${imageName}`));

    imageGM.size((err, value) => {
        if (err) { errback(err) }

        if (value.width > MAX_WIDTH) {
            imageGM = imageGM.resize(MAX_WIDTH);
        }

        imageGM.write(path.join(__dirname, `${targetPath}${imageName}`), (err) => {
            if (err) {
                errback(err);
            } else {
                callback();
            }
        });
    });
};

module.exports = resizeImage;
