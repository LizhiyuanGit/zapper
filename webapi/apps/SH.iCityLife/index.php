
<?php
/**
 * @Author: Yeada
 * @Date:   2018-03-27 13:24:37
 * @Last Modified by:   Yeada
 * @Last Modified time: 2018-03-27 13:35:18
 */

    header("Content-type: text/html; charset=utf-8");
   
    $resource = file_get_contents("/home/services/webroot/Fdev.Station/Yuan.Fangfang/SH.iCityLive/confi/SHLife_data.json");

    echo $resource;
?>