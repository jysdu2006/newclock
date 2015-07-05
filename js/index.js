
var partname=new Array();
var partcount=0;

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
get_part();
function full_cont(){
	if(partcount>0){
		var machine_list='';
		for(var i=0;i<partcount;i++){
			var temp="group"+i;
			machine_list+='<div class="childpane" id="'+temp+'"><div class="underline">'+partname[i]+'</div></div>';
		}
		var $list=$(machine_list);
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
				for(var j=0;j<data.length-1;j=j+3)
					temp+='<div class="showtime" id="machine'+id+j+'">'+data[j]+'<br/><br/>'+data[j+1]+'<br/>'+data[j+2]+'</div>';
				var $machine=$(temp);
				$machine.appendTo($('#group'+data[data.length-1]));
			});
		}
	}
}

function execute_time(){
	$.get('/newclock/server/info.php',{type:3},function(jsondata){
		var data=eval(jsondata);
		var temp="";
		for(var i=0;i<data.length;i=i+3)
			temp+=data[i]+"<br/>"+data[i+1]+"<br/>"+data[i+2];
		$('#standtime').text(temp);
	});
}

execute_time();