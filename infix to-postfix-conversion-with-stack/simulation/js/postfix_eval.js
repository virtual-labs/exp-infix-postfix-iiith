class Postfix{
	constructor(){
		this.canvas = document.getElementById("stackArray");
		this.ctx = this.canvas.getContext("2d");
		this.expression;
		this.postfix_expr;	
		this.pointer = 0;
		this.box_start_x = 0;
		this.box_start_y = 600;
		this.box_height = 75;
		this.box_length = 500;
		this.values =[];
		this.values2 = [];
	}
}
let postfix_artefact=new Postfix();
function clearCanvas() {
	postfix_artefact.ctx.clearRect(0, 0, postfix_artefact.canvas.width, postfix_artefact.canvas.height);
}

function fun(){
	document.getElementById("correct").innerText = "";
	document.getElementById("wrong").innerText = "";
	document.getElementById("numbers").value = "";
	postfix_artefact.values.length = 0;
	postfix_artefact.values2.length = 0;
	document.getElementById("output").innerHTML="<span style='font-weight:bold;'>Popped Elements:</span> " + postfix_artefact.values2.join(" ");
	document.getElementById("numbers").value = postfix_artefact.values2.join(" ");
	document.getElementById("correct").innerText = "";
	document.getElementById("wrong").innerText = "";
	clearCanvas();
}
function draw_expression() {
	var exp = postfix_artefact.expression.split(" ");
	var txt = exp.join("  ");
	exp = [];
	//Coordinates of number_of_boxes
	var txtWidth = postfix_artefact.ctx_1.measureText(txt).width;
	var txtX = exp_start_x - 10;
	var txtY = exp_start_y - 50;
	var sub_string3;
	if (postfix_artefact.expression[postfix_artefact.pointer] != null)
		sub_string3 = txt.substr((2 + postfix_artefact.expression[postfix_artefact.pointer].length) * postfix_artefact.pointer);
	else
		sub_string3 = " ";
}
// //Drawing the base of the array
function draw_box() {
	clearCanvas();
	postfix_artefact.ctx.beginPath();
	for (var i = 0; i < postfix_artefact.values.length; i++) {
		postfix_artefact.ctx.fillStyle = "rgb(152, 203, 59)";
		postfix_artefact.ctx.fillRect(postfix_artefact.box_start_x, postfix_artefact.box_start_y - postfix_artefact.box_height * (i + 1), postfix_artefact.box_length, postfix_artefact.box_height);
		postfix_artefact.ctx.stroke();
		postfix_artefact.ctx.strokeStyle = "white";
		postfix_artefact.ctx.rect(postfix_artefact.box_start_x, postfix_artefact.box_start_y - postfix_artefact.box_height * (i + 1), postfix_artefact.box_length, postfix_artefact.box_height);
		postfix_artefact.ctx.stroke();
	}
	postfix_artefact.ctx.closePath();
}                  
function double_pop() {
	var operand1 = parseFloat(postfix_artefact.values2[postfix_artefact.values2.length - 1]);
	postfix_artefact.values2.pop();
	writeNumbers();
	var operand2 = parseFloat(postfix_artefact.values2[postfix_artefact.values2.length - 1]);
	postfix_artefact.values2.pop();
	writeNumbers();
	return [operand1, operand2];
}
function writeNumbers() {
	draw_box();
	//Fill array with numbers
	for (var i = 0; i < postfix_artefact.values.length; i++) {
		postfix_artefact.ctx.font = "60px Open-Sans Bold";
		var txt = postfix_artefact.values[i].toString();
		var txtWidth = postfix_artefact.ctx.measureText(txt).width;
		var txtX = postfix_artefact.box_start_x + postfix_artefact.box_length / 2 - txtWidth / 2;
		var txtY = postfix_artefact.box_start_y - postfix_artefact.box_height * (i + 1) + (postfix_artefact.box_height) / 2 + 8;
		postfix_artefact.ctx.fillStyle = "black";
		postfix_artefact.ctx.fillText(txt, txtX, txtY);
	}
}
document.getElementById("question").onclick = function() { generate(); };
function generate(){
	no_of_operands = 4;
	operators = ["+", "-", "*", "/", "^"];
	var string = "";
	for (var i = 0; i < no_of_operands; i++) {
		var numb = Math.ceil(Math.random() * 10);
		string = string.concat(numb.toString(), " ");
		if (i != no_of_operands - 1) {
			var index = (Math.floor(Math.random() * 100) % 5);
			string = string.concat(operators[index], " ");
		}
	}		
	var exp = new Postfix_check();
	postfix_artefact.postfix_expr = exp.infix_to_postfix(string.split(" ")).join(" ").slice(0, -1);
	document.getElementById("questionid").innerHTML = "<span style='font-weight:bold;'>Question:</span> Evaluate the following postfix expression : " + postfix_artefact.postfix_expr;
	fun();
};

$("#push_button").on("click", function () {
	postfix_artefact.values2.length = 0;
	document.getElementById("output").innerHTML="<span style='font-weight:bold;'>Popped Elements:</span> " + postfix_artefact.values2.join(" ");
	var value = document.getElementById("numbers").value;
	if ($.isNumeric(value)) {
		if (value != null) {
			postfix_artefact.values.push(value);
		} else {
			postfix_artefact.pointer--;
		}
		writeNumbers();
	} else {
		document.getElementById("numbers").value = "";
		document.getElementById("numbers").placeholder = "Operators are not yet pushed";
	}
	document.getElementById("numbers").value = "";
	document.getElementById("correct").innerText = "";
	document.getElementById("wrong").innerText = "";
});				
$("#pop_button").on("click", function () {
	if(postfix_artefact.values.length){
		postfix_artefact.values2.push(postfix_artefact.values.pop());
		document.getElementById("output").innerHTML="<span style='font-weight:bold;'>Popped Elements:</span> " + postfix_artefact.values2.join(" ");
	} else{
		alert("Stack is Empty");
	}
	writeNumbers();
	document.getElementById("numbers").value = "";
	document.getElementById("correct").innerText = "";
	document.getElementById("wrong").innerText = "";
});
$("#check_button").on("click", function () {
	document.getElementById("correct").innerText = "";
	document.getElementById("wrong").innerText = "";
	var txtX = 100;
	var txtY = 200;
	if (eval_postfix(postfix_artefact.postfix_expr) == postfix_artefact.values[0] && postfix_artefact.values.length == 1) {
		document.getElementById("correct").innerText = "Correct!";
	} else {
		document.getElementById("wrong").innerText = "Incorrect! Try again";
	}
	document.getElementById("numbers").value = "";
});			
$("#add_button").on("click", function () {
	var operands = double_pop();
	postfix_artefact.values2.push(parseFloat((parseFloat(operands[0]) + parseFloat(operands[1])).toFixed(3)));
	document.getElementById("output").innerHTML="<span style='font-weight:bold;'>Popped Elements:</span> " + postfix_artefact.values2.join(" ");
	document.getElementById("numbers").value = postfix_artefact.values2.join(" ");
	writeNumbers();
	document.getElementById("correct").innerText = "";
	document.getElementById("wrong").innerText = "";
});			
$("#clear_button").on("click", function () {
	postfix_artefact.values2.length = 0;
	document.getElementById("output").innerHTML="<span style='font-weight:bold;'>Popped Elements:</span> " + postfix_artefact.values2.join(" ");
	document.getElementById("correct").innerText = "";
	document.getElementById("wrong").innerText = "";
});
$("#subtract_button").on("click", function () {
	var operands = double_pop();
	postfix_artefact.values2.push(parseFloat((parseFloat(operands[0]) - parseFloat(operands[1])).toFixed(3)));
	document.getElementById("output").innerHTML="<span style='font-weight:bold;'>Popped Elements:</span> " + postfix_artefact.values2.join(" ");
	document.getElementById("numbers").value = postfix_artefact.values2.join(" ");
	writeNumbers();
	document.getElementById("correct").innerText = "";
	document.getElementById("wrong").innerText = "";
});
$("#multiply_button").on("click", function () {
	var operands = double_pop();
	postfix_artefact.values2.push(parseFloat((parseFloat(operands[0]) * parseFloat(operands[1])).toFixed(3)));
	document.getElementById("output").innerHTML="<span style='font-weight:bold;'>Popped Elements:</span> " + postfix_artefact.values2.join(" ");
	document.getElementById("numbers").value = postfix_artefact.values2.join(" ");
	writeNumbers();
	document.getElementById("correct").innerText = "";
	document.getElementById("wrong").innerText = "";
});			
$("#divide_button").on("click", function () {
	var operands = double_pop();
	postfix_artefact.values2.push(parseFloat((parseFloat(operands[0]) / parseFloat(operands[1])).toFixed(3)));
	document.getElementById("output").innerHTML="<span style='font-weight:bold;'>Popped Elements:</span> " + postfix_artefact.values2.join(" ");
	document.getElementById("numbers").value = postfix_artefact.values2.join(" ");
	writeNumbers();
	document.getElementById("correct").innerText = "";
	document.getElementById("wrong").innerText = "";
});
$("#exponent_button").on("click", function () {
	var operands = double_pop();
	postfix_artefact.values2.push(parseFloat((Math.pow(parseFloat(operands[0]), parseFloat(operands[1])).toFixed(3))));
	document.getElementById("output").innerHTML="<span style='font-weight:bold;'>Popped Elements:</span> " + postfix_artefact.values2.join(" ");
	document.getElementById("numbers").value = postfix_artefact.values2.join(" ");
	writeNumbers();
	document.getElementById("correct").innerText = "";
	document.getElementById("wrong").innerText = "";
});		
$("#restart_button").on("click", function () {
	document.getElementById("correct").innerText = "";
	document.getElementById("wrong").innerText = "";
	document.getElementById("numbers").value = "";
	postfix_artefact.values.length = 0;
	postfix_artefact.values2.length = 0;
	document.getElementById("output").innerHTML="<span style='font-weight:bold;'>Popped Elements:</span> " + postfix_artefact.values2.join(" ");
	document.getElementById("numbers").value = postfix_artefact.values2.join(" ");
	document.getElementById("correct").innerText = "";
	document.getElementById("wrong").innerText = "";
	clearCanvas();
});
