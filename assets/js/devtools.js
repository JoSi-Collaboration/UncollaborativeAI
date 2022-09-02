const contextmenu = document.querySelector(".contextmenu");
let ctxPosition = {
  pageX: 0,
  pageY: 0,
};
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  const ctxHeight = contextmenu.offsetHeight;
  const ctxWidth = contextmenu.offsetWidth + 5;

  const widthOverflow = e.pageX + ctxWidth > window.innerWidth;
  const heightOverflow = e.pageY + ctxHeight > window.innerHeight;

  ctxPosition = {
    pageX: widthOverflow ? e.pageX - ctxWidth - 5 : e.pageX,
    pageY: heightOverflow ? e.pageY - ctxHeight : e.pageY,
  };

  hideContextMenu();
  setTimeout(showCtxMenu, 50);
});
document.addEventListener("click", hideContextMenu);

function showCtxMenu() {
  contextmenu.style.cssText = `
    opacity: 1;
    transform: scale(1);
    top: ${ctxPosition.pageY}px;
    left: ${ctxPosition.pageX}px;
    `;
}

function hideContextMenu() {
  contextmenu.style.cssText = `
    opacity: 0;
    transform: scale(0);
    top: ${ctxPosition.pageY}px;
    left: ${ctxPosition.pageX}px;
    `;
}

var html_update = undefined;
var last_html = "";

function devtools_open(type) {
  if (type == "console") {
    devtool_el = document.getElementById("devtools");
    if (devtool_el.classList.contains("hidden")) {
      devtool_el.classList.remove("hidden");
    }
    el = document.getElementById("console");
    el2 = document.getElementById("html_editor");
    if (el2.classList.contains("hidden")) {} else {
      el2.classList.add("hidden");
    }
    if (el.classList.contains("hidden")) {
      el.classList.remove("hidden");
    }
  } else if (type == "html") {
    devtool_el = document.getElementById("devtools");
    if (devtool_el.classList.contains("hidden")) {
      devtool_el.classList.remove("hidden");
    }
    el = document.getElementById("html_editor");
    el2 = document.getElementById("console");
    if (el2.classList.contains("hidden")) {} else {
      el2.classList.add("hidden");
    }
    if (el.classList.contains("hidden")) {
      el.classList.remove("hidden");
    }

    editable = document.getElementById("editable");
    document.getElementById("html_code_area").value = editable.innerHTML;
    last_html = editable.innerHTML;
    /*html_update = window.setInterval(function() {
      editable = document.getElementById("editable");
      if (editable.innerHTML!=last_html) {
        last_html = editable.innerHTML;
        el = document.getElementById("html_editor");
        if (el.classList.contains("hidden")==false) {
          editor = document.getElementById("html_code_area");
        }
      }
    }, 100);*/
  }
}

function devtools_close(type) {
  if (type == "console") {
    devtool_el = document.getElementById("devtools");
    if (devtool_el.classList.contains("hidden")) {} else {
      devtool_el.classList.add("hidden");
    }
    el = document.getElementById("console");
    if (el.classList.contains("hidden")) {} else {
      el.classList.add("hidden");
    }
  } else if (type == "html") {
    devtool_el = document.getElementById("devtools");
    if (devtool_el.classList.contains("hidden")) {} else {
      devtool_el.classList.add("hidden");
    }
    el = document.getElementById("html_editor");
    if (el.classList.contains("hidden")) {} else {
      el.classList.add("hidden");
    }
  }
}

function html_edit_save() {
  editor = document.getElementById("html_code_area");
  editable = document.getElementById("editable");
  setInnerHTML(editable, editor.value);
}

function html_edit_refresh() {
  editable = document.getElementById("editable");
  document.getElementById("html_code_area").value = editable.innerHTML;
}

function getTabs(text) {
  var index = 0;
  tabs = "";
  while (text.charAt(index++) === "\t") {
    tabs = tabs + "\t";
  }
  return tabs;
}

function numberOfTabs(text) {
  var count = 0;
  var index = 0;
  while (text.charAt(index++) === "\t") {
    count++;
  }
  return count;
}

var list = document.getElementsByClassName("allow-tab")
const brackets = {"{": "}","(": ")", "[": "]", "'": "'", '"': '"'}

for (var i = 0; i < list.length; i++) {
    list[i].addEventListener('keydown', function(e) {
      if (e.key == 'Tab') {
        console.log(e.key)
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;
    
        // set textarea value to: text before caret + tab + text after caret
        this.value = this.value.substring(0, start) +
          "\t" + this.value.substring(end);
    
        // put caret at right position again
        this.selectionStart =
          this.selectionEnd = start + 1;
      } else if (brackets[e.key]!=undefined) {
        e.preventDefault()
        var start = this.selectionStart;
        var end = this.selectionEnd;
    
        this.value = this.value.substring(0, start) + e.key + brackets[e.key] + this.value.substring(end);
    
        // put caret at right position again
        this.selectionStart =
          this.selectionEnd = start + 1;
      } else if (e.key == "Enter") {
        var start = this.selectionStart;
        var end = this.selectionEnd;
        last = this.value.substring(start-1, start);
        if (brackets[last]!=undefined) {
          e.preventDefault()
          row = this.value.substring(0, this.selectionStart).split("\n").at(-1)
          tabs = getTabs(row)
          this.value = this.value.substring(0, start) + "\n" + tabs +"\t\n" + tabs + this.value.substring(end);
          tab_num = numberOfTabs(this.value.substring(0, this.selectionStart-1).split("\n").at(-1))
          console.log(tab_num)
          console.log(this.value.substring(0, this.selectionStart-1).split("\n").at(-1))
          this.selectionStart = this.selectionEnd = start + tab_num+2;
        }
      }
    });
}

editor = document.getElementById("html_code_area");
editor.addEventListener("input", change);

function change(e) {
  var changed = e.target || e.srcElement;
  console.log(changed)
  hljs.highlightElement(changed);
}
