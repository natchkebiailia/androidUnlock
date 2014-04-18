function androidLock(ans){
	if(typeof ans == "undefined")
		ans="0124678";
	ans=ans.toString().split("");
		
	var winWidth=window.innerWidth;
	var winHeight=window.innerHeight;
	var padWidthHeight=(winWidth > winHeight) ? winHeight:winWidth;
	var overLay=document.createElement("div");
	overLay.id="androidLockOverlay";
	overLay.style.position="fixed";
	overLay.style.width=overLay.style.height="100%";
	overLay.style.top=overLay.style.left="0px";
	overLay.style.backgroundColor="rgba(0, 0, 0, 0.70)";
	overLay.style.zIndex=999999998;
	document.body.appendChild(overLay);
	overLay=document.getElementById("androidLockOverlay");
	
	var pad=document.createElement("div");
	pad.id="pad";
	pad.style.width=padWidthHeight+"px";
	pad.style.height=padWidthHeight+"px";
	pad.style.position="absolute";
	pad.style.top=parseInt((winHeight-padWidthHeight)/2)+"px";
	pad.style.left=parseInt((winWidth-padWidthHeight)/2)+"px";
	pad.style.backgroundColor="black";
	pad.style.cursor="default";
	pad.style.webkitUserSelect="none"
	/*  not cross browser Needs for IE opera and firefox */
	pad.style.overflow="hidden";
	pad.style.zIndex=999999999;
	document.body.appendChild(pad);
	pad=document.getElementById("pad");
	
	for(var i=0; i<9; i++){
		var tmpDiv=document.createElement("div");
		tmpDiv.id="b"+i;
		tmpDiv.className="btn";
		tmpDiv.style.position="absolute";
		tmpDiv.style.zIndex=4;
		tmpDiv.style.left=(i%3 * 35 + 5) + "%";
		tmpDiv.style.top=(35 * Math.floor(i/3) + 5) + "%";
		tmpDiv.style.width=tmpDiv.style.height="20%";
		tmpDiv.style.borderRadius="100%";
		tmpDiv.style.backgroundColor="rgba(0, 0, 0, 0.4)";
		tmpDiv.style.border=pad.offsetWidth*0.01+"px solid rgb(5, 5, 5)"
		tmpDiv.style.boxShadow="0px 2px #222222"
		tmpDiv.style.webkitBoxShadow="0px 2px #222222"
		tmpDiv.style.boxSizing="border-box";
		tmpDiv.style.MozBoxSizing="border-box";
		tmpDiv.style.webkitBoxSizing="border-box";
		
		var tmpInnerDiv=document.createElement("div");
		tmpInnerDiv.style.position="absolute";
		tmpInnerDiv.style.width="50%";
		tmpInnerDiv.style.height="50%";
		tmpInnerDiv.style.left="25%";
		tmpInnerDiv.style.top="25%";
		tmpInnerDiv.style.backgroundColor="white";
		tmpInnerDiv.style.borderRadius="100%";
		tmpDiv.appendChild(tmpInnerDiv);
		
		var tmpInnerDiv2=document.createElement("div");
		tmpInnerDiv2.style.position="absolute";
		tmpInnerDiv2.style.borderWidth=pad.offsetWidth*0.037+"px "+pad.offsetWidth*0.037+"px 0";
		tmpInnerDiv2.style.borderStyle="solid";
		tmpInnerDiv2.style.borderColor="transparent #525252";
		tmpInnerDiv2.style.left="30%";
		tmpInnerDiv2.style.top="76%";
		tmpInnerDiv2.style.backgroundColor="green";
		tmpInnerDiv2.style.display="none";
		tmpDiv.appendChild(tmpInnerDiv2);
		
		pad.appendChild(tmpDiv);
	}
	
	function draw(from,to){
	var x1=from.offsetLeft+from.offsetWidth/2;
	var y1=from.offsetTop+from.offsetHeight/2;
	var x2=to.offsetLeft+to.offsetWidth/2;
	var y2=to.offsetTop+to.offsetHeight/2;;
	var width=pad.offsetWidth*0.09;
	var left=x1-width/2;
	var top=y1;
	var height=Math.sqrt(Math.abs(x2-x1)*Math.abs(x2-x1)+Math.abs(y2-y1)*Math.abs(y2-y1));
	var angle=toDeg(Math.atan2((x1-x2),(y2-y1)));
	dirrection(to,angle-180);
	createElem(left,top,height,width,angle);
	}

	function createElem(left,top,height,width,angle){
		var el=document.createElement("div");
		el.className="connectionLine";
		el.style.position="absolute";
		el.style.backgroundColor="rgb(143, 137, 137)";
		el.style.zIndex="3";
		el.style.left=left+"px";
		el.style.top=top+"px";
		el.style.width=width+"px";
		el.style.height=height+"px";
		el.style.webkitTransform="translate(0px,-"+(height/2)+"px)rotate("+angle+"deg)translate(0px,"+(height/2)+"px)";
		el.style.MozTransform="translate(0px,-"+(height/2)+"px)rotate("+angle+"deg)translate(0px,"+(height/2)+"px)";
		el.style.transform="translate(0px,-"+(height/2)+"px)rotate("+angle+"deg)translate(0px,"+(height/2)+"px)";
		pad.appendChild(el);
	}

	function toRad(deg){
		return 2*Math.PI*deg/360;
	}
	function toDeg(rad){
		return rad*360/(2*Math.PI);
	}
	
	function highLight(el,onOff){
		var boderColor=(onOff == "on") ? "rgb(33, 126, 33)" : "rgb(5, 5, 5)";
		//var boderColor=(onOff == "on") ? (el.style.borderColor =="rgb(33, 126, 33)") ? "rgb(100, 100, 100)" : "rgb(33, 126, 33)" : "rgb(5, 5, 5)";
		var shadow=(onOff == "on") ? "" : "0px 3px #222222";
		el.style.borderColor=boderColor;
		el.style.boxShadow=shadow;
		el.style.webkitBoxShadow=shadow;
	}
	
	function dirrection(from,angle){
		from.style.webkitTransform="rotate("+angle+"deg)";
		from.style.MozTransform="rotate("+angle+"deg)";
		from.style.transform="rotate("+angle+"deg)";
		from.children[1].style.display="block";
	}
	
	var btns=document.getElementsByClassName("btn");
	var started=false;
	var arr=[];
	document.body.addEventListener("mousedown",mouseIsDown,false);
	document.body.addEventListener("mouseup",mouseIsUp,false);
	document.body.addEventListener("mouseleave",mouseLeft,false);
	for(var i=0;i<btns.length;i++)
		btns[i].addEventListener("mousemove",mouseIsOverButton,false);
	
	function mouseIsDown(e){
		e.preventDefault();
		started=true;
	}
	function mouseIsUp(e){
		e.preventDefault();
		started=false;
		checkPass();
	}
	function mouseLeft(e){
		e.preventDefault();
		started=false;
		checkPass();
	}
	function mouseIsOverButton(e){
		e.preventDefault();
		if(started){
			if(arr[arr.length-1]!=e.target.id[1] && e.target.id){
				if(testCorectness(parseInt(e.target.id[1]),arr[arr.length-1]) && arr.length>0){
					arr.push(testCorectness(parseInt(e.target.id[1]),arr[arr.length-1],true));
					draw(btns[arr[arr.length-1]],btns[arr[arr.length-2]]);
					highLight(btns[arr[arr.length-1]],"on");
					arr.push(parseInt(e.target.id[1]));
					draw(btns[arr[arr.length-1]],btns[arr[arr.length-2]]);
				}else{
					arr.push(parseInt(e.target.id[1]));
					if(arr.length>1)
						draw(btns[arr[arr.length-1]],btns[arr[arr.length-2]]);
				}
			}
			if(e.target.id)
				highLight(e.target,"on");
		}
	}
	
	function testCorectness(n1,n2,bool){
		if(n1>n2){
			n2+=n1;
			n1=n2-n1;
			n2-=n1;
		}
		var str=n1+""+n2;
		var retBool;
		var retVal;
		switch(str){
			case "06":
				retBool=true;
				retValue=3;
				break;
			case "17":
				retBool=true;
				retValue=4;
				break;
			case "28":
				retBool=true;
				retValue=5;
				break;
			case "02":
				retBool=true;
				retValue=1;
				break;
			case "35":
				retBool=true;
				retValue=4;
				break;
			case "68":
				retBool=true;
				retValue=7;
				break;
			case "08":
				retBool=true;
				retValue=4;
				break;
			case "26":
				retBool=true;
				retValue=4;
				break;
			default:
				rerValue=false;
				break;
		}
		if(bool)
			return retValue;
		return retBool;
	}
	
	function checkPass(){
		if(arr.length)
			if(arr.join("")!=ans.join(""))
				tryAgain();
			else
				pass();
	}
	
	function tryAgain(){
		console.log("try again");
		arr=[];
		var lineArr=[];
		var lineDivs=document.getElementsByClassName("connectionLine");
		var buttons=document.getElementsByClassName("btn");
		for(var i=0;i<buttons.length;i++)
			buttons[i].children[1].style.display="none";
		for(var i=0;i<lineDivs.length;i++){
			lineDivs[i].style.backgroundColor="rgb(201, 8, 8)";
			lineArr.push(lineDivs[i]);
		}
		window.setTimeout(function(){
				for(var i=0;i<buttons.length;i++)
					highLight(buttons[i],"off");
				for(var i=0;i<lineArr.length;i++)
					pad.removeChild(lineArr[i]);
		},200);
	}
	
	function pass(){
		console.log("pass");
		var lines=document.getElementsByClassName("connectionLine");
		var buttons=document.getElementsByClassName("btn");
		for(var i=0;i<buttons.length;i++)
			buttons[i].children[1].style.display="none";
		for(var i=0;i<lines.length;i++)
			lines[i].style.backgroundColor="rgb(33, 192, 19)";
		window.setTimeout(function(){
			document.body.removeChild(pad);
			document.body.removeChild(overLay);
		},200);
		document.body.removeEventListener("mousedown",mouseIsDown,false);
		document.body.removeEventListener("mouseup",mouseIsUp,false);
		document.body.removeEventListener("mouseleave",mouseLeft,false);
	}
}