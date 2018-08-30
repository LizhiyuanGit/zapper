<?php
    header("Content-type: text/html; charset=utf-8");
    /*
        电视投票
              @param :
                  GID    (投票事件的GID)                     e : GID = "U_150114_ED46B380409E"
                  ItemID (投票事件的下标)                   e : ItemID = 1
                  Title  (投票事件名)                       e : Title = "实施部主任选举"
                  IPAddr (本机IP)                          e : IPAddr = '0.0.0.0'
                  MacAddr (机顶盒MAC)                   e : MacAddr = "00-00-00-00-00-01"
                  OptionID (选择的下标)                  e : OptionID = 2
                  Option (选择的标题)                    e : Option = "张三三"
                  Deleted (默认)                         e : Deleted = 0
    */

    require("/home/services/webroot/lib/IFCenter/IPConfig.php");

    $param = $_SERVER["QUERY_STRING"];

    $param = $param ? '?' . $param : '';
	
    $request = "http://".$Interface."/Z_Unify/option/vote".$param;

    echo file_get_contents( 'http://' .$portal .'/wapi/loader/DA?DSRC='.urlencode($request));

?>