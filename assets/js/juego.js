let deck = [];
let tipos = ['C', 'D', 'H', 'S'];
let especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora = 0;

//Referencias HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

// Esta funcion crea una nueva baraja
const crearDeck = () => {

    for(let i=2; i <= 10; i++){
        for(let tipo of tipos){
            deck.push( i + tipo);
        }    
    }

    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push( esp + tipo);
        }    
    }

    deck = _.shuffle( deck );
    return deck;
}

crearDeck();

//Esta función me permite pedir una carta
const pedirCarta = ()=> {

    if(deck.length === 0){
        throw 'No hay cartas en el deck'
    } 
    const carta = deck.pop();
    return carta;
}

const valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length -1);
    return ( isNaN( valor ) ) ?
           ( valor === 'A') ? 11 : 10 
           : valor * 1 ;

}

//turno Computadora
const turnoComputadora = ( puntoMinimos ) => {

    do {
    const carta = pedirCarta();
    puntosComputadora = puntosComputadora + valorCarta( carta );
    puntosHTML[1].innerText = puntosComputadora;
    
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasComputadora.append( imgCarta );
    
    if(puntoMinimos > 21){
        break;
    }

    } while( (puntosComputadora < puntoMinimos) && (puntoMinimos <= 21));  

    setTimeout(() => {
        
        if( puntosComputadora === puntoMinimos ) {
            alert('Nadie gana :(');
        } else if( puntosJugador > 21 ) {
            alert('La computadora gana');
        } else if(puntosJugador > 21){
            alert('El jugador gana');
        } 

    }, 10);
        

}

//Eventos
btnPedir.addEventListener('click', () =>  {
   const carta = pedirCarta();
  
   puntosJugador = puntosJugador + valorCarta( carta );
   puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    if( puntosJugador > 21 ){
        console.warn('Lo siento, perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    } else if ( puntosJugador === 21){
        console.warn( '21, genial' );
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }
});

btnDetener.addEventListener('click', () =>  {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    
    turnoComputadora( puntosJugador );
});


btnNuevo.addEventListener('click', () =>  {
    console.clear();
    deck = [];
    deck = crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';
    
    btnPedir.disabled = false;
    btnDetener.disabled = false;    
});

