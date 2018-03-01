function setupREPL(id) {
    var editor = CodeMirror.fromTextArea(document.getElementById(id+"-tarea"), {
        lineNumbers: true,
    })
    var cons = document.getElementById(id+"-console")
    var button = document.getElementById(id+"-button");
    button.onclick = function() { 
        try {
            var res = eval(editor.getValue());
            cons.innerText = res;
        }catch(err) {
            cons.innerText = "なにかおかしいです。 (" + err.message + ")";
        }
    }
}

function setupAll(idlist) {
    for(var i = 0; i < idlist.length;i++) {
        setupREPL(idlist[i]);
    }
}