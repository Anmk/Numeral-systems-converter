/* ====================================================================================
 *  Project: Numeral systems converter
 *  Author: Andrzej Kałowski
 *  $id: scripts.js
 *  =================================================================================== */

(function() {

'use strict';

/* Definitions and take data from the form */
function NumberClient(numbersArea, scrollOption) {
  try {
    this._socket = io.connect('http://localhost:8080');
  } catch (error) {
    alert(error);
  }
  this._numbersArea = numbersArea;
  this._form = this._numbersArea.querySelectorAll("form")[0];
  this._sourceSystem = this._form.querySelectorAll("div input")[0];
  this._targetSystem = this._form.querySelectorAll("div input")[1];
  this._numberToConvert = this._form.querySelectorAll("div input")[2];
  this._sourceOutcome = this._numbersArea.querySelector("section:nth-child(3) div:nth-child(1) div");
  this._targetOutcome = this._numbersArea.querySelector("section:nth-child(3) div:nth-child(2) div");
  this._numberToConvertOutcome = this._numbersArea.querySelector("section:nth-child(3) div:nth-child(3) div");
  this._outcomeNumber = this._numbersArea.querySelector("section:nth-child(3) div:nth-child(4) div");
  this._formErrorsList = this._numbersArea.querySelector(".validate-alert ul");
  this._formErrors = [];
  this._scrollOption = scrollOption;
  this._expressions = {
         hexadecimalExpB16: /^[\da-f]+$/i,
         pentadecimalExpB15: /^[\da-e]+$/i,
         tetradecimalExpB14: /^[\da-d]+$/i,
         tridecimalExpB13: /^[\da-c]+$/i,
         duodecimalExpB12: /^[\da-b]+$/i,
         undecimalExpB11: /^[\da]+$/i,
         decimalExpB10: /^[\d]+$/,
         nonalExpB9: /^[0-8]+$/, 
         octalExpB8: /^[0-7]+$/,
         septemExtB7: /^[0-6]+$/,
         senaryExpB6: /^[0-5]+$/,
         quinaryExpB5: /^[0-4]+$/,
         quaternaryExpB4: /^[0-3]+$/,
         ternaryExpB3: /^[0-2]+$/,
         binaryExpB2: /^[0-1]+$/,
         emptyExp: /^[]$/
  };
  
  this.setAsNeutral(this._sourceSystem);
  this.setAsNeutral(this._targetSystem);
  this.setAsNeutral(this._numberToConvert);

  /* Attempt to send the data and start the validation */
  this._form.onsubmit = function(e) {
    e.preventDefault();
    var formIsValid = this.validateForm();

    if(formIsValid) {
      var message = {
        sourceSystem: this._sourceSystem.value,
        targetSystem: this._targetSystem.value,
        numberToConvert: this._numberToConvert.value
      };
      /* Sending socket.io message */
      if(this._sourceSystem.value && this._targetSystem.value && this._numberToConvert.value) {
        try {
          this._socket.emit("message", message);
        } catch (error) {
          alert(error);
        }
        this._sourceSystem.value = "";
        this._targetSystem.value = "";
        this._numberToConvert.value = "";
      }
      try {
        this.socketSourceMessage.call(this);
        this.socketTargetMessage.call(this);
        this.socketNumberToConvertMessage.call(this);
        this.socketOutcomeMessage.call(this);
      } catch (error) {
        alert(error);
      }

    } else {
      this._sourceOutcome.textContent = "";
      this._targetOutcome.textContent = "";
      this._numberToConvertOutcome.textContent = "";
      this._outcomeNumber.textContent = "";
      return false;
    }
  }.bind(this);
}

/* Management of validation */
NumberClient.prototype.validateForm = function() {
  this.clearFormErrors();
  this.sourceValidate();
  this.targetValidate();
  this.numberToConvertValidate();

  if(!this._formErrors.length) {
    this.setAsNeutral(this._sourceSystem);
    this.setAsNeutral(this._targetSystem);
    this.setAsNeutral(this._numberToConvert);
    this.setAsValid(this._outcomeNumber);
    return true;
  } else {
    this.showFormErrors();
    this.setAsOutcomeNeutral(this._outcomeNumber);
    return false;
  }
};

/* Validation of the source numerical system */
NumberClient.prototype.sourceValidate = function() {
  var inputValue = this._sourceSystem,
      numberValidate = /(^[2-9]{1}$)|(^[1]{1}[0-6]{1}$)/,
      descError = "Please enter the correct SOURCE system: from 2 - to 16";
  this.enterValidate.call(this, inputValue, numberValidate, descError);
};

/* Validation of the target numerical system */
NumberClient.prototype.targetValidate = function() {
  var inputValue = this._targetSystem,
      numberValidate = /(^[2-9]{1}$)|(^[1]{1}[0-6]{1}$)/,
      descError = "Please enter the correct TARGET system: from 2 - to 16";
  this.enterValidate.call(this, inputValue, numberValidate, descError);
};

/* Validation of the number to convert */
NumberClient.prototype.numberToConvertValidate = function() {
  var inputValue = this._numberToConvert,
      preciseDescError = "",
      expression = "",
      introduction = " In this case: ";

  /* Using regular expressions */
  switch(this._sourceSystem.value) {
    case "16": preciseDescError = introduction + "0 - 9 also A - F"; expression = this._expressions.hexadecimalExpB16; break;
    case "15": preciseDescError = introduction + "0 - 9 also A - E"; expression = this._expressions.pentadecimalExpB15; break;
    case "14": preciseDescError = introduction + "0 - 9 also A - D"; expression = this._expressions.tetradecimalExpB14; break;
    case "13": preciseDescError = introduction + "0 - 9 also A - C"; expression = this._expressions.tridecimalExpB13; break;
    case "12": preciseDescError = introduction + "0 - 9 also A - B"; expression = this._expressions.duodecimalExpB12; break;
    case "11": preciseDescError = introduction + "0 - 9 also A"; expression = this._expressions.undecimalExpB11; break;
    case "10": preciseDescError = introduction + "0 - 9"; expression = this._expressions.decimalExpB10; break;
    case "9": preciseDescError = introduction + "0 - 8"; expression = this._expressions.nonalExpB9; break;
    case "8": preciseDescError = introduction + "0 - 7"; expression = this._expressions.octalExpB8; break;
    case "7": preciseDescError = introduction + "0 - 6"; expression = this._expressions.septemExpB7; break;
    case "6": preciseDescError = introduction + "0 - 5"; expression = this._expressions.senaryExpB6; break;
    case "5": preciseDescError = introduction + "0 - 4"; expression = this._expressions.quinaryExpB5; break;
    case "4": preciseDescError = introduction + "0 - 3"; expression = this._expressions.quaternaryExpB4; break;
    case "3": preciseDescError = introduction + "0 - 2"; expression = this._expressions.ternaryExpB3; break;
    case "2": preciseDescError = introduction + "0 also 1"; expression = this._expressions.binaryExpB2; break;
  }

  var numberValidate = "";
  if((this._sourceSystem.value.length !== 0) && (this._numberToConvert.value.length !== 0)) {
    numberValidate = expression;
  } else {
    numberValidate = this._expressions.emptyExp;
  }
  var descError = "Please enter a valid value in accordance with SOURCE SYSTEM in the NUMBER TO CONVERT field." + preciseDescError;
  this.enterValidate.call(this, inputValue, numberValidate, descError);
};

/* The addition of errors and their flag up */
NumberClient.prototype.enterValidate = function(inputValue, numberValidate, descError) {
  if(inputValue.value.match(numberValidate)) {
    this.setAsValid(inputValue);
    this.scrollToTarget();
  } else {
    var finalDescError = descError;
    this._formErrors.push(finalDescError);
    this.setAsInvalid(inputValue);
  }
};

NumberClient.prototype.setAsValid = function(formField) {
  formField.classList.remove("neutral-field");
  formField.classList.remove("invalid-field");
  formField.classList.add("valid-field");
};

NumberClient.prototype.setAsInvalid = function(formField) {
  formField.classList.remove("neutral-field");
  formField.classList.remove("valid-field");
  formField.classList.add("invalid-field");
};

NumberClient.prototype.setAsNeutral = function(formField) {
  formField.classList.remove("invalid-field");
  formField.classList.remove("valid-field");
  formField.classList.add("neutral-field");
};

NumberClient.prototype.setAsOutcomeNeutral = function(formField) {
  formField.classList.remove("valid-field");
  formField.classList.add("section-outcome");
};

/* Display errors */
NumberClient.prototype.showFormErrors = function() {
  var formErrorsListElements = document.createDocumentFragment();

  for(var i = 0; i < this._formErrors.length; i++) {
      var liErrorElement = document.createElement("li");
          liErrorElement.textContent = this._formErrors[i];
          formErrorsListElements.appendChild(liErrorElement);
  }

  this._formErrorsList.appendChild(formErrorsListElements);
  this._formErrorsList.parentNode.style.display = "block";
  this.scrollToTarget();
};

/* Clearing errors */
NumberClient.prototype.clearFormErrors = function() {
  this._formErrors.length = 0;
  this._formErrorsList.parentNode.style.display = "none";
  this._formErrorsList.innerHTML = "";
};

/* Listening to socket.io answer */
NumberClient.prototype.socketSourceMessage = function() {
  this._socket.on("sourceMessage", function(msg) {
    var sourceMessage = msg.sourceSystem;
    this._sourceOutcome.textContent = sourceMessage;
  }.bind(this));
};

NumberClient.prototype.socketTargetMessage = function() {
  this._socket.on("targetMessage", function(msg) {
    var targetMessage = msg.targetSystem;
    this._targetOutcome.textContent = targetMessage;
  }.bind(this));
};

NumberClient.prototype.socketNumberToConvertMessage = function() {
  this._socket.on("numberToConvertMessage", function(msg) {
    var numberToConvertMessage = msg.numberToConvert;
    this._numberToConvertOutcome.textContent = numberToConvertMessage;
  }.bind(this));
};

NumberClient.prototype.socketOutcomeMessage = function() {
  this._socket.on("outcomeMessage", function(msg) {
    var outcomeMessage = "";
    if(msg.resultNumber == "NAN") {
      outcomeMessage = "Please enter the correct data";
    } else {
      outcomeMessage = msg.resultNumber;
    }
    this._outcomeNumber.textContent = outcomeMessage;
  }.bind(this));
};

/* Scroll to the target */
NumberClient.prototype.scrollToTarget = function() {
  if((this._scrollOption === "fit") || (this._scrollOption === undefined)) {
    if(this._formErrors.length !== 0) {
      window.scrollTo(0, this._formErrorsList.getBoundingClientRect().top + window.scrollY - 30);
    } else {
      window.scrollTo(0, this._sourceOutcome.getBoundingClientRect().top + window.scrollY - 30);
    }
  } else if(this._scrollOption === "bottom") {
    window.scrollTo(0,document.body.scrollHeight);
  } else if(this._scrollOption === "none") {
  } else {}
};

var NumberClient1 = new NumberClient(document.querySelector("#numbers-area"), "fit");

})();
