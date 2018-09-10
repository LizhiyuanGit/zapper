/**
 * Created by L.lawliet on 2018/1/8.
 */
zapper(
{
    observer : 'observer.js'
},

function( $ , module ){

    var observer = module('observer');

    function Keyboard()
    {
        this.__super__();
        
        this.target = null;

        var __this__ = this;

        document.onkeydown = function( e )
        {
            var keyCode  = e.keyCode || e.which;
            var keyValue = __this__.getKeyMap( keyCode );

            __this__.trigger('keybefore.' + keyValue , e , keyValue );

            __this__.target && (
            __this__.target.__zapperInstance__ ? 
            __this__.target.fire('key.' + keyValue , [ e , keyValue ] ) : 
            __this__.target( e , keyValue )
            );

            __this__.trigger('key.' + keyValue , e , keyValue );
        }
    }

    Keyboard.prototype.__super__ = function()
    {
       observer.call( this );
    };

    Keyboard.prototype.extend = $.extend;
    Keyboard.prototype.extend( observer.prototype );
    Keyboard.prototype.extend({

        __className__ : 'Keyboard',

        keyMap : {},

        platform : $.browser.platform,

        getKeyMap : function( key )
        {
            return key ? this.keyMap[ this.platform ][ key ] : this.keyMap[ this.platform ];
        },

        define : function( platform , keyMap )
        {
            this.keyMap[ platform ] = keyMap;
            return this;
        },

        update : function( k , v )
        {
            this.keyMap[ this.platform ][ k ] = v;
            return this;
        },

        use : function( platform )
        {
            this.platform = platform;
            return this;
        },

        listen : function( target )
        {
            this.target = target;
            return this;
        }
    });

    var keyboard = new Keyboard();

    keyboard.define('pc' ,{
        48 : 'Num0',
        49 : 'Num1',
        50 : 'Num2',
        51 : 'Num3',
        52 : 'Num4',
        53 : 'Num5',
        54 : 'Num6',
        55 : 'Num7',
        56 : 'Num8',
        57 : 'Num9',

        96  : 'Num0',
        97  : 'Num1',
        98  : 'Num2',
        99  : 'Num3',
        100 : 'Num4',
        101 : 'Num5',
        102 : 'Num6',
        103 : 'Num7',
        104 : 'Num8',
        105 : 'Num9',

        112 : 'F1',
        113 : 'F2',
        114 : 'F3',
        115 : 'F4',
        116 : 'F5',
        117 : 'F6',
        118 : 'F7',
        119 : 'F8',
        120 : 'F9',
        121 : 'F10',
        122 : 'F11',
        123 : 'F12',

        65 : 'a',
        66 : 'b',
        67 : 'c',
        68 : 'd',
        69 : 'e',
        70 : 'f',
        71 : 'g',
        72 : 'h',
        73 : 'i',
        74 : 'j',
        75 : 'k',
        76 : 'l',
        77 : 'm',
        78 : 'n',
        79 : 'o',
        80 : 'p',
        81 : 'q',
        82 : 'r',
        83 : 's',
        84 : 't',
        85 : 'u',
        86 : 'v',
        87 : 'w',
        88 : 'x',
        89 : 'y',
        90 : 'z',

        37 : 'left',
        38 : 'up',
        39 : 'right',
        40 : 'down',

        8  : 'back',
        9  : 'tab',
        13 : 'enter',
        27 : 'esc',
        16 : 'shift',
        17 : 'ctrl',
        18 : 'alt',
        20 : 'capslock',
        32 : 'space',
        91 : 'left_command',
        93 : 'right_command'
    });

    keyboard.define('ipanel' ,{
        1 : 'up',
        2 : 'down',
        3 : 'left',
        4 : 'right',
        13 : 'enter',

        48 : 'Num0',
        49 : 'Num1',
        50 : 'Num2',
        51 : 'Num3',
        52 : 'Num4',
        53 : 'Num5',
        54 : 'Num6',
        55 : 'Num7',
        56 : 'Num8',
        57 : 'Num9',

        338 : 'reload',
        339 : 'quit',
        340 : 'back',

        372 : 'pageup',
        373 : 'pagedown',

        561 : '*',
        562 : 'service',
        564 : 'music',
        567 : 'info',
        570 : 'favourite',

        593 : 'channelup',
        594 : 'channeldown',
        595 : 'volumeup',
        596 : 'volumedown',
        597 : 'mute',

        517 : 'vod',

        832 : 'backward',
        833 : 'play', 
        834 : 'pause',
        835 : 'forward',

        832 : 'F1',
        833 : 'F2',
        834 : 'F3',
        835 : 'F4',

        849 : '#',
        1038 : 'tv',
    });

    keyboard.define('suma' ,{
        48 : 'Num0',
        49 : 'Num1',
        50 : 'Num2',
        51 : 'Num3',
        52 : 'Num4',
        53 : 'Num5',
        54 : 'Num6',
        55 : 'Num7',
        56 : 'Num8',
        57 : 'Num9',

        87 : 'up',
        83 : 'down',
        65 : 'left',
        68 : 'right',

        67 : 'mute',
        73 : 'info',
        8  : 'back',
        27 : 'quit',
        13 : 'enter',
        61 : 'volumeup',
        45 : 'volumedown',
        306 : 'pageup',
        307 : 'pagedown',

        80 : 'tv',
        69 : 'program',
        70 : 'email',
        76 : 'favourite',

        318 : '*',
        319 : '#',
        320 : 'F1',
        321 : 'F2',
        322 : 'F3',
        323 : 'F4',
    });

    keyboard.define('cos' ,{
        48 : 'Num0',
        49 : 'Num1',
        50 : 'Num2',
        51 : 'Num3',
        52 : 'Num4',
        53 : 'Num5',
        54 : 'Num6',
        55 : 'Num7',
        56 : 'Num8',
        57 : 'Num9',

        37 : 'left',
        38 : 'up',
        39 : 'right',
        40 : 'down',
        13 : 'enter',
        4097 : 'enter',
        4096 : 'back',

        82 : 'info',
        61 : 'volumeup',
        45 : 'volumedown',
        306 : 'pageup',
        307 : 'pagedown',
        403 : 'refresh',

        2319 : '*',
        2320 : '#',
        2305 : 'F1',
        2306 : 'F2',
        2307 : 'F3',
        2308 : 'F4'
    });

    keyboard.define('ipanel.GX',{
        48 : 'Num0',
        49 : 'Num1',
        50 : 'Num2',
        51 : 'Num3',
        52 : 'Num4',
        53 : 'Num5',
        54 : 'Num6',
        55 : 'Num7',
        56 : 'Num8',
        57 : 'Num9',

        37 : 'left',
        38 : 'up',
        39 : 'right',
        40 : 'down',
        514 : 'quit', // xin
        13 : 'enter',
        4097 : 'enter',
        8  : 'back',
        399: 'back',
        4096 : 'back',

        2319 : '*',
        2320 : '#',
        2305 : 'F1',
        2306 : 'F2',
        2307 : 'F3',
        2308 : 'F4',

        521 : 'refresh',
        517 : 'volumeup',
        516 : 'volumedown',
        33  : 'pageup',
        34  : 'pagedown',
        82  : 'info',

    });

    if( keyboard.platform === 'ipanel.GX' )
    {
    	iPanel.setGlobalVar('SEND_ALL_KEY_TO_PAGE','1');
    }

    return keyboard;
});