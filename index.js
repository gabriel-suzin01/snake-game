import { Fruit } from './fruit.js';
import { Snake } from './snake.js';

const MAIN_CONTAINER = document.getElementById('main-container');
const PART_SIZE = 40; // 40px

function generateFruit() {
    const randomPosX = Math.floor(Math.random() * window.innerWidth);
    const randomPosY = Math.floor(Math.random() * window.innerHeight);

    window.fruitClass = new Fruit(randomPosX, randomPosY, PART_SIZE, PART_SIZE);
    window.fruitElement = window.fruitClass.fruit

    MAIN_CONTAINER.appendChild(window.fruitElement);
}

function checkCollision() {
    const fruitRect = getBoundingClientRect(window.fruitElement);
    const snakeRect = getBoundingClientRect(window.snakeHeadElement);

    return !(
        fruitRect.right < snakeRect.left ||
        fruitRect.left > snakeRect.right ||
        fruitRect.bottom < snakeRect.top ||
        fruitRect.top > snakeRect.bottom
    );
}

function snakeMovement() {
    window.snakeClass = new Snake(0, 0);
    window.snakeHeadElement = window.snakeClass.getSnakeHead(PART_SIZE, PART_SIZE);
    window.snakePositions = window.snakeClass.snakePositions;

    MAIN_CONTAINER.appendChild(window.snakeHeadElement);

    window.pressedKey = 'w';
    window.blockedKey = 's';

    document.addEventListener('keydown', (event) => {
        if (['w', 'a', 's', 'd'].includes(event.key)) {
            if (window.blockedKey === event.key) return;
            
            window.pressedKey = event.key;
        }
    });

    const step = 1;
    let factor = 1;
    let rotation = 0;

    function updateMove() {

        switch(window.pressedKey) {
            case 'w':
                window.blockedKey = 's';

                factor = -1;
                window.snakePositions[0].y += (factor * step);
                rotation = 0;

                break;
            case 'a':
                window.blockedKey = 'd';

                factor = -1;
                window.snakePositions[0].x += (factor * step);
                rotation = 270;

                break;
            case 's':
                window.blockedKey = 'w';

                factor = 1;
                window.snakePositions[0].y += (factor * step);
                rotation = 180;

                break;
            case 'd':
                window.blockedKey = 'a';

                factor = 1;
                window.snakePositions[0].x += (factor * step);
                rotation = 90;

                break;
            default:
                break;
        }

        if (isValidPosition() === true) {
            window.snakeHeadElement.style.transform = `translate(${window.snakePositions[0].x}px, ${window.snakePositions[0].y}px) rotateZ(${rotation}deg)`;

            requestAnimationFrame(updateMove);
        }
        else {
            window.snakeHeadElement.style.backgroundImage = `url("img/snake_head_dead_sprite.svg")`;
            
            setTimeout(() => {
                alert('Você perdeu!');
    
                window.snakeClass.removeSnake();
                window.fruitClass.removeFruit();
    
                handler();
            }, 10);
        }
    }

    updateMove();
}

function isValidPosition() {
    const clampedPosX = Math.abs(window.snakePositions[0].x);
    const clampedPosY = Math.abs(window.snakePositions[0].y);

    const screenX = Math.floor(window.innerWidth / 2) - Math.floor(window.snakeHeadElement.offsetWidth / 2);
    const screenY = Math.floor(window.innerHeight / 2) - Math.floor(window.snakeHeadElement.offsetHeight / 2);

    if (clampedPosX >= screenX) return false;
    if (clampedPosY >= screenY) return false;

    return true;
}

function handler() {
    snakeMovement();
    generateFruit();
}

document.addEventListener('DOMContentLoaded', () => {
    handler();
});