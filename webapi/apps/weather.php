<?php
    header("Content-type: text/html; charset=utf-8");
    /*
      获取天气温度
          @param : 无
    */
    require("/home/services/webroot/lib/IFCenter/IPConfig.php");

   	$param = $_SERVER["QUERY_STRING"];

   	$param = $param ? '?' . $param : '';

   	$request = 'http://' . $Interface . '/UDIS/SHLife/weather/getData'.$param;
   	echo file_get_contents( $request );
?>