let cols = document.getElementsByClassName("col");
let rows = [2, 4, 3, 4, 3, 4];
let time;
let light = ["rgb(0, 255, 50)", "rgb(0, 255, 255)", "rgb(255, 0, 255)"];
let dark = ["rgb(0, 124, 50)", "rgb(0, 120, 120)", "rgb(120, 0, 120)"];
let color = 1;


window.onload = function () {
    let colorChoice = document.getElementById("color-choice");

    let colorElem = document.createElement("div");
    colorElem.className = "color";

    let circle = document.createElement("div");
    circle.className = "circle";

    colorElem.appendChild(circle);

    for (let i = 0; i < light.length; i++) {
        colorChoice.appendChild(colorElem);

        colorElem.children[0].style.background = light[i];
        colorElem.children[0].style.borderColor = dark[i];

        colorElem = colorElem.cloneNode(true);
    }

    let colors = Array.from(document.getElementsByClassName("color"));

    colors.forEach(elem => {
        elem.addEventListener("click", function () {
            color = colors.indexOf(elem);

            setColor();
        })
    })


    for (let i = 0; i < 6; i++) {
        let col = cols[i];

        let block = document.createElement("div");
        block.className = "block";

        for (let j = 0; j < 4; j++) {
            col.appendChild(block);
            block = block.cloneNode(true);
        }

        let bit = document.createElement("div");
        bit.className = "bit";

        for (let j = 0; j < rows[i]; j++) {
            let currentBlock = col.children[j];
            currentBlock.appendChild(bit);
            bit = bit.cloneNode(true);
        }

        let time = document.createElement("div");
        time.className = "time";
        col.appendChild(time);
    }


    setColor();

    setInterval( () => {
        let date = new Date();
        let h = (date.getHours().toString().length == 2) ? date.getHours().toString() : "0" + date.getHours().toString();
        let m = (date.getMinutes().toString().length == 2) ? date.getMinutes().toString() : "0" + date.getMinutes().toString();
        let s = (date.getSeconds().toString().length == 2) ? date.getSeconds().toString() : "0" + date.getSeconds().toString();
        
        time = h + m + s;

        let timeBlocks = document.getElementsByClassName("time");

        for (let i = 0; i < 6; i++) {
            timeBlock = timeBlocks[i];

            if (i % 2 == 0) {
                timeBlock.style.textAlign = "right";
            }
            else {
                timeBlock.style.textAlign = "left"; 
            }
            timeBlock.innerText = time[i];

            let colon = document.createElement("p");

            if (i == 1 || i == 3) {
                colon.className = "colon"; 
                colon.innerText = ":";

                colon = colon.cloneNode(true);
                timeBlock.appendChild(colon);
            }


            let binary = parseInt(time[i]).toString(2);
            binary = binary.split("").reverse().join("");

            for (let j = 0; j < rows[i]; j++) {
                let currentBit = cols[i].children[j].children[0];

                if (binary[j] == "1") {
                    currentBit.style.background = light[color];
                }
                else if (!binary[j] || binary[j] == "0") {
                    currentBit.style.background = dark[color];
                }
            }
        }
    }, 100/3);
}

function setColor () {
    let blocks = document.getElementsByClassName("block");
    let timeBlocks = document.getElementsByClassName("time");

    for (let i = 0; i < 6; i++) {
        let block = blocks[i];
        let timeBlock = timeBlocks[i];

        block.style.color = light[color];
        timeBlock.style.color = light[color];
        timeBlock.style.borderColor = light[color];
    }

    for(let i = 0; i < 4; i++) {
        cols[6].children[i].style.color = light[color];
    }
}
