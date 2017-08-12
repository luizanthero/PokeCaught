function Pokemon(img) {
    /** Atributos **/

    // Criação da Imagem
    this.srcX = this.srcY = 0;
    this.width = 32;
    this.height = 32;
    this.img = img;

    // Posição do pokemon
    this.posX = this.posY = 0;

    // Movimento e Velocidade do pokemon
    this.mvRight = this.mvLeft = this.mvUp = this.mvDown = false;
    this.speed = 2;

    // Contador de animação
    this.count = 10;

    /** Métodos **/

    // Desenhar o pokemon
    this.draw = function (ctx) {
        ctx.drawImage(this.img, this.srcX, this.srcY, this.width, this.height, this.posX, this.posY, this.width, this.height);
        this.animation();
    }

    // Mover o pokemon
    this.move = function (canvas) {
        if (this.mvRight) {
            this.posX += this.speed;
            // Se chegar no fim do mapa volta no começo
            if (this.posX > canvas.width) {
                this.posX = -32;
            }
            this.srcY = this.height * 2;
        }
        if (this.mvLeft) {
            this.posX -= this.speed;
            // Se chegar no começo do mapa vai para o fim
            if (this.posX < -32) {
                this.posX = canvas.width;
            }
            this.srcY = this.height * 1;
        }
        if (this.mvUp) {
            this.posY -= this.speed;
            // Se chegar no topo do mapa volta pra baixo
            if (this.posY < -32) {
                this.posY = canvas.height;
            }
            this.srcY = this.height * 3;
        }
        if (this.mvDown) {
            this.posY += this.speed;
            // Se chegar em baixo do mapa volta para cima
            if (this.posY > canvas.height) {
                this.posY = -32;
            }
            this.srcY = this.height * 0;
        }
    }

    // Animar o pokemon
    this.animation = function () {
        if (this.mvRight || this.mvLeft || this.mvUp || this.mvDown) {
            this.count++;

            // Faz loop na animação
            if (this.count >= 40) {
                this.count = 10;
            }

            // Faz a transição de imagem a cada 10 atualizações
            this.srcX = Math.floor(this.count / 10) * this.width;
        } else {
            this.srcX = 0;
        }
    }
}
