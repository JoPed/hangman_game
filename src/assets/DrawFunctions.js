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

    ctx.clearRect(0, 0, canvas.width, canvas.height);

}

const bottomGallow = (ctx) => {
    draw(50, ctx.canvas.height -50, ctx.canvas.width - 50, ctx.canvas.height -50);
}

const upwardsGallow = (ctx) => {
    draw(50, ctx.canvas.height - 50, 50, ctx.canvas.height / 2 - 250);
}

const topGallow = (ctx) => {
    draw(50, ctx.canvas.height / 2 - 250, (ctx.canvas.width / 2) + 100, ctx.canvas.height / 2 - 250);
}

const rope = ctx => {

    draw((ctx.canvas.width / 2) + 50, ctx.canvas.height / 2 - 250, (ctx.canvas.width / 2) + 50, ctx.canvas.height / 2 - 200)

}

const head = (ctx) => {
    ctx.beginPath();
    let xPos = (ctx.canvas.width / 2) + 50,
        yPos = ctx.canvas.height / 2 - 180, radius = 20;
    ctx.arc(xPos, yPos, radius, 0, Math.PI * 2);
    ctx.stroke();
}

const torso = ctx => {

    draw((ctx.canvas.width / 2) + 50, ctx.canvas.height / 2 - 160, (ctx.canvas.width / 2) + 50, ctx.canvas.height / 2 - 100);

}

const rightArm = ctx => {

    draw((ctx.canvas.width / 2) + 50, ctx.canvas.height / 2 - 145, (ctx.canvas.width / 2) + 90, ctx.canvas.height / 2 - 130)

}

const leftArm = ctx => {
    draw((ctx.canvas.width / 2) + 50, ctx.canvas.height / 2 - 145, (ctx.canvas.width / 2) + 10, ctx.canvas.height / 2 - 130)

}

const rightLeg = ctx => {

    draw((ctx.canvas.width / 2) + 50, ctx.canvas.height / 2 - 100, (ctx.canvas.width / 2) + 100, ctx.canvas.height / 2 - 80)

}

const leftLeg = ctx => {

    draw((ctx.canvas.width / 2) + 50, ctx.canvas.height / 2 - 100, (ctx.canvas.width / 2), ctx.canvas.height / 2 - 80)

}


const drawArray = [leftLeg, rightLeg, leftArm, rightArm, torso, head, rope, topGallow, upwardsGallow, bottomGallow];

export { drawArray, clearCanvas, leftLeg, rightLeg, leftArm, rightArm, torso, head, rope, bottomGallow, upwardsGallow, topGallow };
