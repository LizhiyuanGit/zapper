<?php

/**
 * @Author: Yeada
 * @Date:   2018-04-10 14:07:44
 * @Last Modified by:   Yeada
 * @Last Modified time: 2018-04-10 14:07:59
 */
    header("Content-type: text/html; charset=utf-8");
     /*
        上海生活 - 看看新闻 - 详情页
    */

    require("/home/services/webroot/lib/IFCenter/IPConfig.php");

    $param = $_SERVER["QUERY_STRING"];

    $param = $param ? '?' . $param : '';

    $request = 'http://' . $UCGS. '/UCGS/data/uRequest/topicData' .$param;

    echo file_get_contents( 'http://' .$portal .'/wapi/loader/DA?DSRC='.urlencode($request));
?>