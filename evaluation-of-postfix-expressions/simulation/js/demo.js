var random1,random2,random3,random4,random5,random6;
var level = 0;
var interval = 0;
var prev = -1;
var started = 0;
function generate(){
    var max = 99;
    var min = 1;
    random1 = Math.floor(Math.random() * (max - min)) + min;
    random2 = Math.floor(Math.random() * (max - min)) + min;
    random3 = Math.floor(Math.random() * (max - min)) + min;
    random4 = Math.floor(Math.random() * (max - min)) + min;
    random5 = Math.floor(Math.random() * (max - min)) + min;
    random6 = Math.floor(Math.random() * (max - min)) + min;
    var exp = random1 + " ^ " + random2 + " - " + random3 + " / " + random4 + " + " + random5 + " * " + random6;
    exp = exp.split(' ');
    document.getElementById('questionid').innerHTML = "<span style='font-weight:bold;'>Question:</span> Validate the given expression: " + exp.join(' ');
    document.getElementById("interval").oninput = function() { change_interval(); };
    document.getElementById("interval").onchange = function() { change_interval(); };
    document.getElementById("start").onclick = function() { onstart(); };
    document.getElementById("reset").onclick = function() { reload(); };
    document.getElementById("pause").onclick = function() { onpause(); };
};

function fun() {
    if (level == "1") {
        var exp = "<span style='font-weight:bold;color:#fd6d00'>(</span> " + random1 + " ^ " + random2 + " <span style='font-weight:bold;color:#fd6d00'>)</span> - " + random3 + " / " + random4 + " + " + random5 + " * " + random6;
        exp = exp.split(' ');
        document.getElementById('validation').innerHTML = "<span style='font-weight:bold;'>Step 1:</span> " + exp.join(' ') +"<br><br>";
        document.getElementById('ins').innerHTML = "Since ^ has highest priority it is parenthasized first.";
    } else if (level == "2") {
        var exp = "( " + random1 + " ^ " + random2 + " ) - <span style='font-weight:bold;color:#fd6d00'>(</span> " + random3 + " / " + random4 + " <span style='font-weight:bold;color:#fd6d00'>)</span> + " + random5 + " * " + random6;
        exp = exp.split(' ');
        document.getElementById('validation').innerHTML += "<span style='font-weight:bold;'>Step 2:</span> " + exp.join(' ') +"<br><br>";
        document.getElementById('ins').innerHTML = "/ and * have the next priority but / is parenthasized first because they follow left associativity.";
    } else if (level == "3") {
        var exp = "( " + random1 + " ^ " + random2 + " ) - ( " + random3 + " / " + random4 + " ) + <span style='font-weight:bold;color:#fd6d00'>(</span> " + random5 + " * " + random6 + " <span style='font-weight:bold;color:#fd6d00'>)</span>";
        exp = exp.split(' ');
        document.getElementById('validation').innerHTML += "<span style='font-weight:bold;'>Step 3:</span> " + exp.join(' ') +"<br><br>";
        document.getElementById('ins').innerHTML = "/ and * have the next priority but * is parenthasized second because they follow left associativity.";
    } else if (level == "4") {
        var exp = "<span style='font-weight:bold;color:#fd6d00'>(</span> ( " + random1 + " ^ " + random2 + " ) - ( " + random3 + " / " + random4 + " ) <span style='font-weight:bold;color:#fd6d00'>)</span> + ( " + random5 + " * " + random6 + " )";
        exp = exp.split(' ');
        document.getElementById('validation').innerHTML += "<span style='font-weight:bold;'>Step 4:</span> " + exp.join(' ') +"<br><br>";
        document.getElementById('ins').innerHTML = "+ and - have the next priority but - is parenthasized first because they follow left associativity.";
    } else if (level == "5") {
        var exp = "<span style='font-weight:bold;color:#fd6d00'>(</span> ( ( " + random1 + " ^ " + random2 + " ) - ( " + random3 + " / " + random4 + " ) ) + ( " + random5 + " * " + random6 + " ) <span style='font-weight:bold;color:#fd6d00'>)</span>";
        exp = exp.split(' ');
        document.getElementById('validation').innerHTML += "<span style='font-weight:bold;'>Step 5:</span> " + exp.join(' ');
        document.getElementById('ins').innerHTML = "+ and - have the next priority but + is parenthasized second because they follow left associativity.";
    }
    else if(level > "5") {
      document.getElementById('ins').innerHTML = "Demonstration Finished";
      document.getElementById("pause").style.backgroundColor = "grey";
      document.getElementById("start").style.backgroundColor = "grey";
      document.getElementById("start").disabled = true;
      document.getElementById("pause").disabled = true;
      if(interval != 0) {
        clearInterval(interval);
    }
    }
    var temp = parseInt(level) + 1;
    level = String(temp);
}
//setInterval(fun, 1000);
function change_interval(){
    if(interval != 0) {
        clearInterval(interval);
    }
    if(document.getElementById("interval").value != 100){
     interval = setInterval(fun, 3400-document.getElementById("interval").value); 
     document.getElementById("pause").style.backgroundColor = "#288ec8";
     document.getElementById("start").disabled = true;
      document.getElementById("start").style.backgroundColor = "grey";
    }
    else {
      document.getElementById("start").disabled = false;
      document.getElementById("pause").style.backgroundColor = "grey";
      document.getElementById("start").style.backgroundColor = "#288ec8";
    }
};
function reload(){
  location.reload(true);
};
function onstart(){
    if(document.getElementById("interval").value == 100 || started ==1)
  {
    document.getElementById("start").innerHTML = "Next";
    document.getElementById("start").disabled = false;
    fun();
    document.getElementById("pause").style.visibility = "visible";
  }
  else{
    document.getElementById("ins").innerHTML = "Demonstration started";
    document.getElementById("interval").value == 1500;
    document.getElementById("start").innerHTML = "Next";
    document.getElementById("start").disabled = true;
    document.getElementById("start").style.backgroundColor = "grey";
    started = 1;
    change_interval();
  }
}
function onpause(){
    if(prev == -1){
    prev = document.getElementById("interval").value;
    if(interval != 0){ 
      clearInterval(interval);
    }
    document.getElementById("pause").innerHTML = "Play";
  }else{
    prev = -1;
    interval = setInterval(fun, 3400-document.getElementById("interval").value);
    document.getElementById("pause").innerHTML = "Pause";
  }
}
