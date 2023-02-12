

let pontos = 0;
let vidas = 3;
let nMax = 21;
let nMin = 0;

while(vidas > 0) {
    let num1 = parseInt(Math.floor(Math.random() * (nMax - nMin) + 0));
    let num2 = parseInt(Math.floor(Math.random() * (nMax - nMin) + 0));
    //sempre o num1 ser o maior p evitar negativo
    if (num1 < num2) {
        let temp = num1;
        num1 = num2;
        num2 = temp;
    }

    let operacao = parseInt(Math.floor(Math.random() * (4 - 0) + 0));
    let checkAcerto = false;

    if (operacao == 0) {
        let valorDigitado = parseInt(prompt("Quanto eh "+num1+" + "+num2+"?"))
        checkAcerto = valorDigitado == num1 + num2

    } else if(operacao == 1) {
        let valorDigitado = parseInt(prompt("Quanto eh "+num1+" - "+num2+"?"))
        checkAcerto = valorDigitado == num1 - num2

    } else if(operacao == 2) {
        let valorDigitado = parseInt(prompt("Quanto eh "+num1+" * "+num2+"?"))
        checkAcerto = valorDigitado == num1 * num2

    } else if(operacao == 3) {
        let valorDigitado = parseInt(prompt("Quanto eh "+num1+" / "+num2+"?"))
        checkAcerto = Math.floor(valorDigitado) == Math.floor(num1 / num2)
    } else if(operacao == 4) {
        let 

    }

    if (checkAcerto) {
        pontos += 5;

        if (vidas < 3 && pontos % 50 == 0) {
            vidas++;
        }

        if (pontos % 20 == 0) {
            nMax += 10;
        }
        
    } else {
        alert("ERROUUUUUU\n Voce tem "+(--vidas)+" vidas!");
    }

}
alert("GAME OVER!!\n Vc fez "+pontos+" pontos!!!")



