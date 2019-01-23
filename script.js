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
        this.ganador = new Participante('', '', 0, 0);
        if (longitud >= 100 && longitud <= 1000) {
            this.longitud = longitud;
        }
        else {
            console.log('Longitud incorrecta');
        }
    }
    Carrera.prototype.restart = function () {
        this.ganador = new Participante('', '', 0, 0);
        this.particpantes = [];
    };
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
        this.posicion = 0;
        if (velocidadmax >= 5 && velocidadmax <= 15) {
            this.velocidadMax = velocidadmax;
        }
        if (velocidadmin >= 5 && velocidadmax > velocidadmin) {
            this.velocidadMin = velocidadmin;
        }
    }
    Participante.prototype.setPosicion = function (posicion) {
        this.posicion = this.posicion + posicion;
    };
    Participante.prototype.clearPosicion = function () {
        this.posicion = 0;
    };
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
    var inputmin = document.getElementById('min');
    var inputmax = document.getElementById('max');
    if (inputmax.value != '' && inputnombre.value != '' && inputmin.value != '' && inputtraccion.value != '') {
        var participante = new Participante(inputnombre.value, inputtraccion.value, parseInt(inputmax.value), parseInt(inputmin.value));
        arrayParticipantes.push(participante);
        addSelectParticipante(participante.nombre);
        inputmax.value = '15';
        inputmin.value = '5';
        inputnombre.value = '';
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
        addSelectCarreras(carrera.nombre);
    }
    else {
        console.log('Completar campos Carrera');
    }
}
function addSelectCarrera(nombre) {
    var selectCarrera = document.getElementById('select-carrera');
    var option = document.createElement('option');
    option.value = nombre;
    option.text = nombre;
    selectCarrera.add(option);
}
function addSelectCarreras(nombre) {
    var selectCarreras = document.getElementById('select-carreras');
    var option = document.createElement('option');
    option.value = nombre;
    option.text = nombre;
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
var interval;
function empezarCarrera() {
    var inputcarrera = document.getElementById('select-carreras');
    var carrera = _buscarCarrera(inputcarrera.value);
    interval = window.setInterval(function () {
        _simulacionCarrera(carrera);
    }, 500);
}
function _buscarCarrera(nombre) {
    for (var key in arrayCarreras) {
        if (arrayCarreras[key].nombre === nombre) {
            return arrayCarreras[key];
        }
    }
}
function _simulacionCarrera(carrera) {
    for (var key in carrera.particpantes) {
        var posicion = _velocidad(carrera.particpantes[key].velocidadMax, carrera.particpantes[key].velocidadMin) + _checkTraccion(carrera.particpantes[key].traccion, carrera.tiempo);
        carrera.particpantes[key].setPosicion(posicion);
        console.log(carrera.particpantes[key].posicion);
        if (carrera.ganador.posicion < carrera.particpantes[key].posicion) {
            carrera.ganador = carrera.particpantes[key];
        }
    }
    if (carrera.ganador.posicion >= carrera.longitud) {
        console.log(carrera.ganador.nombre + ' ha ganado la carrera');
        carrera.restart();
        clearInterval(interval);
    }
}
function _velocidad(max, min) {
    return Math.random() * (max - min) + min;
}
function _checkTraccion(traccion, tiempo) {
    switch (traccion) {
        case 'mediana':
            if (tiempo === 'humedo') {
                return 4;
            }
            else {
                return 1;
            }
        case 'blanda':
            if (tiempo === 'lluvioso') {
                return 5;
            }
            else if (tiempo === 'humedo') {
                return 1;
            }
            else {
                return -2;
            }
        case 'dura':
            if (tiempo === 'seco') {
                return 5;
            }
            else if (tiempo === 'humedo') {
                return 1;
            }
            else {
                return -2;
            }
    }
}
