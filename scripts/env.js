
function findREPLElems(id) {
    var holder = document.getElementById(id);
    var button = holder.getElementsByTagName("input")[0];
    var editor = CodeMirror.fromTextArea(holder.getElementsByTagName("textarea")[0], {
        lineNumbers: true,
    });
    var cons = holder.getElementsByClassName("console")[0];
    return [button, editor, cons];    
}

function showConsole(cons, res) {
    if(res != undefined){
        cons.innerText = res;
    } else {
        cons.innerText = "";
    }
}

function setupREPL(id) {
    var [button, editor, cons] = findREPLElems(id);

    button.onclick = function() { 
        try {
            var res = eval(editor.getValue());
            showConsole(cons, res);
        }catch(err) {
            cons.innerText = "なにかおかしいです。 (" + err.message + ")";
        }
    }
}

function resultCorrect(span) {
    span.className = "result correct";
    span.innerText = "正解です。"
}

function resultWrong(span, msg) {
    span.className = "result wrong";
    span.innerText = msg;        
}

function setupQuestionElems(id) {
    var holder = document.getElementById(id);

    var buttons = holder.getElementsByTagName("input");

    var runButton = buttons[0];
    var answerButton = buttons[1];

    var answerDiv =holder.getElementsByClassName("answer")[0];


    answerButton.onclick = function() {
        answerDiv.className = "answer";
    };

    var editor = CodeMirror.fromTextArea(holder.getElementsByTagName("textarea")[0], {
        lineNumbers: true,
    });
    var cons = holder.getElementsByClassName("console")[0];
    var resultSpan =holder.getElementsByClassName("result")[0];

    return [runButton, editor, cons, resultSpan];
}


function setupQuestion(qobj) {
    var id = qobj.id;
    var [runButton, editor, cons, resultSpan] = setupQuestionElems(id);

    runButton.onclick = function() { 
        try {
            var scr = editor.getValue();
            var verify = qobj.verifyScript(scr);
            if(verify!= true) {
                resultWrong(resultSpan, verify);
                return;
            }
            var res = eval(scr);
            showConsole(cons, res);
            verify = qobj.verifyAnswer(res);
            if(verify == true) {
                resultCorrect(resultSpan);
            } else {
                resultWrong(resultSpan, verify);
            }
        }catch(err) {
            cons.innerText = "なにかおかしいです。 (" + err.message + ")";
        }
    };
}


function setupAllQuestions(qobjList) {
    for(var i = 0; i < qobjList.length;i++) {
        setupQuestion(qobjList[i]);
    }

}

function setupAllQuestions2(qobjList) {
    for(var i = 0; i < qobjList.length;i++) {
        setupQuestion2(qobjList[i]);
    }

}

function setupAllQuestionsWithScnario(qobjList) {
    for(var i = 0; i < qobjList.length;i++) {
        setupQuestionWithScnario(qobjList[i]);
    }

}


function setupAllRepls(idlist) {
    for(var i = 0; i < idlist.length;i++) {
        setupREPL(idlist[i]);
    }
}




var runInterpreterProgress = ()=>{};

function setupAllREPL2(eidNum) {
    for(var i =1; i <= eidNum; i++) {
        setupREPL2("ex" + i);
    }
}



function setupREPL2(id) {
    var [button, editor, cons] = findREPLElems(id);

    button.onclick = function() { 
        try {
            myInterpreter.value = undefined;
            myInterpreter.appendCode(editor.getValue());
            runInterpreterProgress = () => {
                try {
                    if(myInterpreter.run()) {
                        return true;
                    }
                    var res = myInterpreter.value
                    showConsole(cons, res);
                    return false;
                }catch(err) {
                    cons.innerText = "なにかおかしいです。 (" + err.message + ")";
                    return false;
                }

            }
            runInterpreterProgress();
        }catch(err) {
            cons.innerText = "なにかおかしいです。 (" + err.message + ")";
            initInterpreter();
        }
    };
}

var functionCallLogs = [];
function setupQuestion2(qobj) {
    var id = qobj.id;
    var [runButton, editor, cons, resultSpan] = setupQuestionElems(id);


    runButton.onclick = function() { 
        try {
            functionCallLogs = []
            var scr = editor.getValue();
            var verify = qobj.verifyScript(scr);
            if(verify!= true) {
                resultWrong(resultSpan, verify);
                return;
            }

            myInterpreter.value = undefined;
            myInterpreter.appendCode(scr);

            runInterpreterProgress = () => {
                try {
                    if(myInterpreter.run()) {
                        return true;
                    }
                    var res = myInterpreter.value
                    showConsole(cons, res);

                    verify = qobj.verifyAnswer(res);
                    if(verify == true) {
                        resultCorrect(resultSpan);
                    } else {
                        resultWrong(resultSpan, verify);
                    }
                    return false;
    
                }catch(err) {
                    cons.innerText = "なにかおかしいです。 (" + err.message + ")";
                    return false;
                }
            };
            runInterpreterProgress();
            
        }catch(err) {
            cons.innerText = "なにかおかしいです。 (" + err.message + ")";
        }
    };
}

scenarioLogs= [];
function scenarioAlert(msg) {
    scenarioLogs.push({name:"alert", val:msg});    
}
returnValues = [];
function scenarioYesNo(msg, yeslabel, nolabel) {
    scenarioLogs.push({name:"yesNo", val:{msg, yeslabel, nolabel}});    
    return returnValues.shift();
}

function randomInt(right) {
    return Math.floor(right*Math.random());
}

function smokeAlert(msg, callback) {
    // object and array is passed as js-interpreter's internal structure (undocumented).
    // Do I have to do this by myself? Why?
    msg = myInterpreter.pseudoToNative(msg);    

    functionCallLogs.push({name:"smokeAlert", val:msg});

    msg = JSON.stringify(msg);
    smoke.alert(msg, e=>{callback(), setTimeout(()=>runInterpreterProgress())} );
}

function smokeYesNo(msg, yeslabel, nolabel, callback) {
    smoke.confirm(msg, (e)=> {
        if(e) {
            callback(1);
        } else {
            callback(0);
        }
        setTimeout(()=>runInterpreterProgress());
    }, 
    {
	ok: yeslabel,
	cancel: nolabel,
	classname: "custom-class",
	reverseButtons: true
    })
}


function countElem(arrs) {
    var res = {};
    arrs.forEach((elem) => {
        var cur = res[elem] || 0;
        res[elem] = cur +1;
    });
    return res;
}

function _verifyArrayEqualInternal(expect, actual) {
    for(var i = 0;i < expect.length; i++) {
        if(expect[i] !== actual[i])
            return expect[i];        
    }
    return true;
    
}

function verifyArrayEqual(expect, actual) {
    if(actual.length == undefined) {
      return "配列じゃないです。";
    }
    if(expect.length != actual.length) {
      if(actual.length > expect.length) {
        return "配列に"+ expect.length+" 個よりたくさん要素が入ってます！";
      } else {
        var dif = expect.length-actual.length;
        return "配列に"+ expect.length+"個、要素が入ってないです。"+dif + "個足りない...";
      }         
    }
    var res = _verifyArrayEqualInternal(expect, actual);
    if(res == true) {
        return true;
    }
    return JSON.stringify(res) + " が入っていません。";
    
}


function generateArrayQuestionHtml(id, array) {
    var builder = [];
builder.push(`<b>以下の配列を生成せよ</b>
<ol start="0">
`);
    for(var i = 0; i < array.length; i++) {
        var val = JSON.stringify(array[i]);
        builder.push(`<li>${val}</li>`);
        builder.push("\n");
    }

builder.push(`</ol>
<div id="${id}">
        <input type="button" value="実行" />
        <textarea>
var kotae = 0;</textarea>
        <b>結果:</b> <span class="console"></span><br>
        <span class="result"></span><br>
        <input type="button" value="答えを見る" />
        <div class="answer hideanswer">
    答え:<br>
var kotae = `);
builder.push(JSON.stringify(array));
builder.push(`;
        </div>        
    </div>
    <p></p>
`);
    return builder.join("");

}

function generateArrayQuestionObject(id, expect) {
    var qobj = {
        id: id,
        scenarios: []
    };
    qobj.scenarios.push({
        setup: ()=> {},
        verify: (intp) => {
            var valname = "kotae";

            var actual = intp.pseudoToNative(intp.getProperty(intp.global, valname));
            if(actual == undefined) {
            return "変数 " + valname + " がどっかいっちゃった？";
            }
            return verifyArrayEqual(expect, actual);
        }
    });
    return qobj;
    
}


var globalId = 10;
function arrayAutoGeneration(expect, questions) {
    var targetHolder = document.getElementById("autoQuestions") ;
    var div = document.createElement("div");
    var html = generateArrayQuestionHtml(globalId, expect);
    div.innerHTML = html;
    targetHolder.appendChild(div);

    questions.push(generateArrayQuestionObject(globalId, expect));

    globalId++;
}



function verifyDictEqual(expect, actual) {
    exKeys = Object.keys(expect);
    acKeys = Object.keys(actual);
    if(exKeys.length != acKeys.length) {
        return "キーの数が違います";
    }
    var diff = _verifyArrayEqualInternal(exKeys, acKeys);
    if(diff != true) {
        return "キー「" + diff + "」が入っていません。";
    }
    for(var i = 0; i < exKeys.length; i++) {
        var k = exKeys[i];
        if(expect[k] != actual[k]) {
            return "キー「" + k + "」の所の要素が、「" + expect[k] + "」じゃないです。";
        }
    }
    return true;
}


function verifyLocalDictVar(intp, lvalName, expect) {
    var lvalName = "toots";
    var actual = intp.pseudoToNative(intp.getProperty(intp.global, lvalName));
    if(actual == undefined) {
        return "変数 " + lvalName + "がどっかいっちゃった？";
    }
    return verifyDictEqual(expect, actual);
}

function verifyMessageBoxOne(expect) {
    if(scenarioLogs.length == 0 || scenarioLogs[0].name != 'alert') {
        return "結果が表示されていません。MessageBox.show使ってね。";
    }
    var actual = scenarioLogs[0].val;
    if(actual != expect) {
        return "表示されたメッセージが違います。";
    }
    return true;    
}
  



function initScnearioPlayerFunc(interpreter, scope) {
    interpreter.setProperty(scope, 'SmokeAlert',
          interpreter.createNativeFunction(scenarioAlert));
    interpreter.setProperty(scope, 'SmokeYesNo',
          interpreter.createNativeFunction(scenarioYesNo));
    interpreter.setProperty(scope, '_randomInt',
          interpreter.createNativeFunction(randomInt));
};



function initFunc(interpreter, scope) {
    interpreter.setProperty(scope, 'SmokeAlert',
          interpreter.createAsyncFunction(smokeAlert));
    interpreter.setProperty(scope, 'SmokeYesNo',
          interpreter.createAsyncFunction(smokeYesNo));
    interpreter.setProperty(scope, '_randomInt',
          interpreter.createNativeFunction(randomInt));
};


function setupQuestionWithScnario(qobj) {
    var id = qobj.id;
    var [runButton, editor, cons, resultSpan] = setupQuestionElems(id);


    runButton.onclick = function() { 
        try {

            var scr = editor.getValue();

            var resultSuccess = true;
            var scenarios = qobj.scenarios;

            if(qobj.sampleNum != undefined &&
            qobj.sampleNum > 0) {
                scenarioLogs = [];
                returnValues = [];
                // always single scenario.
                var scenario = scenarios[0];

                scenario.setup();

                for(var i = 0; i < qobj.sampleNum; i++) {
                    scenarioPlayer.appendCode(scr);
                    scenarioPlayer.run(scr);
                }
                    
                var verify = scenario.verify(scenarioPlayer);
                if(verify!= true) {
                    resultWrong(resultSpan, verify);
                    resultSuccess = false;
                }

            } else {

                for(var i = 0; i < scenarios.length; i++) {
                    var scenario = scenarios[i];

                    scenarioLogs = [];
                    returnValues = [];
                    
                    scenario.setup();
                    scenarioPlayer.appendCode(scr);
                    scenarioPlayer.run(scr);
                    var verify = scenario.verify(scenarioPlayer);
                    if(verify!= true) {
                        resultWrong(resultSpan, verify);
                        resultSuccess = false;
                        break;
                    }

                    if(scenario.verifyScript != undefined) {
                        var verify2 = scenario.verifyScript(scr);
                        if(verify2!= true) {
                            resultWrong(resultSpan, verify2);
                            resultSuccess = false;
                            break;
                        }
                    }

                }
            }

            if(resultSuccess) {
                resultCorrect(resultSpan);               
            }
            

            myInterpreter.value = undefined;
            myInterpreter.appendCode(scr);

            runInterpreterProgress = () => {
                try {
                    if(myInterpreter.run()) {
                        return true;
                    }
                    var res = myInterpreter.value
                    if(res != undefined){
                        cons.innerText = res;
                    } else {
                        cons.innerText = "";
                    }
                    return false;
                }catch(err) {
                    cons.innerText = "なにかおかしいです。 (" + err.message + ")";
                    initInterpreter();
                    return false;
                }

            }
            runInterpreterProgress();
            
        }catch(err) {
            cons.innerText = "なにかおかしいです。 (" + err.message + ")";
            initInterpreter();            
        }
    };
}


var myInterpreter;
var scenarioPlayer;


function initInterpreter() {
    myInterpreter = new Interpreter('MessageBox = {show: SmokeAlert, yesNo: SmokeYesNo}; Math = {randomInt: _randomInt};',initFunc);
    scenarioPlayer = new Interpreter('MessageBox = {show: SmokeAlert, yesNo: SmokeYesNo};  Math = {randomInt: _randomInt};', initScnearioPlayerFunc);      
}
