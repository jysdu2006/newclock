<?php
header("Content-type:text/html;charset=utf-8");
$type=$_GET['type'];
if($type==='1'){
	$data=array();
	$file=fopen('../cfg/part.txt','r');
	while(!feof($file)){
		$temp=fgets($file);
		$data[]=$temp;
	}
	fclose($file);
	echo(json_encode($data));
}


if($type==='2'){
	$num=$_GET['num'];
	$filename="../cfg/info".$num.".txt";
	//$filename="../cfg/info1.txt";
	$data=array();
	$file=fopen($filename,'r');
	while(!feof($file)){
		$temp=fgets($file);
		$arr=explode(" ", $temp);
		$data[]=$arr[0];
		//print_r(length($arr));
		$resultfile=fopen("d:/clock/result/".$arr[0].".txt",'r');
		$result=fgets($resultfile);
		$rearr=explode(' ', $result);
		$data[]=$rearr[1];
		$data[]=$rearr[2];
		$data[]=$rearr[3];
	}
	fclose($file);
	$data[]=$num;
	echo(json_encode($data));
}


if($type==='3'){
	$filename='d:/clock/result/stand.txt';
	$data=array();
	$file=fopen($filename,'r');
	$data[]='基准时间:';
	while(!feof($file)){
		$temp=fgets($file);
		$arr=explode(" ", $temp);
		//$command='java -jar d://webtime.jar '.$arr[0].' '.$arr[1].' '.$arr[2].' '.$arr[3];
		//exec($command,$out);
		$data[]=$arr[1];
		$data[]=$arr[2];
	}
	fclose($file);
	echo(json_encode($data));
}


if($type==='4'){
	$nametmp=$_GET['filename'];
	$num=$_GET['num'];
	$filename="d:/clock/result/".$nametmp.".txt";
	$data=array();
	$file=fopen($filename,'r');
	$temp=fgets($file);
	$arr=explode(" ", $temp);
	$data[]=$nametmp;
	$data[]=$arr[1];
	$data[]=$arr[2];
	$data[]=$arr[3];
	$data[]=$num;
	fclose($file);
	echo(json_encode($data));

}

if($type==='5'){
	$filename="d:/clock/result/monitor.log";
	$data=array();
	$file=fopen($filename,'r');
	while(!feof($file)){
		$temp=fgets($file);
		$temp=iconv("gb2312","utf-8",$temp);
		$data[]=$temp;
	}
	fclose($file);
	echo(json_encode($data));
}

/*
if($type==='2'){
	$num=$_GET['num'];
	$filename="../cfg/info".$num.".txt";
	//$filename="../cfg/info1.txt";
	$data=array();
	$file=fopen($filename,'r');
	while(!feof($file)){
		$temp=fgets($file);
		$arr=explode(" ", $temp);
		$data[]=$arr[0];
		//print_r(length($arr));
		$command='java -jar d://webtime.jar '.$arr[0].' '.$arr[1].' '.$arr[2].' '.$arr[3];
		//print_r($data[1]." ".$data[2]." ".$data[3]);
		//$command="java -jar d://webtime.jar 127.0.0.1 1 administrator jinying";
		exec($command,$out);
		$data[]=$out[0];
		$data[]=$out[1];
	}
	fclose($file);
	$data[]=$num;
	echo(json_encode($data));
}

if($type==='3'){
	$filename='../cfg/stand.txt';
	$data=array();
	$file=fopen($filename,'r');
	$data[]='基准时间:';
	while(!feof($file)){
		$temp=fgets($file);
		$arr=explode(" ", $temp);
		$command='java -jar d://webtime.jar '.$arr[0].' '.$arr[1].' '.$arr[2].' '.$arr[3];
		exec($command,$out);
		$data[]=$out[0];
		$data[]=$out[1];
	}
	fclose($file);
	echo(json_encode($data));
}
*/






?>