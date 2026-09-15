$(document).ready(function () {
  eval_postfix = function (postfix) {
    var resultStack = [];
    postfix = postfix.split(" ");
    function roundToThreeDecimals(value) {
      return parseFloat(parseFloat(value).toFixed(3));
    }
    for (var i = 0; i < postfix.length; i++) {
      if ($.isNumeric(postfix[i])) {
        resultStack.push(postfix[i]);
      } else {
        var a = resultStack.pop();
        var b = resultStack.pop();
        if (postfix[i] === "+") {
          resultStack.push(roundToThreeDecimals(parseFloat(a) + parseFloat(b)));
        } else if (postfix[i] === "-") {
          resultStack.push(roundToThreeDecimals(parseFloat(b) - parseFloat(a)));
        } else if (postfix[i] === "*") {
          resultStack.push(roundToThreeDecimals(parseFloat(a) * parseFloat(b)));
        } else if (postfix[i] === "/") {
          resultStack.push(roundToThreeDecimals(parseFloat(b) / parseFloat(a)));
        } else if (postfix[i] === "^") {
          resultStack.push(
            roundToThreeDecimals(Math.pow(parseFloat(b), parseFloat(a))),
          );
        }
      }
    }
    if (resultStack.length > 1) {
      return "error";
    } else {
      return resultStack.pop();
    }
  };
});
