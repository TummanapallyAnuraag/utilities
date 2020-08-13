var qrcode = new QRCode("qrcode", {
    text: "Default",
    width: 256,
    height: 256,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});

function makeCode () {
    var elText = document.getElementById("text");

    if(elText.value){
        qrcode.makeCode(elText.value);
    }
}
