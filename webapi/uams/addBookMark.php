<?
    header("Content-type:text/html;charset=utf-8");
   /*
      player 剧集插件
        保存播放记录
        @param:GUID 影片GUID 
               UserID 用户UGIID(目前是固定的 d3-32-ad-y6-2w-0a )
               CONTENT_TYPE 类型(目前是固定的 series )
               CONTENT_TIME 时间( 播放的时间点 )
  */
   require("/home/services/webroot/lib/IFCenter/IPConfig.php");
   $param = $_SERVER["QUERY_STRING"];

   $param = $param ? '?'.$param:'';

   $request = 'http://' . $Interface . '/UAMS/media/addbookmark'.$param;
   	echo file_get_contents( $request );
?>
