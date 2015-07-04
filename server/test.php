<?php
require "Java.inc";
$system=new Java("java.lang.System");
print "Java version=".$system->getProperty("java.version")." ";
require_once('abc.jar');
//$javatest=new Java('test');
//$javatest->show();
?>