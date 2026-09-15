class Postfix{
	constructor(){
        this.values_str = '';
        this.infix;
        this.values = [];
        this.display_array = [];
        this.no_of_operands = 4;
        this.operators = ['+', '-', '*', '/', '^'];
        this.string = "";
    }
}
let postfix_artefact=new Postfix();
function validateInfix(infix) {
    infix = document.getElementById('infix_expression').value;
    // remove white spaces to simplify regex
    infix = infix.replace(/\s/g, '');
    // if it has empty parenthesis then is not valid
    if (/\(\)/.test(infix)) {
        return false;
    }
    // valid values: integers and identifiers
    var value = '(\\d+|[a-zA-Z_]\\w*)';
    // the unary '+' and '-'
    var unaryOper = '[\\+\\-]?';
    // the arithmetic operators
    var arithOper = '[\\+\\-\\*\\/]';
    // the comparison operators
    var compOper = '(\\<\\=?|\\>\\=?|\\=\\=|\\!\\=)';
    // if it has more than one comparison operator then is not valid
    if (infix.match(new RegExp(compOper).length > 1)) {
        return false;
    }
    try {
        var b = eval(infix);
    }
    catch (err) {
        return false;
    }
    var regex = new RegExp(unaryOper + value + '((' + arithOper + '|' + compOper + ')' + unaryOper + value + ')*');
    var balance_stack = [];
    for (var i = 0; i < infix.length; i++) {
        if (!($.isNumeric(infix[i]))) {
            if (infix[i] != ')')
                balance_stack.push(infix[i]);
            else {
                if (balance_stack[balance_stack.length - 1] == '(')
                    return false;
                balance_stack.pop();
                balance_stack.pop();
            }
        }
    }
    if (balance_stack.length > 0)
        return false;
    infix = infix.replace(/[\(\)]/g, '');
    return regex.test(infix);
}
function regex_compare(array1, array2) {
    array1 = array1.replace(/[^0-9+*/^-]/g, '');
    array2 = array2.replace(/[^0-9+*/^-]/g, '');
    if (array1 == array2)
        return true;
    else
        return false;
}
$('#validate_button').on('click', function () {
    postfix_artefact.infix = document.getElementById('infix_expression').value;
    var random = postfix_artefact.string;
    var return_value = validateInfix(postfix_artefact.infix);
    var infix_array = postfix_artefact.infix.split(" ");
    postfix_artefact.display_array = [];
    infix_array.forEach(function (element) {
        if ($.isNumeric(element)) {
            postfix_artefact.display_array.push(element);
        }
        else {
            for (var i = 0; i < element.length; i++) {
                if (['(', ')', '+', '-', '*', '^', '/'].includes(element[i])) {
                    postfix_artefact.display_array.push(element[i]);
                }
                else {
                    var num_string = "";
                    while ((!(['(', ')', '+', '-', '*', '^', '/'].includes(element[i]))) && i < element.length) {
                        num_string = num_string.concat(element[i]);
                        i++;
                    }
                    i--;
                    postfix_artefact.display_array.push(num_string);
                }
            }
        }
    });
    if (return_value != false) {
        if ($('[name="' + 'stack_elements' + '"]') != null) {
            $('[name="' + 'stack_elements' + '"]').remove();
        }
        if (math.eval(postfix_artefact.infix) != math.eval(random) || regex_compare(postfix_artefact.infix, random) == false) {
            document.getElementById('ins').innerHTML = "You have changed the original expression. Please use the same given above.";
            $("#01").show();
            $("#02").hide();
            $("#03").hide();
            $("#validate_button").show();
            $("#check_button").hide();
        }
        else {
            document.getElementById('ins').innerHTML = "This is a valid/balanced infix numerical expression.";
            var arr_but = [];
            count = 0;
            postfix_artefact.display_array.forEach(function (element) {
                    var tempo = document.getElementById(count);
                    tempo.id=element + ':' +count;
                    tempo.innerHTML = element;
                    tempo.className="exercise_buttons_1:unselected";
                    count += 1;
            });
            $("#01").hide();
            $("#02").show();
            $("#03").hide();
            $("#validate_button").hide();
            $("#restart_button").show();
            $("#check_button").show();
        }
    }
    else {
        document.getElementById('ins').innerHTML = "This is not a valid / balanced infix numerical expression.";
        $("#01").show();
        $("#02").hide();
        $("#03").hide();
        $("#validate_button").show();
        $("#check_button").hide();
    }
    if (math.eval(postfix_artefact.infix) != math.eval(random) || regex_compare(postfix_artefact.infix, random) == false) {
        document.getElementById('ins').innerHTML = "You have changed the original expression. Please use the same given above.";
        $("#01").show();
        $("#02").hide();
        $("#03").hide();
        $("#validate_button").show();
        $("#check_button").hide();
    }
    else if (return_value != false) {
        postfix_artefact.infix = postfix_artefact.display_array;
        sessionStorage.setItem('infix', postfix_artefact.infix);
    }
});
document.getElementById("question").onclick = function() { generate(); };
function generate(){
    document.getElementById('infix_expression').style.display = "block";
    postfix_artefact.string = "";
    for (var i = 0; i < postfix_artefact.no_of_operands; i++) {
        var numb = Math.ceil(Math.random() * 100);
        postfix_artefact.string = postfix_artefact.string.concat(numb.toString(), " ");
        if (i != postfix_artefact.no_of_operands - 1) {
            var index = (Math.floor(Math.random() * 100) % 5);
            postfix_artefact.string = postfix_artefact.string.concat(postfix_artefact.operators[index], " ");
        }
    }
    document.getElementById('questionid1').innerHTML = "<span style='font-weight:bold;'>Question:</span> (Part 1) Validate the given infix expression: " + postfix_artefact.string;
    document.getElementById('infix_expression').value = postfix_artefact.string;
    document.getElementById('ins').innerText="";
    var count = 0;
    postfix_artefact.display_array.forEach(function (element) {
        if(document.getElementById(element + ':' +count)){
            var tempo = document.getElementById(element + ':' +count);
            tempo.id=count;
            tempo.innerHTML = "";
            tempo.className="exercise_buttons_1:unselected";
            count += 1;
        }
    });
    var count = 0;
    postfix_artefact.display_array.forEach(function (element) {
        if(document.getElementById(element + '::' +count)){
            var tempo = document.getElementById(element + '::' +count);
            tempo.id=count+13;
            tempo.innerHTML = "";
            tempo.className="exercise_buttons_2:unselected";
            count += 1;
        }
    });
    $("button[class^='exercise_buttons_1']").attr("disabled", false);
    $("button[class^='exercise_buttons_2']").attr("disabled", false);
    $("#01").show();
    $("#02").hide();
    $("#03").hide();
    $("#validate_button").show();
    $("#check_button").hide();
    $("#restart_button").hide();
};
$('#restart_button').on('click', function () {
    document.getElementById('ins').innerText = "";
    postfix_artefact.values = [];
    postfix_artefact.values_str = '';
    var count = 0;
    postfix_artefact.display_array.forEach(function (element) {
        if(document.getElementById(element + ':' +count)){
            var tempo = document.getElementById(element + ':' +count);
            tempo.innerHTML = element;
            tempo.className="exercise_buttons_1:unselected";
            count += 1;
        }
    });
    var count = 0;
    postfix_artefact.display_array.forEach(function (element) {
        if(document.getElementById(element + '::' +count)){
            var tempo = document.getElementById(element + '::' +count);
            tempo.innerHTML = element;
            tempo.className="exercise_buttons_2:unselected";
            count += 1;
        }
    });
    $("button[class^='exercise_buttons_1']").attr("disabled", false);
    $("button[class^='exercise_buttons_2']").attr("disabled", false);
    $("#01").hide();
    $("#02").show();
    $("#03").hide();
});
$('#infix_to_postfix_1').on('click', 'button', function () {
    var class_elem = $(this).attr('class');
    if (class_elem.split(':').pop() == 'unselected') {
        $(this).removeClass();
        $(this).addClass(class_elem.split(':').shift() + ':' + 'selected');
    }
    else if (class_elem.split(':').pop() == 'selected') {
        $(this).removeClass();
        $(this).addClass(class_elem.split(':').shift() + ':' + 'unselected');
    }
});
$('#infix_to_postfix_2').on('click', 'button', function () {
    var class_elem = $(this).attr('class');
    if (class_elem.split(':').pop() == 'unselected') {
        $(this).removeClass();
        $(this).addClass(class_elem.split(':').shift() + ':' + 'selected');
    }
    else if (class_elem.split(':').pop() == 'selected') {
        $(this).removeClass();
        $(this).addClass(class_elem.split(':').shift() + ':' + 'unselected');
    }
});
function generate_last_level() {
    $("button[class^='exercise_buttons_1']").attr("disabled", true);
    if (!$("button[class^='exercise_buttons_2']").is(":disabled")) {
        var count = 0;
        var arr_but = [];
        var t = 13;
        postfix_artefact.display_array.forEach(function (element) {
            if(document.getElementById(t)){
                var tempo = document.getElementById(t);
                tempo.id=element + '::' +count;
                tempo.innerHTML = element;
                tempo.className="exercise_buttons_2:unselected";
                t += 1;
                count += 1;
            }
            else if(document.getElementById(element + '::' +count)){
                var tempo = document.getElementById(element + '::' +count);
                tempo.innerHTML = element;
                tempo.className="exercise_buttons_2:unselected";
                t += 1;
                count += 1;
            }
        });
    }
}
$('#check_button').on('click', function () {
    postfix_artefact.values_str = '';
    document.getElementById('ins').innerText = "";
    if (!$("button[class^='exercise_buttons_1']").is(":disabled")) {
        var infix_str;
        if(typeof(postfix_artefact.infix)=="string"){
            infix_str=postfix_artefact.infix;
        }
        else{
            infix_str=postfix_artefact.infix.join('');
        }
        var check_values = infix_str.replace(/[0-9)]/g, '');
        var all_elem = $("button[class^='exercise_buttons_1']");
        all_elem.each(function (element) {
            var classname_elem = all_elem[element].className;
            if (classname_elem.split(':').pop() == 'selected') {
                postfix_artefact.values_str = postfix_artefact.values_str.concat(all_elem[element].innerText);
            }
        });
        if (check_values != postfix_artefact.values_str) {
            document.getElementById('ins').innerText = "Try again!";
            document.getElementById('ins').style = "font-weight: bold;";
            $("#01").hide();
            $("#02").show();
            $("#03").hide();
        }
        else {
            document.getElementById('ins').innerText = "Correct!";
            document.getElementById('ins').style = "font-weight: bold;";
            generate_last_level();
            $("#01").hide();
            $("#02").hide();
            $("#03").show();
        }
    }
    else if (!$("button[class^='exercise_buttons_2']").is(":disabled")) {
        console.log("hi1");
        var all_elem = $("button[class^='exercise_buttons_2']");
        var is_correct = 1;
        all_elem.each(function (element) {
            var classname_elem = all_elem[element].className;
            if (classname_elem.split(':').pop() == 'selected') {
                if (['(', ')', '+', '-', '*', '^', '/'].includes(all_elem[element].innerText)) {
                    is_correct = -1;
                }
                else {
                    //var as = all_elem[element].className;
                    //if (classname_elem.split(':').pop() == 'unselected') {
                    //    is_correct = 0;
                    //}
                    is_correct += 1;
                }
            }
            console.log(is_correct);
        });
        if (is_correct == 5) {
            console.log("hi5");
            document.getElementById('ins').innerText = "Correct! Experiment Finished";
            document.getElementById('ins').style = "font-weight: bold;";
        }
        else {
            console.log("hi6");
            document.getElementById('ins').innerText = "Incoorect! Try again.";
            document.getElementById('ins').style = "font-weight: bold;";
        }
    }
});
