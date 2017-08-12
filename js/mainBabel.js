window.onload = function () {
    // Variavel de escolha de personagem
    // Pega o parametro esta vindo pela url
    let query = location.search.slice(1);
    // Separa o valor da variavel
    let partes = query.split('=');
    // Salava o valor
    let char = partes[1];

    // Variavel de contagem de pokemons pegos
    let pokeCount = 0;

    // Colocando imagem sem ser gif
    let scene = new Image();
    scene.src = '../img/map.png';

    // KeyCode das teclas do teclado
    const left = 37,
        up = 38,
        right = 39,
        down = 40;
    const leftL = 65,
        upL = 87,
        rightL = 68,
        downL = 83;

    // Pega o elemento canvas do index e depois seu contexto
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');

    // Armazena a imagem do personagem
    let imgSheet = new Image();
    if (char === 'boy') {
        imgSheet.src = '../img/Character/boy.png';
    } else if (char === 'girl') {
        imgSheet.src = '../img/Character/girl.png';
    }

    // Cria o nosso objeto character
    let character = new Character(imgSheet);

    // Armazena a imagem do pokemon
    let pokeSheet = new Image();
    let pokemon = 0;
    let namePoke = {};
    let i = 0;
    namePoke[i] = changePoke();

    pokeSheet.onload = function () {
        init();
    }

    imgSheet.onload = function () {
        init();
    }

    // Metodo do interação do user com o character
    window.addEventListener('keydown', keydownHandler, false);
    window.addEventListener('keyup', keyupHandler, false);

    // Parar o personagem
    function keyupHandler(e) {
        switch (e.keyCode) {
            // Movimento para a direta
            case right:
                character.mvRight = false;

                // Movimento do pokemon para baixo
                pokemon.mvDown = false;
                break;
            case rightL:
                character.mvRight = false;

                // Movimento do pokemon para baixo
                pokemon.mvDown = false;
                break;

                // Movimento para a esquerda
            case left:
                character.mvLeft = false;

                // Movimento do pokemon para cima
                pokemon.mvUp = false;
                break;
            case leftL:
                character.mvLeft = false;

                // Movimento do pokemon para cima
                pokemon.mvUp = false;
                break;

                // Movimento para cima
            case up:
                character.mvUp = false;

                // Movimento do pokemon para a direita
                pokemon.mvRight = false;
                break;
            case upL:
                character.mvUp = false;

                // Movimento do pokemon para a direita
                pokemon.mvRight = false;
                break;

                // Movimento para baixo
            case down:
                character.mvDown = false;

                // Movimento do pokemon para esquerda
                pokemon.mvLeft = false;
                break;
            case downL:
                character.mvDown = false;

                // Movimento do pokemon para esquerda
                pokemon.mvLeft = false;
                break;
        }
    }

    // Mover o personagem
    function keydownHandler(e) {
        switch (e.keyCode) {
            // Movimento para a direita
            case right:
                character.mvRight = true;
                character.mvLeft = false;
                character.mvUp = false;
                character.mvDown = false;

                // Movimento do pokemon para baixo
                pokemon.mvRight = false;
                pokemon.mvLeft = false;
                pokemon.mvUp = false;
                pokemon.mvDown = true;
                break;
            case rightL:
                character.mvRight = true;
                character.mvLeft = false;
                character.mvUp = false;
                character.mvDown = false;

                // Movimento do pokemon para baixo
                pokemon.mvRight = false;
                pokemon.mvLeft = false;
                pokemon.mvUp = false;
                pokemon.mvDown = true;
                break;

                // Movimento para a esquerda
            case left:
                character.mvRight = false;
                character.mvLeft = true;
                character.mvUp = false;
                character.mvDown = false;

                // Movimento do pokemon para cima
                pokemon.mvRight = false;
                pokemon.mvLeft = false;
                pokemon.mvUp = true;
                pokemon.mvDown = false;
                break;
            case leftL:
                character.mvRight = false;
                character.mvLeft = true;
                character.mvUp = false;
                character.mvDown = false;

                // Movimento do pokemon para cima
                pokemon.mvRight = false;
                pokemon.mvLeft = false;
                pokemon.mvUp = true;
                pokemon.mvDown = false;
                break;

                // Movimento para cima
            case up:
                character.mvRight = false;
                character.mvLeft = false;
                character.mvUp = true;
                character.mvDown = false;

                // Movimento do pokemon para a direita
                pokemon.mvRight = true;
                pokemon.mvLeft = false;
                pokemon.mvUp = false;
                pokemon.mvDown = false;
                break;
            case upL:
                character.mvRight = false;
                character.mvLeft = false;
                character.mvUp = true;
                character.mvDown = false;

                // Movimento do pokemon para a direita
                pokemon.mvRight = true;
                pokemon.mvLeft = false;
                pokemon.mvUp = false;
                pokemon.mvDown = false;
                break;

                // Movimento para baixo
            case down:
                character.mvRight = false;
                character.mvLeft = false;
                character.mvUp = false;
                character.mvDown = true;

                // Movimento do pokemon para esquerda
                pokemon.mvRight = false;
                pokemon.mvLeft = true;
                pokemon.mvUp = false;
                pokemon.mvDown = false;
                break;
            case downL:
                character.mvRight = false;
                character.mvLeft = false;
                character.mvUp = false;
                character.mvDown = true;

                // Movimento do pokemon para esquerda
                pokemon.mvRight = false;
                pokemon.mvLeft = true;
                pokemon.mvUp = false;
                pokemon.mvDown = false;
                break;
        }
    }

    // Reseta o jogo quando pega o monstro
    const reset = function () {        
        // Alert de captura de pokemon
        bootbox.alert('Você pegou um ' + namePoke[i] + '!');
        $('#abrir').click(function (event) {
            bootbox.alert('Você pegou um pokemon!', function () {
                bootbox.alert('Você pegou um pokemon!');
            });
        }); 
        
        i++;
        
        // Posição do personagem no meio do mapa
        character.posX = canvas.width / 2;
        character.posY = canvas.height / 2;

        // Altera o pokemon e salva seu nome
        namePoke[i] = changePoke();
        
        console.log(i);

        // Posição do pokemon randomicamente no mapa
        pokemon.posX = (Math.random() * (448 - 64)) + 64;
        pokemon.posY = (Math.random() * (416 - 64)) + 64;
    };

    // Altera o pokemon
    function changePoke () {
        let pokeRandom = (Math.random() * (9 - 1)) + 1;
        let aux = pokeRandom.toFixed();
        if (aux == 1) {
            pokeSheet.src = '../img/Pokemon/alolan-exeggutor.png';
            pokemon = new Pokemon(pokeSheet);
            return 'Alolan Exeggutor';
        }
        if (aux == 2) {
            pokeSheet.src = '../img/Pokemon/alolan-meowth.png';
            pokemon = new Pokemon(pokeSheet);
            return 'Alolan Meowth';
        }
        if (aux == 3) {
            pokeSheet.src = '../img/Pokemon/alolan-raichu.png';
            pokemon = new Pokemon(pokeSheet);
            return 'Alolan Raichu';
        }
        if (aux == 4) {
            pokeSheet.src = '../img/Pokemon/bulbasaur.png';
            pokemon = new Pokemon(pokeSheet);
            return 'Bulbasaur';
        }
        if (aux == 5) {
            pokeSheet.src = '../img/Pokemon/hoopa.png';
            pokemon = new Pokemon(pokeSheet);
            return 'Hoopa';
        }
        if (aux == 6) {
            pokeSheet.src = '../img/Pokemon/landorus.png';
            pokemon = new Pokemon(pokeSheet);
            return 'Landorus';
        }
        if (aux == 7) {
            pokeSheet.src = '../img/Pokemon/pikachu.png';
            pokemon = new Pokemon(pokeSheet);
            return 'Pikachu';
        }
        if (aux == 8) {
            pokeSheet.src = '../img/Pokemon/shiny-helioptile.png';
            pokemon = new Pokemon(pokeSheet);
            return 'Shiny Heliptile';
        }
        if (aux == 9) {
            pokeSheet.src = '../img/Pokemon/talonflame.png';
            pokemon = new Pokemon(pokeSheet);
            return 'Talonflame';
        }
    };

    // Inicia o jogo
    function init() {
        // Posição do personagem no meio do mapa
        character.posX = canvas.width / 2;
        character.posY = canvas.height / 2;

        // Posição do pokemon randomicamente no mapa
        pokemon.posX = (Math.random() * (448 - 64)) + 64;
        pokemon.posY = (Math.random() * (416 - 64)) + 64;

        loop();
    }

    // Atualiza o jogo
    function update() {
        character.move(canvas);
        pokemon.move(canvas);

        // Os personagens se encontraram?
        if (character.posX <= (pokemon.posX + 15) && pokemon.posX <= (character.posX + 15) && character.posY <= (pokemon.posY + 15) && pokemon.posY <= (character.posY + 15)) {
            ++pokeCount;
            reset();
        }
    }

    // Desenha os objetos no jogo
    function draw() {
        // Desenha o cenário
        ctx.drawImage(scene, 0, 0, scene.width, scene.height, 0, 0, canvas.width, canvas.height);
        // Desenha o personagem
        character.draw(ctx);
        // Desenha o pokemon
        pokemon.draw(ctx);

        // Pontuação
        ctx.fillStyle = 'rgb(250, 250, 250)';
        ctx.font = '24px Helvetica';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText('Pokemons pegos: ' + pokeCount, 32, 32);
    }

    // Roda o jogo
    function loop() {
        window.requestAnimationFrame(loop, canvas);
        update();
        draw();
    }
}
