var Timepo;
(function (Timepo) {
    Timepo[Timepo["lluvioso"] = 0] = "lluvioso";
    Timepo[Timepo["humedo"] = 1] = "humedo";
    Timepo[Timepo["seco"] = 2] = "seco";
})(Timepo || (Timepo = {}));
var Traccion;
(function (Traccion) {
    Traccion[Traccion["blanda"] = 0] = "blanda";
    Traccion[Traccion["mediana"] = 1] = "mediana";
    Traccion[Traccion["dura"] = 2] = "dura";
})(Traccion || (Traccion = {}));
var Carrera = /** @class */ (function () {
    function Carrera(nombre, tiempo, longitud) {
        this.nombre = nombre;
        this.tiempo = tiempo;
        this.particpantes = [];
        if (longitud >= 100 && longitud <= 1000) {
            this.longitud = longitud;
        }
        else {
            console.log('Longitud incorrecta');
        }
    }
    Carrera.prototype.addParticipante = function (participante) {
        var exist = false;
        for (var key in this.particpantes) {
            if (this.particpantes[key].nombre == participante.nombre) {
                exist = true;
                break;
            }
        }
        if (!exist) {
            this.particpantes.push(participante);
        }
        else {
            console.log('Ya esta registrado');
        }
    };
    return Carrera;
}());
var Participante = /** @class */ (function () {
    function Participante(nombre, traccion, velocidadmax, velocidadmin) {
        this.nombre = nombre;
        this.traccion = traccion;
        if (velocidadmax >= 5 && velocidadmax <= 15) {
            this.velocidadMax = velocidadmax;
        }
        if (velocidadmin >= 5 && velocidadmax > velocidadmin) {
            this.velocidadMin = velocidadmin;
        }
    }
    return Participante;
}());
var arrayParticipantes = Array();
var arrayCarreras = Array();
var btnRegisterParticipante = document.getElementById("registrarParticipante");
var btnCrearCarrera = document.getElementById("crearCarrera");
btnRegisterParticipante.addEventListener('click', registerParticipante, false);
btnCrearCarrera.addEventListener('click', crearCarrera, false);
function registerParticipante() {
    var inputnombre = document.getElementById('nombreP');
    var inputtraccion = document.getElementById('traccion');
    var inputmax = document.getElementById('min');
    var inputmin = document.getElementById('max');
    if (inputmax.value != '' && inputnombre.value != '' && inputmin.value != '' && inputtraccion.value != '') {
        var participante = new Participante(inputnombre.value, inputtraccion.value, parseInt(inputmax.value), parseInt(inputmin.value));
        arrayParticipantes.push(participante);
        inputmax.value = '15';
        inputmin.value = '5';
        inputnombre.value = '';
        addSelectParticipante(participante.nombre);
    }
    else {
        console.log('Completar Registro');
    }
}
function crearCarrera() {
    var inputnombre = document.getElementById('nombreC');
    var inputtiempo = document.getElementById('tiempo');
    var inputlongitud = document.getElementById('longitud');
    if (inputtiempo.value != '' && inputnombre.value != '' && inputlongitud.value != '') {
        var carrera = new Carrera(inputnombre.value, inputtiempo.value, parseInt(inputlongitud.value));
        arrayCarreras.push(carrera);
        inputlongitud.value = '100';
        inputnombre.value = '';
        addSelectCarrera(carrera.nombre);
        console.log('Carrera Creada');
    }
    else {
        console.log('Completar campos Carrera');
    }
}
function addSelectCarrera(nombre) {
    var selectCarrera = document.getElementById('select-carrera');
    var selectCarreras = document.getElementById('select-carreras');
    var option = document.createElement('option');
    option.value = nombre;
    option.text = nombre;
    selectCarrera.add(option);
    selectCarreras.add(option);
}
function addSelectParticipante(nombre) {
    var selectCarrera = document.getElementById('select-participante');
    var option = document.createElement('option');
    option.value = nombre;
    option.text = nombre;
    selectCarrera.add(option);
}
var btnAsignarParticipante = document.getElementById("asignarParticpante");
btnAsignarParticipante.addEventListener('click', asignarParticpante, false);
function asignarParticpante() {
    var inputparticipante = document.getElementById('select-participante');
    var inputcarrera = document.getElementById('select-carrera');
    for (var keyC in arrayCarreras) {
        if (arrayCarreras[keyC].nombre === inputcarrera.value) {
            for (var keyP in arrayParticipantes) {
                if (arrayParticipantes[keyP].nombre === inputparticipante.value) {
                    arrayCarreras[keyC].addParticipante(arrayParticipantes[keyP]);
                }
            }
        }
    }
}
var btnEmpezarCarrera = document.getElementById("empezarCarrera");
btnEmpezarCarrera.addEventListener('click', empezarCarrera, false);
function empezarCarrera() {
}