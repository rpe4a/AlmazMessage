import "../scss/_site.scss";
import MessageController from "./MessageController";

const messageConteiner = $(".message_conteiner");

setTimeout(function() {
  new MessageController(messageConteiner);
}, 3000);
