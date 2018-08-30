zapper(
{
	config   : 'config.js'
},
function( $ , module ){

	var config   = module('config'),
		api 	 = config.api,
		device_CA = config.info.CA,
		device_IP = config.info.IP,
		device_MAC = config.info.MAC,
		ext = 
		{
			ucgs : 
			{
				siteData :
				{
					query : 
					{
						aliasName  : config.ucgs.alias,
						getTopic   : true,
						colGuid    : '',
						getTopic   : true,
						getPreview : true,
						tpageSize  : '',
						tpageNumber: '',
						level      : '',
						markCode   : ''
					}
				},
				column : 
				{ 
					query : 
					{ 
						aliasName  : config.ucgs.alias, // 网站别名
						colGuid    : '',                // 栏目ID
						getTopic   : true,              // 是否获取主题数据
						getPreview : true,              // 文章是否包含预览地址
						tpageSize  : '',                // 主题数量
						tpageNumber: '',                // 当前页码
						level      : '',                // 需要返回的栏目级数
						markCode   : ''                 // 网站标识名称
					}
				},

				topic : 
				{
					id : ''
				},

				labels :
				{
					query : 
					{
						aliasName  : config.ucgs.alias,
						colGuid    : '',
						getTopic   : true,
						getPreview : true,
						tpageSize  : '',
						tpageNumber: '',
						level      : '',
						markCode   : ''
					}
				},

				key :
				{
					query :
					{
						guid : '',
						key  : ''
					}
				}
			},

			uams :
			{
				search :
				{
					query :
					{
						GUID  : '',
						UserID: ''
					}
				},

				addHistory : 
				{
					query :
					{
						GUID  : '',
						UserID: ''
					}
				},

				getHistory :
				{
					query :
					{
						UserID    : '',
						pageSize  : '',
						pageNumber: ''
					}
				},

				getCollect :
				{
					query :
					{
						UserID    : '',
						pageSize  : '',
						pageNumber: ''
					}
				},

				collect :
				{
					query :
					{
						GUID  : '',
						UserID: ''
					}
        },
        
        getMedia:
        {
          query :
          {
            FGUID: '',
            Idx  : ''
          }
        },

        addBookMark:
        {
          query :
          {
            GUID : '',
            UserID : 'd3-32-ad-y6-2w-0a',
            CONTENT_TYPE : 'series',
            CONTENT_TIME: ''
          }
        },

        delBookMark:{
          query :
          {
            GUID : '',
            UserID : 'd3-32-ad-y6-2w-0a'
          }
        }
			},

			apps :
			{
				weather :
				{
					query : 
					{
						// type : 'sj'
					}
				},

				realTimeNews :
				{	
					query : 
					{
						did : ''
					}
				},

				backTime :
				{
					query :
					{
						device : ''
					}
				},

				destroyNews : 
				{
					query :
					{
						did : '',
						messId : ''
					}
				},

				voteResult :
				{
					query :
					{
						GID : '', //投票事件的GID
						ItemID : '' //投票事件的下标
					}
				},

				voteRequest :
				{
					query :
					{
						GID : '', //投票事件的GID               
	                	ItemID : '',//投票事件的下标
	                	Title : '',//投票事件名
	                	IPAddr : device_IP, //本机IP 
	                	MacAddr : device_MAC,  //机顶盒MAC
	                	OptionID : '',   //选择的下标
	                	Option : '',  //选择的标题
	                	Deleted : '0',//默认
					}
				},

				//便民查询当天以及未来5天的天气以及温度 
				unifyService_airAndTemp : 
				{
					query :
					{
						ID : '1'
					}
				},
				// 便民查询彩票
				unifyService_lottery : 
				{
					query :
					{
						ID : '5'
					}
				},
				// 便民查询油价
				unifyService_oilPrice : 
				{
					query :
					{
						ID : '4'
					}
				},
				// 便民查询黄金
				unifyService_gold : 
				{
					query :
					{
						ID : '7'
					}
				},
				// 便民查询人民币汇率
				unifyService_rmb : 
				{
					query :
					{
						ID : '8'
					}
				},

				SJnewspaper :
				{
					query :
					{
	                   action : '', // 读取文件
	                   fileName : '/media/imgcache/SJNews.img/', // 文件路径
	                   fileType : 'dir' // 文件类型  fileType = "dir" 获取的文件夹 fileType = "file" 获取文件下的文件
					}
				},

				SHICity_user :
				{
					query :
					{
						IP : device_IP,
						MAC: device_MAC,
						CA : device_CA
					}
				},

				SHICity_saveInfor : 
				{
					query :
					{
						IP    : device_IP, // 本机IP
						MAC   : device_MAC, // 机顶盒MAC号码
						CA    : device_CA, // 机顶盒CA卡号
						uname : '', // 用户名
						idcard: '', // 用户卡号
						param  : {}  // 用户信息保存对象
					}
				},

				SHICity_livelihoodQuery :
				{
					query :
					{
						idnum : '', // 用户名
						idpwd : '', // 用户密码
						id    : ''  // 查询类的下标
					}
				},

				SHICity_KNews_detail : 
				{
					query : 
					{
						id:''
					}
				},

				// 以下接口无参数
				unifyService : {},

				SHICity_ENToSH : {},

				SHICity_ENToHotwords : {},

				SHICity_airQuality : {},

				SHICity_wso : {},

				SHICity_traffic : {},

				SHICity_scenicTraffic : {},

				SHICity_weather : {},
				
				SHICity_KNews : {},
				
				DL_weather :{},

				vote :{},

				time :{}
			}
		};

	var webapi = {};

	$.each( 
		api , 
		function( i , a )
		{
			var e = ext[ i ];
			webapi[ i ] = function( n , query , opt )
			{
				opt = opt || {};
				opt.url  = a[ n ];
				if( !opt.url ){ $.warn('webapi warn : has not api >>>' + n ); return false; }
				opt.data = $.extend( e[ n ] && e[ n ].query , query );
				opt.dataFilter = e[ n ] && e[ n ].filter;
				return $.ajax( opt );
			}
		}
	);

	return webapi;

});