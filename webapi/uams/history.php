<?php
    header("Content-type: text/html; charset=utf-8");
    /*
        云南大理 - 列表页 添加历史
        @param:GUID 影片ID  UserID: 机顶盒ID
    */

    require("/home/services/webroot/lib/IFCenter/IPConfig.php");
    $param = $_SERVER["QUERY_STRING"];

    $param = $param ? '?' . $param : '';
    $url = "http://".$YN_Interface."/UAMS/media/history".$param;
    // echo file_get_contents($url);

    echo file_get_contents( 'http://' .$portal .'/wapi/loader/DA?DSRC=' .urlencode($url));

?>