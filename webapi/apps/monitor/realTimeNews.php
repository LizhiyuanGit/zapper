<?php
    header("Content-type: text/html; charset=utf-8");
    /*
       获取实时消息
          @param :
                did(机顶盒MAC地址)         e: did = "1a-2b-8c-4d-5f-6e"
    */

    require("/home/services/webroot/lib/IFCenter/IPConfig.php");
    $param = $_SERVER["QUERY_STRING"];

    $param = $param ? '?' . $param : '';

    $url =  "http://".$interface."/AnyProbe/api/message/unReads".$param;

    echo file_get_contents($url);

?>