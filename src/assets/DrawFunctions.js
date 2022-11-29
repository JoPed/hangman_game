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

        draw(50, ctx.canvas.height - 50, ctx.canvas.width - 50, ctx.canvas.height - 50);
}

const upwardsGallow = (ctx) => {

    if (window.devicePixelRatio > 1) {
        draw(50, ctx.canvas.height - 50, 50, ctx.canvas.height / 2 - 250);
    }
    else {
        draw(50, ctx.canvas.height - 50, 50, 125);
    }

}

const topGallow = (ctx) => {

    if (window.devicePixelRatio > 1) {
        draw(50, ctx.canvas.height / 2 - 250, (ctx.canvas.width / 2) + 100, ctx.canvas.height / 2 - 250);
    }
    else {
        draw(50, 125, (ctx.canvas.width / 2) + 100, 125);
    }
}

const rope = ctx => {

    if (window.devicePixelRatio > 1) {
        draw((ctx.canvas.width / 2) + 50, ctx.canvas.height / 2 - 250, (ctx.canvas.width / 2) + 50, ctx.canvas.height / 2 - 200)
    }
    else {
        draw((ctx.canvas.width / 2) + 50, 125, (ctx.canvas.width / 2) + 50, 150)
    }


}

const head = (ctx) => {
    ctx.beginPath();
    let xPos,
        yPos,
        radius;

    if (window.devicePixelRatio > 1) {
        xPos = (ctx.canvas.width / 2) + 50;
        yPos = ctx.canvas.height / 2 - 180;
        radius = 20;
    }
    else{
        xPos = (ctx.canvas.width / 2) + 50; 
        yPos = 165;
        radius = 15;
    }

    ctx.arc(xPos, yPos, radius, 0, Math.PI * 2);
    ctx.stroke();
}

const torso = ctx => {

    if(window.devicePixelRatio > 1){
       draw((ctx.canvas.width / 2) + 50, ctx.canvas.height / 2 - 160, (ctx.canvas.width / 2) + 50, ctx.canvas.height / 2 - 100); 
    }
    else{
        draw((ctx.canvas.width / 2) + 50, 180, (ctx.canvas.width / 2) + 50, 235);
    }
    

}

const rightArm = ctx => {

    if(window.devicePixelRatio > 1){
        draw((ctx.canvas.width / 2) + 50, ctx.canvas.height / 2 - 145, (ctx.canvas.width / 2) + 90, ctx.canvas.height / 2 - 130)
    }
    else{
        draw((ctx.canvas.width / 2) + 50, 195, (ctx.canvas.width / 2) + 90, 205)
    }
    

}

const leftArm = ctx => {

    if(window.devicePixelRatio > 1){
       draw((ctx.canvas.width / 2) + 50, ctx.canvas.height / 2 - 145, (ctx.canvas.width / 2) + 10, ctx.canvas.height / 2 - 130) 
    }
    else{
        draw((ctx.canvas.width / 2) + 50, 195, (ctx.canvas.width / 2) +10, 205)
    }
    

}

const rightLeg = ctx => {

    if(window.devicePixelRatio > 1){
       draw((ctx.canvas.width / 2) + 50, ctx.canvas.height / 2 - 100, (ctx.canvas.width / 2) + 100, ctx.canvas.height / 2 - 80) 
    }
    else{
        draw((ctx.canvas.width / 2) + 50, 235, (ctx.canvas.width / 2) + 100, 255)
    }
    

}

const leftLeg = ctx => {

    if(window.devicePixelRatio > 1){
       draw((ctx.canvas.width / 2) + 50, ctx.canvas.height / 2 - 100, (ctx.canvas.width / 2), ctx.canvas.height / 2 - 80); 
    }
    else{
        draw((ctx.canvas.width / 2) + 50, 235, (ctx.canvas.width / 2), 255)
    }
    

}


const drawArray = [leftLeg, rightLeg, leftArm, rightArm, torso, head, rope, topGallow, upwardsGallow, bottomGallow];

export { drawArray, clearCanvas, leftLeg, rightLeg, leftArm, rightArm, torso, head, rope, bottomGallow, upwardsGallow, topGallow };
