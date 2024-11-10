let pencilele=document.querySelector("#pencil");
pencilele.addEventListener("click",function tellpencil()
{
  console.log("pencil is clicked");
  tool.strokeStyle="black";
  tool.lineWidth=2; 
})
let eraserele=document.querySelector("#eraser");
eraserele.addEventListener("click",function telleraser()
{
  tool.strokeStyle="white";
  tool.lineWidth=10;
})
let undoele=document.querySelector("#undo");
undoele.addEventListener("click",function tellundo()
{
  console.log("undo is clicked");
})
let stickyele=document.querySelector("#sticky");
stickyele.addEventListener("click",function sticky()
{
  console.log("sticky is clicked");
})
let downloadele=document.querySelector("#download");
downloadele.addEventListener("click",function downloadele()
{
  console.log("download is clicked");
})
let redoele=document.querySelector("#redo");
redoele.addEventListener("click",function tellredo()
{
  console.log("redo is clicked");
})
let uploadele=document.querySelector("#upload");
uploadele.addEventListener("click",function tellupload()
{
  console.log("upload is clicked");
})
let board=document.querySelector("#board");
board.width=window.innerWidth;
board.height=window.innerHeight;
let toolbar=document.querySelector(".toolbar");
let toolbarheight=toolbar.getBoundingClientRect().height;
let tool=board.getContext("2d");
let drawingstatus=false;
board.addEventListener("mousedown",function(e)
{
  drawingstatus=true;
  let x1=e.clientX;
  let y1=e.clientY;
  tool.beginPath();
  tool.moveTo(x1,y1-toolbarheight);
})
board.addEventListener("mousemove",function(e)
{if(drawingstatus==true)
      {
        console.log(e.clientX,e.clientY)
        tool.lineTo(e.clientX,e.clientY-toolbarheight)
        tool.stroke();
      }
})
board.addEventListener("mouseup",function(e)
{
  let x2=e.clientX;
  let y2=e.clientY;
  
  tool.lineTo(x2,y2-toolbarheight);
  tool.stroke();
  drawingstatus=false;
})