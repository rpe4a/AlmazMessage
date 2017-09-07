class MessageBodyFooterView {
  constructor(el) {
    this.ConteinerBodyFooter = el.find(".message_conteiner_body_footer");
    this.button = this.ConteinerBodyFooter.find("button");
  }

  showBodyFooter() {
    this.ConteinerBodyFooter.show();
  }

  HideBodyFooter() {
    this.ConteinerBodyFooter.hide();
  }

  bindSendMessageAgainForm(handler) {
    this.button.on("click", e => {
      e.preventDefault();

      if (handler) handler();
    });
  }
}

export default MessageBodyFooterView;
