var current_lvl = 0;
var last_ai_click = 0;
var time_update = 0;
var last_lvl_upd = 0;
var audio_enabled = true;
var words = ["HELLO"];
var word_KI_Trys_toWrite = [];
var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

total_time = {
    "min": 0,
    "sec": 0
}

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
        "tips": ["You need to press the Player button at the same time as the AI presses the AI button", "The AI presses the button every 5 seconds", "Everytime the AI presses its button, the button turns green", "Maybe you can try spam-clicking the Player button"]
    },
    "2": {
        "js": ``,
        "html": `
            <button type="button" class="hidden player_button" id="aienable" onclick="var id = window.setInterval(function() {if (current_lvl != 2) {window.clearInterval(id);return;};ai_click();}, 5000);document.getElementById('aienable').remove();")>Start AI</button> 
        `,
        "tips": ["In most browsers you can change the code of the website.", "You need to find the hidden button to enable the AI.", "It's funny to hide things in the part which seems to be 'unneccessary'", "I think you need to remove the 'hidden' class from the button"]
    },
    "3": {
        "js": `var ai_started = false;
        function StartAI(){
            if (ai_started==true) {
                console.log("AI already started!");
                return;
            } else {
                ai_started = true;
                console.log("AI started!");
                var id = window.setInterval(function() {if (current_lvl != 3) {window.clearInterval(id);return;};ai_click();}, 5000);
            }
        }`,
        "html": ``,
        "tips": ["You need to start the AI. But this time It isn't a button", "In Javascript there is something called a function. But I don't know if this helps you to Start(the)AI", "You can access the console by right-clicking and then clicking inspect. Somewhere there you should be able to get access to a console"]
    },
    "4": {
        "js": `
        var PlayerCounter = 0;
        var AICounter = 0;
        document.getElementById("Start").remove();

        function playerOnClick(buttonname){
            PlayerCounter ++;
            let now = Math.floor(Date.now() / 1000);
            if (audio_enabled==true) {
                var audio = new Audio('./assets/audio/click.wav');
                audio.play();
            }
            if (now - last_ai_click > 0.3 || now - last_lvl_upd < 0.3 || buttonname != last_button) {
                return
            } else {
                next_level();
            }
        }
        function Run_AI(){
            timeout = Math.floor(Math.random() * 200)
            console.log(AICounter);
            last_button = String(Math.floor(Math.random() * 4)+1);
            if (PlayerCounter>5 && AICounter%4 == 0){
                last_button = "1"
                timeout = 0;
            }
            if (PlayerCounter>10 && AICounter%4 == 1){
                last_button = "2"
                timeout = 0;
            }
            if (PlayerCounter>15 && AICounter%4 == 2){
                last_button = "3"
                timeout = 0;
            }
            if (PlayerCounter>20 && AICounter%4 == 3){
                last_button = "4"
                timeout = 0;
            }
            
            AICounter ++;
            
            last_ai_click = Math.floor(Date.now() / 1000);
            btn = document.getElementById("ai"+last_button);
            btn.style.backgroundColor = "green";
            (async() => {
                await new Promise(r => setTimeout(r, 300));
                btn.style.backgroundColor = "#8a2dfcfd";
            })()
            //console.log(last_ai_click);
            if (current_lvl == 4){
                setTimeout(function() { Run_AI(); }, 2100 - timeout);
            }
            
        }
        setTimeout(function() { Run_AI(); }, 100);
        `,
        "html": `
        <div id="level4">
        <table class="full-wh nb">
            <tr class="full-wh nb">
                    <td class="half-w nb button-td">
                        <button type="button" class="ai_button" id="ai1">AI</button> 
                        <button type="button" class="player_button" id="player1" onclick="playerOnClick('1');">Player</button> 
                        <br>
                        <button type="button" class="ai_button" id="ai2">AI</button> 
                        <button type="button" class="player_button" id="player2" onclick="playerOnClick('2');">Player</button> 
                        <br>
                        <button type="button" class="ai_button" id="ai3">AI</button> 
                        <button type="button" class="player_button" id="player3" onclick="playerOnClick('3');">Player</button> 
                        <br>
                        <button type="button" class="ai_button" id="ai4">AI</button> 
                        <button type="button" class="player_button" id="player4" onclick="playerOnClick('4');">Player</button> 
                    </td>
            </tr>
        </table>
        </div>`,
        "tips": ["React quickly!!", "Maybe the AI is at some point to bored to select randomly?", "I think some buttons are getting disabled with the time…", "At some point, it will only be one button left which is clicked by the AI"]
    },
    "5": {
        "js": `
        element = document.getElementById("level4");
        if (element != null){
            element.remove();
        }
        var height = $(document).height();
        var width =$(document).width();
        var x = 0;
        var y = 0;
        var old_code = false;
        buttonpos = {"1":0,"2":0,"3":0,"4":0}
        getButtonY("1");
        getButtonY("2");
        getButtonY("3");
        getButtonY("4");
        function getButtonY(number){
            element = document.getElementById("player"+String(number))
            if (typeof element === 'object' && element !== null && 'getBoundingClientRect' in element) {
                var rect = element.getBoundingClientRect();
                x = rect.top;
                buttonpos[String(number)] = x;
                console.log(buttonpos);
            }
            else {
                console.log("Waiting");
                if (current_lvl == 5) {
                    setTimeout(function() {getButtonY(number); }, 500);
                }
            }
        }
        
        function AI(){
            
            buttons = [Math.abs(buttonpos["1"] - y),Math.abs(buttonpos["2"] - y),Math.abs(buttonpos["3"] - y),Math.abs(buttonpos["4"] - y)];
            //I think this would be the better code for the AI:
            /* Maybe you need to type sth in the console?: 
            reload_code();
            */
            var MaxValue = Math.max(...buttons);
            console.log(MaxValue)
            var ButtonIndex = buttons.indexOf(MaxValue);
            last_button = String(ButtonIndex+1);
            //This was the old code for the AI. It was way to easy.
            /*var MaxValue = Math.min(...buttons);
            console.log(buttons.indexOf(MaxValue));
            var ButtonIndex = buttons.indexOf(MaxValue);
            last_button = String(ButtonIndex+1);*/
            //End Of Old Code
            last_ai_click = Math.floor(Date.now() / 1000);
            btn = document.getElementById("ai"+last_button);
            btn.style.backgroundColor = "green";
            (async() => {
                await new Promise(r => setTimeout(r, 300));
                btn.style.backgroundColor = "#8a2dfcfd";
            })()
            //console.log(last_ai_click);
            if (current_lvl == 5){
                setTimeout(function() { AI(); }, 2000);
            }
            

        }
        function playerOnClick(buttonname){
            console.log(y, height);
            element = document.getElementById("player"+buttonname);
            
            PlayerCounter ++;
            let now = Math.floor(Date.now() / 1000);
            if (audio_enabled==true) {
                var audio = new Audio('./assets/audio/click.wav');
                audio.play();
            }
            if (now - last_ai_click > 0.3 || now - last_lvl_upd < 0.3 || buttonname != last_button) {
                return
            } else {
                next_level();
            }
        }

        var id = window.setInterval(function() {
            if (current_lvl != 5) {
                window.clearInterval(id);
                return
            }
            AI();
        }, 5000);

        function mousemove(event){
            x = event.pageX 
            y = event.pageY   
        }
        setTimeout(function() { AI(); }, 2100 - timeout);
        window.addEventListener('mousemove', mousemove);
        `,
        "html": `<div id="level5">
        <table class="full-wh nb">
            <tr class="full-wh nb">
                    <td class="half-w nb button-td">
                        <button type="button" class="ai_button" id="ai1">AI</button> 
                        <button type="button" class="player_button" id="player1" onclick="playerOnClick('1');">Player</button> 
                        <br>
                        <button type="button" class="ai_button" id="ai2">AI</button> 
                        <button type="button" class="player_button" id="player2" onclick="playerOnClick('2');">Player</button> 
                        <br>
                        <button type="button" class="ai_button" id="ai3">AI</button> 
                        <button type="button" class="player_button" id="player3" onclick="playerOnClick('3');">Player</button> 
                        <br>
                        <button type="button" class="ai_button" id="ai4">AI</button> 
                        <button type="button" class="player_button" id="player4" onclick="playerOnClick('4');">Player</button> 
                    </td>
            </tr>
        </table>
        </div>`,
        "tips": ["The AI don't want to collaborate with you. It always presses a button which isn't near to your cursor. ", "Comments in the code should be used as help to understand the code", "Maybe it would help you to switch to an older version of the code!", "You can reload the code if you changed it by using reload_code() in the console"]
    },
    "6": {
        "js": `
        let last_player_click;
        var Count = 0;
        element = document.getElementById("level5");
        if (element != null){
            element.remove();
        }
        function OnClickFunction(){
            let now = Math.floor(Date.now() / 1000);
            last_player_click = Math.floor(Date.now() / 1000);;
            if (audio_enabled == true) {
                var audio = new Audio('./assets/audio/click.wav');
                audio.play();
            }
            if (now - last_ai_click > 0.3 || now - last_lvl_upd < 0.3) {
                var randomVaritation = Math.floor(Math.random() * 400);
                if (Count>3){
                    var randomVaritation = Math.floor(Math.random() * 350);
                }
                if (Count>8){
                    var randomVaritation = Math.floor(Math.random() * 310);
                }
                setTimeout(function() { AI_Level6(); }, 2100 - randomVaritation);
                return
            } else {
                next_level();
            }
            setTimeout(function() { AI_Level6(); }, 2000);
        }
        function AI_Level6(){
            let now = Math.floor(Date.now() / 1000);
            console.log(now - last_player_click);
            if (now - last_player_click>=2){
                last_ai_click = Math.floor(Date.now() / 1000);
                btn = document.getElementById('ai');
                btn.style.backgroundColor = "green";
                (async() => {
                    await new Promise(r => setTimeout(r, 300));
                    btn.style.backgroundColor = "#8a2dfcfd";
                })()
            }
        }`,
        "html": `<table class="full-wh nb" id="Start">
        <tr class="full-wh nb">
            <td class="half-w nb button-td">
                <button type="button" class="ai_button" id="ai">Artificial intelligence</button>
            </td>
            <td class="half-w nb button-td">
                <button type="button" class="player_button" onclick="OnClickFunction()">Player</button>
            </td>
        </tr>
    </table>`,
        "tips": ["Maybe you should wait a little bit after clicking your button", "The AI tryies to avoid you maybe pause a few seconds.", "I think the AI always clicks a bit after you", "The AI clicks exactly 2 seconds after your last click."]
    },
    "7": {
        "js": `
        var random = true;
        element = document.getElementById("Start");
        if (element != null){
            element.remove();
        }
        function OnClickFunction(){
            let now = Math.floor(Date.now() / 1000);
            last_player_click = Math.floor(Date.now() / 1000);;
            if (audio_enabled == true) {
                var audio = new Audio('./assets/audio/click.wav');
                audio.play();
            }
            if (now - last_ai_click > 0.3 || now - last_lvl_upd < 0.3) {
                if (random) {
                    var randomVaritation = Math.floor(Math.random() * 200);
                } else {
                    randomVaritation = 0
                }
                setTimeout(function() { AI_Level6(); }, 2100 - randomVaritation);
                return
            } else {
                next_level();
            }
            setTimeout(function() { AI_Level6(); }, 2000);
        }
        function AI_Level6(){
            let now = Math.floor(Date.now() / 1000);
            console.log(now - last_player_click);
            if (now - last_player_click>=2){
                last_ai_click = Math.floor(Date.now() / 1000);
                btn = document.getElementById('ai');
                btn.style.backgroundColor = "green";
                (async() => {
                    await new Promise(r => setTimeout(r, 300));
                    btn.style.backgroundColor = "#8a2dfcfd";
                })()
            }
        }`,
        "html": `<table class="full-wh nb" id="Start">
        <tr class="full-wh nb">
            <td class="half-w nb button-td">
                <button type="button" class="ai_button" id="ai">Artificial intelligence</button>
            </td>
            <td class="half-w nb button-td">
                <button type="button" class="player_button" onclick="OnClickFunction()">Player</button>
            </td>
        </tr>
    </table>`,
        "tips": ["Oh these lazy devs! This level is so similar to level 6…", "I think the AI always clicks a bit after you. But the time seems to be random", "I think you can disable the random timing… I have seen a variable for that somewhere", "I think random=false; should disable the random timing!"]
    },
    "8": {
        "js": `
        element = document.getElementById("Start");
        if (element != null){
            element.remove();
        }
        function OnClickFunction(){
            let now = Math.floor(Date.now() / 1000);
            last_player_click = Math.floor(Date.now() / 1000);;
            if (audio_enabled == true) {
                var audio = new Audio('./assets/audio/click.wav');
                audio.play();
            }
            if (now - last_ai_click > 0.3 || now - last_lvl_upd < 0.3) {
                var randomVaritation = Math.floor(Math.random() * 200);
                setTimeout(function() { AI_Level6(); }, 2100 - randomVaritation);
                return
            } else {
                next_level();
            }
            setTimeout(function() { AI_Level6(); }, 2000);
        }
        function AI_Level6(){
            let now = Math.floor(Date.now() / 1000);
            console.log(now - last_player_click);
            if (now - last_player_click>=2){
                last_ai_click = Math.floor(Date.now() / 1000);
                btn = document.getElementById('ai');
                btn.style.backgroundColor = "green";
                (async() => {
                    await new Promise(r => setTimeout(r, 300));
                    btn.style.backgroundColor = "#8a2dfcfd";
                })()
            }
        }`,
        "html": `<table class="full-wh nb" id="Start">
        <tr class="full-wh nb">
            <td class="half-w nb button-td">
                <button type="button" class="hidden ai_button" id="ai">Artificial intelligence</button>
            </td>
            <td class="half-w nb button-td">
                <button type="button" class="hidden player_button" onclick="OnClickFunction()">Player</button>
            </td>
        </tr>
    </table>`,
        "tips": ["I think there are different levels combined here", "I really liked Levels 2 and 6", "I don't see any buttons here. Maybe you need to make them visible", "The AI clicks 2 seconds after your last click. Again…"]
    },
    "9": {
        "js": `
        element = document.getElementById("Start");
        if (element != null) {
            element.remove();
        }
        var height = $(document).height();
        var width =$(document).width();
        var x = 0;
        var y = 0;
        var old_code = false;
        buttonpos = {"1":0,"2":0,"3":0,"4":0}
        getButtonY("1");
        getButtonY("2");
        getButtonY("3");
        getButtonY("4");
        function getButtonY(number){
            element = document.getElementById("player"+String(number))
            if (typeof element === 'object' && element !== null && 'getBoundingClientRect' in element) {
                var rect = element.getBoundingClientRect();
                x = rect.top;
                buttonpos[String(number)] = x;
                console.log(buttonpos);
            }
            else {
                console.log("Waiting");
                if (current_lvl == 5) {
                    setTimeout(function() {getButtonY(number); }, 500);
                }
            }
        }
        
        function AI(){
            
            buttons = [Math.abs(buttonpos["1"] - y),Math.abs(buttonpos["2"] - y),Math.abs(buttonpos["3"] - y),Math.abs(buttonpos["4"] - y)];
            //I think this would be the better code for the AI:
            /* Maybe you need to type sth in the console?: 
            reload_code();
            */
            var MaxValue = Math.max(...buttons);
            console.log(MaxValue)
            var ButtonIndex = buttons.indexOf(MaxValue);
            last_button = String(ButtonIndex+1);
            //This was the old code for the AI. It was way to easy.
            /*var MaxValue = Math.min(...buttons);
            console.log(buttons.indexOf(MaxValue));
            var ButtonIndex = buttons.indexOf(MaxValue);
            last_button = String(ButtonIndex+1);*/
            //End Of Old Code
            last_ai_click = Math.floor(Date.now() / 1000);
            btn = document.getElementById("ai"+last_button);
            btn.style.backgroundColor = "green";
            (async() => {
                await new Promise(r => setTimeout(r, 300));
                btn.style.backgroundColor = "#8a2dfcfd";
            })()
            //console.log(last_ai_click);
            if (current_lvl == 5){
                setTimeout(function() { AI(); }, 2000);
            }
            

        }
        function playerOnClick(buttonname){
            console.log(y, height);
            element = document.getElementById("player"+buttonname);
            
            PlayerCounter ++;
            let now = Math.floor(Date.now() / 1000);
            if (audio_enabled==true) {
                var audio = new Audio('./assets/audio/click.wav');
                audio.play();
            }
            if (now - last_ai_click > 0.3 || now - last_lvl_upd < 0.3 || buttonname != last_button) {
                return
            } else {
                next_level();
            }
        }

        const gen_token = token();
        document.getElementById("key").innerHTML = gen_token;
        var started = false;
        console.log(token)
        function StartAI(key) {
            if (started) {
                return "AI already started";
            }
            if (key==gen_token) {
                var id = window.setInterval(function() {
                    if (current_lvl != 9) {
                        window.clearInterval(id);
                        return;
                    }
                    AI();
                }, 2000);
                console.log("AI started");
                started = !started;
            } else {
                console.log("Invalid token");
            }
        }

        function mousemove(event){
            x = event.pageX 
            y = event.pageY   
        }
        setTimeout(function() { AI(); }, 2100 - timeout);
        window.addEventListener('mousemove', mousemove);
        `,
        "html": `<div id="level5">
        <p class="hidden">I think you need the following key to start the AI</p>
        <p class="hidden" id="key"></p>
        <table class="full-wh nb">
            <tr class="full-wh nb">
                    <td class="half-w nb button-td">
                        <button type="button" class="ai_button" id="ai1">AI</button> 
                        <button type="button" class="player_button" id="player1" onclick="playerOnClick('1');">Player</button> 
                        <br>
                        <button type="button" class="ai_button" id="ai2">AI</button> 
                        <button type="button" class="player_button" id="player2" onclick="playerOnClick('2');">Player</button> 
                        <br>
                        <button type="button" class="ai_button" id="ai3">AI</button> 
                        <button type="button" class="player_button" id="player3" onclick="playerOnClick('3');">Player</button> 
                        <br>
                        <button type="button" class="ai_button" id="ai4">AI</button> 
                        <button type="button" class="player_button" id="player4" onclick="playerOnClick('4');">Player</button> 
                    </td>
            </tr>
        </table>
        </div>`,
        "tips": ["Hm, I think I have seen a key somewhere in the code. I wonder what you can activate with it", "I have checked the code for you. I have found the function StartAI(), but it needs a key! I hope you have the key…", "If you have activated the AI it would help you if an old version would run. I think there are some comments about that in the code", "You can find the code in the json_loading div. Change it to the old version and then run reload_code() in the console!"]
    },
    "10": {
        "js": `
        element = document.getElementById("level5");
        if (element != null) {
            element.remove();
        }
        var Word = words[Math.floor(Math.random() * words.length)];
        var RemoveTimer = 10;
        Count = 0;
        var SavedLetters = "";
        var OtherLetters = "";
        var newLetter = "";
        var position = 0;
        var lastAccepted = 0;
        var lastRemoved = 0;
        function letterGenerator(){
            position = Math.floor(Math.random() * characters.length);
            newLetter = characters.charAt(position);
            
            document.getElementById("letter").innerHTML = newLetter;
            document.getElementById("text").innerHTML = SavedLetters + OtherLetters;
            Count ++;
            if (SavedLetters+OtherLetters == Word){
                next_level();
            }

            RemoveTimer -= 1;
            if (RemoveTimer == 0){
                RemoveTimer = 10;
                if (SavedLetters.length != 0){
                    OtherLetters = SavedLetters.slice(-1) + OtherLetters;
                    SavedLetters = SavedLetters.slice(0, -1);
                }
            }
            lastAccepted +=1;
            lastRemoved +=1;
            AI_Level10(newLetter);
        }
        
        function AI_Level10(Letter){
            if (lastAccepted<5){
                return;
            }
            if (SavedLetters.length + OtherLetters.length>Word.length +2){
                return;
            }
            if (lastAccepted>20){
                OtherLetters += Letter
                lastAccepted = 0;
                return;
            }
            if (Math.floor(Math.random() * 5) == 1){
                OtherLetters += Letter
                lastAccepted = 0;
                return;
            }
            position = SavedLetters.length -1;
            for (let i = OtherLetters.length-1; i > -1; i--) {
                if (!Word.length<i+position){
                    if (OtherLetters[i] == Word[i+position]){
                        OtherLetters = OtherLetters.slice(0, i) + OtherLetters.slice(i+1);
                    }
                }
                
            }
        }
        function RemoveLetter(){
            if (OtherLetters == ""){
                if (SavedLetters == ""){
                    return;
                }
                SavedLetters = SavedLetters.slice(0, -1);
            }
            OtherLetters = OtherLetters.slice(0, -1);
        }
        function SaveLetter(){
            SavedLetters += OtherLetters[0]
            OtherLetters = OtherLetters.slice(1);
        }
        var id2 = window.setInterval(function() {
            if (current_lvl != 10) {
                window.clearInterval(id2);
                return
            }
            letterGenerator();
        }, 200);`,
        "html": `
        <div id="Start">
            <div id="lvl10-box">
                <h1>Can you make the AI write HELLO</h1><br>
                <h3 id="letter"></h3><br>
                <h3 id="text"></h3>
            </div>
            <table class="full-wh nb">
                <tr class="full-wh nb">

                    <td class="half-w nb button-td_lvl10">
                        <button type="button" class="player_button" onclick="RemoveLetter()">Remove Letter</button>
                    </td>
                    <td class="half-w nb button-td_lvl10">
                        <button type="button" class="player_button" onclick="SaveLetter()">Lock Letter</button>
                    </td>

                </tr>
            </table>
        </div>`,
        "tips": ["You need to press the Player button at the same time as the AI presses the AI button", "Everytime the AI presses its button, the button turns green", "Maybe you can try spam-clicking the Player button"]
    }
};

var setInnerHTML = function(elm, html) {
    elm.innerHTML = html;
    Array.from(elm.querySelectorAll("script")).forEach(oldScript => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes)
            .forEach(attr => newScript.setAttribute(attr.name, attr.value));
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        oldScript.parentNode.replaceChild(newScript, oldScript);
    });
}

function player_click() {
    let now = Math.floor(Date.now() / 1000);
    if (audio_enabled == true) {
        var audio = new Audio('./assets/audio/click.wav');
        audio.play();
    }
    if (now - last_ai_click > 0.3 || now - last_lvl_upd < 0.3) {
        return
    } else {
        next_level();
    }
}

function ai_click() {
    last_ai_click = Math.floor(Date.now() / 1000);
    btn = document.getElementById("ai");
    btn.style.backgroundColor = "green";
    (async() => {
        await new Promise(r => setTimeout(r, 300));
        btn.style.backgroundColor = "#8a2dfcfd";
    })()
}

function next_level() {
    last_lvl_upd = Math.floor(Date.now() / 1000);
    time = {
        "min": 5,
        "sec": 0
    }
    let unnes = document.getElementById("unneccessary")
    let main_area = document.getElementById("content")
    let code_area = document.getElementById("js_loading");
    current_lvl++;
    if (document.getElementById("hint") != null) {
        document.getElementById("hint").classList.toggle("hidden")
    }

    if (current_lvl == 1) {
        main_area.innerHTML = `
        <div id="audio_controll"><button type="button" onclick="toggleAudio()" id="toggle_audio"><i class="fa-solid fa-volume"></i></button></div>
        <div class="info">
            <b>Current level: </b><span id="cur_lvl">1</span><br>
            <b>Time left: </b><span id="time">5min 0sec</span>
        </div>
        <table class="full-wh nb" id="Start">
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
        var btns = document.getElementsByClassName("ai_button");
        for (let btn of btns) {
            btn.style.backgroundColor = "#8a2dfcfd";
        }
        window.clearInterval(time_update);
        main_area.innerHTML += `<span class="level_notif" id="lvlup">You successfully solved level ${current_lvl-1}</span>`;
        var times_run = 0;
        var remove_lvlup = window.setInterval(function() {
            if (times_run == 0) {
                times_run++;
            } else if (times_run == 1) {
                document.getElementById("lvlup").remove()
                window.clearInterval(remove_lvlup)
                return
            }
        }, 2000);
    }
    time_update = window.setInterval(function() {
        total_time["sec"] = total_time["sec"] + 1
        if (total_time["sec"] == 60) {
            total_time["min"] = total_time["min"] + 1;
            total_time["sec"] = 0;
        }
        if (time["sec"] == 0) {
            time["min"] = time["min"] - 1;
            time["sec"] = 59;
            if (time["min"] != 4) {
                hint_dict = { 3: 0, 2: 1, 1: 2, 0: 3 }
                if (levels[String(current_lvl)]["tips"][hint_dict[time["min"]]] != undefined) {
                    if (audio_enabled == true) {
                        var audio = new Audio('./assets/audio/hint.wav');
                        audio.play();
                    }
                    main_area.innerHTML += `<span class="hint_notif" id="hint"><img src="assets/image/robot.png" width=100 style="float:left;"><div class="arrow-left"></div><div class="speech-bubble">${levels[String(current_lvl)]["tips"][hint_dict[time["min"]]]}</div></span>`;
                    var times_run = 0;
                    var remove_hint = window.setInterval(function() {
                        if (times_run == 0) {
                            times_run++;
                        } else if (times_run == 1) {
                            document.getElementById("hint").remove()
                            window.clearInterval(remove_hint)
                            return
                        }
                    }, 10000);
                }
            }
        } else {
            time["sec"] = time["sec"] - 1;
        }
        document.getElementById("time").innerHTML = `${time["min"]}min ${time["sec"]}sec`;
        if (time["sec"] == 0 && time["min"] == 0) {
            code_area.innerHTML = "";
            unnes.innerHTML = "";
            if (audio_enabled == true) {
                var audio = new Audio('./assets/audio/game-over.wav');
                audio.play();
            }
            main_area.innerHTML = `
            <div id="start">
                <h1>Time's up</h1><br>
                <h3>You ran out of time. You have successfully solved ${current_lvl-1} levels!</h3><br>
            </div>
            `;
            window.clearInterval(time_update)
        }
    }, 1000);
    if (!(String(current_lvl) in levels)) {
        window.clearInterval(time_update)
        current_lvl = current_lvl - 1;
        code_area.innerHTML = "";
        unnes.innerHTML = "";
        if (audio_enabled == true) {
            var audio = new Audio('./assets/audio/all-lvl-compl.wav');
            audio.play();
        }
        confetti({
            particleCount: 1000,
            spread: 100,
            origin: { y: 0.6 }
        });
        main_area.innerHTML = `
        <div id="start">
            <h1>Congratulations</h1><br>
            <h3>You have finished all levels of Uncollaborative AI in ${total_time["min"]}min ${total_time["sec"]}sec</h3><br>
        </div>
        `;
        return;
    } else if (current_lvl != 1) {
        if (audio_enabled == true) {
            var audio = new Audio('./assets/audio/next-lvl.wav');
            audio.play();
        }
    }
    document.getElementById("cur_lvl").innerHTML = current_lvl;
    js = levels[String(current_lvl)]["js"];
    html = levels[String(current_lvl)]["html"];
    unnes.innerHTML = `${unnes.innerHTML}
    ${html}`;
    setInnerHTML(code_area, `<script>${js}</script>`);
}

function toggleAudio() {
    audio_enabled = !audio_enabled
    if (audio_enabled) {
        document.getElementById("toggle_audio").innerHTML = '<i class="fa-solid fa-volume"></i>';
    } else {
        document.getElementById("toggle_audio").innerHTML = '<i class="fa-solid fa-volume-slash"></i>';
    }
}

const rand = () => {
    return Math.random().toString(36).substr(2);
};

const token = () => {
    return rand() + rand();
};


function reload_code() {
    var code = document.getElementById("js_loading").innerHTML
    let code_area = document.getElementById("js_loading");
    code_area.innerHTML = "";
    setInnerHTML(code_area, code);
}