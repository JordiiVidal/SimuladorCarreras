
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

        if(longitud>=100 && longitud<=1000){

            this.longitud = longitud;

        }else{

            console.log('Longitud incorrecta');

        }

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

    constructor(nombre:string,traccion:string,velocidadmax:number,velocidadmin:number){
        
        this.nombre = nombre;
        this.traccion = traccion;
        
        if(velocidadmax >= 5 && velocidadmax <=15){
            this.velocidadMax = velocidadmax;
        }
        if(velocidadmin >= 5 && velocidadmax>velocidadmin){
            this.velocidadMin = velocidadmin;
        }

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
    let inputmax:HTMLInputElement = <HTMLInputElement>document.getElementById('min');
    let inputmin:HTMLInputElement = <HTMLInputElement>document.getElementById('max');
    
    if(inputmax.value != '' && inputnombre.value != '' && inputmin.value != '' && inputtraccion.value !=''){
        
        let participante = new Participante(inputnombre.value,inputtraccion.value,parseInt(inputmax.value),parseInt(inputmin.value));

        arrayParticipantes.push(participante);

        inputmax.value = '15';
        inputmin.value = '5';
        inputnombre.value = '';

        addSelectParticipante(participante.nombre);
        
    

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

        console.log('Carrera Creada');

    }else{

        console.log('Completar campos Carrera');

    }

}

function addSelectCarrera(nombre:string){

    var selectCarrera:HTMLSelectElement = <HTMLSelectElement>document.getElementById('select-carrera');
    var selectCarreras:HTMLSelectElement = <HTMLSelectElement>document.getElementById('select-carreras');
    
    var option = document.createElement('option');
    option.value = nombre;
    option.text = nombre;
    
    selectCarrera.add(option);
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

function empezarCarrera(){
    
}

