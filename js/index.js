$(document).ready(function(){




var partname=new Array();
var partcount=0;
var dangerous=0;
var max=0;
var machinenum=0;

function get_part(){
	$.get('/newclock/server/info.php',{type:1},function(jsondata){
		var data=eval(jsondata);
		partcount=data.length;
		for(var i=0;i<data.length;i++)
			partname[i]=data[i];
		full_cont();
		get_machine();
		//refresh_time();
		//setInterval(refresh_time,100000);
		//setInterval(addtime,1000);
	});
}

function full_cont(){
	if(partcount>0){
		var machine_list='';
		for(var i=0;i<partcount;i++){
			var temp="group"+i;
			machine_list+='<div class="childpane" id="'+temp+'"><div class="underline">'+partname[i]+'</div></div>';
		}
		var $list=$(machine_list);
		$('.spidepane').empty();
		$list.appendTo($('.spidepane'));
	}
}
function get_machine(){
	if(partcount>0){
		for(var i=0;i<partcount;i++){
			$.get('/newclock/server/info.php',{type:2,num:i},function(jsondata){
				var data=eval(jsondata);
				var temp="";
				var id=data[data.length-1];
				for(var j=0;j<data.length-1;j=j+4){
					temp+='<div class="showtime normal" id="'+data[j]+'">'+data[j]+'<br/><br/>'+data[j+1]+'<br/>'+data[j+2]+'<br/>'+data[j+3]+'</div>';
					machinenum++;
				}	//temp+='<div class="showtime" id="machine'+id+j+'">'+data[j]+'<br/><br/>'+data[j+1]+'<br/>'+data[j+2]+'<br/>'+data[j+3]+'</div>';
				var $machine=$(temp);
				//$('#group'+data[data.length-1]).empty();
				$machine.appendTo($('#group'+data[data.length-1]));
				refresh_time();
				setInterval(refresh_time,100000);
				//setInterval(addtime,1000);
			});
		}
	}
}


function execute_time(){
	$.get('/newclock/server/info.php',{type:3},function(jsondata){
		var data=eval(jsondata);
		var temp="<p>";
		for(var i=0;i<data.length;i=i+3)
			temp+=data[i]+'<br/> '+data[i+1]+'<br/> '+data[i+2];
		temp+='</p>';
		var $temp=$(temp);
		$('#standtime').empty();
		$temp.appendTo($('#standtime'));
	});
}

get_part();
//execute_time();
//setInterval(get_part,10000);
execute_time();
setInterval(addstand,1000);
setInterval(execute_time,10000);



function refresh_time(){
	$machine=$('.normal');
	for(var i=0;i<$machine.length;i++){
		var idname=$machine[i].id;
		$.get('/newclock/server/info.php',{type:4,filename:idname,num:i},function(jsondata,i){
			var data=eval(jsondata);
			var infostring='<p>'+data[0]+'<br /><br /> '+data[1]+'<br> '+data[2]+'<br> '+data[3]+'</p>';
			var num=data[4];
			$testtemp=$(infostring);
			//$divids=abs((int)(data[3]));
			$divids=Math.abs(parseInt(data[3]));
			if($divids>200){
				if(!$($machine[num]).hasClass('danger')){
					dangerous++;
					//writelog("主机:"+data[0]+"时间异常！！");
				}
				$($machine[num]).removeClass('showtime');
				$($machine[num]).addClass('danger');
				
			}
			else{
				if($($machine[num]).hasClass('danger')){
					dangerous--;
					//writelog("主机:"+data[0]+"从异常中恢复");
				}
				$($machine[num]).removeClass('danger');
				$($machine[num]).addClass('showtime');
				
			}
			//alert(data[3]);
			if($divids>max){
				//alert(data[3]);
				max=$divids;
			}
				
			$($machine[num]).empty();
			$testtemp.appendTo($($machine[num]));
			//$machine[num].textContent=infostring;
			//console.log($machine[num].textContent);
		});
	}
	
}
//refresh_time();
//var si=setInterval(refresh_time,1000);

//setInterval(test,10000);

function totalstatus(){
	var temp='<p>';
	temp+='状态汇总：<br><br>现在正监控: '+machinenum+' 台机器<br><br>其中 '+dangerous+' 台异常，最大时间差：'+max+' 秒';
	temp+='</p>';
	$temp=$(temp);
	$('#statistic').empty();
	$temp.appendTo($('#statistic'));
}
totalstatus();
setInterval(totalstatus,10000);

/*
function writelog($cont){
	var fso,tf;
	fso=new ActiveXObject("Scripting.FileSystemObject");
	tf=fso.OpenTextFile('monitor.log',8);
	//var temp="主机"+$ip+$cont;
	var temp=date()+":"+$cont;
	tf.WriteLine(temp);
	tf.close();

}
*/
function read_log(){
	$.get('/newclock/server/info.php',{type:5},function(jsondata){
		var data=eval(jsondata);
		var temp="<p>监控日志：<br>";
		for(var i=0;i<data.length;i++){
			temp+=data[i]+'<br>';
		}
		temp+="</p>";
		$log=$(temp);
		$('#logpane').empty();
		$log.appendTo($('#logpane'));
	});
}
read_log();
setInterval(read_log,100000);


function addtime(){
	//var spl=oldtime.split('\n');
	$time=$('.normal').find('p');
	for(var i=0;i<$time.length;i++){
		$part=$($time[i]).text().split(' ');
		$day=$part[1];
		$moment=$part[2];
		$moment=timeadd($moment);
		var strtmp='<p>'+$part[0];
		if($moment[1]<10)
			$moment[1]='0'+$moment[1];
		if($moment[2]<10)
			$moment[2]='0'+$moment[2];
		if($moment[3]===1){
			$newday=dayadd($day,'/');
			strtmp+='<br><br> '+$newday[0]+'/'+$newday[1]+'/'+$newday[2]+'<br> '+$moment[0]+':'+$moment[1]+':'+$moment[2]+'<br> '+$part[3]+'</p>';
		}
		else
			strtmp+='<br><br> '+$part[1]+'<br> '+$moment[0]+':'+$moment[1]+':'+$moment[2]+'<br> '+$part[3]+'</p>';
		$($time[i]).empty();
		$tmp=$(strtmp);
		$tmp.appendTo($($time[i]));
	}
}

function timeadd($time){
	$tmp=$time.split(':');
	data=new Array();
	for(var i=0;i<$tmp.length;i++)
		data[i]=parseInt($tmp[i]);
	$flag=(data[2]+1)/60;
	$flag1=Math.floor($flag);
	data[2]=(data[2]+1)%60;

	
	$flag2=(data[1]+$flag1)/60;
	data[1]=(data[1]+$flag1)%60;
	$flag2=Math.floor($flag2);

		
	$flag3=(data[0]+$flag2)/24;
	data[0]=(data[0]+$flag2)%24;
	$flag3=Math.floor($flag3);
	
	data[3]=$flag3;

	return data;
}
function dayadd($day,$partion){
	$tmp=$day.split($partion);
	data=new Array();
	for(var i=0;i<$tmp.length;i++)
		data[i]=parseInt($tmp[i]);
	if(data[1]===1|data[1]===3|data[1]===5|data[1]===7|data[1]===8|data[1]===10|data[1]===12){
		$flag=(data[2]+1)/32;
		$flag=Math.floor($flag);
		data[2]=(data[2]+1)%32;
	}
	else if(data[1]===2){
		if(data[0]%4===0){
			$flag=(data[2]+1)/30;
			$flag=Math.floor($flag);
			data[2]=(data[2]+1)%30;
		}
		else{
			$flag=(data[2]+1)/29;
			$flag=Math.floor($flag);
			data[2]=(data[2]+1)%29;
		}
	}
	else{
		$flag=(data[2]+1)/31;
		$flag=Math.floor($flag);
		data[2]=(data[2]+1)%31;
	}
	if(data[2]===0)
		data[2]=1;
	
	$flag1=(data[1]+$flag)/13;
	data[1]=(data[1]+$flag)%13;
	$flag1=Math.floor($flag1);
	if(data[1]===0)
		data[0]=1;
	
	data[0]=data[0]+$flag1;
	return data;
}

setInterval(addtime,1000);

function addstand(){
	$stand=$('#standtime').text();
	$part=$stand.split(' ');
	$day=$part[1];
	$moment=$part[2];
	$moment=timeadd($moment);
	var strtmp='<p>'+$part[0];
	if($moment[1]<10)
		$moment[1]='0'+$moment[1];
	if($moment[2]<10)
		$moment[2]='0'+$moment[2];
	if($moment[3]===1){
		$newday=dayadd($day,'-');
		strtmp+='<br> '+$newday[0]+'/'+$newday[1]+'/'+$newday[2]+'<br> '+$moment[0]+':'+$moment[1]+':'+$moment[2]+'</p>';
	}
	else
		strtmp+='<br> '+$part[1]+'<br> '+$moment[0]+':'+$moment[1]+':'+$moment[2]+'</p>';
	$('#standtime').empty();
	$(strtmp).appendTo($('#standtime'));
}


});

