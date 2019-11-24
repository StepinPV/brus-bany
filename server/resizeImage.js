const path = require('path');
const sizeOf = require('image-size');
const fs = require('fs');
const shell = require('shelljs');
const resizeImg = require('resize-img');

const MAX_WIDTH = 1200;

const resizeImage = async function(sourcePath, imageName, targetPath, callback, errback) {
    shell.mkdir('-p', path.join(__dirname, targetPath));

    sizeOf(path.join(__dirname, `${sourcePath}${imageName}`), async function (err, dimensions) {
        if (err) {
            errback(err);
        }

        if (dimensions.width > MAX_WIDTH) {
            // gm(options.source).resize
            const image = await resizeImg(fs.readFileSync(path.join(__dirname, `${sourcePath}${imageName}`)), {
                width: MAX_WIDTH
            });

            fs.writeFileSync(path.join(__dirname, `${targetPath}${imageName}`), image);

            callback();
        } else {
            fs.renameSync(path.join(__dirname, `${sourcePath}${imageName}`), path.join(__dirname, `${targetPath}${imageName}`));
            callback();
        }
    });
};

module.exports = resizeImage;
