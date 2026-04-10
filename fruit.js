export class Fruit {
    constructor(posX, posY, width, height) {
        this.fruit = document.createElement("div");
        this.fruit.className = "fruit";
        this.fruit.style.position = "absolute";
        this.fruit.style.textAlign = "center";
        this.fruit.style.left = posX + "px";
        this.fruit.style.top = posY + "px";
        this.fruit.style.width = width + "px";
        this.fruit.style.height = height + "px";
        this.fruit.style.backgroundPosition = "center";
        this.fruit.style.backgroundImage = `url("img/fruit_sprite.svg")`;
        this.fruit.style.backgroundRepeat = "no-repeat";
        this.fruit.style.backgroundSize = "contain";
    }

    removeFruit() {
        this.fruit.remove();
    }
}