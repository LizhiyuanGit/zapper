<?
    header("Content-type:text/html;charset=utf-8");
    /*
      player 剧集插件
        删除播放记录
        @param:GUID 影片GUID 
               UserID 用户UGIID(目前是固定的 d3-32-ad-y6-2w-0a )
  */
   require("/home/services/webroot/lib/IFCenter/IPConfig.php");
   $param = $_SERVER["QUERY_STRING"];

   $param = $param ? '?'.$param:'';

   $request = 'http://' . $Interface . '/UAMS/media/delbookmark'.$param;
   echo file_get_contents( $request );
?>
