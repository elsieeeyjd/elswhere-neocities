function setBG(){
    box.style.backgroundColor = input.value;

    document.getElementById("input").value="";
}
function setText(){
    box.style.color = input2.value;

    document.getElementById("input2").value="";
}
var changeFontStyle = function (font) { 
    document.getElementById( 
        "namebox").style.fontFamily 
                = font.value; 
}