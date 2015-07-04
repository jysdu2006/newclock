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
		$data[]=$temp;
	}
	fclose($file);
	$data[]=$num;
	echo(json_encode($data));
}







?>