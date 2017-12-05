(function(){

const startMenu = {
    display: false,
    init: function() {
        this.cacheDom();
        this.bindEvents();
        this.nameInput.focus();
        //init pvp input so a choice is always checked.
        this.pvpInput.checked = true;
        
    },
    cacheDom: function() {
        this.el = document.getElementById('start');
        this.setupForm = document.getElementById('gameSetup');
        this.nameInput = document.getElementById('nameInput');
        this.pvpInput = document.getElementById('pvpInput');
        this.pvcInput = document.getElementById('pvcInput');
        this.button = this.el.getElementsByTagName('a')[0];
    },
    bindEvents: function() {
        this.button.addEventListener('click', () => {
            this.prompt();
            //Intializes the 'game board'
            if(startMenu.checkName()){
                this.hideMenu();
                this.display = true;
                player.init();
                player.setName();
                board.init();    
            }
        });
    },
    pvp: function() {
        //Run player vs. player
        console.log('running PVP');
        
    },
    pvc: function() {
        //Run player vs. computer
        console.log('running PVC }:]');
        board.pvc = true;
    },
    prompt: function() {
        if(this.pvpInput.checked === true){
            this.pvp();    
        }else if(this.pvcInput.checked === true){
            this.pvc();
        }
        player.name = this.nameInput.value;
    },
    checkName: function() {
        //checks if valid name is entered in input field
        if(this.nameInput.value === ''){
            this.nameInput.focus();
            this.nameInput.style.borderColor = 'red';
            return false;
        }else if(player.name.length > 20){
            player.name = '';
            this.nameInput.value = '';
            this.nameInput.setAttribute('placeholder', 'Please enter shorter name');
            return false;
        }else{
            return true;
        }    
    },
    hideMenu: function() {
        this.el.className = 'hidden';
    }
};

const endMenu = {
    init: function() {
        this.cacheDom();
        this.bindEvents();
    },
    cacheDom: function() {
        this.el = document.getElementById('finish');
        this.message = document.getElementsByClassName('message')[0];
        this.button = this.el.getElementsByTagName('a')[0];
        
    },
    bindEvents: function() {
        this.button.addEventListener('click', () => {
            this.hideMenu();
            //reintializes the 'game board'
            board.reset();
        });
    },
    winner: function(winner) {
        if(winner === 'o'){
            this.message.innerHTML = 'Winner';
            this.el.className = 'screen screen-win screen-win-one'; 
            this.setName();
        }else if(winner === 'x'){
            this.message.innerHTML = 'Winner';
            this.el.className = 'screen screen-win screen-win-two';    
        }else if(winner === 'tie'){
            this.message.innerHTML = "It's a tie!";
            this.el.className = 'screen screen-win screen-win-tie';    
        }
                
    },
    setName: function() {
        //winning name on winning screen
        this.nameDivEnd = document.createElement('h2');
        this.endMenuChildren = this.button;
        this.nameDivEnd.className = 'userName';
        this.nameDivEnd.textContent = player.name; 
        this.el.children[0].insertBefore(this.nameDivEnd, this.endMenuChildren);
    },
    hideMenu: function() {
        this.el.className = 'hidden';
    }
};

const player = {
    name:'',
    num: 1,
    logo: 'url("img/o.svg")',
    init: function() {
        this.cacheDom();
        this.setLogo();
        this.selected();
    },
    deInit: function() {
        this.cacheDom();
        this.setLogo();
        this.deSelected();
    },
    setLogo: function(){
        if(this.num === 1){
            this.logo = 'url("img/o.svg")'; 
        }else if(this.num === 2){
            this.logo = 'url("img/x.svg")';    
        } 
    },
    setName: function() {
        //under player name
        this.nameDiv = document.createElement('h2');
        this.nameDiv.className = 'userName';
        this.nameDiv.textContent = this.name;
        this.elPlayer.appendChild(this.nameDiv);
    },
    removeName: function() {
        if(document.getElementsByClassName('userName')[1]){
            const nameDiv = document.getElementsByClassName('userName');
            nameDiv[1].parentNode.removeChild(nameDiv[1]);
        }
    },
    cacheDom: function() {
        //cache dom
        this.elPlayer = document.getElementById('player' + this.num);
    },
    create: function(num) {
        const player = Object.create(this);
        player.num = num;
        return player;
    },
    selected: function() {
        //change class to selected
        this.elPlayer.className = 'players active';
    },
    deSelected: function() {
        this.elPlayer.className = 'players';
    }
};

//Creates opponent objects
const player2 = player.create(2);
const computer = player.create(2);

computer.move = function() {
    //uses simpleAi function to get 
    let box = document.getElementsByClassName('box');
    let boardLoc = computer.simpleAi(board.boardState);
    if(Number.isInteger(boardLoc)){
        box[boardLoc].className = 'box box-filled-2';   
    }
    
    computer.deSelected();
    player.init();
}

computer.simpleAi = function(gameState) {
    /*Simple Ai*/ //Finds all empty spots and chooses one randomly   
    let emptySpots = [];    
    for(let i = 0; i < gameState.length; i++){
        if(gameState[i] === 'empty[]'){
            emptySpots.push(i);
        }
    }
    let playerLoc = emptySpots[Math.floor(Math.random() * emptySpots.length)];
    return playerLoc;    
    
};  
    
// NON-WORKING mininmax function (atm) 
//computer.minimax = function(newState, depth, player) {
//    //find empty spots
//    let emptySpots = [];
//    for(let i = 0; i < newState.length; i++){
//        if(newState[i] === 'empty[]'){
//            emptySpots.push(i);
//        }
//    }
//    if(board.checkWin(newState) === 'o'){
////        console.log('Winning state of o: ' + newState);
//        return {score: depth - 10};
//    }else if(board.checkWin(newState) === 'x'){
////        console.log('Winning state of x: ' + newState);
//        return {score: 10 - depth};
//    }else if(emptySpots.length === 0){
//        return {score: 0};
//    }
//    let moves = [];
//    for(let i = 0; i < newState.length; i++) {
////        if(newState[i] === 'empty[]'){
//            var move = {};
//            move.index = emptySpots[i];
//            let stateCopy = newState;
//            stateCopy[emptySpots[i]] = player;
//
//            console.log(stateCopy);
//            if(player === 'x'){
//    //            move.depth = depth;
//    //            move.player = player;
//    //            move.gameState = stateCopy;
//                let result = computer.minimax(stateCopy, depth + 1, 'o');
//                move.score = result.score;
//            }else{
//    //            move.depth = depth;
//    //            move.player = player;
//    //            move.gameState = stateCopy;
//                let result = computer.minimax(stateCopy, depth + 1, 'x');
//                move.score = result.score; 
//            }
//    //        emptySpots[i] = move.index;
//            moves.push(move);   
//            console.log(moves[i]);
//        }
////    }
//    let bestMove;
//    if(player === 'x'){
//        let bestScore = -10000;
//        for(let i = 0; i < moves.length; i++){
//            if(moves[i].score > bestScore) {
//                bestScore = moves[i].score;
//                bestMove = i;
////                console.log('max: ' + moves[i].score);
//            }
//        }
//    }else{
//        let bestScore = 10000;
//        for(let i = 0; i < moves.length; i++){
//            if(moves[i].score < bestScore) {
//                bestScore = moves[i].score;
//                bestMove = i;
////                console.log('min: ' + moves[i].score);
//            }       
//        }
//    }
////    console.log(moves);
//    return moves[bestMove];
//};


const board = {
    winningCombos:[
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,7],
    ],
    playerCombo: [],
    boardState: [],
    pvc: false,
    init: function() {
        this.cacheDom();
        this.bindEvents();
        this.reveal();
        endMenu.init();
    },
    cacheDom: function() {
        this.gameBoard = document.getElementsByClassName('board')[0];
        this.box = this.gameBoard.getElementsByClassName('box');
        this.boxes = this.gameBoard.getElementsByClassName('boxes')[0];    
    },
    bindEvents: function() {
        this.boxes.addEventListener('mouseover', this.mouseOver);
        this.boxes.addEventListener('mouseout', this.mouseOut);
        this.boxes.addEventListener('click', this.selected);
    }, 
    updateBoardState: function() {
        this.boardState = [];
        for(let i = 0; i < this.box.length; i++){
            if(this.box[i].className === 'box box-filled-1'){
                this.boardState.push('o');
            }else if(this.box[i].className === 'box box-filled-2'){
                this.boardState.push('x');
            }else{
                this.boardState.push('empty[]');    
            }  
        }
//        console.log(this.boardState);
    },
    checkWin: function() {
        //Checks board state for winning combos. 
        //cycles thru winning combos array
        for(let i = 0; i < this.winningCombos.length; i++){
            //cycles thru the arrays inside winning combos array
            for(let j = 0; j < this.winningCombos[i].length; j++){
                //pushes 3 values to player combo from the boardState array
                // which location is determined by looping over winning combos
                this.playerCombo.push(this.boardState[this.winningCombos[i][j] - 1]); 
            }
            if(this.playerCombo.every(el => el === 'x')){
                return 'x';
            }else if(this.playerCombo.every(el => el === 'o' )){
                return 'o';
            }
            this.playerCombo = [];
        }
        if(this.boardState.every(el => el !== 'empty[]')){
                return 'tie';
        }
    },
    displayEndMenu: function(player) {
        //based on input from checkWin function, the corresponding end menu will display 
        if(player === 'x'){
            endMenu.winner(player);
            this.hide();    
        }else if(player === 'o'){
            endMenu.winner(player);
            this.hide();
        }else if(player === 'tie'){
            endMenu.winner(player);
            this.hide();
        } 
        return null;
    },
    //mouseOver and mouseOut display the player's logo when cursor hovers over empty box
    mouseOver: function(e) {
        let event = e.target;
        if(event.className.substring(4,14) !== 'box-filled'){
            if(player.elPlayer.className === 'players active'){
                event.setAttribute('style', 'background-image:' + player.logo);    
            }else{
                event.setAttribute('style', 'background-image:' + player2.logo);
            }
            
        }
    },
    mouseOut: function(e) {
        let event = e.target;
        if(event.className.substring(4,14) !== 'box-filled'){
            event.removeAttribute('style', 'background-image');
        }
    },
    selected: function(e) {
        let event = e.target;
        if(event.className.substring(4,14) !== 'box-filled'){
            if(board.pvc){
                //player vs computer
                if(player.elPlayer.className === 'players active'){
                    event.className = 'box box-filled-' + player.num;
                    board.updateBoardState();
                    board.displayEndMenu(board.checkWin());
                    player.deSelected();
                }
                if(board.checkWin() !== 'o'){
                    board.gameBoard.style.pointerEvents = 'none';
                    setTimeout(function(){
                        computer.move();
                        board.updateBoardState();
                        board.displayEndMenu(board.checkWin());
                        board.gameBoard.style.pointerEvents = 'auto';
                    }, 500); 
                    computer.init();
                }                    
                     
            }else if(!board.pvc){
                //Player vs player 
                if(player.elPlayer.className === 'players active'){
                    event.className = 'box box-filled-' + player.num;
                    player2.init();
                    player.deSelected();
                }else{
                    event.className = 'box box-filled-' + player2.num;
                    player.init();
                    player2.deSelected();
                } 
                board.updateBoardState();
                 board.displayEndMenu(board.checkWin());
            }
            
        }
    },
    reset: function() {
        //Resets the game board 
        for(let i = 0; i < this.box.length; i++){
            this.box[i].className = 'box';
            this.box[i].removeAttribute('style', 'background-image');
        };
        this.boardState = [];
        this.reveal();
        player.init();
        player2.deInit();
        player.removeName();
    },
    reveal: function() {
        this.gameBoard.className = 'board';    
    },
    hide: function() {
        this.gameBoard.className = 'hidden';    
    }
};

startMenu.init();
    


})();
















