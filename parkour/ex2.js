let canvas = document.createElement("canvas");
canvas.setAttribute("width", "1920");
canvas.setAttribute("height", "1080");
let ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
let play = false;
let titleScale = 0.01;
let fontLoaded = false;
const indicator = document.getElementById("indicator");
let showSettings = false;

const jumpSound = new Audio(/audio/jump_07.wav);

const titleImage = new Image();
titleImage.src = "title.png";

const settingImg = new Image() 
settingImg.src = "settings.png";

const unmutedImg = new Image();
unmutedImg.src = "unmuted.png";

const mutedImg = new Image();
mutedImg.src = "muted.png";

let muted = false;

let cameraY = 0;

let mouseX;
let mouseY;
let player;

let useArrows = false;

function drawSettings() {
    ctx.fillStyle = "white";
    ctx.fillRect(130, 30, 1620, 880);
    ctx.fillStyle = "black"
    // ctx.fillRect(140, 50, 900, 30)
    ctx.font = "100px retro"
    ctx.fillText("Settings", 140, 120, 1500)
    drawChangeControl() //change from arrows to wasd and vice versa
    drawSoundSetting();


}

function drawSoundSetting() {
    let chosenImg

    if(muted) {
        chosenImg = mutedImg;
    } else {
        chosenImg = unmutedImg;
    }

    ctx.drawImage(chosenImg, 50, 500, 200, 200);
}

function unfoldChangeControl() {
    // document.querySelector("body").backgroundColor = "white"
    ctx.fillStyle = "yellow";
    ctx.fillRect(900, 200, 400, 100);

    ctx.font = "70px serif";
    ctx.fillStyle = "black";

    ctx.fillText(textToUse, 900, 250)
    
}

function drawChangeControl(click) {
    // if(mx) {
    //     document.querySelector("body").backgroundColor = "white"
    // }

    let textToUse;
    if(useArrows) {
        textToUse = "arrow"
    } else {
        textToUse = "wasd"
    }

    ctx.fillStyle = "blue";
    ctx.font = "75px serif"
    ctx.fillText("Controls", 400, 272)

    ctx.fillStyle = "yellow";
    ctx.fillRect(900, 200, 400, 100);
    ctx.font = "70px serif";
    
    ctx.fillStyle = "black";

        ctx.fillText(textToUse, 900, 250)
    


    ctx.fillStyle = "black";
    ctx.font = "48px serif";
    // ctx.fillText(200)

}

function drawUI() {
    ctx.drawImage(settingImg, 1810, 10, 100, 100);
}

function restartGame() {
    player.y = canvas.height-50;
    player.x = 500;
    document.body.style.backgroundColor = "white"
    cameraY = 0;
}

function  getMousePos(evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
  
    return {
      x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
      y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
  }

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  document.querySelector("button").addEventListener("click", () => {
    openFullscreen(canvas)
  });

  titleImage.onload = function() {
    requestAnimationFrame(animateTitle)
  }

  function updCamPos() {
    if(player.y < 600) {
        cameraY++;
        // groundY += cameraY;
    }
    if(player.y > canvas.height) {
        restartGame()
    }
  }

  function drawButtons() {
    //btn 1

    if(hoverClassic) {
        ctx.strokeStyle = "red"
        ctx.fillStyle = "purple"
    } else {
        ctx.strokeStyle = "pink";
        ctx.fillStyle = "red"
    }
    // ctx.roundRect(840, 850, 220, 90, 20)
    // ctx.stroke()

    // ctx.fillStyle = "white";
    ctx.font = "70px retro"
    ctx.fillText("Classic", 840, 920 , 220)
    

    // ctx.fillStyle = "blue";
    // ctx.roundRect(1400, 850, 220, 90, 20)
    // ctx.fill()

    // ctx.fillStyle = "black";
    // ctx.font = "70px retro"
    // ctx.fillText("hi", 1400, 920 , 220)


  }
let hoverClassic = false;
  canvas.addEventListener("mousemove", e => {
    const pos = getMousePos(e)
    mouseX = pos.x;
    mouseY = pos.y;
    // console.log(pos.x.toFixed(0) + "," + pos.y.toFixed(0))
    if(mouseX > 840 && mouseX < 1060 && mouseY > 850 && mouseY < 940) {
    // if(pos.x > 840 && pos.x < 960 && pos.y > 230 && pos.y < 320) {
        hoverClassic = true;
    } else {
        hoverClassic = false;
    }
  }) 

  let transX = canvas.width;
  let transY = 0;

  function transition(type) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "black"
    ctx.fillRect(transX, transY, canvas.width*1.5, canvas.height);
    
    if(transX > -2880 && !play) {
        transX-= 40;
        // play = true;
        if(type == "play" && transX <= -2800) {
            play = true;
            player = new Player(950, 950, 10, 10, "green");
            createBlocks();
            window.requestAnimationFrame(animate)
        }
        requestAnimationFrame(() => {
            transition("play")
        })
        // console.log("transition")
        console.log(transX)
    } 
    
    
  }

  canvas.addEventListener("click", () => {
    // drawChangeControl(true);
    if(mouseX > 900 && mouseY > 300) {
        // unfoldChangeControl();
        document.querySelector("body").backgroundColor = "white"
    }
    if(mouseX > 840 && mouseX < 1060 && mouseY > 850 && mouseY < 940) {
        transition("play")    
    }
    if(mouseX > 1810 && mouseY < 510) {
        showSettings = !showSettings;
    }
  })

  let lastGen = 0;
  let reverse = false;
  let offx = 0;
  let offy = 0;
  let addx = 0;
  let addy = 0;

  function animateTitle() {
    if (play == true) {
        return;
    }
    titleImage.width *= titleScale;
    titleImage.height *= titleScale;



    if(lastGen == 0) {
        offx = Math.random() * 3;
        offy = Math.random() * 3;
        lastGen = 1;
        addx = offx/5
        addy = offy/5
        reverse = false;
    } else if(!reverse) {
        lastGen++;
        if(lastGen > 50) {
            reverse = true;
        }

    } else if(reverse){
        lastGen--;
    }


    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(titleImage, addx *lastGen, addy*lastGen, 1920*titleScale, 1080*titleScale);
    drawButtons();
    if(titleScale <= 1) {
        titleScale += 0.1;
        console.log("scaled")
    }
    if(play === false) {
        requestAnimationFrame(animateTitle)
    }
  }

//   openFullscreen(canvas);
let jumpKeyed;
const jumpHeight = 50;

// jumpExecuter() {

// }


function checkHitbox() {
    updCamPos()
    for (const block of blocks) {
        // Calculate half-widths and half-heights
        const playerHalfWidth = player.width / 2;
        const playerHalfHeight = player.height / 2;
        const blockHalfWidth = block.width / 2;
        const blockHalfHeight = block.height / 2;

        // Calculate centers
        const playerCenterX = player.x + playerHalfWidth;
        const playerCenterY = player.y + playerHalfHeight;
        const blockCenterX = block.x + blockHalfWidth;
        const blockCenterY = block.y +cameraY + blockHalfHeight;

        // Calculate the difference between centers
        const deltaX = playerCenterX - blockCenterX;
        const deltaY = playerCenterY - blockCenterY;

        // Calculate the minimum overlap (penetration depth)
        const overlapX = Math.abs(deltaX) - (playerHalfWidth + blockHalfWidth);
        const overlapY = Math.abs(deltaY) - (playerHalfHeight + blockHalfHeight);
        
        if(player.vy != 0) {
            player.grounded = false;
        }

        if (overlapX < 0 && overlapY < 0) { // Collision detected
            if (Math.abs(overlapX) < Math.abs(overlapY)) { // Resolve horizontal collision
                if (deltaX > 0) {
                    player.x -= overlapX;
                } else {
                    player.x += overlapX;
                }
                player.vx = 0; // Stop horizontal movement
            } else { // Resolve vertical collision
                if (deltaY > 0) { // Player is below the block
                    player.y -= overlapY;
                    player.vy = 0;
                    
                } else{ // Player is above the block
                    // if(block.type == 1) {//bounce 
                    //     player.applyForce(0, -10000);
                    // } 
                    player.grounded = true;
                    player.y += overlapY;
                    player.vy = 0;
                    
                    

                }
            }
        }
    }
}

function jump(key) {
    if (player.grounded) { 
      jumpKeyed = key;
      player.jumpPressedTime = 1;  //weird way to make no jump glitch
      jumpSound.play()
    //   player.y += 2; 
      player.vy = -Math.sqrt(2 * Math.abs(gravity) * jumpHeight); 
 // Correct the player's position 
 player.grounded = false; 
    }
    if(player.vy < 0 && player.jumpPressedTime < 7 && jumpKeyed == key) {
        player.vy -= player.jumpPressedTime * player.jumpPressedTime * 1.5
    }
  }

function goLeft() {
    player.applyForce(-1500, 0)
}

function goRight() {
    player.applyForce(1500, 0)
}

function crouch() {
    if(!player.grounded) {
        player.applyForce(0, 10000)
    }
}

// function updateController() {
//     for(key in controller) {
//         if(key.length > 1) {
//             controller[key].funct
//         }
        
//     }
// }

const controller = {
    "w" : {
        "down":false,
        "funct": jump
    },
    "a" : {
        "down":false,
        "funct": goLeft
    },
    "s" : {
        "down":false,
        "funct": crouch
    },
    "d" : {
        "down":false,
        "funct": goRight
    },
    "ArrowUp" : {
        "down":false,
        "funct": jump
    },
    "ArrowLeft" : {
        "down":false,
        "funct": goLeft
    },
    "ArrowDown" : {
        "down":false,
        "funct": crouch
    },
    "ArrowRight" : {
        "down":false,
        "funct": goRight
    }
}


function setCheckPoint(block) {
    if(block.type == 2) {
        ctx.fillStyle = "white";
        ctx.font = "48px serif"
        // ctx.fillText("Checkpoint Saved", block.x, block.y)
        document.querySelector("body").backgroundColor = "white"
    }
}


const blocks = []

const text = []

function createBlocks() {
    new Block(540, 950, 50, 20, 0);
    new Block(580, 900, 50, 20, 0);
    new Block(650, 850, 50, 20, 0);
    new Block(600, 800, 50, 20, 0);
    new Block(500, 750, 100, 20, 0);
    new Block(800, 700, 50, 20, 0);
    new Block(850, 610, 50, 20, 0);
    new Block(700, 600, 50, 20, 0);
    new Block(600, 520, 50, 20, 0);
    new Block(720, 450, 50, 20, 2);
}

document.addEventListener("keydown", e => {
    if(controller[e.key]) {
        controller[e.key].down = true;
    }
})

document.addEventListener("keyup", e => {
    if(controller[e.key]) {
        controller[e.key].down = false;
    }
})

function makeText() {
    new Text("Welcome.", 200, 500, 800, 1000)
}

class Text {
    constructor(content,x,y,maxWidth,minY, maxY) {
        this.content = content;
        this.x = x;
        this.y = y;
        this.maxWidth = maxWidth;
        this.maxY = maxY;
        this.minY = minY;
        text.push(this)
    }
    draw(ctx) {
        ctx.font = "48px serif";
        ctx.fillStyle = "white";
        ctx.fillText(this.content, this.x, this.y, this.maxWidth);
    }
}

class moveBlock {
    constructor(x, y, width, height, speed, range, direction) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.range = range;
        this.color = "yellow";
        this.reverse = false;
        this.direction = direction;
        this.ogX = this.x;
        this.ogY = this.y;
        blocks.push(this);
    }
    draw(ctx) {
            if(!this.reverse) {
                this[this.direction]+= this.speed;
                if(this[this.direction] > this[`og${this.direction.toUpperCase()}`] + this.range) {
                    this.reverse = true
                }
            } else {
                this[this.direction] -= 2;
                if(this[this.direction] <= this[`og${this.direction.toUpperCase()}`]) {
                    this.reverse = false;
                }
            }
        

        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.closePath();
    }
}

class Block {
    constructor(x, y, width, height, type, bounceHeight) { //type 0 is classic, 1 is bounce,2 is checkpoint
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        if(this.type == 0) {
            this.color = "black"
        } else if(this.type == 1) {
            this.bounceHeight = bounceHeight;
            this.color = "purple";
        } else if(this.type == 2) {
            this.color = "grey";
        }
        blocks.push(this)
    }
    draw(ctx) {

        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y + cameraY, this.width, this.height);
        ctx.closePath();
    }
}

class Player {
    constructor(x,y,width,height,color) {
        // console.log("new player")
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.jumpForce = 500; // Adjust this value to control jump height
        this.grounded = false;
        this.jumpPressedTime = 0;

        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.mass = 1;
    }

    applyForce(fx, fy) {
        this.ax += fx / this.mass;
        this.ay += fy / this.mass;
    }

    update(deltaTime) {
        this.vx += this.ax * deltaTime;
        this.vy += this.ay * deltaTime;

        checkHitbox()

        const friction = 0.93; // A value between 0 and 1 (higher means less friction)
        this.vx *= friction;
        if(this.vx < 0.001 && this.vx > -0.001) {
            this.vx = 0;
        }
        // this.vy *= friction;
//left wall
        if(this.x < 0 && this.vx < 0) {
            this.vx = 0;
        }
        if(this.x < 0) {
            this.x = 0;
        }
//right wall
        if(this.x + this.width > 1920 && this.vx > 0) {
            this.vx = 0;
        }
        if(this.x + this.width > 1920) {
            this.x = 1920 - this.width
        }



        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;

        this.ax = 0;
        this.ay = 0;

        if(useArrows ? controller["ArrowUp"].down : controller["w"].down && this.jumpPressedTime > 0) {
            this.jumpPressedTime++;
        } else {
            this.jumpPressedTime = 0;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.closePath();
    }

}

// const player = new Player(400, 1020, 10, 10, "green");

let gravity = 980;

const groundY = canvas.height - 50;

let lastTime = null;

function executeKeys() {
    let jumped = false
    for(const key in controller) {
        if(controller[key].down) {
            if((useArrows ? key.charAt(1) == "r" : key.length == 1)) {//for switching betwwen wasd and arrows
                controller[key].funct();
        } 
    }
}
}

function animate(time) {
    indicator.textContent = mouseX + "," + mouseY
    if(!lastTime) lastTime = time;
    const deltaTime = (time - lastTime) / 1000;
    lastTime = time;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    executeKeys();
    player.applyForce(0, player.mass * gravity);
    player.update(deltaTime);

    // checkHitbox();

    if(player.y + player.height > groundY+cameraY) {
        player.grounded = true;
        player.y = groundY + cameraY - player.height;
        player.vy = 0;
    }
    
    ctx.fillStyle = "black";
    ctx.fillRect(0, groundY + cameraY, canvas.width, canvas.height - groundY);

    player.draw(ctx);
    for (const texts of text) {
        if(player.y > texts.maxY && player.y < texts.minY) {
            texts.draw(ctx)
        }
    }

    for(const block of blocks) {
        block.draw(ctx)
    }

    drawUI();
    if(showSettings) {
        drawSettings();
    }
    

    requestAnimationFrame(animate);
}


