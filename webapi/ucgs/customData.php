<?php
    header("Content-type: text/html; charset=utf-8");
    /*
        获取UCGS中自定义属性
            @param :
                guid (约定关联)                     e : guid = "149efc9c6cde43649052e918611f9143"
                key (UCGS中的自定义键)            e : key = "navigation_bg"
    */

    require("/home/services/webroot/lib/IFCenter/IPConfig.php");

    $param = $_SERVER["QUERY_STRING"];

    $param = $param ? '?' . $param : '';

    $request = 'http://' . $UCGS . '/UCGS/data/uRequest/getCustomerMaps'.$param;

    echo file_get_contents( 'http://' .$portal .'/wapi/loader/DA?DSRC=' .urlencode($request));
?>
