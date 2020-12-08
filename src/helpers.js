export function eventDelegate(event, selector, handler) {
    let isMatch = function (target) {
        return Array.isArray(selector)
            ? (new RegExp('\\b' + selector.split(/,\s?/).join('\\b|\\b') + '\\b')).test(target.classList.value)
            : target.matches(selector);
    };

    for (let target = event.target; target && target !== event.currentTarget; target = target.parentNode) {
        let matches = isMatch(target);

        if (matches) {
            handler(target);
        }
    }
}


export function formatDate(string) {
    let date = new Date(Date.parse(string));
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();

    month = month < 10 ? `0${month}` : month;

    return `${day}.${month}.${year}`
}
