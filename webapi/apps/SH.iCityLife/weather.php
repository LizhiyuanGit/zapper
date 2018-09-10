<?php

    header("Content-type: text/html; charset=utf-8");
    /*
       上海生活 - 上海天气

    */
    require("/home/services/webroot/lib/IFCenter/IPConfig.php");

    $param = $_SERVER["QUERY_STRING"];

    $param = $param ? '?' . $param : '';

    $request = 'http://' . $Interface . '/UDIS/SHLife/weather/getData'.$param;
    echo file_get_contents( 'http://' .$portal .'/wapi/loader/DA?DSRC='.urlencode($request));
?>
