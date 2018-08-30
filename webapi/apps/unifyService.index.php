<?php

/**
 * @Author: Yeada
 * @Date:   2018-04-16 10:17:53
 * @Last Modified by:   Yeada
 * @Last Modified time: 2018-04-16 10:18:02
 */
header("Content-type: text/html; charset=utf-8");
    /*
        SJCity智慧松江 - 便民服务首页
    */

    require("/home/services/webroot/lib/IFCenter/IPConfig.php");

    $param = $_SERVER["QUERY_STRING"];

    $param = $param ? '?' . $param : '';

    $request = 'http://' . $UCGS . '/UCGS/data/uRequest/unifyJson?aliasName=iRural-SH.SJ.bmfw&getTopic=true&getPreview=true'.$param;
    
    echo file_get_contents( 'http://' .$portal .'/wapi/loader/DA?DSRC=' .urlencode($request));
?>