let toolsarr=document.querySelectorAll(".tool");
let x=window.innerHeight;
let y=window.innerWidth;
console.log(x,y);
let board=document.querySelector(".board");
board.height=x;
board.width=y;
let draw=board.getContext("2d");
draw.lineWidth=10;
let toolbar=document.querySelector(".toolbar");
let excessheight=toolbar.getBoundingClientRect().height;
let drawingstatus=false;
let undostack=[];
let redostack=[];
for(let i=0;i<toolsarr.length;i++)
{
  toolsarr[i].addEventListener("click",function()
{
  if(toolsarr[i].id=="pencil")
  {
    draw.strokeStyle="black";
    draw.lineWidth=10;
  }
  else if(toolsarr[i].id=="eraser")
  {
    draw.strokeStyle="white";
    draw.lineWidth=30;
  }
  else if(toolsarr[i].id=="sticky")
  {
    createsticky();
  }
  else if(toolsarr[i].id=="upload")
  {
    console.log("upload clicked");
    uploadfile();
  }
  else if(toolsarr[i].id=="download")
  {
    downloadfile();
  }
  else if(toolsarr[i].id=="undo")
  {
    console.log("undo clicked");
    undofunction();
  }
})
}
board.addEventListener("mousedown",function(e)
{
  drawingstatus=true;
  draw.beginPath();
  draw.moveTo(e.clientX,e.clientY-excessheight);
  let point={
    x: e.clientX,
    y :e.clientY-excessheight,
    desc :"md",
  };
  undostack.push(point);
})
board.addEventListener("mousemove",function(e)
{
  if(drawingstatus==false)
  {
    return;
  }
  let point={
    x: e.clientX,
    y :e.clientY-excessheight,
    desc :"mm",
  };
  undostack.push(point);
  draw.lineTo(e.clientX,e.clientY-excessheight);
  draw.stroke();
})
board.addEventListener("mouseup",function(e)
{
  drawingstatus=false;
})
//****************sticky************** */
// <!-- <div class="sticky">
//     <div class="nav-bar">
//       <div class="minimize">min</div>
//       <div class="close">close</div>
//     </div>
//     <textarea class="text"></textarea>
//   </div> -->
function createsticky()
{
  let stickydiv=document.createElement("div");
  let navbardiv=document.createElement("div");
  let minimizediv=document.createElement("div");
  let closediv=document.createElement("div");
  let textareadiv=document.createElement("textarea");
  let isminimized=false;
  closediv.innerHTML="X";
  minimizediv.innerHTML="min";
  stickydiv.setAttribute("class","sticky");
  navbardiv.setAttribute("class","nav-bar");
  textareadiv.setAttribute("class","text");
  stickydiv.appendChild(navbardiv);
  navbardiv.appendChild(minimizediv);
  navbardiv.appendChild(closediv);
  stickydiv.appendChild(textareadiv);
  document.body.appendChild(stickydiv)
  let move=false;
  navbardiv.addEventListener("mousedown",function(e)
  {
    x1=e.clientX;
    y1=e.clientY;
    console.log(x1,y1);
    move=true;
  })
  navbardiv.addEventListener("mousemove",function(e)
  {
    if(move==false)
    {return;}
    let x2=e.clientX;
    let y2=e.clientY;
    console.log(x2,y2);
    let diffx=x2-x1;
    let diffy=y2-y1;
    let{top,left}=stickydiv.getBoundingClientRect();
    stickydiv.style.top=top+diffy+"px";
    stickydiv.style.left=left+diffx+"px";
    x1=x2;
    y1=y2;
  })
  document.addEventListener("mouseup",function(e){
    move=false;
  })
  navbardiv.addEventListener("mouseup",function(e)
  {
    move=false;
  })
  
  minimizediv.addEventListener("click",function(e)
  {
    if(isminimized===true)
    {
      textareadiv.style.display="block";
      isminimized=false;
    }
    else{
    textareadiv.style.display="none";
    isminimized=true;
    }
  })
  closediv.addEventListener("click",function(e)
{
  stickydiv.remove();
})
}
function downloadfile(){
  let a=document.createElement("a");
  a.download="file.jpeg";
  let url=board.toDataURL("image/jpeg,base64");
  a.href=url;
  a.click();
  a.remove();
}
function uploadfile()
{
  let inputtag=document.querySelector(".input-tag");
  inputtag.click();
  inputtag.addEventListener("change",function(e)
  {
    let data=inputtag.files[0];
    let img=document.createElement("img");
    let url=URL.createObjectURL(data);
    img.src=url;
    img.setAttribute("class","photo");
    document.body.appendChild(img);

  })
  
}
function undofunction()
{
  if(undostack.length>0)
  {
    draw.clearRect(0,0,board.width,board.height)
    redostack.push(undostack.pop());
    for(let i=0;i<undostack.length;i++)
    {
      let {x,y,desc}=undostack[i];
      if(desc=="md")
      {
        draw.beginPath();
        draw.moveTo(x,y);
      }
      else{
        draw.lineTo(x,y);
        draw.stroke();
      }
    }
  }
}