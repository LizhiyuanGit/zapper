<?php
    header("Content-type: text/html; charset=utf-8");
    /*
        SJCity智慧松江 - 首页
        @param:aliasName 网站别名 getPreview: 获取主题数据   getTopic:预览地址
    */

    require("/home/services/webroot/lib/IFCenter/IPConfig.php");
    $param = $_SERVER["QUERY_STRING"];

    $param = $param ? '?' . $param : '';

    $url = $LocalJson ?  $param.split("=")[1] : "http://".$UCGS."/UCGS/data/uRequest/unifyJson".$param;

    echo file_get_contents( 'http://' .$portal .'/wapi/loader/DA?DSRC=' .urlencode($url));
    // echo file_get_contents($url);

?>