zapper(
{
	player : function( $ )
	{
		return 'players/player.'+ $.browser.platform + '.js';
	}
},
function( $ , module ){

	var player = module('player');

	function Player( opt )
	{
		this.instance = new player( opt );
		this.speed = 1;
		this.wrapper  = document.createElement('div');
		this.init( opt );
	};

	Player.prototype.__className__ = 'Player';

	Player.prototype.__instanceID__ = 0;

	Player.prototype.init = function( opt )
	{
		$( this.wrapper ).css({
			position : 'absolute',
			left   : opt.left ,
			top    : opt.top,
			width  : opt.width,
			height : opt.height,
			zIndex : -99,
		})

		this.wrapper.id = 'player_' + this.__instanceID__;

		$('body').append( this.wrapper );

		Player.__instanceID__++;

		return this;
	}

	Player.prototype.mute = function()
	{
		this.volume( 0 );
		return this;
	}

	Player.prototype.volumeUp = function( v )
	{
		this.volume( v );
		this.instance.trigger('volume.up');
		return this;
	}

	Player.prototype.volumeDown = function( v )
	{
		this.volume( -v );
		this.instance.trigger('volume.down');
		return this;
	}

	Player.prototype.forward = function( v )
	{
		this.seek( this.currentTime() + v );
		this.instance.trigger('seek.forward');
		return this;
	}

	Player.prototype.backward = function( v )
	{
		this.seek( this.currentTime() - v );
		this.instance.trigger('seek.backward');
		return this;
	}

	Player.prototype.fast = function( v )
	{
		if( !v ) this.speed++;
		else this.speed = v;
		this.pace( Math.pow( 2 , this.speed - 1 ) );
		this.instance.trigger('pace.fast');
		return this;
	}

	Player.prototype.slow = function( v )
	{
		if( !v ) this.speed++;
		else this.speed = v;
		this.pace( Math.pow( -2 , this.speed - 1 ) );
		this.instance.trigger('pace.slow');
		return this;
	}

	Player.prototype.restore = function()
	{
		this.speed = 1;
		this.pace( this.speed );
		this.instance.trigger('pace.restore');
		return this;
	}

	Player.prototype.fullScreen = function()
	{
		this.screen();
		return this;
	}

	Player.prototype.windowScreen = function()
	{
		this.screen();
		return this;
	}

	Player.prototype.focus = function()
	{
		this.instance.trigger.call( this , 'focus' , this.wrapper );
		return this;
	}

	Player.prototype.blur = function()
	{
		this.instance.trigger.call( this , 'blur' , this.wrapper );
		return this;
	}

	var __undefined__ = [ undefined ]

	$.each([
		'getDuration',
		'getVolume',
		'getCurrentTime',
		'play',
		'pause',
		'open',
		'close',
		'volume',
		'seek',
		'pace',
		'screen',
		'event',
		'destroy',
		'on',
		'once',
		'trigger',
		'fire'
	],function( i , n ){

		if( /^get/.test( n ) )
		{
			Player.prototype[ n ] = function( v )
			{
				return this.instance[ n ].apply( this.instance , v === undefined ? __undefined__ : arguments );
			}
		}
		else
		{
			Player.prototype[ n ] = function( v )
			{
				this.instance[ n ].apply( this.instance , v === undefined ? __undefined__ : arguments );
				return this;
			}
		}
	});

	return Player;

});