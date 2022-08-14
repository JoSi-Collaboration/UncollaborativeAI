var current_lvl = 0;
var last_ai_click = 0;
var time_update = 0;
var last_lvl_upd = 0;

levels = {
    "1": {
        "js": `var id = window.setInterval(function() {
            if (current_lvl != 1) {
                window.clearInterval(id);
                return
            }
            ai_click();
        }, 5000);`,
        "html": "",
        "tip": "You need to press the Player button at the same time as the AI presses the AI button"
    }
};

var setInnerHTML = function(elm, html) {
    elm.innerHTML = html;
    Array.from(elm.querySelectorAll("script")).forEach( oldScript => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes)
        .forEach( attr => newScript.setAttribute(attr.name, attr.value) );
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
}

function player_click() {
    let now = Math.floor(Date.now() / 1000);
    if (now-last_ai_click > 0.3 && now-last_lvl_upd > 0.2){
        return
    } else {
        next_level();
    }
}

function ai_click() {
    last_ai_click = Math.floor(Date.now() / 1000);
    btn = document.getElementById("ai");
    btn.style.backgroundColor = "green";
    (async()=> {
        await new Promise(r => setTimeout(r, 300));
        btn.style.backgroundColor = "#8a2dfcfd";
    }) ()
}

function next_level() {
    last_lvl_upd = Math.floor(Date.now() / 1000);
    time = {
        "min": 5,
        "sec": 0
    }
    let main_area = document.getElementById("content")
    let code_area = document.getElementById("js_loading");
    current_lvl++;
    if (current_lvl == 1) {
        main_area.innerHTML = `
        <div class="info">
            <b>Current level: </b><span id="cur_lvl">1</span><br>
            <b>Time left: </b><span id="time">5min 0sec</span>
        </div>
        <table class="full-wh nb">
            <tr class="full-wh nb">
                <td class="half-w nb button-td">
                    <button type="button" class="ai_button" id="ai">Artificial intelligence</button>
                </td>
                <td class="half-w nb button-td">
                    <button type="button" class="player_button" onclick="player_click()">Player</button>
                </td>
            </tr>
        </table>
        `;
    } else {
        window.clearInterval(time_update)
    }
    time_update = window.setInterval(function() {
        if (time["sec"] == 0) {
            time["min"] = time["min"]-1;
            time["sec"] = 59;
        } else {
            time["sec"] = time["sec"]-1;
        }
        document.getElementById("time").innerHTML = `${time["min"]}min ${time["sec"]}sec`;
    }, 1000);
    if (!(String(current_lvl) in levels)) {
        current_lvl = current_lvl-1;
        code_area.innerHTML = "";
        confetti({
            particleCount: 500,
            spread: 100,
            origin: { y: 0.6 }
        });
        main_area.innerHTML = `
        <div id="start">
            <h1>Congratulations</h1><br>
            <h3>You have finished all levels of Uncollaborative AI</h3><br>
        </div>
        `;
        return;
    }
    document.getElementById("cur_lvl").innerHTML = current_lvl;
    js = levels[String(current_lvl)]["js"];
    html = levels[String(current_lvl)]["html"];
    setInnerHTML(code_area, `<script>${js}</script>`);
    unnes = document.getElementById("unneccessary")
    /*const lines = str.split(/\r\n|\r|\n/);*/
    unnes.innerHTML = `${unnes.innerHTML}
    ${html}`;
}