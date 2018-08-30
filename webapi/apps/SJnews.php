<?php
    header("Content-type: text/html; charset=utf-8");
     /*
          松江报
               @param :
                   action (读取文件)                           e : action = "fs.read"
                   fileName (文件路径)                         e : fileName = "/media/imgcache/SJNews.img/"
                   fileType (文件类型)                         e : fileType = "dir"
                备注 :
                  fileType = "dir" 获取的文件夹
                  fileType = "file" 获取文件下的文件

      */

    require("/home/services/webroot/lib/IFCenter/IPConfig.php");

    $param = $_SERVER["QUERY_STRING"];

    $param = $param ? '?' . $param : '';

   	$SJNewsPaperUrl = "http://".$Portal."/ZCloud/ZProbe/fs/read".$param;

    echo file_get_contents( 'http://' .$portal .'/wapi/loader/DA?DSRC='.urlencode($SJNewsPaperUrl));
?>