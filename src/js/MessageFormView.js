function ValidateInputMessage(value) {
  if (value === "") return { valid: false, error: "Поле не заполнено." };
  if (!/^[А-я\s.,!?]*$/g.test(value))
    return { valid: false, error: "Поле содержит запрещенные символы." };

  return {
    valid: true,
    error: ""
  };
}

function ValidateInputName(value) {
  if (!/^[А-я\s]*$/g.test(value))
    return { valid: false, error: "Поле Имя содержит запрещенные символы." };

  return {
    valid: true,
    error: ""
  };
}

function ValidateInputPhone(value) {
  if (!/^[1-9]{0,1}[0-9]*$/g.test(value))
    return { valid: false, error: "Поле Телефон не валидно." };

  return {
    valid: true,
    error: ""
  };
}

function ValidateInputEmail(value) {
  if (value === "") return { valid: false, error: "Поле не заполнено." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/g.test(value))
    return { valid: false, error: "Поле Email не валидно." };

  return {
    valid: true,
    error: ""
  };
}

const validationDictionary = {
  inputMessage: ValidateInputMessage,
  inputName: ValidateInputName,
  inputPhone: ValidateInputPhone,
  inputEmail: ValidateInputEmail
};

class MessageFormView {
  constructor(el) {
    this.form = el.find(".message_conteiner_body_form");
    this.inputs = this.form.find(
      "input[type='text'], input[type='email'], textarea"
    );
  }

  resetForm() {
    this.inputs.each((index, el) => {
      el.value = "";
    });
  }

  validate(el) {
    let { name, value } = el;
    return validationDictionary[name](value);
  }

  HideForm() {
    this.form.hide();
  }

  ShowForm() {
    this.resetForm();
    this.form.show().css("display", "flex");
  }

  ShowErrorInput(el, error) {
    $(el).addClass("error");
    $(el)
      .siblings(".errorInput")
      .text(error);
  }

  HideErrorInput(el, error) {
    $(el).removeClass("error");
    $(el)
      .siblings(".errorInput")
      .text(error);
  }

  bindSubmitForm(handler) {
    this.form.on("submit", e => {
      e.preventDefault();

      let formValid = false;

      this.inputs.each((index, el) => {
        if (this.validateInput(el)) {
          formValid = true;
        } else {
          return (formValid = false);
        }
      });

      if (formValid) {
        const data = this.form
          .serializeArray()
          .reduce((result, item, index) => {
            result[item.name] = item.value;
            return result;
          }, {});

        $.ajax({
          type: "POST",
          url: "/postmaster.php",
          data: data,
          success: function(data) {
            if (data == "200") {
              if (handler) handler();
            }
          },
          error: function() {
            console.log("error");
          }
        });
      }
    });
  }

  validateInput(el) {
    let validation = this.validate(el);

    if (!validation.valid) {
      this.ShowErrorInput(el, validation.error);
    } else {
      this.HideErrorInput(el, validation.error);
    }

    return validation.valid;
  }

  bindValidateFormInputs() {
    this.inputs.on("keydown", e => {
      setTimeout(() => {
        this.validateInput(e.target);
      }, 300);
    });
  }
}

export default MessageFormView;
