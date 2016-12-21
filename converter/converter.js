/* ====================================================================================
 *  Project: Numeral systems converter
 *  Author: Andrzej Kałowski
 *  $id: converter.js
 *  =================================================================================== */

function init(io) {

  io.on("connection", function(socket, error) {
    if (error) throw error;

    /* Listening to socket.io message */
    socket.on("message", function(msg) {
      NumberSystems.call(this, msg);
    });

    /* Conversion of number systems */
    var NumberSystems = function (msg) {
      var resultNumber = parseInt(msg.numberToConvert, msg.sourceSystem).toString(msg.targetSystem);

      var sourceMessage = {
      	sourceSystem: msg.sourceSystem
      };

      var targetMessage = {
        targetSystem: msg.targetSystem
      };

      var numberToConvertMessage = {
        numberToConvert: msg.numberToConvert.toUpperCase()
      };

      var outcomeMessage = {
        resultNumber: resultNumber.toUpperCase()
      };
      
      var numbsData = [sourceMessage, targetMessage, numberToConvertMessage, outcomeMessage];
      NumbersSend.apply(this, numbsData);

    };

    /* Sending socket.io messages */
    var NumbersSend = function (sourceMessage, targetMessage, numberToConvertMessage, outcomeMessage) {
      try {
        socket.emit("sourceMessage", sourceMessage);
        socket.emit("targetMessage", targetMessage);
        socket.emit("numberToConvertMessage", numberToConvertMessage);
        socket.emit("outcomeMessage", outcomeMessage);
      } catch(error) {
        return null;
      }
    };

    socket.on('error', function(error) {
      console.log(error);
    });

    socket.on('disconnect', function(msg){
      console.log("^^^");
    });

  });

}

module.exports = init;