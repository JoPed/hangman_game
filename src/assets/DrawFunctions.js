const draw = (startX, startY, endX, endY) => {

    const canvas = document.querySelector("#game");
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#F2F2F0";

    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

}

const clearCanvas = () => {

    const canvas = document.querySelector("#game");
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0,0, canvas.width, canvas.height);

}

const bottomGallow = (ctx) => {
    draw((ctx.canvas.width / 2) - 250, ctx.canvas.height - 50, (ctx.canvas.width / 2) + 250, ctx.canvas.height - 50);
}

const upwardsGallow = (ctx) => {
    draw((ctx.canvas.width / 2) - 230, ctx.canvas.height - 50, (ctx.canvas.width / 2) - 230, 50);
}

const topGallow = (ctx) => {
    draw((ctx.canvas.width / 2) - 232, 50, (ctx.canvas.width / 2) + 100, 50);
}

const rope = ctx => {

    draw((ctx.canvas.width / 2) + 50, 50, (ctx.canvas.width / 2) + 50, 75 )

}

const head = (ctx) => {
    ctx.beginPath();
    let xPos = (ctx.canvas.width / 2) + 50, 
    yPos = 90, radius = 15;
    ctx.arc(xPos, yPos, radius, 0, Math.PI * 2);
    ctx.stroke();
}

const torso = ctx => {

    draw((ctx.canvas.width / 2) + 50, 105, (ctx.canvas.width / 2) + 50, 170);

}

const rightArm = ctx => {

    draw((ctx.canvas.width / 2) + 50, 120, (ctx.canvas.width / 2) + 90, 130)

}

const leftArm = ctx => {
    draw((ctx.canvas.width / 2) + 50, 120, (ctx.canvas.width / 2) +10, 130)

}

const rightLeg = ctx => {

    draw((ctx.canvas.width / 2) + 50, 170, (ctx.canvas.width / 2) + 100, 190)

}

const leftLeg = ctx => {

    draw((ctx.canvas.width / 2) + 50, 170, (ctx.canvas.width / 2), 190)
    
}


const drawArray = [leftLeg, rightLeg, leftArm, rightArm,torso,head,rope,topGallow, upwardsGallow, bottomGallow];

export {drawArray, clearCanvas,leftLeg, rightLeg, leftArm, rightArm,torso,head,rope, bottomGallow, upwardsGallow, topGallow};
