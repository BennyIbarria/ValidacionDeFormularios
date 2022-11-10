export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput])
    {
        validadores[tipoDeInput](input);
    }
    if(input.validity.valid)
    {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
        
    }else
    {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostraraMensajeDeError(tipoDeInput, input);
    }
}
const tipoDeErrores=[
    "valueMissing",
    "typeMismatch",
    "patternMismatch",  
    "customError"
];
const mensajesDeError={
    nombre:
    {
        valueMissing: "El campo nombre no puede estar vacío"
    },
    email:
    {
        valueMissing: "El campo e-mail no puede estar vacío",
        typeMismatch: "La dirección de correo no es válida"
    },
    password:
    {
        valueMissing: "El campo contraseña no puede estar vacío",
        patternMismatch: "La contraseña debe tener entre 8 y 12 caracteres, al menos una mayúscula, una minúscula y un número",
    },
    nacimiento:
    {
        valueMissing: "El campo nacimiento no puede estar vacío",
        customError: "Debes ser mayor de edad para registrarte"
    },
    numero:
    {
      valueMissing: "El campo número telefónico no puede estar vacío",  
      patternMismatch: "El el formato debe tener 10 dígitos"
    },
    direccion:
    {
        valueMissing: "El campo dirección no puede estar vacío",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres.",
    },
    ciudad:
    {
        valueMissing: "El campo ciudad no puede estar vacío",
        patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres.",
    },
    estado:
    {
        valueMissing: "El campo estado no puede estar vacío",
        patternMismatch: "el estado debe contener entre 10 a 40 caracteres.",
    },
};
const validadores = {
    nacimiento: input =>validarNacimiento(input),
};


function mostraraMensajeDeError(tipoDeInput, input)
{
        let mensaje = "";
        tipoDeErrores.forEach(error =>{
    if(input.validity[error])
    {
        console.log(tipoDeInput, error);
        console.log(input.validity[error]);
        console.log(mensajesDeError[tipoDeInput][error]);
        mensaje = mensajesDeError[tipoDeInput][error];
    }
    });
    return mensaje;
}


const inputNacimiento = document.querySelector("#birth");

inputNacimiento.addEventListener("blur", (evento) => {
    validarNacimiento(evento.target);
});
function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "Debes ser mayor de edad para registrarte";
    }
    input.setCustomValidity(mensaje);
}
function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return diferenciaFechas<=fechaActual;



}
