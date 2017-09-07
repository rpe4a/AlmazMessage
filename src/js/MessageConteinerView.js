class MessageConteinerView {
  constructor(el) {
    this.ConteinerHeader = el.find(".message_conteiner_header");
    this.ConteinerBody = el.find(".message_conteiner_body");

    this.initConteiner(el);
  }

  initConteiner(el) {
    el.show();
  }

  toggleMessageBody() {
    this.ConteinerBody.slideToggle().css("display", "flex");
  }

  bindToggleConteinerBody() {
    this.ConteinerHeader.on("click", () => {
      this.toggleMessageBody();
    });
  }
}

export default MessageConteinerView;
