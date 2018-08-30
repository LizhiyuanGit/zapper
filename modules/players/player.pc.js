
// pc 端播放器  实现方式 video ， 谷歌浏览器

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

		// 初始化
		this.init().event();

		// 记录缓存
		this.__volume__      = this.getVolume();
		
		opt.volume 		&& this.volume( opt.volume );
		opt.currentTime && this.currentTime( opt.currentTime );
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
			with( this )
			{
				state.opened = false;
				state.played = false;

				media = document.createElement('video');

				autoplay && this.play( this.src );

				$(media).css({
					position : 'absolute',
					left   : x ,
					top    : y,
					width  : w,
          height : h,
          zIndex : '-99'
				});

				$('body').append( media );
			}
			return this;
		},

		getCurrentTime : function()
		{
			return this.media.currentTime;
		},

		getDuration : function()
		{
			return this.media.duration;
		},

		getVolume : function()
		{
			return this.media.volume;
		},

		play : function( src )
		{
			if( !this.media )
			{
				this.init();
			}

			if( src )
			{
				this.src = src;
				this.media.src = src;
				this.media.play();
			}

			if( !this.state.played )
			{
				!this.state.opened && this.open();
				this.media.play();
				this.state.played = true;
			}			
			return this.trigger('play');
		},

		pause : function()
		{
			if( this.state.played )
			{
				this.media.pause();
				this.state.played = false;
			}			
			return this.trigger('pause');
		},

		open : function()
		{
			if( !this.state.opened )
			{
				this.media.style.display = 'block';
				this.state.played && this.media.play();
				this.state.opened = true;
			}
			return this.trigger('open');
		},

		close : function()
		{
			if( this.state.opened )
			{
				this.media.style.display = 'none'
				this.pause();
				this.state.opened = false;
			}			
			return this.trigger('close');
		},

		destroy : function()
		{
			$( this.media ).remove();
			this.media = null;
			return this.trigger('destroy');
		},

		volume : function( v )
		{
			this.__volume__ = this.getVolume();
			this.media.volume = v * 0.01;
			return this.trigger('volume');
		},

		seek : function( v )
		{
			this.media.currentTime = v;
			return this.trigger('seek');
		},

		screen : function( rect )
		{
			var w = rect.w || this.w,
				h = rect.h || this.h,
				x = rect.x || this.x,
				y = rect.y || this.y;

			$( this.media ).css({
				left   : x,
				top    : y,
				width  : w,
				height : h
			});			
			return this.trigger('screen');
		},

		event : function()
		{
			var M = this.media , __this__ = this,

			events = 
			{
				'ended'  :function()
				{
					__this__.state.played = false;
					__this__.loop && __this__.seek(0).play();
				}
			}

			for(var i in events )
			{
				this.on( 'event.' + i , events[i] );
			}

			$.each({
				'loadedmetadata' : { state : 'loaded'  , msg : '加载完成' },
				'error' 		 : { state : 'error'   , msg : '发现异常' },
				'waiting' 		 : { state : 'waiting' , msg : '等待中' },
				'playing' 		 : { state : 'playing' , msg : '播放中' },
				'ended' 		 : { state : 'ended'   , msg : '播放完毕' }
			},function( i , e ){
				M.addEventListener( i , function( evt ){
					e.which = evt.which;
					__this__.trigger( 'event.' + e.state , e );
				});
			});
			return this;
		}
	});

	return Player;

});