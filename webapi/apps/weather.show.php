<?php
    header("Content-type: text/html; charset=utf-8");
    /*
       云南大理 - 首页 获取天气和温度
        @param:aliasName 网站别名
    */

    require("/home/services/webroot/lib/IFCenter/IPConfig.php");
    $param = $_SERVER["QUERY_STRING"];

    $param = $param ? '?' . $param : '';

    $url = $LocalJson ?  $param.split("=")[1] : "http://".$UCGS."/Z_Unify/data/getData?ID=1".$param;

    echo file_get_contents( 'http://' .$portal .'/wapi/loader/DA?DSRC='.urlencode($url));

?>