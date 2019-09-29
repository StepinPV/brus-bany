const path = require('path');
const sharp = require('sharp');
const shell = require('shelljs');
const gm = require('gm');
const fs = require('fs');

const MAX_WIDTH = 1200;

const resizeImage = function(sourcePath, imageName, targetPath, callback, errback) {
    shell.mkdir('-p', path.join(__dirname, targetPath));

    gm(path.join(__dirname, `${sourcePath}${imageName}`))
        .size(function(err, size) {
            if (!err) {
                if (size.width > MAX_WIDTH) {
                    sharp(path.join(__dirname, `${sourcePath}${imageName}`))
                        .resize(MAX_WIDTH)
                        .toFile(path.join(__dirname, `${targetPath}${imageName}`), function(err) {
                            if (err) {
                                errback(err);
                            } else {
                                callback();
                            }
                        });
                } else {
                    fs.renameSync(path.join(__dirname, `${sourcePath}${imageName}`), path.join(__dirname, `${targetPath}${imageName}`));
                    callback();
                }
            } else {
                errback(err);
            }
        });
};

module.exports = resizeImage;
