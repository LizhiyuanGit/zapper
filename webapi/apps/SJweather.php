<?php
    header("Content-type: text/html; charset=utf-8");
    /*
        松江气象
            @param :
                type                            e : type = "sj"
    */

    require("/home/services/webroot/lib/IFCenter/IPConfig.php");

    $param = $_SERVER["QUERY_STRING"];

    $param = $param ? '?' . $param : '';

    $SJWeatherUrl = "http://".$Interface."/SJWeather/Query_Weather".$param;

    $SJWeatherAlertUrl = "http://".$Interface."/SJWeather/QueryAlertByType".$param;
	
   echo file_get_contents( 'http://' .$portal .'/wapi/loader/DA?DSRC='.urlencode($SJWeatherAlertUrl));

?>