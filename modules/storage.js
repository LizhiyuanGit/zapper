zapper(function( $ ){

    var storageSupport =
    {
        cookie       : document.cookie != undefined,
        localStorage : !!window.localStorage
    };

    var rKey = $.browser.platform === 'ipanel' && new RegExp('/','g');

    var storageMethod =
    {
        cookie :
        {
            set : function ( k , v )
            {
                k = rKey ? k.replace( rKey ,'-' ) : k;
                var date = new Date(),
                    days = 30;
                date.setTime( date.getTime() + days * 24 * 60 * 60 * 1000 );
                document.cookie = k + '=' + v + ';expires=' + date.toGMTString() +';path=/;';
                return v;
            },
            get : function ( k )
            {
                k = rKey ? k.replace( rKey ,'-' ) : k;
                var c = document.cookie.match( new RegExp("(^| )"+ k +"=([^;]*)(;|$)") );
                if( c ) return unescape( c[2] );
                return undefined;
            },
            remove : function ( k )
            {
                var date = new Date(),
                    v    = this.get( k );
                date.setTime( date.getTime() - 1 );
                if( $.browser.platform == 'ipanel.GX' ){ date.setTime( date.getTime() + 1000 ); v = ''; } // 广西机顶盒补丁, 机顶盒不会自行清理cookie
                if( v != null ) document.cookie = k + '=' + v + ';expires=' + date.toGMTString() + ';path=/';
                return undefined;
            },
            clear : function ()
            {
                var keys = document.cookie.match(/[^ =;]+(?=\=)/g);

                if( keys )
                {
                    for ( var i = 0; i < keys.length; i++ )
                    {
                        document.cookie = keys[i] + '=0;expires=' + new Date( 0 ).toUTCString() + ';path=/';
                    }
                }
                return this;
            }
        },

        localStorage :
        {
            set : function ( k , v )
            {
                return localStorage[ k ] = v;
            },
            get : function ( k )
            {
                return localStorage[ k ];
            },
            remove : function ( k )
            {
                return localStorage.removeItem( k );
            },
            clear : function ()
            {
                return localStorage.clear();
            }
        }
    };

    var method = storageSupport.localStorage ? storageMethod.localStorage :
                 storageSupport.cookie       ? storageMethod.cookie : false;

    function Storage( item )
    {
        var v;
        for( var i in item )
        {            
            if( !this[ i ] )
            {
                v = method.get( i );
                v == undefined ? this.save( i , item[ i ] ) : ( this[ i ] = isNaN( v * 1 ) ? v : v * 1)
            }
        }
    }

    Storage.prototype.save = function ( k , v )
    {
        if( !k ) return this;

        if( !v && typeof k == 'object' )
        {
            for( var i in k )
            {
                this[ i ] = method.set( i , k[ i ] );
            }
            return this;
        }
        this[ k ] = method.set( k , v );
        return this;
    };

    Storage.prototype.remove = function ( k )
    {
        method.remove( k );
        this[ k ] = undefined;
        return this;
    };

    Storage.prototype.clear = function ()
    {
        method.clear();
        return this;
    };

    return Storage;

});