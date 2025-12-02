$(document).ready( function () {
    eval_postfix = function(postfix) {
        var resultStack = [];
        postfix = postfix.split(" ");
        for(var i = 0; i < postfix.length; i++) {
            if($.isNumeric(postfix[i])) {
                resultStack.push(postfix[i]);
            } else {
                var a = resultStack.pop();
                var b = resultStack.pop();
                if(postfix[i] === "+") {
                    resultStack.push(parseFloat(a) + parseFloat(b));
                } else if(postfix[i] === "-") {
                    resultStack.push(parseFloat(b) - parseFloat(a));
                } else if(postfix[i] === "*") {
                    resultStack.push(parseFloat(a) * parseFloat(b));
                } else if(postfix[i] === "/") {
                    resultStack.push(parseFloat(b) / parseFloat(a));
                } else if(postfix[i] === "^") {
                    resultStack.push(Math.pow(parseFloat(b), parseFloat(a)));
                }
            }
        }
        if(resultStack.length > 1) {
            return "error";
        } else {
            return resultStack.pop();
        }
    }
});
