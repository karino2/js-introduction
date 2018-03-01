function setupREPL(id) {
    var holder = document.getElementById(id);
    var button = holder.getElementsByTagName("input")[0];
    var editor = CodeMirror.fromTextArea(holder.getElementsByTagName("textarea")[0], {
        lineNumbers: true,
    })
    var cons = holder.getElementsByClassName("console")[0]
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