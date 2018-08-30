<?php

/**
 * @Author: Yeada
 * @Date:   2018-04-09 17:32:27
 * @Last Modified by:   Yeada
 * @Last Modified time: 2018-04-09 17:32:54
 */
header("Content-type: text/html; charset=utf-8");
    /*
        上海生活 - 看看新闻 - 导航页
    */

    require("/home/services/webroot/lib/IFCenter/IPConfig.php");
    
    $url = 'http://192.168.0.51:8080/UCGS/data/uRequest/unifyJson?aliasName=kknews';

    // echo file_get_contents( $url )
    
    echo file_get_contents( 'http://' .$portal .'/wapi/loader/DA?DSRC='.urlencode($url));
?>