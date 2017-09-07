import MessageConteinerView from "./MessageConteinerView";
import MessageFormView from "./MessageFormView";
import MessageBodyFooterView from "./MessageBodyFooterView";

class MessageController {
  constructor(el) {
    this.MessageConteinerView = new MessageConteinerView(el);
    this.MessageFormView = new MessageFormView(el);
    this.MessageBodyFooterView = new MessageBodyFooterView(el);

    this.MessageConteinerView.bindToggleConteinerBody();
    this.MessageFormView.bindValidateFormInputs();
    this.MessageFormView.bindSubmitForm(this.formSuccessSubmit.bind(this));
    this.MessageBodyFooterView.bindSendMessageAgainForm(
      this.sendFormAgain.bind(this)
    );
  }

  formSuccessSubmit() {
    this.MessageBodyFooterView.showBodyFooter();
    this.MessageFormView.HideForm();
  }

  sendFormAgain() {
    this.MessageBodyFooterView.HideBodyFooter();
    this.MessageFormView.ShowForm();
  }
}

export default MessageController;
