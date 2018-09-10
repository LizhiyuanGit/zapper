zapper(
{
	player   : 'player.proto.js',
	observer : '../observer.js'
},
function( $ , module ){

	var player   = module('player');
	var observer = module('observer');

	function Elapsed()
	{
		var e = 0 , timer = null;

		function timeStart()
		{
			!timer && ( timer = setInterval(function(){ e += 1 },1000) );
		}

		function timeStop()
		{
			clearInterval(timer);
			timer = null;
		}

		function getElapsed()
		{
			return e;
		}

		function setElapsed( v )
		{
			e = v;
			return e;
		}

		return {
			get : getElapsed,
			set : setElapsed,
			start : timeStart,
			stop  : timeStop
		}
	};

	var elapsed = Elapsed();

	function Player( opt )
	{		
		this.__super__();

		this.media = null;

		this.state = {};

		this.w = opt.width;
		this.h = opt.height;
		this.x = opt.left;
		this.y = opt.top;

		this.src      = opt.src 	 || '';
		this.poster   = opt.poster   || '';
		this.autoplay = opt.autoplay || '';
		this.loop     = opt.loop 	 || '';

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
			this.state.opened = false;
			this.state.played = false;

			this.media = media.AV;

			this.autoplay && this.play().screen();

			return this;
		},

		getCurrentTime : function()
		{
			return this.media.elapsed || elapsed.get();
		},

		getDuration : function()
		{
			return this.media.duration;
		},

		getVolume : function()
		{
			return media.sound.value;
		},

		play : function( src )
		{
			var isnew = !!src;

			if( this.media && !src && this.state.played && this.state.opened ) return;

			if( !this.media )
			{
				this.init();
			}

			if( src  )
			{
				this.src = src;
			}

			if( /^\//.test( this.src ) )
			{
				this.src = $.url.protocolHost + this.src;
			}

			if( isnew )
			{
				this.state.opened = false;
				this.open();
			}
			else if( !this.state.played && !this.state.opened )
			{
				this.open();
			}
			else if( !this.state.played && this.state.opened )
			{
				this.media.play();
			}
			elapsed.start();
			this.state.played = true;
			return this.trigger('play');
		},

		pause : function()
		{
			if( this.state.played )
			{
				elapsed.stop();
				this.media.pause();
				this.state.played = false;
				return this.trigger('pause');
			}
			return this;
		},

		open : function()
		{
			if( !this.state.opened )
			{
				var prefix = this.src.match(/(\w*):\/\//)[1];
				var preMap =
				{
					'http' : 'HTTP',
					'https' : 'HTTP',
					'igmp' : 'LiveTV'
				};
				this.media.open( this.src, preMap[ prefix ] || 'VOD' );
				this.state.opened = true;
				return this.trigger('open');
			}
			return this;
		},

		close : function()
		{
			if( this.state.opened )
			{

				this.pause();
				this.media.stop();
				this.media.close();
				DVB.stopAV();
				this.state.opened = false;
				this.restore();
				return this.trigger('close');
			}
			return this;
		},

		destroy : function()
		{
			this.close();
			elapsed.set(0);
			this.media = null;
			return this;
		},

		volume : function( v )
		{
			media.sound.value = v ;
			return this.trigger('volume');
		},

		seek : function( v )
		{
			var d =  this.getDuration() , v = v > d ? d : v;
			this.media.seek('' + v );
			elapsed.set( v );
			this.trigger("seek");
			return this;
		},

		pace : function( v )
		{

			v > 0 ? this.media.forward() : this.media.backward();
			//var t = this.media.forward(v);
			//var t =  this.media.backward(v);
			//var t = this.media.slow();

			$("#log").get(0).innerHTML += v;

			return this.trigger('pace');

		},

		screen : function(rect)
		{
			var w = rect && rect.w > -1 ? rect.w : this.w,
				h = rect && rect.h > -1 ? rect.h : this.h,
				x = rect && rect.x > -1 ? rect.x : this.x,
				y = rect && rect.y > -1 ? rect.y : this.y;

			media.video.setPosition( x, y, w, h );
			this.trigger('screen');
			return this;
		},

		event : function()
		{

			var M = this.media, __this__ = this,

			codes = 
			{
				5202 : { state : 'loaded'  , msg : '加载完成' },
				5220 : { state : 'waiting' , msg : '等待中' },
				5222 : { state : 'playing' , msg : '播放中' },
				5210 : { state : 'ended'   , msg : '播放完毕' },
				5221 : { state : 'error'   , msg : 'VOD 切换失败'},
				5203 : { state : 'error'   , msg : '连接服务器失败'},
				5206 : { state : 'error'   , msg : '播放失败'},

				13001 : { state : '__playstart__' , msg : '开始播放'},
				13011 : { state : '__play__' , msg : '播放'},
				13009 : { state : '__pause__' , msg : '暂停'}
			},

			events = 
			{
				'loaded' : function()
				{
					M.play();
					__this__.seek(__this__.getCurrentTime());
				},
				'ended'  :function()
				{
					__this__.state.played = false;
					__this__.loop && __this__.seek(0).play();
				},


				'__playstart__':function() //开启定时器
				{
					elapsed.start();
				},
				__play__:function()
				{
					elapsed.start();
				},
				'__pause__':function()
				{
					elapsed.stop();
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