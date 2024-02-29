'use strict';

//Defining some global utility variables
var isChannelReady = false;
var isInitiator = false;
var isStarted = false;
var localStream;
var pc;
var remoteStream;
var turnReady;
var choice=0;
var q_choice=0;
var intime=0;//0711
var identity=0;//0515 professor:1 or student:2
var variable_id;//0515
var student_number=0;//0711
var state_id=[];//0711
var state_intime=[];//0711
var q_ans=[];//0717
var state_r=[];//0717
var state_w=[];//0723
//Initialize turn/stun server here
var pcConfig =turnConfig;

var localStreamConstraints = {
    audio: true,
    video: true
  };

// Prompting for room name:
var room = prompt('Enter room name:');
var studentID = prompt('Enter id number:');
//Initializing socket.io
var socket = io.connect();

if (room !== '') {
//0423!
  var roomx=String(room)+","+String(studentID);
  socket.emit('create or join', roomx);
  console.log('Attempted to create or  join room', roomx);
}

//Defining socket connections for signalling
socket.on('created', function(room) {
  console.log('Created room ' + room);
  isInitiator = true;
  identity=1;//0515
  console.log('identity: ' + identity);//0515
  messages.style.display="none";//0620
  //emb.style.display="none";//0809
  //0812
  timerid.style.display="none";
  timerstop.style.display="none";
  Check_Txt.style.display="none";

});

socket.on('full', function(room) {
  console.log('Room ' + room + ' is full');
});

socket.on('join', function (room){
  console.log('Another peer made a request to join room ' + room);
  console.log('This peer is the initiator of room ' + room + '!');
  isChannelReady = true;
});

socket.on('joined', function(room) {
  console.log('joined: ' + room);
  isChannelReady = true;
  identity=2;//0515
  console.log('identity: ' + identity);//0515
  //dialog3.style.display="none";//0515
  //0620-add
  enter1.style.display="none";
  enter2.style.display="none";
  yourMessage.style.display="none";
  //0620!
//0711add
  dialog3_2.style.display="none";
  dialog4.style.display="none";
  socket.emit('message',"Student_num:"+studentID, room);
  myChart.style.display="none";
//0711!
//0717
  qusID.style.display="none";
  send_q.style.display="none";
//0723
  l_ability.style.display="none";
  myChart2.style.display="none";
//0730
  csv.style.display="none";
  link_i1.style.display="none";	
//0809
  video1.style.display="none";
});

socket.on('log', function(array) {
  console.log.apply(console, array);
});


//Driver code
socket.on('message', function(message, room) {
    console.log('Client received message:', message, room);
    if (message === 'got user media') {
      maybeStart();
    } else if (message.type === 'offer') {
      if (!isInitiator && !isStarted) {
        maybeStart();
      }
      pc.setRemoteDescription(new RTCSessionDescription(message));
      doAnswer();
    } else if (message.type === 'answer' && isStarted) {
      pc.setRemoteDescription(new RTCSessionDescription(message));
    } else if (message.type === 'candidate' && isStarted) {
      var candidate = new RTCIceCandidate({
        sdpMLineIndex: message.label,
        candidate: message.candidate
      });
      pc.addIceCandidate(candidate);
    } else if (message === 'bye' && isStarted) {
      handleRemoteHangup();
    }
});

//Function to send message in a room
function sendMessage(message, room) {//424
  console.log('Client sending message0:', message, room);//424
  var s2=message+" "+String(studentID);
  socket.emit('message', s2, room);
}
//424
//Function to send message in a room
function sendMessage1(message, room1) {//424
  console.log('Client sending message1:', message, room1);//424
}

//Displaying Local Stream and Remote Stream on webpage
var localVideo = document.querySelector('#localVideo');
var remoteVideo = document.querySelector('#remoteVideo');
console.log("Going to find Local media");
navigator.mediaDevices.getUserMedia(localStreamConstraints)
.then(gotStream)
.catch(function(e) {
  alert('getUserMedia() error: ' + e.name);
});

//If found local stream
function gotStream(stream) {
  console.log('Adding local stream.');
  localStream = stream;
  localVideo.srcObject = stream;
  sendMessage('got user media', room);
  if (isInitiator) {
    maybeStart();
  }
}

console.log('Getting user media with constraints', localStreamConstraints);

//If initiator, create the peer connection
function maybeStart() {
  console.log('>>>>>>> maybeStart() ', isStarted, localStream, isChannelReady);
  if (!isStarted && typeof localStream !== 'undefined' && isChannelReady) {
    console.log('>>>>>> creating peer connection');
    createPeerConnection();
    pc.addStream(localStream);
    isStarted = true;
    console.log('isInitiator', isInitiator);
    if (isInitiator) {
      doCall();
    }
  }
}

//Sending bye if user closes the window
window.onbeforeunload = function() {
 sendMessage('bye', room);
};

//Creating peer connection
function createPeerConnection() {
  try {
    pc = new RTCPeerConnection(pcConfig);
    pc.onicecandidate = handleIceCandidate;
    pc.onaddstream = handleRemoteStreamAdded;
    pc.onremovestream = handleRemoteStreamRemoved;
    console.log('Created RTCPeerConnnection');
  } catch (e) {
    console.log('Failed to create PeerConnection, exception: ' + e.message);
    alert('Cannot create RTCPeerConnection object.');
    return;
  }
}

//Function to handle Ice candidates
function handleIceCandidate(event) {
  console.log('icecandidate event: ', event);
  if (event.candidate) {
    sendMessage({
      type: 'candidate',
      label: event.candidate.sdpMLineIndex,
      id: event.candidate.sdpMid,
      candidate: event.candidate.candidate
    }, room);

    /*0423
    sendMessage({
      type: 'candidate',
      label: event.candidate.sdpMLineIndex,
      id: event.candidate.sdpMid,
      candidate: event.candidate.candidate
    }, studentID);
    0423*/

  } else {
    console.log('End of candidates.');
  }
}

function handleCreateOfferError(event) {
  console.log('createOffer() error: ', event);
}

function doCall() {
  console.log('Sending offer to peer');
  pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
}

function doAnswer() {
  console.log('Sending answer to peer.');
  pc.createAnswer().then(
    setLocalAndSendMessage,
    onCreateSessionDescriptionError
  );
}

function setLocalAndSendMessage(sessionDescription) {
  pc.setLocalDescription(sessionDescription);
  console.log('setLocalAndSendMessage sending message', sessionDescription);
  sendMessage(sessionDescription, room);
}

function onCreateSessionDescriptionError(error) {
  trace('Failed to create session description: ' + error.toString());
}


function handleRemoteStreamAdded(event) {
  console.log('Remote stream added.');
  remoteStream = event.stream;
  remoteVideo.srcObject = remoteStream;
}

function handleRemoteStreamRemoved(event) {
  console.log('Remote stream removed. Event: ', event);
}

var dialog,x,dialog2,dialog2_2,dialog4_1;
var interval=null;

//0423
window.onload=function(){
	dialog2=document.getElementById("dialog2");
	dialog2_2=document.getElementById("dialog2_2");
	dialog4_1=document.getElementById("dialog4_1");
	x=document.getElementById("x");
//0430-delete
	//interval = window.setInterval("showDialog2()",getRandom(5,10)*1000);
//0430!
}

function showDialog(){
  sendMessage('Hello student!!!',room);//studentID***
  dialog.style.display="block";
}

function hideDialog(){
  sendMessage('here',room);//studentID***
  dialog.style.display="none";
}
//0501-add
socket.on('Ask', function(room) { 
sendMessage1('Hello student!!!',studentID);
	//0508--add
	reciprocal();
	//0508!
	dialog2.style.display="block";
        socket.emit('message',"Hello: "+ studentID+" from", room);
});
function showDialog3(){
        socket.emit('message',"Ask: "+studentID+" from", room);
} 
//0501!
//0711-add
socket.on('Click_focus', function(message,room) {
	//0716	
	var window2_2;
	window2_2=window.open();
	window2_2.opener=null;
	window2_2.close();	
	//0716!
	reciprocal();
	dialog2_2.style.display="block";
});
var idnum=0;
socket.on('Student_num', function(message,room) {	
	message=String(message).split(",");
	if(message[1]>student_number){
		student_number=message[1];
		if (identity==1){//new id
			state_id[idnum]=message[0];
			state_intime[idnum]=0;
			state_r[idnum]=0;//0717
			state_w[idnum]=0;//0723
			idnum=idnum+1;	
			if(videonum>0){socket.emit('message',"video_newin: "+studentID+" from\n"+ String(m2), room);}//0809 	
			if(asyncheck>0){socket.emit('message',"asyn_newin: "+asynDescribe+"ans>>"+ asynAns+"time>>"+hourIdArry+":"+minuteIdArry, room);}//0819
		}
	}	
});
var i=0;
socket.on('state_2', function(message,room) {
	message=String(message).split(",");
		if (identity==1){//message[0]=id,message[1]=intime
			for(i=0;i<idnum;i++){
				if(state_id[i]==String(message[0])){
					state_intime[i]=String(message[1]);
					break;
				}
			}
		}		
});
var click_num=0;
function showDialog3_2(){
	click_num=click_num+1;
        socket.emit('message',"Click_focus: "+studentID+" from", room);
} 
function in_time(){
	intime=intime+1;
	state();
	dialog2_2.style.display="none";
	console.log(intime);//test
	clearInterval(timer);
  	odiv.innerHTML=null;	
}
function hideDialog2_2(){
	dialog2_2.style.display="none";
}

function state(){
	if (identity==1){
		console.log(click_num+" "+state_id+": "+state_intime);
	/*0711*/
	var ctx = document.getElementById('myChart').getContext('2d');
const bgColor = {
    id: 'bgColor',
    beforeDraw: (chart1, options) => {
        const {ctx, width, height} = chart1;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
    }
}

	 chart1 = new Chart(ctx, {
	  type: 'bar',
	  data: {
	    labels: state_id,
	    datasets: [{
	      label:'focus',
	      data: state_intime,
	      backgroundColor: 'rgba(75, 192, 192, 0.2)',
	      borderColor: 'rgb(75, 192, 192)',
	      borderWidth: 1
	    }]
	  },
	  options: {
	    scales: {
	      yAxes: [{
	        ticks: {
	          min: 0,
	          max: click_num,
	          stepSize: 1,
	          beginAtZero: true,
	          responsive: true
	        }
	      }]
	    }
	  },
          plugins: [bgColor]
	});
	/*0711!*/		
	}
	if (identity==2){
		  socket.emit('message',"state_2:"+studentID+","+intime, room);
	}
}
function showDialog4(){
	state();
}
//0711!
//0730add
var chart1,chart2;//0731
function lately(){
	state();
	learning(); 
	setTimeout(function(){ console.log("1s");
			downloadPDF();},1000);
}
function downloadPDF(){  
    var Canvas = document.getElementById('myChart');
    var CanvasImage = Canvas.toDataURL('image/jpeg');
    console.log(CanvasImage)
    let pdf = new jsPDF();
    pdf.setFontSize(20);
    pdf.addImage(CanvasImage, 'JPEG', 0, 0, CanvasImage.width, CanvasImage.height);

    var Canvas2 = document.getElementById('myChart2');
    var CanvasImage2 = Canvas2.toDataURL('image/jpeg');
    pdf.addPage();
    pdf.addImage(CanvasImage2, 'JPEG', 0, 0, CanvasImage2.width, CanvasImage2.height);
    pdf.save('focus & learn.pdf');
}
//0730!
//0717add
var question_num=0;
socket.on('question_1', function(message,room) { //student
	//0723	
	var window4_1;
	window4_1=window.open();
	window4_1.opener=null;
	window4_1.close();	
	//0723!
	var q=String(message).split("from");
  	q=String(q[1]);
	dialog4_1.style.display="block";
	var odiv3=document.getElementById("dia4"); 
  	odiv3.innerHTML=q;
	reciprocal();			
});
socket.on('q_state', function(message,room) {          //draw
//message=String(studentID)+">>"+String(q_choice);
	message=String(message).split(">>");
	if (identity==1){//message[0]=id,message[1]=q_choice
		for(i=0;i<idnum;i++){
			if(state_id[i]==String(message[0])){
				if(q_ans[question_num-1]==String(message[1]))
				{	state_r[i]=state_r[i]+1;
					break;
				}
				else
				{	state_w[i]=state_w[i]+1;
					break;
				}
			}
		}
		
	}
		
});  
function sendQus(){
	var describe;
	var c1=0,r1=0;
	var s2=0;
	for(c1=0;c1<5;c1++){
		var s1="cbox";
		s1=s1+String(c1);
		if(document.getElementById(s1).checked){
			var s4="mytext";
			s4=s4+String(c1);
			describe=document.getElementById(s4).value;
			for(r1=0;r1<3;r1++){
				s2=r1+3*c1;
				var s3="r";
				s3=s3+String(s2);
				if(document.getElementById(s3).checked){
					q_ans[question_num]=r1+1;	
					break;					
				}
			}
			question_num=question_num+1;
			socket.emit('message',"question_1: "+studentID+" from\n"+ String(describe), room);
			break;		
		}
		
	}
	
}
function hide_a(){
	dialog4_1.style.display="none";
	q_choice=1;
}
function hide_b(){
	dialog4_1.style.display="none";
	q_choice=2;
}
function hide_c(){
	dialog4_1.style.display="none";
	q_choice=3;
}
//0717!
//0723add
function learning(){
	console.log(question_num+">"+state_id+": "+state_r+","+state_w); 
var ctx = document.getElementById('myChart2').getContext('2d');
const bgColor2 = {
    id: 'bgColor2',
    beforeDraw: (chart2, options) => {
        const {ctx, width, height} = chart2;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
    }
}

 chart2 = new Chart(ctx, {
  type: 'bar',
  data: {
	  labels: state_id,
	  datasets: [{
	    label:'Right_ans',
	    data: state_r,
	    backgroundColor: 'rgba(75, 192, 192, 0.2)',
	    borderColor: 'rgba(75, 192, 192, 1)',
	    borderWidth: 1,
          },{
            label:'Wrong_ans',
	    data: state_w,
	    backgroundColor: 'rgba(255, 99, 132, 0.2)',
	    borderColor: 'rgba(255, 99, 132, 1)',
	    borderWidth: 1,
	  }]
  },
  options: {
    title: {
      display: true,
      text: 'Student Focus'
    },
    scales: {
	      yAxes: [{
                stacked: true,
	        ticks: {
	          min: 0,
	          max: question_num,
	          stepSize: 1,
	          beginAtZero: true,
	          responsive: true
	        }
	      }],
              xAxes: [{
                stacked: true
              }]
	    }
	  },
    plugins: [bgColor2]
	});
}
//0723!
//0730add
function downloadcsv(){
	var filename="state.csv";
	var header="StudentID,Intime,Right,Wrong,#question,#focus\n";
	var data="";
	for(var i=0;i<idnum;i++){
		if(i==0){
			data=data+state_id[i]+","+state_intime[i]+","+state_r[i]+","+state_w[i]+","+question_num+","+click_num+"\n";
		}
		else{
			data=data+state_id[i]+","+state_intime[i]+","+state_r[i]+","+state_w[i]+"\n";
		}
		
	}
	data=header+data;
	var blob = new Blob([data], {type : "application/octet-stream"});
  	var href = URL.createObjectURL(blob);
  	var link = document.createElement("a");
  	document.body.appendChild(link);
  	link.href = href;
  	link.download = filename;
  	link.click();
}
//0730!
function showDialog2(){
	sendMessage1('Hello student!!!',studentID);//studentID***  424
	dialog2.style.display="block";
        socket.emit('message',"Hello: "+ studentID+"from", room);
}
function hideDialog2(){
	dialog2.style.display="none";
}
function hideDialoga(){
	dialog2.style.display="none";
	choice=1;
}
function hideDialogb(){
	dialog2.style.display="none";
	choice=2;
}
function hideDialogc(){
	dialog2.style.display="none";
	choice=3;
}
//0809-add
function videoFunction(){
    videonum=videonum+1;
    m1=document.getElementById('story').value;
    m2 = m1.replace("watch?v=", 'embed/');
    document.getElementById('emb').src=m2;  
    socket.emit('message',"Sendvideo: "+studentID+" from\n"+ String(m2), room);
}
socket.on('Sendvideo', function(message,room) {
	m3=String(message);
	watch=1;
	showvideo();
});
socket.on('video_newin', function(message,room) {
	if(watch==0){
		m3=String(message);
		watch=1;
		showvideo();
	}
});
var m1,m2,m3;
var videonum=0,watch=0;
function showvideo(){
  Check_i = document.getElementById("Check_i");//0812
  clearInterval(timer1);//0812
  times=0;//0812
  SetMinute=Cal_Hour=Cal_Minute=Cal_Second=0; //0812 
  Check_i.innerHTML = Cal_Hour + "h " + Cal_Minute + "m " + Cal_Second + "s";//0812
  var message1=String(m3).split("from");
  message1=String(message1[1]);
  document.getElementById('emb').src=message1;  
}
//0809
//0812-add
var Cal_Hour = 0;
var Cal_Minute = 0;
var Cal_Second = 0;
var SetMinute = 0;
var timer1=0;
var times=0;
function Check_Time() {  
   if(times==0){
    times=1;
    timer1=setInterval("Timer()",1000);
   }  
 }
var Check_i =0;
function Timer() {
  Check_i = document.getElementById("Check_i");
  SetMinute += 1;  
  Cal_Hour = Math.floor(SetMinute / 3600);
  Cal_Minute = Math.floor(Math.floor(SetMinute % 3600) / 60);
  Cal_Second = SetMinute % 60;
  Check_i.innerHTML = Cal_Hour + "h " + Cal_Minute + "m " + Cal_Second + "s"; 
  asyntime();//0819
}
//0819
var asynsend=[];
function asyntime(){
   if(asyn==1){
  	for(var i=0;i<5;i++){ 
  	if(asynmin[i]==Cal_Minute && asynhr[i]==Cal_Hour && asynsend[i]==0){
		asyn_i=i;
		asynsend[i]=1;
		asynstate(asyn_i);
		break;
	}}
	//console.log(asynmin[asyn_i]+":"+Cal_Minute+">"+asynhr[asyn_i]+":"+Cal_Hour);
   }
}
function Stop_Time(){
  clearInterval(timer1);
  times=0;
}
//0812
//0508
//0514--add
var timer;
var odiv;
//0514!
function reciprocal()
{
  odiv=document.getElementById("timers");//0514--modify
  var count=5;
  odiv.innerHTML=count;
  timer=null; //0514--modify
  timer=setInterval(function(){
    if(count>0)
    {
      count=count-1;
      odiv.innerHTML=count;
    }
    else
    {
      clearInterval(timer);
      hideDialog2();
      hideDialog2_2();
      dialog4_1.style.display="none";
      odiv.innerHTML=null;//0514
      asynmode=0;
    }
  },1000);
}
//0508!

//0514
var mymessages;
var odiv2;
function entermessage(){
  var yourMessage=document.getElementById('yourMessage').value;
  socket.emit('message',"Sendask: "+studentID+" from\n"+ String(yourMessage), room);
  //odiv2.innerHTML=null;
  document.getElementById('yourMessage').value="";//0620
}
socket.on('Sendask', function(message,room) {
	mymessages=String(message);
	showmessages();
});
function showmessages()
{
  odiv2=document.getElementById("messages");
  odiv2.innerHTML=mymessages;
  //0620
  var message1=String(mymessages).split("from");
  message1=String(message1[1]);
  window.open(message1);
  //0620!
}
//0514!

document.onclick=function(e)
{
  var evt=e||window.event;
  var tar=evt.target;
  if((tar.tagName.toLowerCase()=="input"&&tar.type=="button")||tar.tagName.toLowerCase()=="button")
{
//0430-delete
  //alert("助教已收到"+studentID+"回覆\n選擇選項"+choice ) 
//0430!
  var s1=String(room)+String(studentID)+">>"+String(choice);
  if (choice!=0){//514
  sendMessage1('助教已收到room:',s1);  //424
  socket.emit('message', String(studentID)+">>"+String(choice)+"from", room);
  choice=0;
  clearInterval(timer);
  odiv.innerHTML=null;}//514

//0717add
  if (q_choice!=0){
 	 if(asynmode==0){
  		socket.emit('message', "q_choice"+String(studentID)+">>"+String(q_choice), room);
  		q_choice=0;
  		clearInterval(timer);
  		odiv.innerHTML=null;
	}//0819
	else if(asynmode==1){
		if(q_choice==asynAns[asyn_i]){
			socket.emit('message', "asyn_choice"+String(studentID)+">>"+1, room);
		}
		else if(q_choice!=asynAns[asyn_i]){
			socket.emit('message', "asyn_choice"+String(studentID)+">>"+2, room);
		}		
  		asynmode=0;
  		q_choice=0;
  		clearInterval(timer);
  		odiv.innerHTML=null;
	}//0819
 
  }
//0717!

}
}

//0813
var hourIdArry = [];
var minuteIdArry = [];
function timeFunction(){
  asyncheck=1;
  for(var i=0; i<5; i++)
  {
    hourIdArry[i] = parseInt(document.getElementById("videoHour" + i).value);
    hourIdArry[i] = isNaN(hourIdArry[i])?(-1):hourIdArry[i];
    minuteIdArry[i] = parseInt(document.getElementById("videoMinute" + i).value);
    minuteIdArry[i] = isNaN(minuteIdArry[i])?(-1):minuteIdArry[i];
  }
  for(var i=0; i<5; i++)
  {
    document.getElementById("hour" + i).innerHTML = hourIdArry[i];
    document.getElementById("minute" + i).innerHTML = minuteIdArry[i];
  }
  //0819add
  asynQus();
  socket.emit('message',"asynQuestion: "+asynDescribe+"ans>>"+ asynAns+"time>>"+hourIdArry+":"+minuteIdArry, room);
  //0819
}
//0813!
//0819add
var asyn=0;
var asyncheck=0;
var asynAns=[];
var asynDescribe=[];
var asynNum=0;
var asynhr=[];
var asynmin=[];
var asyn_i=0;
var asynmode=0;
function asynQus(){
	if (identity==1){
	var c1=0,r1=0;
	var s2=0;
	for(c1=0;c1<5;c1++){
		var s4="mytext";
		s4=s4+String(c1);
		asynDescribe[c1]=document.getElementById(s4).value;
		for(r1=0;r1<3;r1++){
			s2=r1+3*c1;
			var s3="r";
			s3=s3+String(s2);
			if(document.getElementById(s3).checked){
				asynAns[c1]=r1+1;
				asynNum=asynNum+1;	
				break;						
			}
			asynAns[c1]=0;
		}				
	}}
	question_num=question_num+asynNum;	
}
socket.on('asyn_newin', function(message,room){
	if(asyn==0){
		asynquestion(message);	
	}

});
socket.on('asynQuestion', function(message,room){
	asynquestion(message);
	
});
socket.on('asyn_choice', function(message,room){//state
	message=String(message).split(">>");
	if (identity==1){//message[0]=id,message[1]=1or2
		for(i=0;i<idnum;i++){
			if(state_id[i]==String(message[0])){
				if(1==String(message[1]))
				{	state_r[i]=state_r[i]+1;
					break;
				}
				else if(2==String(message[1]))
				{	state_w[i]=state_w[i]+1;
					break;
				}
			}
		}
		
	}
});
function asynquestion(message){
	var s1,s2,s3,s4;
	s1=String(message).split("ans>>");
	s2=String(s1[1]);
	s1=String(s1[0]).split(",");
	for(var i=0; i<5; i++)
 	{		
		asynDescribe[i]=s1[i];		
		asynsend[i]=0;
  	}

	s2=String(s2).split("time>>");
	s3=String(s2[1]);
	s2=String(s2[0]).split(",");
	for(var i=0; i<5; i++)
 	{
		asynAns[i]=s2[i];
  	}
	
	s3=String(s3).split(":");
	s4=String(s3[1]);
	s3=String(s3[0]).split(",");
	for(var i=0; i<5; i++)
 	{
		asynhr[i]=s3[i];
  	}
	
	s4=String(s4).split(",");
	for(var i=0; i<5; i++)
 	{
		asynmin[i]=s4[i];
  	}
	asyn=1;
}
function asynstate(asyn_i){
	setTimeout(function(){ console.log("xs");
		console.log(asyn_i);
		var q=String(asynDescribe[asyn_i]);
		dialog4_1.style.display="block";
		var odiv3=document.getElementById("dia4"); 
  		odiv3.innerHTML=q;
		asynmode=1;
		reciprocal();
		},getRandom(5,10)*1000);//0826
}
//0819
function hangup() {
  console.log('Hanging up.');
  stop();
  sendMessage('bye',room);
}

function handleRemoteHangup() {
  console.log('Session terminated.');
  stop();
  isInitiator = false;
}

function stop() {
  isStarted = false;
  pc.close();
  pc = null;
}

function getRandom(min,max){
  return Math.floor(Math.random()*(max-min+1))+min;
}

