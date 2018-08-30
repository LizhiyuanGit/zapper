<?php
    header("Content-type: text/html; charset=utf-8");
    /*
        便民服务详情
            @param :
                ID(查询的类别)            e : ID = 1 || 4 || 5 || 7 || 8
                备注 :
                    1 : 获取当天以及未来5天的天气以及温度
                    5 : 彩票
                    4 : 油价
                    7 : 黄金
                    8 : 人民币汇率
    */

    require("/home/services/webroot/lib/IFCenter/IPConfig.php");

     $param = $_SERVER["QUERY_STRING"];

     $param = $param ? '?' . $param : '';
     echo $param;
     $request = "http://".$Interface."/Z_Unify/data/getData".$param;
     echo file_get_contents( 'http://' .$portal .'/wapi/loader/DA?DSRC=' .urlencode($request));

   // $lotteryUrl = "http://".$Portal.":8080/Z_Unify/data/getData?ID=5"; //彩票
   // $oilCityUrl = "http://".$Portal.":8080/Z_Unify/data/getData?ID=4"; //油价
   // $shgoldUrl = "http://".$Portal.":8080/Z_Unify/data/getData?ID=7"; //黄金
   // $rmbqoutUrl = "http://".$Portal.":8080/Z_Unify/data/getData?ID=8"; //人民币汇率

?>