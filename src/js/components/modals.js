import tingle from 'tingle.js';

export default function (cssClass, content, onClose, onOpen = function () {
}) {
  // eslint-disable-next-line new-cap
  const modal = new tingle.modal({
    footer: true,
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