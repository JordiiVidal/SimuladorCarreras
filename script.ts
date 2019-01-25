
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
    finalizada:boolean;

    constructor(nombre:string, tiempo:string,longitud:number){
        
        this.nombre = nombre;
        this.tiempo = tiempo;
        this.particpantes = [];
        this.ganador = new Participante('','',0,0);
        this.ganador.addPosicion(this.nombre,0);
        this.finalizada = false;

        if(longitud>=100 && longitud<=1000){

            this.longitud = longitud;

        }else{

            console.log('Longitud incorrecta');

        }

    }

    htmlCarrera(){

        let container = <HTMLElement>document.getElementById("circuito");

        container.innerHTML = "<div class='carrera p-5' id='carrera-"+this.nombre+"'></div>";

    }

    restart(){

        this.ganador = new Participante('','',0,0);

        this.ganador.addPosicion(this.nombre,0);

        this.particpantes = [];

        let container = <HTMLElement>document.getElementById("circuito");

        container.innerHTML = "";

    }

    mostrarGanador(){

        let container = <HTMLElement>document.getElementById("ganador");

        container.innerHTML = "<div class='jumbotron jumbotron-fluid'><div class='container'><h1 class='display-4'>"+this.ganador.nombre+" ha ganado la carrera "+this.nombre+"</h1><p class='lead'>Estado del circuito "+this.tiempo+"</p><p class='lead'>La traccion era "+this.ganador.traccion+"</p></div></div>";

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

            participante.addPosicion(this.nombre,0);
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
    posiciones:Array<any>;
    
    constructor(nombre:string,traccion:string,velocidadmax:number,velocidadmin:number){
        
        this.nombre = nombre;
        this.traccion = traccion;
        this.posiciones = [];
        
        
        if(velocidadmax >= 5 && velocidadmax <=15){
            this.velocidadMax = velocidadmax;
        }
        if(velocidadmin >= 5 && velocidadmax>velocidadmin){
            this.velocidadMin = velocidadmin;
        }

    }

    htmlParticipante(nombreCarrera:string){

        let container = <HTMLElement>document.getElementById("carrera-"+nombreCarrera);

        container.innerHTML += "<div class='carretera m-2 carretera'><div class='coche' id='participante-"+this.nombre+"'><img src='assets/coche.png' style='width: 100%;'></div></div>";

    }

    addPosicion(nombreCarrera:string, posicion:number){

        this.posiciones[nombreCarrera] = posicion;

    }

    setPosicion(nombreCarrera:string, posicion:number){

        this.posiciones[nombreCarrera] += posicion;

    }

    moverParticipante(longitud:number,nombreC:string){

        let participante = <HTMLElement>document.getElementById("participante-"+this.nombre);

        let porcentaje = (this.posiciones[nombreC] * 100) / longitud;

        if(porcentaje > 100){
            participante.style.marginLeft = '100%'; 
        }else{
            participante.style.marginLeft = porcentaje+'%'; 
        }

    }


}

var arrayParticipantes = Array<Participante>();
var arrayCarreras = Array<Carrera>();

let btnRegisterParticipante = <HTMLElement>document.getElementById("registrarParticipante");
let btnCrearCarrera = <HTMLElement>document.getElementById("crearCarrera");

btnRegisterParticipante.addEventListener('click',registerParticipante,false);
btnCrearCarrera.addEventListener('click',crearCarrera,false);

let btnAsignarParticipante = <HTMLElement>document.getElementById("asignarParticpante");

btnAsignarParticipante.addEventListener('click',asignarParticpante,false);

let btnEmpezarCarrera= <HTMLElement>document.getElementById("empezarCarrera");

btnEmpezarCarrera.addEventListener('click',empezarCarrera,false);

var interval;

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

function empezarCarrera(){

    let inputcarrera:HTMLInputElement = <HTMLInputElement>document.getElementById('select-carreras');
    
    let container = <HTMLElement>document.getElementById("ganador");

    container.innerHTML = "";
    
    var carrera = _buscarCarrera(inputcarrera.value);

    carrera.htmlCarrera();

    for(let key in carrera.particpantes){

        carrera.particpantes[key].htmlParticipante(carrera.nombre);

    }

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

    console.log('simulacion');

    if( carrera.particpantes.length > 0){

        for(let key in carrera.particpantes){

            let posicion = _velocidad(carrera.particpantes[key].velocidadMax,carrera.particpantes[key].velocidadMin)+_checkTraccion(carrera.particpantes[key].traccion,carrera.tiempo);

            carrera.particpantes[key].setPosicion(carrera.nombre,posicion);

            carrera.particpantes[key].moverParticipante(carrera.longitud,carrera.nombre);
            
            if(carrera.particpantes[key].posiciones[carrera.nombre] > carrera.ganador.posiciones[carrera.nombre]){
                
                carrera.ganador = carrera.particpantes[key];
    
            }
    
        }
    
        if(carrera.ganador.posiciones[carrera.nombre] >= carrera.longitud){
    
            console.log(carrera.ganador.nombre+' ha ganado la carrera');

            carrera.mostrarGanador();
    
            carrera.restart();
    
            clearInterval(interval);
    
        }
    }else{

        console.log('No hay Participantes');

        clearInterval(interval);

    }
    
}

function _velocidad(max:number,min:number){

   return Math.random() * (max - min) + min;

}

function _checkTraccion(traccion:string, tiempo:string){

    switch(traccion){
        case 'media':
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

