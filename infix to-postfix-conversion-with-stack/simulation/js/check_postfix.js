function Postfix_check() {    
};
Postfix_check.prototype.top_stack = function(stack) {
    return (stack[stack.length - 1]);
};
Postfix_check.prototype.is_empty = function(stack){
        if(stack.length<=0){
            return true;
        } else{
            return false;
        }
    };
Postfix_check.prototype.precedence = function(operator) {
    switch(operator){
        case "^":
            return 3;
        case "*":
        case "/":
            return 2;
        case "+":
        case "-":
            return 1;
        
     }
return -1;
};
 Postfix_check.prototype.infix_to_postfix = function(infix1) {
    var postfix1 = new Array();
    var stack = new Array();
    for (var i = 0; i < infix1.length; i++) {
        if ($.isNumeric(infix1[i])) {
            postfix1.push(infix1[i]);
        } else if (infix1[i] == '('){
            stack.push(infix1[i]);
        }
        else if ( infix1[i] == ')'){
           while(!this.is_empty(stack) && this.top_stack(stack) != '('){
                postfix1.push(stack.pop());
            }
            stack.pop();
        } else{ 
            while(!Postfix_check.prototype.is_empty(stack) &&  Postfix_check.prototype.precedence(Postfix_check.prototype.top_stack(stack))>=Postfix_check.prototype.precedence(infix1[i])) {
                postfix1.push(stack.pop()); 
            }
            stack.push(infix1[i]);
        }
    }
    while (!Postfix_check.prototype.is_empty(stack)) {
        postfix1.push(stack.pop());
    }
    return postfix1;
};
