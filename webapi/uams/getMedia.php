<?
    header("Content-type:text/html;charset=utf-8");
    /*
        player 剧集插件
        Idx="+_toolCookie.getBlues("tvSeries")
          获取player 的影片信息
          @param:FGUID 影片GUID
                 Idx   当前的第Idx集
     */

    require("/home/services/webroot/lib/IFCenter/IPConfig.php");
    $param = $_SERVER["QUERY_STRING"];

    $param = $param ? '?'.$param:'';

    $request = 'http://' .$Interface. '/UAMS/media/getMediaByIdx'.$param;
    echo file_get_contents( $request );
?>
