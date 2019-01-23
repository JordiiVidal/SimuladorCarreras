
enum Timepo{
    lluvioso,humedo,seco
}
enum Traccion{
    blanda,mediana,dura
}

class Carrera{
    
    nombre:string;
    tiempo: string;
    longitud:number;
    particpantes:Array<Participante>;
    ganador:Participante;

    constructor(nombre:string, tiempo:string,longitud:number){
        
        this.nombre = nombre;
        this.tiempo = tiempo;
        this.particpantes = [];
        this.ganador = new Participante('','',0,0);

        if(longitud>=100 && longitud<=1000){

            this.longitud = longitud;

        }else{

            console.log('Longitud incorrecta');

        }

    }
    restart(){

        this.ganador = new Participante('','',0,0);
        this.particpantes = [];

    }

    addParticipante(participante:Participante){
        
        var exist = false;

        for(let key in this.particpantes){
            if(this.particpantes[key].nombre == participante.nombre){
                exist = true;
                break;
            }
        }

        if(!exist){

            this.particpantes.push(participante);

        }else{
            console.log('Ya esta registrado');
        }


    }

}

class Participante{

    nombre:string;
    traccion:string;
    velocidadMax:number;
    velocidadMin:number;
    posicion:number;

    constructor(nombre:string,traccion:string,velocidadmax:number,velocidadmin:number){
        
        this.nombre = nombre;
        this.traccion = traccion;
        this.posicion = 0;
        
        if(velocidadmax >= 5 && velocidadmax <=15){
            this.velocidadMax = velocidadmax;
        }
        if(velocidadmin >= 5 && velocidadmax>velocidadmin){
            this.velocidadMin = velocidadmin;
        }

    }

    setPosicion(posicion:number){

        this.posicion = this.posicion + posicion;

    }

    clearPosicion(){

        this.posicion = 0;

    }

    
}

var arrayParticipantes = Array<Participante>();
var arrayCarreras = Array<Carrera>();

let btnRegisterParticipante = <HTMLElement>document.getElementById("registrarParticipante");
let btnCrearCarrera = <HTMLElement>document.getElementById("crearCarrera");

btnRegisterParticipante.addEventListener('click',registerParticipante,false);
btnCrearCarrera.addEventListener('click',crearCarrera,false);

function registerParticipante(){

    let inputnombre:HTMLInputElement = <HTMLInputElement>document.getElementById('nombreP');
    let inputtraccion:HTMLInputElement = <HTMLInputElement>document.getElementById('traccion');
    let inputmin:HTMLInputElement = <HTMLInputElement>document.getElementById('min');
    let inputmax:HTMLInputElement = <HTMLInputElement>document.getElementById('max');
    
    if(inputmax.value != '' && inputnombre.value != '' && inputmin.value != '' && inputtraccion.value !=''){
        
        let participante = new Participante(inputnombre.value,inputtraccion.value,parseInt(inputmax.value),parseInt(inputmin.value));

        arrayParticipantes.push(participante);

        addSelectParticipante(participante.nombre);

        inputmax.value = '15';
        inputmin.value = '5';
        inputnombre.value = '';
    

    }else{

        console.log('Completar Registro');

    }

}

function crearCarrera(){

    let inputnombre:HTMLInputElement = <HTMLInputElement>document.getElementById('nombreC');
    let inputtiempo:HTMLInputElement = <HTMLInputElement>document.getElementById('tiempo');
    let inputlongitud:HTMLInputElement = <HTMLInputElement>document.getElementById('longitud');
    
    if(inputtiempo.value != '' && inputnombre.value != '' && inputlongitud.value !=''){
        
        let carrera = new Carrera(inputnombre.value,inputtiempo.value,parseInt(inputlongitud.value));

        arrayCarreras.push(carrera);

        inputlongitud.value = '100';
        inputnombre.value = '';
        
        addSelectCarrera(carrera.nombre);
        addSelectCarreras(carrera.nombre);


    }else{

        console.log('Completar campos Carrera');

    }

}

function addSelectCarrera(nombre:string){

    var selectCarrera:HTMLSelectElement = <HTMLSelectElement>document.getElementById('select-carrera');
    
    var option = document.createElement('option');
    option.value = nombre;
    option.text = nombre;
    
    selectCarrera.add(option);
}
function addSelectCarreras(nombre:string){

    var selectCarreras:HTMLSelectElement = <HTMLSelectElement>document.getElementById('select-carreras');
    
    var option = document.createElement('option');
    option.value = nombre;
    option.text = nombre;
    
    selectCarreras.add(option);
}

function addSelectParticipante(nombre:string){

    var selectCarrera:HTMLSelectElement = <HTMLSelectElement>document.getElementById('select-participante');
    
    var option = document.createElement('option');
    option.value = nombre;
    option.text = nombre;
    
    selectCarrera.add(option);
}

let btnAsignarParticipante = <HTMLElement>document.getElementById("asignarParticpante");

btnAsignarParticipante.addEventListener('click',asignarParticpante,false);


function asignarParticpante(){

    let inputparticipante:HTMLInputElement = <HTMLInputElement>document.getElementById('select-participante');
    let inputcarrera:HTMLInputElement = <HTMLInputElement>document.getElementById('select-carrera');

    for(let keyC in arrayCarreras){

        if(arrayCarreras[keyC].nombre === inputcarrera.value){

            for(let keyP in arrayParticipantes){

                if(arrayParticipantes[keyP].nombre === inputparticipante.value){

                    arrayCarreras[keyC].addParticipante(arrayParticipantes[keyP]);

                }
            }
        }
    }

}

let btnEmpezarCarrera= <HTMLElement>document.getElementById("empezarCarrera");

btnEmpezarCarrera.addEventListener('click',empezarCarrera,false);

var interval;

function empezarCarrera(){

    let inputcarrera:HTMLInputElement = <HTMLInputElement>document.getElementById('select-carreras');
    
    var carrera = _buscarCarrera(inputcarrera.value);

    interval = window.setInterval(function(){
        _simulacionCarrera(carrera);
    },500);
    
}

function _buscarCarrera(nombre:string){

    for(let key in arrayCarreras){

        if(arrayCarreras[key].nombre === nombre){

            return arrayCarreras[key];

        }
    }

}

function _simulacionCarrera(carrera:Carrera){

    for(let key in carrera.particpantes){

        let posicion = _velocidad(carrera.particpantes[key].velocidadMax,carrera.particpantes[key].velocidadMin)+_checkTraccion(carrera.particpantes[key].traccion,carrera.tiempo);

        carrera.particpantes[key].setPosicion(posicion);

        console.log(carrera.particpantes[key].posicion);

        if(carrera.ganador.posicion < carrera.particpantes[key].posicion){

            carrera.ganador = carrera.particpantes[key];

        }

    }

    if(carrera.ganador.posicion >= carrera.longitud){

        console.log(carrera.ganador.nombre+' ha ganado la carrera');

        carrera.restart();

        clearInterval(interval);


    }
}

function _velocidad(max:number,min:number){

   return Math.random() * (max - min) + min;

}

function _checkTraccion(traccion:string, tiempo:string){

    switch(traccion){
        case 'mediana':
            if(tiempo === 'humedo'){
                return 4;
            }else{
                return 1;
            }

        case 'blanda':
            if(tiempo === 'lluvioso'){
                return 5;
            }else if(tiempo === 'humedo'){
                return 1;
            }else{
                return -2;
            }

        case 'dura':
            if(tiempo === 'seco'){
                return 5;
            }else if(tiempo === 'humedo'){
                return 1;
            }else{
                return -2;
            }
    }
}

