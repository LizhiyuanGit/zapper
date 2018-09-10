zapper({
    config : 'config.js',
},
function( $ , module ){

    var config = module('config');

    var cIP = config.ip;

    // @str  需要修正的字符串    :   {{ucgs}}/demo.html
    // @ip      指定修正ip

    var rip = /\d{0,3}\.\d{0,3}\.\d{0,3}\.\d{0,3}[:\d+]*/;
    var rst = /\{\{(\w+)\}\}/;

    function ipfixer( str , ip )
    {
        var ipstr = str.match( rst );

        if( ipstr && ( ipstr = ipstr[ 1 ].toLowerCase() )  )
        {
            str = str.replace( rst , ip || cIP[ ipstr ] );
        }
        else
        {
            str = str.replace( rip , ip || cIP[ 'portal' ] );
        }

        return str;
    }

    return ipfixer;
});