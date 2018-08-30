zapper({
		player: 'player.proto.js',
		observer: '../observer.js'
	},
	function($, module) {
		var player = module('player');
		var observer = module('observer');

		function Elapsed() {
			var e = 0,
				timer = null;

			function timeStart() {

				!timer && (timer = setInterval(function() {
					e += 1
				}, 1000));
			}

			function timeStop() {
				clearInterval(timer);
				timer = null;
			}

			function getElapsed() {
				return e;
			}

			function setElapsed(v) {

				e = v;
				return e;
			}

			return {
				get: getElapsed,
				set: setElapsed,
				start: timeStart,
				stop: timeStop
			}
		};

		var elapsed = Elapsed();

		function Player(opt) {
			this.__super__();
			this.media = null;
			// this.pos = '';
			this.state = {};

			this.w = opt.width;
			this.h = opt.height;
			this.x = opt.left;
			this.y = opt.top;

			this.src = opt.src || '';
			// this.poster   = opt.poster   || '';
			this.autoplay = opt.autoplay || '';
			this.loop = opt.loop || '';

			this.init();
		}
		Player.prototype = new player();

		Player.prototype.__super__ = function() {
			observer.apply(this, arguments);
			return this;
		}

		Player.prototype.extend = $.extend;
		Player.prototype.extend(observer.prototype);
		Player.prototype.extend({
			init: function() {
				this.state.opened = false;
				this.state.played = false;

				this.media = Object;
				this.autoplay && this.screen().play(this.src);

				return this;
			},

			getCurrentTime: function() {
				// 暂停之后的播放，iPanel.getGlobalVar("VOD_PLAY_TIME") 获取到的是正常的时间
				// 但 此时的视频是replay
				// 所以 实时时间不调用原生的api,而使用定时器

				// return iPanel.getGlobalVar("VOD_PLAY_TIME") || elapsed.get();

				return elapsed.get();
			},

			getEndTime: function() {
				return iPanel.getGlobalVar("VOD_END_TIME");
			},
			getDuration: function() {

				return iPanel.getGlobalVar("VOD_FILM_TIME");
			},

			getVolume: function() {
				return iPanel.getGlobalVar("VOLUME_GET_VOLUME");
			},

			play: function(src) {
				if(!this.media) {
					this.init();
				}

				if(src) {
					this.src = src;
					if(/^\//.test(this.src)) {
						this.src = $.url.protocolHost + this.src;
					}
					this.open();
				} else if(!this.state.opened && !this.state.played) {
					elapsed.stop();
					elapsed.set(0); // 播放之后需要将定时器归零
					this.open();
				} else if(this.state.opened && !this.state.played) {

					iPanel.setGlobalVar("VOD_CTRL_PLAY", "1"); // 播放
					elapsed.stop();
					elapsed.set(0); // 播放之后需要将定时器归零
					elapsed.start();
				}
				this.event();
				this.state.played = true;
				return this.trigger('play');
			},

			pause: function() {
				elapsed.stop();
				iPanel.setGlobalVar("VOD_CTRL_PAUSE", "1");
				this.state.played = false;
				return this.trigger('pause');
			},

			open: function() {
				if(!this.state.opened) {

					iPanel.setGlobalVar("VOD_CTRL_ENABLE_MENU", "0");
					iPanel.setGlobalVar("VOD_CTRL_URL", this.src);
					this.state.opened = true;
				}
				return this.trigger('open');
			},

			close: function() {
				if(this.state.opened) {
					elapsed.stop();
					this.pause();
					iPanel.setGlobalVar("VOD_CTRL_STOP", "1");
					this.state.opened = false;
					return this.trigger('close');
				}

			},

			destroy: function() {
				this.close();
				this.media = null;
				elapsed.set(0);
				return this;
			},

			volume: function(v) {
				iPanel.setGlobalVar("VOLUME_SET_VOLUME ", v + "");
				return this.trigger('volume');
			},

			seek: function(v) {
				// iPanel.setGlobalVar("VOD_CTRL_SEEK", ''+v );
				iPanel.setGlobalVar("VOD_CTRL_PLAY", "1");
				return this.trigger('seek');
			},

			pace: function(v) {
				iPanel.setGlobalVar("VOD_CTRL_SEEK", '' + v);
				return this.trigger('pace');
			},

			screen: function(rect) {
				var w = rect && rect.w > -1 ? rect.w : this.w,
					h = rect && rect.h > -1 ? rect.h : this.h,
					x = rect && rect.x > -1 ? rect.x : this.x,
					y = rect && rect.y > -1 ? rect.y : this.y;

				var pos = 'x=' + x + '&y=' + y + '&w=' + w + '&h=' + h;

				iPanel.setGlobalVar("VOD_CTRL_LOCATION", pos);

				this.trigger('screen');
				return this;
			},

			event: function() {

				var __this__ = this,
					timer,

					codes = {
						"-1": {
							state: 'error',
							msg: '连接服务器失败'
						},
						"-2": {
							state: 'error',
							msg: '播放失败'
						},
						0: {
							state: 'waiting',
							msg: '加载完成'
						},
						1: {
							state: 'loaded',
							msg: '开始播放'
						},
						3: {
							state: 'ended',
							msg: '播放完毕'
						},

						2: {
							state: '__play__',
							msg: '播放'
						},
						4: {
							state: '__pause__',
							msg: '暂停'
						},
					},
					events = {
						'waiting': function() {
							iPanel.setGlobalVar("VOD_CTRL_PLAY", "1");
						},
						'loaded': function() {
							elapsed.start();
						},
						'ended': function() {
							// __this__.state.played = false;
							// __this__.loop && __this__.seek(0).play();
						},
						'__play__': function() {
							//  clearInterval(timer);
							//elapsed.start();
						},
						'__pause__': function() {
							//elapsed.stop();
						}
					},

					unknow = {
						state: 'unknow',
						msg: '未知状态'
					};

				for(var i in events) {
					this.on('event.' + i, events[i]);
				}

				this.systemevent = function() {
					var code = iPanel.getGlobalVar("VOD_PLAY_STATUS"),
						event = codes[code] || unknow;
					if(event.tag) return false;
					event.which = code;
					event.tag = true;

					this.trigger('event.' + event.state, event);
				}
				setInterval(function() {
					__this__.systemevent();
				}, 50)
				this.systemevent();

				return this;
			}
		});

		return Player;

	});