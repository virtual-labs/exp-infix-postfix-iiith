class Postfix{
	constructor(){
        this.canvas = document.getElementById("canvas_for_conversion");
        this.ctx = this.canvas.getContext("2d");
        this.values1 = [];
        this.values2 = [];
        this.box_start_x = 0;
        this.box_start_y = 600;
        this.box_height = 60;
        this.box_length = 500;
        this.popped_elements=[];
    }
}
let postfix_artefact=new Postfix();
function clearCanvas() {
    postfix_artefact.ctx.clearRect(0, 0, postfix_artefact.canvas.width, postfix_artefact.canvas.height);
}

function clear(){
    document.getElementById('typetooutput').value="";
    document.getElementById('pushtostack').value="";
    document.getElementById('wrong').innerHTML = "";
    document.getElementById('correct').innerHTML = "";
    document.getElementById('toignore').checked = false;
    document.getElementById('tooutput').checked = false;
}
function draw_box() {
    clearCanvas();
    postfix_artefact.ctx.beginPath();
    for (var i = 0; i < postfix_artefact.values1.length; i++) {
        postfix_artefact.ctx.fillStyle = "rgb(152, 203, 59)";
        postfix_artefact.ctx.fillRect(postfix_artefact.box_start_x, postfix_artefact.box_start_y - postfix_artefact.box_height * (i+1), postfix_artefact.box_length, postfix_artefact.box_height);
        postfix_artefact.ctx.stroke();
        postfix_artefact.ctx.strokeStyle = "white";
        postfix_artefact.ctx.rect(postfix_artefact.box_start_x, postfix_artefact.box_start_y - postfix_artefact.box_height * (i+1), postfix_artefact.box_length, postfix_artefact.box_height);
        postfix_artefact.ctx.stroke();
    }
    postfix_artefact.ctx.closePath();
}
function writeNumbers() {
    draw_box();
    for (var i = 0; i < postfix_artefact.values1.length; i++) {
        postfix_artefact.ctx.font = "50px Bold";
        var txt = postfix_artefact.values1[i].toString();
        var txtWidth = postfix_artefact.ctx.measureText(txt).width;
        var txtX = postfix_artefact.box_start_x + postfix_artefact.box_length / 2 - txtWidth / 2;
        var txtY = postfix_artefact.box_start_y - postfix_artefact.box_height * (i+1) + (postfix_artefact.box_height) / 2 + 8;
        postfix_artefact.ctx.fillStyle = "black";
        postfix_artefact.ctx.fillText(txt, txtX, txtY);
    }
}
$('#push_tostack_button').on('click', function () {
    postfix_artefact.values1.push(document.getElementById('pushtostack').value);
    writeNumbers();
    clear();
});
document.getElementById("question").onclick = function() { generate(); };
function generate(){
    var max = 99;
    var min = 1;
    var random1 = Math.floor(Math.random() * (max - min)) + min;
    var random2 = Math.floor(Math.random() * (max - min)) + min;
    var random3 = Math.floor(Math.random() * (max - min)) + min;
    var random4= Math.floor(Math.random() * (max - min)) + min;
    infix = "( ( ( " + random1 + " * " + random2 + " ) - " + random3 + " ) /" + random4 + " ) ";
    infix = infix.split(' ');
    document.getElementById('questionid').innerHTML = "<span style='font-weight:bold;'>Question:</span> Convert the following expression to postfix: \n" + infix.join(' ') ;
    postfix_artefact.values1 = [];
    postfix_artefact.values2 = [];
    postfix_artefact.popped_elements = [];
    clear();
    clearCanvas();
    document.getElementById('output').innerHTML="<span style='font-weight:bold;'>Output:</span>";
};
$('#type_tooutput_button').on('click', function () {
    postfix_artefact.values2.push(document.getElementById('typetooutput').value);
    document.getElementById('output').innerHTML="<span style='font-weight:bold;'>Output:</span> " + postfix_artefact.values2.join(' ');
    writeNumbers();
    clear();
});
$('#pop_button').on('click', function () {
    postfix_artefact.popped_elements = [];
    postfix_artefact.popped_elements.push(postfix_artefact.values1.pop());
    document.getElementById('toignore').checked = false;
    writeNumbers();
    clear();
});
$('#tooutput').on('click',function (){
    postfix_artefact.values2.push(postfix_artefact.popped_elements);
    postfix_artefact.popped_elements = [];
    document.getElementById('output').innerHTML="<span style='font-weight:bold;'>Output:</span> " + postfix_artefact.values2.join(' ');
    writeNumbers();
    document.getElementById('toignore').checked = false;
});
$('#toignore').on('click',function (){
    writeNumbers();
    document.getElementById('tooutput').checked = false;
});
$('#restart_button').on('click', function () {
    postfix_artefact.values1 = [];
    postfix_artefact.values2 = [];
    postfix_artefact.popped_elements = [];
    clear();
    clearCanvas();
    document.getElementById('output').innerHTML = "<span style='font-weight:bold;'>Output:</span>";
});
$('#check_button').on('click', function () {
    var infix_instance = new Postfix_check();
    var postfix = infix_instance.infix_to_postfix(infix.join('').split('')).join('');
    postfix = postfix.replace(/[{()}]/g, '');
    var values_str = postfix_artefact.values2.join('');
    if (postfix != values_str) {
        document.getElementById('wrong').innerText = "Incorrect! Try Again";
    } else {
        document.getElementById('correct').innerText = "Correct";
    }
});
