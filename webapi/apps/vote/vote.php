<?php
    header("Content-type: text/html; charset=utf-8");
    /*
         电视投票
            @param 无
    */

    require("/home/services/webroot/lib/IFCenter/IPConfig.php");

    $param = $_SERVER["QUERY_STRING"];

    $param = $param ? '?' . $param : '';
    $request = "http://".$Interface."/Z_Unify/item/getVoteItems".$param;

    echo file_get_contents( 'http://' .$portal .'/wapi/loader/DA?DSRC='.urlencode($request));

?>