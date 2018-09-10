<?php
	header("Content-type:text/html; charset=utf-8");
	 /*
           获取实时消息
              @param :
                    device(设备名)         e: device = "192.168.0.202-554"
        */

	require("/home/services/webroot/lib/IFCenter/IPConfig.php");

	$param = $_SERVER["QUERY_STRING"];

	$param = $param ? '?' . $param : '';

	$request = 'http://'.$Interface.'/CamMenu/getData' . $param;

	echo file_get_contents( $request );
?>

