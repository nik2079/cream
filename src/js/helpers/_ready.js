export default function ready(callback) {
    // in case the document is already rendered
    if (document.readyState !== 'loading') {
        callback();
    } else { // modern browsers
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', callback);
        } else { // IE <= 8
            document.attachEvent('onreadystatechange', function () {
                if (document.readyState === 'complete') callback();
            });
        }
    }
}