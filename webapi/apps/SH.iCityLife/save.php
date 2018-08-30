<?php

    header("Content-type:text/html; charset=utf-8");
    /*
         上海生活-用户信息保存
         @param :
                  IP (本机IP)                  e : IP = 0.0.0.0;
               MAC (机顶盒MAC号码)          e : MAC = 00-00-00-00-00-00;
                 CA (机顶盒CA卡号)           e : CA = [NOCA];
              uname (用户名)                 e : uname = "123456"
              idcard (用户卡号)               e : idcard = ""
              data (用户信息保存对象)        e : data = '{"养老保险查询":{"id":"","pwd":""},"医疗保险查询":{"id":"","pwd":""},"公积金查询":{"id":"","pwd":""},"交通卡余额查询":{"id":""},"个税查询":{"id":"","pwd":""}}'

        上海生活-查询页面的用户信息的保存
         @param  IP 本机IP  MAC 机顶盒MAC号码  CA 机顶盒CA卡号
          type : 当前查询的名字  eg type="养老保险查询"
          param：用户查询信息保存对象
          eg: param='{"id":"","pwd":""}';
     */
    require("/home/services/webroot/lib/IFCenter/IPConfig.php");
    $param = urldecode($_SERVER["QUERY_STRING"]);

	$param = $param ? '?' . $param : '';

	$request = 'http://' . $Interface . '/UDIS/SHLife/user/upUserInfo' . $param;
	echo file_get_contents( 'http://' .$portal .'/wapi/loader/DA?DSRC='.urlencode($request));

?>
