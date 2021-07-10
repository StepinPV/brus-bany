export default function(data) {
    return Object.keys(data || {}).reduce((calc, key) => {
        if (data[key]) {
            calc = calc || {}
            calc[key] = data[key];
        }

        return calc;
    }, null);
}
