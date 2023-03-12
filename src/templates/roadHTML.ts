export default function createImgRoad() {
  const road = document.createElement('div');
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  road.classList.add('road');
  canvas.width = document.documentElement.clientWidth;
  for(let i = 0; i < canvas.width - 100 ; i+= 100) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "grey";
    if(!i) {
        ctx.fillRect(i, 10, 100, 100);
        ctx.clearRect(i,20,100,5);
        ctx.clearRect(i,90,100,5);
        ctx.clearRect(95 + i,10,5,100);
        road.append(canvas); 
    }else if(i >= canvas.width - 200) {
        ctx.fillRect(i, 10, 100, 100);
        ctx.clearRect(i,20,100,5);
        ctx.clearRect(i,90,100,5);
        ctx.clearRect(0 + i,10,5,100);
        road.append(canvas); 
    } else {
        ctx.fillRect(i, 10, 100, 100);
        ctx.clearRect(i,20,100,5);
        ctx.clearRect(i,90,100,5);
        ctx.clearRect(45 + i,55,30,5);
        road.append(canvas); 
    }
  }

  return road;
}

