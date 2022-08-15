element= document.getElementById("level5");
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
function sigmoid(x){
    var e = Math.E;
    return 1/(1 + Math.pow(e,-x));
    
}
var offset = sigmoid(0);
function letterGenerator(){
    index = OtherLetters.length + SavedLetters.length;
    if (index<0){
        index = 0;
    }
    if (index>=Word.length){
        index = Word.length -1;
    }
    var LetterAtPos = Word[index];
    var influence = Math.floor((sigmoid(Count/100)-offset)*26);
    console.log("Inf",influence)
    position = Math.floor(Math.random() * characters.length + influence);
    if (position<characters.length){
        
    }
    else{
        console.log("Index",index)
        position = characters.indexOf(LetterAtPos);
    }
    newLetter = characters.charAt(position);
    
    document.getElementById("letter").innerHTML = newLetter;
    document.getElementById("locked").innerHTML = SavedLetters;
    document.getElementById("not_locked").innerHTML = OtherLetters;
    document.getElementById("width_maker").innerHTML = SavedLetters;
    el = document.getElementById("lock_icon")
    console.log(el);
    if (SavedLetters.length != 0){
        if (el!=null){
            el.innerHTML = "<i class="fa-solid fa-lock"></i>";
        }
    } else {
        if (el!=null){
            el.innerHTML = "";
        }
    }
    Count ++;
    if (SavedLetters+OtherLetters == Word){
        console.log("Yes");
        (async() => {
            await new Promise(r => setTimeout(r, 1000));
        })()
        console.log("ANOTHER");
        window.clearInterval(id2);
        next_level();
    }
    RemoveTimer -= 1;
    if (RemoveTimer == 0){
        RemoveTimer = 50;
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
    if (SavedLetters.length + OtherLetters.length>Word.length){
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
    if (lastAccepted<10){
        return;
    }
    position = SavedLetters.length;
    console.log(position)
    for (let i = OtherLetters.length; i > -1; i--) {
        if (Word.length>i+position){
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
    if (OtherLetters.length == 0){
        return;
    }
    SavedLetters += OtherLetters[0]
    OtherLetters = OtherLetters.slice(1);
}
var id2 = window.setInterval(function() {
    if (current_lvl != 10) {
        window.clearInterval(id2);
        return
    }
    letterGenerator();
}, 200);