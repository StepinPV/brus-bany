const path = require('path');
const shell = require('shelljs');
const sharp = require('sharp');

const MAX_WIDTH = 1000;

const resizeImage = async function(sourcePath, imageName, targetPath, callback, errback) {
    shell.mkdir('-p', path.join(__dirname, targetPath));

    const image = sharp(path.join(__dirname, `${sourcePath}${imageName}`));

    const metadata = await image.metadata();

    await image.resize(metadata.width > MAX_WIDTH ? MAX_WIDTH : metadata.width);
    await image.toFile(path.join(__dirname, `${targetPath}${imageName}`));
};


async function start() {
    await resizeImage('./img/', '1.jpg', './img/resize/');
}

start();

module.exports.resizeImage = resizeImage;
