<?php
    header("Content-type: text/html; charset=utf-8");

       /*
           ���ϴ��� - �б�ҳ ����ҳ
           @param:GUID ӰƬID  UserID: ������ID
       */

     require("/home/services/webroot/lib/IFCenter/IPConfig.php");
    $param = $_SERVER["QUERY_STRING"];
    $param = $param ? '?' . $param : '';
    $url = "http://".$YN_Interface."/UAMS/media/search".$param."&pageSize=3&pageNumber=1";
    // $source =  file_get_contents($url);
    $source = file_get_contents( 'http://' .$portal .'/wapi/loader/DA?DSRC=' .urlencode($url));
    echo $source;
?>