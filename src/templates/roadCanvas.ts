const canvas: HTMLCanvasElement = document.createElement("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "grey";


ctx.fillRect(10, 10, 100, 100);
ctx.clearRect(10,20,100,5);
ctx.clearRect(10,90,100,5);
ctx.clearRect(45,55,30,5);
