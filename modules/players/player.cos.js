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
		}
		var elapsed = Elapsed();

		function Player(opt) {
			this.__super__();

			this.media = null;
			this.id = null;

			this.w = opt.width;
			this.h = opt.height;
			this.x = opt.left;
			this.y = opt.top;

			this.src = opt.src || '';
			this.poster = opt.poster || '';
			this.autoplay = opt.autoplay || '';
			this.loop = opt.loop || '';

			this.state = {};

			this.init().event();
			// cos browser/3.0.0
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

				this.media = new MediaPlayer();
				this.id = this.media.getPlayerInstanceID();
				this.media.bindPlayerInstance(this.id);
				this.media.enableTrickMode(1); // 允许特殊操作

				this.open().screen();
				this.autoplay && this.play(this.src);
				return this;
			},

			getCurrentTime: function() {

				var ct = 0,
					arr = this.media.getCurrentPlayTime().match(/:/g);

				if(arr && arr.length) {
					ct = Number(arr[0] * 3600) + Number(arr[2] * 60) + Number(arr[3]);
				} else {
					ct = this.media.getCurrentPlayTime();
				}

				return ct || elapsed.get();
			},

			getDuration: function() {
				return this.media.getMediaDuration();
			},

			getVolume: function() {
				return this.media.getVolume();
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

					this.media.setMediaSource(this.src);
				}
				if(!this.state.played) {
					if(!this.state.opened) {
						this.open();
					}
					this.state.played = true;
					elapsed.set(0); // 再次播放，视频都是重新开始播
					this.media.play(); // 松江tvos会重新播放 仪电tvos不会
					elapsed.start();
					return this.trigger('play');
				}
				return this;
			},

			pause: function() {
				elapsed.stop();
				if(this.state.played) {
					this.media.pause();
					this.state.played = false;
					return this.trigger('pause');
				}
				return this;
			},

			open: function() {
				if(!this.state.opened) {
					this.media.setVideoDisplayMode(0);
					this.media.refresh();
					this.state.opened = true;
					this.state.played && this.media.play();
					return this.trigger('open');
				}
				return this;
			},

			close: function() {
				elapsed.stop();
				if(this.state.opened) {
					this.media.setVideoDisplayMode(255);
					this.media.refresh();
					this.state.opened = false;
					this.pause();
					return this.trigger('close');
				}
				return this;
			},

			destroy: function() {
				if(this.media) {
					this.media.unbindPlayerInstance(this.id);
					this.media.refresh();
					this.media = null;
					elapsed.set(0);
					this.close();
					return this.trigger('destroy');
				}
				return this;
			},

			volume: function(v) {
				this.media.setVolume(v);
				this.media.refresh();
				return this.trigger('volume');
			},

			seek: function(v) {
				// 每次seek 视频重新播放
				this.media.seek(1, v);
				this.media.refresh();
				elapsed.set(0);
				return this.trigger('seek');
			},

			pace: function(v) {
				if(v == 0) {
					this.media.resume();
				} else {
					this.media.setPace(v);
				}
				this.media.refresh();
				return this.trigger('pace');
			},

			screen: function(Pos) {
				var rect = new Rectangle();

				rect.left = Pos && Pos.x > -1 ? Pos.x : this.x;
				rect.top = Pos && Pos.y > -1 ? Pos.y : this.y;
				rect.width = Pos && Pos.w > -1 ? Pos.w : this.w;
				rect.height = Pos && Pos.h > -1 ? Pos.h : this.h;

				this.media.setVideoDisplayArea(rect);

				this.media.refresh();

				return this.trigger('screen');
			},

			event: function() {
				var M = this.media,
					__this__ = this,

					codes = {
						// 13007 : { state : 'loaded'  , msg : '加载完成' },
						// 13051 : { state : 'ended'   , msg : '播放完毕' }

						// 13008 : { state : 'loaded'  , msg : '加载完成' }, // 04/19 仪电tvos
						13001: {
							state: 'loaded',
							msg: '加载完成'
						}, // 04/19 松江tvos 
						13051: {
							state: 'ended',
							msg: '播放完毕'
						},

						13003: {
							state: '__play__',
							msg: '播放'
						},
						13009: {
							state: '__pause__',
							msg: '暂停'
						}
					},

					events = {
						'loaded': function() {
							M.play();
						},
						'ended': function() {
							__this__.state.played = false;
							__this__.loop && __this__.seek(0).play();
						},
						__play__: function() {
							elapsed.start();
						},
						__pause__: function() {
							elapsed.stop();
						}
					},

					unknow = {
						state: 'unknow',
						msg: '未知状态'
					};

				for(var i in events) {
					this.on('event.' + i, events[i]);
				}

				document.onsystemevent = function(e) {

					var code = e.which,
						event = codes[code] || unknow;
					event.which = code;
					// 无code的时候不进行trigger
					codes[code] && __this__.trigger('event.' + event.state, event);
				};

				return this;
			}
		});

		return Player;

	});