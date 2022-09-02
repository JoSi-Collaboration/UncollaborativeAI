// get element shortcut
function $(e){ return document.getElementById(e); };
// generic syntax parser
var parser = new Parser({
	whitespace: /\s+/,
	number: /0x[\dA-Fa-f]+|-?(\d+\.?\d*|\.\d+)|#[\dA-Fa-f]{3,6}/,
	comment: /\/\*([^\*]|\*[^\/])*(\*\/?)?|(\/\/|#)[^\r\n]*/,
	string: /"(\\.|[^"\r\n])*"?|'(\\.|[^'\r\n])*'?/,
	keyword: /(and|as|case|catch|class|const|def|delete|die|do|else|elseif|esac|exit|extends|false|fi|finally|for|foreach|function|global|if|new|null|or|private|protected|public|published|resource|return|self|static|struct|switch|then|this|throw|true|try|var|void|while|xor)(?!\w|=)/,
	variable: /[\$\%\@](\->|\w)+(?!\w)|\${\w*}?/,
	define: /[$A-Z_a-z0-9]+/,
	op: /[\+\-\*\/=<>!]=?|[\(\)\{\}\[\]\.\|]/,
	other: /\S/,
});
// wait for the page to finish loading before accessing the DOM
window.onload = function(){
	// get the textarea
	var textarea1 = $('html_code_area');
	// start the decorator
	decorator = new TextareaDecorator( textarea1, parser );
	// get the textarea
	var textarea2 = $('js_code_input');
	// start the decorator
	decorator = new TextareaDecorator( textarea2, parser );
};