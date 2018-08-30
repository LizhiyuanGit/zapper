
<?php
    header("Content-type:text/html; charset=utf-8");

    /*
        UCGS - 主体接口
        http://192.168.0.51:8080/UCGS/data/find/fullSiteData?aliasName=APP-DL&getTopic=true
    */

    require("/home/services/webroot/lib/IFCenter/IPConfig.php");

    $param = $_SERVER["QUERY_STRING"];

    $param = $param ? '?' . $param : '';

    $request = 'http://'.$UCGS.'/UCGS/data/find/fullSiteData' . $param;

    echo file_get_contents( $request );
?>