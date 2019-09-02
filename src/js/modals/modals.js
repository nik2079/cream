import tingle from "tingle.js";

export default function (cssClass, content, onClose, onOpen = function () {
}) {
    let modal = new tingle.modal({
        footer: true,
        stickyFooter: true,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "",
        cssClass: [cssClass],
        onOpen: onOpen,
        onClose: onClose,
    });
    modal.setContent(content);
    return modal;
}