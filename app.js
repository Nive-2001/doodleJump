document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div');
    let doodlerLeftSpace = 50;
    let startpoint = 150;
    let doodlerBottomSpace = startpoint;
    let isGameOver = false;
    let platformCount = 5;
    let platforms = [];
    let upTimerId
    let downTimerId
    let isJumping = true;
    let isgoingleft = false;
    let isgoingright = false;
    let leftTimerId;
    let rightTimerId;
    let score = 0;



    function createDoodler() {
        grid.appendChild(doodler);
        doodler.classList.add('doodler');
        doodlerLeftSpace = platforms[0].left;
        doodler.style.left = doodlerLeftSpace + 'px';
        doodler.style.bottom = doodlerBottomSpace + 'px';

    }
    class Platform {
        constructor(newPlatBottom) {
            this.bottom = newPlatBottom;
            this.left = Math.random() * 315;
            this.visual = document.createElement('div');

            const visual = this.visual;
            visual.classList.add('platform');
            visual.style.left = this.left + 'px';
            visual.style.bottom = this.bottom + 'px';
            grid.appendChild(visual);
        }
    }

    function createPlatforms() {
        for (let i = 0; i < platformCount; i++) {
            let platformGap = 600 / platformCount;
            let newPlatBottom = 100 + i * platformGap;
            let newPlatform = new Platform(newPlatBottom);
            platforms.push(newPlatform);
            console.log(newPlatform);

        }
    }

    function movePlatforms() {
        if (doodlerBottomSpace > 200) {
            platforms.forEach(platform => {
                platform.bottom -= 4;
                let visual = platform.visual;
                visual.style.bottom = platform.bottom + 'px';

                if (platform.bottom < 10) {
                    let firstPlatform = platforms[0].visual;
                    firstPlatform.classList.remove('platform');
                    platforms.shift();
                    score += 1;
                    console.log(platforms);
                    let newPlatform = new Platform(600);
                    platforms.push(newPlatform);
                }
            })
        }
    }

    function jump() {
        clearInterval(downTimerId);
        isJumping = true;
        upTimerId = setInterval(function() {
            doodlerBottomSpace += 20;
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if (doodlerBottomSpace > startpoint + 200) {
                fall();
            }

        }, 30);
    }

    function fall() {
        clearInterval(upTimerId);
        isJumping = false;
        downTimerId = setInterval(function() {
            doodlerBottomSpace -= 5;
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if (doodlerBottomSpace <= 0) {
                gameOver();
            }
            platforms.forEach(platform => {
                if ((doodlerBottomSpace >= platform.bottom) && (doodlerBottomSpace <= platform.bottom + 15) && ((doodlerLeftSpace + 60) >= platform.left) && (doodlerLeftSpace <= (platform.left + 85)) && (!isJumping)) {
                    console.log('landeg');
                    startpoint = doodlerBottomSpace;
                    jump();

                }
            })
        }, 30);
    }

    function gameOver() {
        console.log('game Over');
        isGameOver = true;
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild);
        }
        grid.innerHTML = score;
        clearInterval(upTimerId);
        clearInterval(downTimerId);
        clearInterval(leftTimerId);
        clearInterval(rightTimerId);
    }

    function control() {
        if (event.key === 'ArrowLeft') {
            moveleft();
        } else if (event.key === "ArrowRight") {
            moveright()
        } else if (event.key === "ArrowUp") {
            movestraight();

        }
    }

    function moveleft() {
        if (isgoingright) {
            clearInterval(rightTimerId);
            isgoingright = false;
        }
        isgoingleft = true;
        leftTimerId = setInterval(function() {
            if (doodlerLeftSpace >= 0) {
                doodlerLeftSpace -= 5;
                doodler.style.left = doodlerLeftSpace + 'px';
            } else {
                moveright();
            }

        }, 30);
    }

    function moveright() {
        if (isgoingleft) {
            clearInterval(leftTimerId);
            isgoingleft = false;
        }
        isgoingright = true;
        rightTimerId = setInterval(function() {
            if (doodlerLeftSpace <= 340) {
                doodlerLeftSpace += 5
                doodler.style.left = doodlerLeftSpace + 'px';
            } else {
                moveleft();
            }
        }, 30);
    }

    function movestraight() {
        isgoingright = false;
        isgoingleft = false;
        clearInterval(rightTimerId);
        clearInterval(leftTimerId);
    }

    function start() {
        if (!isGameOver) {
            createPlatforms();
            createDoodler();

            // movePlatforms();
            setInterval(movePlatforms, 30);
            jump();
            document.addEventListener('keyup', control);
        }
    }
    //attach to button
    start()
});