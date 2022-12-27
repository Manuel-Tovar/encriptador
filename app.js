const btnEncriptar = document.getElementById("encriptar"),
      btnDesencriptar = document.getElementById("desencriptar"),
      textImprimir = document.getElementById("resultado-texto"),
      sinRest = document.getElementById("texto-imprime"),
      btnCopiar = document.getElementById("copiar"),
      textIngresado = document.getElementById("ingreso-texto"),
      animacion = document.getElementById("animacion");

const claveEncriptacion = text => {
    return text
    .replace(/e/g, "enter")
    .replace(/i/g, "imes")
    .replace(/a/g, "ai")
    .replace(/o/g, "ober")
    .replace(/u/g, "ufat")
}

const claveDesencriptacion = text => {
    return text
    .replace(/enter/g, "e")
    .replace(/imes/g, "i")
    .replace(/ai/g, "a")
    .replace(/ober/g, "o")
    .replace(/ufat/g, "u")
}

btnEncriptar.addEventListener("click", ()=> {
    /* FUNCION PARA EL BOTON ENCRIPTAR */
    textImprimir.value = claveEncriptacion(textIngresado.value);
    validar();

})

btnDesencriptar.addEventListener("click", ()=> {
    /* FUNCION PARA EL BOTON DESENCRIPTAR */
    textImprimir.value = claveDesencriptacion(textIngresado.value);
    validar();
})

function validar(){
    sinRest.style.display = "none"
    textImprimir.style.display = "none";
    btnCopiar.style.display = "none";
    animacion.style.display = "flex"
    /* CONDICION PARA EVALUAR SI EL VALOR DE TEXT AREA ESTA VACIO */
    if(textIngresado.value == ""){
        textImprimir.style.display = "none";
        btnCopiar.style.display = "none";
        sinRest.style.display = "flex";
        sinRest.style.flexDirection = "column";
        animacion.style.display = "none";
    }else{
        barraPorcentaje();
        textIngresado.innerHTML = textImprimir
        textIngresado.value = "";
    }
}


function barraPorcentaje() {
    /* FUNCION PARA CARGAR LA BARRA DE PORCENTAJE */
    btnEncriptar.disabled = true;
    btnDesencriptar.disabled = true;
    const progresoBar = document.getElementById('barra');
    const progresoBarText = progresoBar.querySelector('.progreso-bar-text');
    const animacion = document.getElementById("animacion");
    let porcent = 0;
    progresoBar.style.width = porcent + '%';
    progresoBarText.textContent = porcent + '%';
    let progreso = setInterval(function() {
        if (porcent >= 100) {
            clearInterval(progreso);
            btnEncriptar.disabled = false;
            btnDesencriptar.disabled = false;
            animacion.style.display = "none";
            textImprimir.style.display = "flex";
            btnCopiar.style.display = "block";
            
        } else {
            porcent = porcent + 1; 
            progresoBar.style.width = porcent + '%';
            progresoBarText.textContent = porcent + '%';
        }
    }, 30);  
}

btnCopiar.addEventListener("click", ()=> {
    // FUNCION PARA COPIAR 
    textImprimir.focus();
    document.execCommand("selectAll");
    document.execCommand("copy");
    showAlert();
})


/* FUNCION PARA QUITAR LAS MAYUSCULAS Y LOS ACENTOS AL TEXT AREA */
textIngresado.addEventListener("input", () => {
    textIngresado.value = textIngresado.value.normalize("NFD").replace(/[^a-zA-Z 0-9.]+/g,'').toLowerCase()
});

function showAlert() {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Texto Copiado',
        backdrop: false,
        showConfirmButton: false,
        timer: 1300
      })
}

// FUNCION PARA ANIMACION DE MATRIX

canvas.height = window.screen.height;
canvas.width = window.screen.width;

var columns = []
for (i = 0; i < 256; columns[i++] = 1);


function step() {
    canvas.getContext('2d').fillStyle = 'rgba(0,0,0,0.05)';
    canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height);
    canvas.getContext('2d').fillStyle = '#0F0';
    columns.map(function (value, index) {
      
        var character = String.fromCharCode(3e4 +
                                            Math.random() * 33);
  
        canvas.getContext('2d').fillText(character, //texto
                                         index * 10, //x
                                         value //y
                                        );
        columns[index] = value > 758 + Math.random() * 1e4 ? 0 : value + 10
    })
}

setInterval(step, 33);




