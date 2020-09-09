export function hexToRgba(hex, alpha) {
    var h=hex.replace('#', '');
    h =  h.match(new RegExp('(.{'+h.length/3+'})', 'g'));

    for(var i=0; i<h.length; i++)
        h[i] = parseInt(h[i].length===1? h[i]+h[i]:h[i], 16);

    if (typeof alpha != 'undefined')  h.push(alpha);

    return 'rgba('+h.join(',')+')';
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

export function rgbToHex(rgba) {
    const [r, g, b, a] = rgba.match(/(\d|\.)+/g);
    return {
        hex: "#" + componentToHex(parseInt(r)) + componentToHex(parseInt(g)) + componentToHex(parseInt(b)),
        alpha: parseFloat(a) * 100
    };
}
