<?php
    header("Content-type: text/html; charset=utf-8");
    /*
        SJCity智慧松江 - 松江气象
         SJCity智慧松江 - 电视投票

    */

    require("/home/services/webroot/lib/IFCenter/IPConfig.php");

    $URL = $_SERVER["QUERY_STRING"];
    $URL = substr($URL, 4);
    if( !empty( $URL ) ){
        try{
            $source =  file_get_contents( 'http://' .$portal .'/wapi/loader/DA?DSRC=' .urlencode($URL));
            echo html_entity_decode($source);
        }catch( Exception $e ){
        }
    }else{
        echo '';
    }

?>