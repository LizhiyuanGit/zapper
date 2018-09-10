<?php
	header("Content-type:text/html; charset=utf-8");

	/*
	    UCGS - 主体接口
	    @param  :
	        aliasName (网站别名)            	e : aliasName=iRural-SH.sjQ.shdZ.xyC;
	        markCode  (网站标识名称)        	e : markCode=shdZ;
	        colGuid   (栏目ID)             	e : colGuid=149efc9c6cde43649052e918611f9143;
	        level     (需要返回的栏目级数)   	e : level=1,2,3 (将返回1,2,3级栏目  3级之后栏目则不返回)
	        getTopic  (是否获取主题数据)     	e : getTopic=true;
	        getPreview(文章是否包含预览地址)  	e : getPreview=true;
	        tpageSize (主题数量)            	e : tpageSize=10;
	        tpageNumber(当前页码)        		e : tpageNumber=3;
	        jsoncallback(返回以jsonp形式) 	e : jsoncallback=callback;
	*/

	require("/home/services/webroot/lib/IFCenter/IPConfig.php");

	$param = $_SERVER["QUERY_STRING"];

	$param = $param ? '?' . $param : '';

	$request = 'http://'.$UCGS.'/UCGS/data/uRequest/getLabels' . $param;

	echo file_get_contents( $request );
?>

