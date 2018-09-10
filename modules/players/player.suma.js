zapper(
{
	player   : 'player.proto.js',
	observer : '../observer.js'
},
function( $ , module ){

	var player   = module('player');
	var observer = module('observer');
	
	function Player( opt )
	{		
		this.__super__();
		
		this.media = null;
		
		this.w = opt.width;
		this.h = opt.height;
		this.x = opt.left;
		this.y = opt.top;

		this.src      = opt.src 	 || '';
		this.poster   = opt.poster   || '';
		this.autoplay = opt.autoplay || '';
		this.loop     = opt.loop 	 || '';
		
		this.state = {};
		this.cache = {};

		this.init().event();
	}

	Player.prototype = new player();

	Player.prototype.__super__ = function()
	{
		observer.apply( this , arguments );
		return this;
	}

	Player.prototype.extend = $.extend;
	Player.prototype.extend( observer.prototype );
	Player.prototype.extend({
		init : function()
		{
			with(this)
			{
				state.opened = false;
				state.played = false;
				
				media = new MediaPlayer();
				media.createPlayerInstance( 'video', 2 );
				autoplay && play(src).screen();
			}
			return this;
		},

		getCurrentTime : function()
		{
			return this.media.currentPoint;
		},

		getDuration : function()
		{
			return this.media.getMediaDuration();
		},

		getVolume : function()
		{
			return this.media.getMute();
		},
		open : function()
		{
			if( !this.state.opened )
			{
				this.media.source = this.src;
				this.media.refresh();	
				this.state.opened = true;
				return this.trigger('open');
			}
			return this;
		},
		play : function(src)
		{	
			if(!this.media)
			{	
				this.init();
			}
			if( src )
			{
				this.src = src;
			}
			if( !this.state.played )
			{
				if( !this.state.opened )this.open();
				else this.media.play();
				this.trigger('play');
				this.state.played = true;
			}
			return this;
		},

		pause : function()
		{
			if( this.state.played )
			{
				this.media.pause();
				this.state.played = false;
				return this.trigger('pause');
			}
			return this;
		},
		close : function()
		{
			if( this.state.opened )
			{
				this.state.opened = false;
				this.destroy( this.getCurrentTime() );
				return this.trigger('close');
			}
			return this;
		},
		
		destroy : function( time )
		{
			if( this.media )
			{
				this.media.releasePlayerInstance(); 
				this.media.refresh();
				this.media = null;
				this.cache.playtime = time;
				return this.trigger('destroy');
			}
			return this;
		},
		volume : function( v )
		{
			this.trigger("volume");
			return this;
		},

		seek : function( v )
		{
			this.media.point = v;
			this.media.refresh();
			this.trigger('seek');
			return this;
		},
		pace : function( v )
		{
			if( !v )
			{
				this.media.play();
			}
			else
			{
				this.media.pace = v;
				this.media.refresh();
			}
			return this.trigger('pace');
		},
		//屏幕设置
		screen : function(rect)
		{
			var w = rect && rect.w > -1 ? rect.w : this.w,
				h = rect && rect.h > -1 ? rect.h : this.h,
				x = rect && rect.x > -1 ? rect.x : this.x,
				y = rect && rect.y > -1 ? rect.y : this.y;
				
			this.media.position = '0,' + x + ',' + y + ',' + w + ',' +h;
			this.media.refresh();
			this.trigger('screen');
			return this;
		},
		//事件监听
		event : function()
		{
			var M = this.media, __this__ = this,

			codes = 
			{
				10931 : { state : 'loaded'  , msg : '加载完成' },
				10934 : { state : 'waiting' , msg : '等待中' },
				10522 : { state : 'playing' , msg : '播放中' },
				10936 : { state : 'ended'   , msg : '播放完毕' }
			},

			events = 
			{
				'loaded' : function()
				{
					M.play();
					__this__.seek(__this__.cache.playtime);
				},
				'ended'  :function()
				{	
					__this__.loop && __this__.play();//重播不会跑10931，需加视频源
				}
			},

			unknow = { state : 'unknow' , msg : '未知状态' };

			for(var i in events )
			{
				this.on( 'event.' + i , events[i] );
			}

			document.onsystemevent = function( e )
			{
				var code = e.which , event = codes[ code ] || unknow ;
				event.which = code;
				__this__.trigger( 'event.'+ event.state , event );
			};
			return this;
		}
	});

	return Player;

});