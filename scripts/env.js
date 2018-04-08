
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

function elemEqual(one, other) {
    if(typeof one == "string" ||
        typeof one == "number") {
            return one === other;
    }
    if(Array.isArray(one)) {
        return _verifyArrayEqualInternal(one, other) == true;
    }
    return verifyDictEqual(one, other);
}

function verifyElemEqual(one, other) {
    if(elemEqual(one, other))
        return true;
    return `${JSON.stringify(one)}じゃないです。`;
}


function _verifyArrayEqualInternal(expect, actual) {
    for(var i = 0;i < expect.length; i++) {
        if(!elemEqual(expect[i], actual[i]))
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

function questionFormTemplate(id, initSent, answer) {
return `<div id="${id}">
    <input type="button" value="実行" />
    <textarea>
${initSent}</textarea>
    <b>結果:</b> <span class="console"></span><br>
    <span class="result"></span><br>
    <input type="button" value="答えを見る" />
    <div class="answer hideanswer">
        答え:<br>
        ${answer}
    </div>        
</div>
<p></p>
`
}

function generateQuestionObject(id, verifyFunc) {
    var qobj = {
        id: id,
        scenarios: []
    };
    qobj.scenarios.push({
        setup: ()=> {},
        verify: verifyFunc
    });
    return qobj;

}

var globalId = 10;
function questionAutoGeneration(html, questionObject) {
    var targetHolder = document.getElementById("autoQuestions") ;
    var div = document.createElement("div");
    div.innerHTML = html;
    targetHolder.appendChild(div);

    questions.push(questionObject);    
}



function generateArrayQuestionHtml(id, array) {
    var builder = [];
builder.push(`<b>以下の配列を生成せよ</b>
<ol start="0">
`);
    array.map((elem)=>JSON.stringify(elem)).forEach(str => builder.push(`<li>${str}</li>`), builder.push("\n"));
    builder.push("</ol>\n");

    const initSent = "var kotae = 0;";
    const answer = JSON.stringify(array);

    builder.push(questionFormTemplate(id, initSent, answer));
    return builder.join("");

}


function generateArrayQuestionObject(id, expect) {
    return generateQuestionObject(id, (intp) => {
        var valname = "kotae";

        var actual = intp.pseudoToNative(intp.getProperty(intp.global, valname));
        if(actual == undefined) {
            return "変数 " + valname + " がどっかいっちゃった？";
        }
        return verifyArrayEqual(expect, actual);
    });
    
}


function arrayAutoGeneration(expect, questions) {
    var html = generateArrayQuestionHtml(globalId, expect);
    var qobj = generateArrayQuestionObject(globalId, expect);
    questionAutoGeneration(html, qobj);

    globalId++;
}

function generateArrayElemQuestionHtml(id, array, expr, result) {
    var builder = [];
builder.push(`<b>「${JSON.stringify(result)}」 を取り出せ</b>
`);

    const initSent = `var hairetu = ${JSON.stringify(array)};

var kotae = 0;`;
    const answer = `var kotae = ${expr};`;

    builder.push(questionFormTemplate(id, initSent, answer));
    return builder.join("");
    
}
function generateArrayElemQuestionObject(id, expect) {
    return generateQuestionObject(id, (intp) => {
        var valname = "kotae";

        var actual = intp.pseudoToNative(intp.getProperty(intp.global, valname));
        if(actual == undefined) {
            return "変数 " + valname + " がどっかいっちゃった？";
        }
        return verifyElemEqual(expect, actual);
    });    
}

function arrayElemAutoGeneration(array, expr, result, questions) {
    var html = generateArrayElemQuestionHtml(globalId, array, expr, result);
    var qobj = generateArrayElemQuestionObject(globalId, result);
    questionAutoGeneration(html, qobj, questions);

    globalId++;
}

function generateArrayElemSubQuestionHtml(id, arr, refexpr, oldval, newval) {
    var builder = [];
builder.push(`<b>以下の要素を置き換えろ</b>
<table>
    <thead>
        <tr>
            <th>もとの要素</th>
            <th>新しい要素</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>${JSON.stringify(oldval)}</td>
            <td>${JSON.stringify(newval)}</td>
        </tr>
    </tbody>
</table>
`);

    const initSent = `var hairetu = ${JSON.stringify(arr)};

// 以下の行を書き換えてください。
hairetu[0] = 0;


// ここはいじらないで！
var kotae = hairetu;`;
    const answer = `${refexpr} = ${JSON.stringify(newval)};`;

    builder.push(questionFormTemplate(id, initSent, answer));
    return builder.join("");
    
}

function generateArrayElemSubQuestionObject(id, expect) {
    return generateQuestionObject(id, (intp) => {
        var valname = "kotae";

        var actual = intp.pseudoToNative(intp.getProperty(intp.global, valname));
        if(actual == undefined) {
            return "変数 " + valname + " がどっかいっちゃった？";
        }
        return verifyArrayEqual(expect, actual);
    });    
}


function arrayElemSubAutoGeneration(array, refexpr, oldval, newval, questions) {
    var html = generateArrayElemSubQuestionHtml(globalId, array, refexpr, oldval, newval);

    var expect = array;
    replaceArrayVal(expect, oldval, newval);

    var qobj = generateArrayElemSubQuestionObject(globalId, expect);
    questionAutoGeneration(html, qobj, questions);

    globalId++;
}



function generateDictQuestionHtml(id, dict) {
    var keys = Object.keys(dict);

    var builder = [];
builder.push(`<b>以下の辞書を生成せよ</b>
<table>
    <thead>
        <tr>
            <th>キー</th>
            <th>要素</th>
        </tr>
    </thead>
    <tbody>
`);
    keys.forEach(onekey => 
     builder.push(`
<tr>
     <td>${onekey}</td>
     <td>${JSON.stringify(dict[onekey])}</td>
</tr>
`));
    builder.push(`
     </tbody>
</table>
`);

    const initSent = "var kotae = 0;";
    const answer = JSON.stringify(dict);

    builder.push(questionFormTemplate(id, initSent, answer));
    return builder.join("");
    
}

function generateDictQuestionObject(id, expect) {
    return generateQuestionObject(id, (intp) => {
        var valname = "kotae";

        var actual = intp.pseudoToNative(intp.getProperty(intp.global, valname));
        if(actual == undefined) {
            return "変数 " + valname + " がどっかいっちゃった？";
        }
        return verifyDictEqual(expect, actual);
    });
    
}

function dictAutoGeneration(expect, questions) {
    var html = generateDictQuestionHtml(globalId, expect);
    var qobj = generateDictQuestionObject(globalId, expect);
    questionAutoGeneration(html, qobj, questions);

    globalId++;
}


function generateDictElemQuestionHtml(id, dict, expr, result) {
    var builder = [];
builder.push(`<b>「${JSON.stringify(result)}」 を取り出せ</b>
`);

    const initSent = `var jisyo = ${JSON.stringify(dict)};

var kotae = 0;`;
    const answer = `var kotae = ${expr};`;

    builder.push(questionFormTemplate(id, initSent, answer));
    return builder.join("");
    
}

function generateDictElemQuestionObject(id, expect) {
    return generateQuestionObject(id, (intp) => {
        var valname = "kotae";

        var actual = intp.pseudoToNative(intp.getProperty(intp.global, valname));
        if(actual == undefined) {
            return "変数 " + valname + " がどっかいっちゃった？";
        }
        return verifyDictEqual(expect, actual);
    });    
}

function dictElemAutoGeneration(dict, expr, result, questions) {
    var html = generateDictElemQuestionHtml(globalId, dict, expr, result);
    var qobj = generateDictElemQuestionObject(globalId, result);
    questionAutoGeneration(html, qobj, questions);

    globalId++;
}


function generateDictElemSubQuestionHtml(id, dict, refexpr, oldval, newval) {
    var builder = [];
builder.push(`<b>以下の要素を置き換えろ</b>
<table>
    <thead>
        <tr>
            <th>もとの要素</th>
            <th>新しい要素</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>${JSON.stringify(oldval)}</td>
            <td>${JSON.stringify(newval)}</td>
        </tr>
    </tbody>
</table>
`);

    const initSent = `var jisyo = ${JSON.stringify(dict)};

// 以下の行を書き換えてください。
jisyo[0] = 0;


// ここはいじらないで！
var kotae = jisyo;`;
    const answer = `${refexpr} = ${JSON.stringify(newval)};`;

    builder.push(questionFormTemplate(id, initSent, answer));
    return builder.join("");
    
}

function generateDictElemSubQuestionObject(id, expect) {
    return generateQuestionObject(id, (intp) => {
        var valname = "kotae";

        var actual = intp.pseudoToNative(intp.getProperty(intp.global, valname));
        if(actual == undefined) {
            return "変数 " + valname + " がどっかいっちゃった？";
        }
        return verifyDictEqual(expect, actual);
    });    
}


function replaceArrayVal(arr, old, nval) {
    for(var i = 0;i < arr.length; i++) {
        let cur = arr[i];
        if(cur === old) {
            arr[i] = nval;
            return true;
        } else if (Array.isArray(cur)) {
            let done = replaceArrayVal(cur, old, nval);
            if(done) {
                return true;
            }            
        } else if(typeof cur != "string" &&
            typeof cur != "number") {
            let done = replaceVal(cur, old, nval)
            if(done) {
                return true;
            }
        }
    }
    return false;
}

function replaceVal(obj, old, nval) {
    var keys = Object.keys(obj);
    for(let key of keys) {
        let cur= obj[key];
        if(cur === old) {
            obj[key] = nval;
            return true;
        } else if(Array.isArray(cur)) {
            let done = replaceArrayVal(cur, old, nval);
            if(done) {
                return true;
            }
        } else if(typeof cur != "string" &&
            typeof cur != "number") {
            let done = replaceVal(cur, old, nval)
            if(done) {
                return true;
            }
        }
    }
    return false;

}


function dictElemSubAutoGeneration(dict, refexpr, oldval, newval, questions) {
    var html = generateDictElemSubQuestionHtml(globalId, dict, refexpr, oldval, newval);

    var expect = Object.assign({}, dict);
    replaceVal(expect, oldval, newval);

    var qobj = generateDictElemSubQuestionObject(globalId, expect);
    questionAutoGeneration(html, qobj, questions);

    globalId++;
}



function verifyDictEqual(expect, actual) {
    let exKeys = Object.keys(expect);
    let acKeys = Object.keys(actual);
    if(exKeys.length != acKeys.length) {
        return "キーの数が違います";
    }
    var diff = _verifyArrayEqualInternal(exKeys, acKeys);
    if(diff != true) {
        return "キー「" + diff + "」が入っていません。";
    }
    for(var i = 0; i < exKeys.length; i++) {
        var k = exKeys[i];
        if(!elemEqual(expect[k], actual[k])){
            return "キー「" + k + "」の所の要素が、「" + JSON.stringify(expect[k]) + "」じゃないです。";
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
                    scenarioPlayer.run();
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
                    scenarioPlayer.run();
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
