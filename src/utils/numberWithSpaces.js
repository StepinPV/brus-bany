export default function(x, space=' ') {
    const parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, space);
    return parts.join(".");
}
