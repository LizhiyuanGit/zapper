<?php
    header("Content-type: text/html; charset=utf-8");

    /*   民生查询 - 根据用户名，密码进行查询
           @param :
                idnum (用户名)                  e : idnum = "53655966234"
                idpwd (用户密码)                e : idpwd = "123456"
                id (查询类的下标)                e : id = 0
     */
    require("/home/services/webroot/lib/IFCenter/IPConfig.php");

   // $param = $_SERVER["QUERY_STRING"];

   // $param = $param ? '?' . $param : '';

    $action = '';
    $url = '';
    switch($_GET["id"]){
       	case 0:
            $action = 'social/getData';
            $url = "?idnum=".$_GET["idnum"]."&idpwd=".$_GET["idpwd"];
            break;
        case 1:
             $action = 'health/getData';
             $url = "?idnum=".$_GET["idnum"]."&idpwd=".$_GET["idpwd"];
            break;
        case 2:
             $action = 'public/GJJ';
             $url = "?username=".$_GET["idnum"]."&pwd=".$_GET["idpwd"];
            break;
        case 3:
              $action = 'traffic/JTKYE';
              $url = "?id=".$_GET["idnum"];
            break;
        case 4:
             $action = 'tax/getData';
            break;
        default:break;
    }

  //  $param = str_replace('&'.end(split("\&",$param)),"",$param);

    $request = 'http://'.$Interface.'/UDIS/SHLife/'.$action.$url;
    
    echo file_get_contents( 'http://' .$portal .'/wapi/loader/DA?DSRC='.urlencode($request));
?>