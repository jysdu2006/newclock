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
			});
		}
	}
}


function execute_time(){
	$.get('/newclock/server/info.php',{type:3},function(jsondata){
		var data=eval(jsondata);
		var temp="<p>";
		for(var i=0;i<data.length;i=i+3)
			temp+=data[i]+'<br/>'+data[i+1]+'<br/>'+data[i+2];
		temp+='</p>';
		var $temp=$(temp);
		$('#standtime').empty();
		$temp.appendTo($('#standtime'));
	});
}

get_part();
execute_time();
//setInterval(get_part,10000);
//setInterval(execute_time,10000);


function refresh_time(){
	$machine=$('.normal');
	for(var i=0;i<$machine.length;i++){
		var idname=$machine[i].id;
		$.get('/newclock/server/info.php',{type:4,filename:idname,num:i},function(jsondata,i){
			var data=eval(jsondata);
			var infostring='<p>'+data[0]+'<br /><br />'+data[1]+'<br>'+data[2]+'<br>'+data[3]+'</p>';
			var num=data[4];
			$testtemp=$(infostring);
			if(data[3]>200){
				if(!$($machine[num]).hasClass('danger'))
					dangerous++;
				$($machine[num]).removeClass('showtime');
				$($machine[num]).addClass('danger');
			}
			else{
				if($($machine[num]).hasClass('danger'))
					dangerous--;
				$($machine[num]).removeClass('danger');
				$($machine[num]).addClass('showtime');
			}
			//alert(data[3]);
			if(data[3]>max){
				//alert(data[3]);
				max=data[3];
			}
				
			$($machine[num]).empty();
			$testtemp.appendTo($($machine[num]));
			//$machine[num].textContent=infostring;
			//console.log($machine[num].textContent);
		});
	}
	
}
//refresh_time();
var si=setInterval(refresh_time,3000);

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


});

