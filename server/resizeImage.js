const path = require('path');
const shell = require('shelljs');
const gm = require('gm');
const fs = require('fs');
const resizeImg = require('resize-img');

const MAX_WIDTH = 1200;

const resizeImage = function(sourcePath, imageName, targetPath, callback, errback) {
    shell.mkdir('-p', path.join(__dirname, targetPath));

    gm(path.join(__dirname, `${sourcePath}${imageName}`))
        .size(async function(err, size) {
            if (!err) {
                if (size.width > MAX_WIDTH) {
                    const image = await resizeImg(fs.readFileSync(path.join(__dirname, `${sourcePath}${imageName}`)), {
                        width: MAX_WIDTH
                    });

                    fs.writeFileSync(path.join(__dirname, `${targetPath}${imageName}`), image);

                    callback();
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
