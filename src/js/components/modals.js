import tingle from 'tingle.js';

export default function (hasFooter, cssClass, content, onClose, onOpen = function () {}) {
    // eslint-disable-next-line new-cap
    const modal = new tingle.modal({
        footer: hasFooter,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: '',
        cssClass: [cssClass],
        onOpen,
        onClose
    });

    modal.setContent(content);

    return modal;
}