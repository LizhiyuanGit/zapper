<?php
    header("Content-type: text/html; charset=utf-8");
    /*
        景区实时客流
            @param : 无
    */

    require("/home/services/webroot/lib/IFCenter/IPConfig.php");

    $param = $_SERVER["QUERY_STRING"];

    $param = $param ? '?' . $param : '';

    $request = 'http://' . $Interface . '/UDIS/SHLife/scenicl/getData'.$param;
    echo file_get_contents( 'http://' .$portal .'/wapi/loader/DA?DSRC='.urlencode($request));
?>