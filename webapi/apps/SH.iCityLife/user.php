<?php
	header("Content-type:text/html; charset=utf-8");

	/*
	 	 获取当天时间以及当前用户的民生信息查询
    	    @param  :
    	        IP (本机IP)            	            e : IP = 0.0.0.0;
    	        MAC  (机顶盒MAC号码)        	    e : MAC = 00-00-00-00-00-00;
    	        CA   (机顶盒CA卡号)             	e : CA = [NOCA];
				type (获取具体信息)				    e : 不需要设置该字段 只获取当天的时间信息（返回值 农历 阳历 星期 机顶盒用户信息 干支纪年 [丁酉(鸡)]）
														type = 0 获取当前用户的民生信息 （养老 医疗 公积金 交通卡 个税的信息）
														type = '医疗保险查询'
				data (查询民生信息的用户名 密码 对象)   e : data = {"id": "6006586032" , "pwd": "123456"}

			备注：
				type = "医疗保险查询" 时,data 字段是必传

	*/

	require("/home/services/webroot/lib/IFCenter/IPConfig.php");

	$param = urldecode($_SERVER["QUERY_STRING"]);

	$param = $param ? '?' . $param : '';

	$request = 'http://' . $Interface . '/UDIS/SHLife/user/getData' . $param;

	// echo file_get_contents( $request );

	echo file_get_contents( 'http://' .$portal .'/wapi/loader/DA?DSRC='. urlencode($request) );
?>