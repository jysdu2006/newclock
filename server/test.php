<?php
require "Java.inc";
$system=new Java("java.lang.System");
print "Java version=".$system->getProperty("java.version")." ";
require 'ganymed-ssh2-build210.jar';
//$javatest=new Java('test');
//$javatest->show();
?>