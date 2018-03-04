
function findREPLElems(id) {
    var holder = document.getElementById(id);
    var button = holder.getElementsByTagName("input")[0];
    var editor = CodeMirror.fromTextArea(holder.getElementsByTagName("textarea")[0], {
        lineNumbers: true,
    });
    var cons = holder.getElementsByClassName("console")[0];
    return [button, editor, cons];    
}

function setupREPL(id) {
    var [button, editor, cons] = findREPLElems(id);

    button.onclick = function() { 
        try {
            var res = eval(editor.getValue());
            cons.innerText = res;
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
            cons.innerText = res;
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
                    if(res != undefined){
                        cons.innerText = res;
                    } else {
                        cons.innerText = "";
                    }
                    return false;
                }catch(err) {
                    cons.innerText = "なにかおかしいです。 (" + err.message + ")";
                    return false;
                }

            }
            runInterpreterProgress();
        }catch(err) {
            cons.innerText = "なにかおかしいです。 (" + err.message + ")";                
        }
    };
}

var messageBoxShowLogs = [];
function setupQuestion2(qobj) {
    var id = qobj.id;
    var [runButton, editor, cons, resultSpan] = setupQuestionElems(id);


    runButton.onclick = function() { 
        try {
            messageBoxShowLogs = []
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
                    cons.innerText = res;
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



function smokeAlert(msg, callback) {
    messageBoxShowLogs.push(msg);
    smoke.alert(msg.toString(), e=>{callback(), setTimeout(()=>runInterpreterProgress())} );
}



function initFunc(interpreter, scope) {
    interpreter.setProperty(scope, 'SmokeAlert',
          interpreter.createAsyncFunction(smokeAlert));
};



var myInterpreter;

