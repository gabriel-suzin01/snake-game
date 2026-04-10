export class Snake {
    constructor(startX, startY) {
        this.snakePositions = [
            {x: startX, y: startY}
        ];
    }

    getSnakeHead(width, height) {
        this.snakeHead = document.createElement("div");
        this.snakeHead.className = "snake-head";
        this.snakeHead.style.position = "relative";
        this.snakeHead.style.width = width + "px";
        this.snakeHead.style.height = height + "px";
        this.snakeHead.style.backgroundImage = `url("img/snake_head_sprite.svg")`;
        this.snakeHead.style.backgroundRepeat = "no-repeat";
        this.snakeHead.style.backgroundSize = "contain";

        return this.snakeHead;
    }

    collectFruit() {
        this.snakePositions.push({x: 0, y: 0});
    }

    removeSnake() {
        this.snakeHead.remove();
    }
}