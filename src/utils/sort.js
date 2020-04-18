export function sortByDate(items, field='created') {
    return items.sort((a, b) => {
        const aDate = new Date(a[field]);
        const bDate = new Date(b[field]);

        if (aDate > bDate) return -1;
        if (aDate === bDate) return 0;
        if (aDate < bDate) return 1;
    });
}
