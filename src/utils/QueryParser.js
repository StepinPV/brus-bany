export default function(uri) {
    const [, params] = uri.split('?');

    return decodeURIComponent(params).split('&').reduce((acc, item) => {
        const [key, value] = item.split('=');
        acc[key] = value;
        return acc;
    }, {});
}
