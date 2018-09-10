<?php
    header("Content-type: text/html; charset=utf-8");
    /*
       电视投票 - 获取投票结果
           @param :
               GID (投票事件的GID)                     e : GID = "U_150114_ED46B380409E"
               ItemID (投票事件的下标)                 e : ItemID = 1
    */

    require("/home/services/webroot/lib/IFCenter/IPConfig.php");

    $param = $_SERVER["QUERY_STRING"];

    $param = $param ? '?' . $param : '';
	
    $request = "http://".$Interface."/Z_Unify/option/getVoteResult".$param;

    echo file_get_contents( 'http://' .$portal .'/wapi/loader/DA?DSRC='.urlencode($request));

?>