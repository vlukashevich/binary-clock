let cols = document.getElementsByClassName("col");
let rows = [2, 4, 3, 4, 3, 4];
let time;
let light = "#ff00ff"//"rgb(255, 0, 255)";
let dark = "rgb(120, 0, 120)";
let textLight = "rgb(200, 200, 200";

window.onload = function () {
    for (let i = 0; i < 6; i++) {
        let col = cols[i];

        let block = document.createElement("div");
        block.className = "block";
        block.style.color = light;

        for (let j = 0; j < 4; j++) {
            // if (i == 5) {
            //     block.style.borderRight = "3px solid" + light;
            // }
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
    let timeBlocks = document.getElementsByClassName("time");

    for (let i = 0; i < 6; i++) {
        timeBlocks[i].style.color = light;
        timeBlocks[i].style.borderColor = light;
    }
    for(let i = 0; i < 4; i++) {
        cols[6].children[i].style.color = light;
    }

    

    setInterval( () => {
        let date = new Date();
        let h = (date.getHours().toString().length == 2) ? date.getHours().toString() : "0" + date.getHours().toString();
        let m = (date.getMinutes().toString().length == 2) ? date.getMinutes().toString() : "0" + date.getMinutes().toString();
        let s = (date.getSeconds().toString().length == 2) ? date.getSeconds().toString() : "0" + date.getSeconds().toString();
        
        time = h + m + s;
        

        for (let i = 0; i < 6; i++) {
            timeBlock = timeBlocks[i];

            if (i % 2 == 0) {
                timeBlock.style.textAlign = "right";
            }
            else {
                timeBlock.style.textAlign = "left"; 
            }
            timeBlock.innerText = time[i];

            if (i == 1 || i == 3) {
                let colon = document.createElement("p");
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
                    currentBit.style.background = light;
                }
                else if (!binary[j] || binary[j] == "0") {
                    currentBit.style.background = dark;
                }
            }
        }
    }, 100/3);
}

