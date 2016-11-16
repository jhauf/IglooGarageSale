import Game from './game';


document.getElementById("Start").addEventListener("click", function(){
    Game();
});

document.getElementById("Stop").addEventListener("click", function(){
    document.location.reload();
});
