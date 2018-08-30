/**
 * Created by L.lawliet on 2018/1/25.
 */
zapper(function($, module) {
    // 获取设备信息
    function getDeviceInfo()
    {
        var platform = $.browser.platform , 
            device_IP , device_MAC , device_CA , device_REGION;

        switch( platform )
        {
            case 'ipanel' :
                device_IP  = network.ethernets[0].IPs[0].IPAddress;
                device_MAC = network.ethernets[0].MACAddress;
                device_CA  = CA.card.serialNumber;
                device_REGION = '';
                break;
            case 'cos':
                // tvos 无法获取 ip  mac ca 等信息
                device_IP  = $.url.IP;
                device_MAC = 'a1:b2:c3:d4';
                device_CA  = '';
                device_REGION = '';
                break;
            case 'ipanel.GX':
                // 广西 无法获取 ip ca 信息
                device_IP = $.url.IP;
                device_MAC = iPanel.getGlobalVar("MAC_ETH0");
                device_CA  = '';
                device_REGION = '';
              break;
            case 'suma' : 
                device_IP  = Network.ethernets[0].IPs[0].address;
                device_MAC = Network.ethernets[0].MACAddress;
                device_CA  = CA.icNo;
                device_REGION = CA.regionCode;
                break;
            default : 
                device_IP  = $.url.IP;
                device_MAC = 'a1:b2:c3:d4';
                device_CA  = '';
                device_REGION = '';
        }

        return {
            IP  : device_IP,
            MAC : device_MAC,
            CA  : device_CA,
            REGION : device_REGION
        }
    }

    // IP 相关配置
    var HOST = 
    {
        portal: '192.168.0.51', // 门户服务器
        ucgs: '192.168.0.51:8080', // 内容服务器
        uams: '192.168.0.51:8080', // 视频服务器
        ubas: '192.168.0.51:8080' // 
    }

    // 接口 API 相关配置
    var API = 
    {
        ucgs : 
        {
            siteData: '/lib/zapper/webapi/ucgs/siteData.php',
            // ucgs 获取栏目接口
            column : '/lib/zapper/webapi/ucgs/main.php',
            // ucgs 获取正文接口
            topic  : '/lib/zapper/webapi/ucgs/topicData.php',
            // ucgs 获取标签卡接口
            labels : '/lib/zapper/webapi/ucgs/getLabels.php',
            // ucgs 自定义参数
            key: '/lib/zapper/webapi/ucgs/customData.php'
        },

        uams : 
        {
            search: '/lib/zapper/webapi/uams/search.php',
            // 云南大理 - 列表页 添加历史记录
            addHistory: '/lib/zapper/webapi/uams/history.php',
            // 云南大理 - 列表页 获取历史记录
            getHistory: '/lib/zapper/webapi/uams/gethistory.php',
            // 云南大理 - 列表页 获取收藏
            getCollect: '/lib/zapper/webapi/uams/getcollect.php',
            // 云南大理 - 列表页 收藏功能
            collect: '/lib/zapper/webapi/uams/collect.php',
            
            // player  - 播控 获取剧集资源
            getMedia: '/lib/zapper/webapi/uams/getMedia.php',
            // player  - 播控 保存播放记录
            addBookMark: '/lib/zapper/webapi/uams/addBookMark.php',
            // player  - 播控 删除播放资源
            delBookMark: '/lib/zapper/webapi/uams/delBookMark.php'
        },

        // 应用类接口
        apps : 
        {
            time : '/lib/zapper/webapi/apps/time.php',
            // 松江气象
            weather : '/lib/zapper/webapi/apps/SJweather.php',
            // 获取实时消息
            realTimeNews: '/lib/zapper/webapi/apps/monitor/realTimeNews.php',
            // 
            backTime: '/lib/zapper/webapi/apps/monitor/backTime.php',
            // 销毁实时消息
            destroyNews: '/lib/zapper/webapi/apps/monitor/destroyNews.php',
            // 电视投票
            vote: '/lib/zapper/webapi/apps/vote.php',
            // 电视投票 - 获取投票结果
            voteResult: '/lib/zapper/webapi/apps/result.php',
            // 
            voteRequest: '/lib/zapper/webapi/apps/request.php',
            // 松江报
            SJnewspaper: '/lib/zapper/webapi/apps/SJnews.php',

            // 便民服务首页
            unifyService : '/lib/zapper/webapi/apps/unifyService.index.php',
            // 便民服务-获取当天以及未来5天的天气以及温度
            unifyService_airAndTemp: '/lib/zapper/webapi/apps/unifyService.php',
            // 便民服务-彩票
            unifyService_lottery: '/lib/zapper/webapi/apps/unifyService.php?ID=5',
            // 便民服务-油价
            unifyService_oilPrice: '/lib/zapper/webapi/apps/unifyService.php?ID=4',
            // 便民服务-黄金
            unifyService_gold: '/lib/zapper/webapi/apps/unifyService.php?ID=7',
            // 便民服务-人民币汇率
            unifyService_rmb: '/lib/zapper/webapi/apps/unifyService.phpID=8',
            
            //大理天气
            DL_weather : '/lib/zapper/webapi/apps/weather.show.php',

            //上海生活--


            // 首页json
            SHICity_index: '/lib/zapper/webapi/apps/SH.iCityLife/index.php',
            // 文艺早知道
            SHICity_wso: '/lib/zapper/webapi/apps/SH.iCityLife/wso.php',
            // 当前天气及用户信息
            SHICity_user: '/lib/zapper/webapi/apps/SH.iCityLife/user.php',
            // 路况信息
            SHICity_traffic: '/lib/zapper/webapi/apps/SH.iCityLife/traffic.php',
            // 景区实时客流
            SHICity_scenicTraffic: '/lib/zapper/webapi/apps/SH.iCityLife/scenic.php',
            // 上海生活-用户信息保存
            SHICity_saveInfor: '/lib/zapper/webapi/apps/SH.iCityLife/save.php',
            // 民生查询 - 根据用户名，密码进行查询
            SHICity_livelihoodQuery: '/lib/zapper/webapi/apps/SH.iCityLife/query.php',
            // 英语解沪语
            SHICity_ENToSH: '/lib/zapper/webapi/apps/SH.iCityLife/esh.php',
            // 英文翻热词
            SHICity_ENToHotwords: '/lib/zapper/webapi/apps/SH.iCityLife/e2c.php',
            // 空气质量
            SHICity_airQuality: '/lib/zapper/webapi/apps/SH.iCityLife/aqi.php',
            // 上海天气
            SHICity_weather: '/lib/zapper/webapi/apps/SH.iCityLife/weather.php',
            // 看看新闻
            SHICity_KNews: '/lib/zapper/webapi/apps/SH.iCityLife/KNews.php',
            // 看看新闻详情页
            SHICity_KNews_detail: '/lib/zapper/webapi/apps/SH.iCityLife/Knews.detailPage.php'
        }
            
    }

    // UCGS 站点配置
    var UCGS = 
    {
        alias: 'iRural-SH.SJ'
    }
  
    var INFO = getDeviceInfo();

    return {
        ip: HOST,
        api: API,
        ucgs: UCGS,
        info: INFO,
    }
});