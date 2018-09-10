/**
 * Created by L.lawliet on 2018/3/19.
 */
(function(){

    var version = "2.1",
        expando = "zapper" + ( version + Math.random() ).replace( /\D/g, "" );

	var obj = Object;
    	proto = obj.prototype;
    	protoToStr = proto.toString;

    var arr = [];
    	push = arr.push;
    	slice = arr.slice;

    var cssNumber = 
    {
        "animationIterationCount": true,
        "columnCount": true,
        "fillOpacity": true,
        "flexGrow": true,
        "flexShrink": true,
        "fontWeight": true,
        "lineHeight": true,
        "opacity": true,
        "order": true,
        "orphans": true,
        "widows": true,
        "zIndex": true,
        "zoom": true
    };


    var Support =
    {
    	queryByClass : !!document.getElementsByClassName,
    	querySelector: !!document.querySelectorAll
    };

    var TypeStr = 
    {
    	'[object Object]'    : 'object',
        '[object String]'    : 'string',
        '[object Number]'    : 'number',
        '[object Boolean]'   : 'boolean',
        '[object Array]'     : 'array',
        '[object Function]'  : 'function',
        '[object Null]'      : 'null',
        '[object Undefined]' : 'undefined',
        '[object Window]'    : 'window',
        '[object HTMLDocument]' : 'document'
    };

    function type( o )
    {
    	if( o instanceof Array ) return 'array';
        if( typeof o === 'string' )return 'string';
    	if( o === undefined ) return 'undefined';
    	if( o === null ) return 'null';

    	return TypeStr[ protoToStr.call( o ) ];
    };

    function isObject( o )
    { return type( o ) === 'object' };
    function isArray( o )
    { return type( o ) === 'array' };
    function isString( o )
    { return type( o ) === 'string' };
    function isFunction( o )
    { return type( o ) === 'function' };
    function isNumber( o )
    { return type( o ) === 'number' };
    function isBoolean( o )
    { return type( o ) === 'boolean' };
    function isNull( o )
    { return type( o ) === 'null' };
    function isUndefined( o )
    { return type( o ) === 'undefined' };
    function isDocument( o )
    { return o === document };
    function isWindow( o )
    { return o === window };

    function isEmpty( o )
    {
        if( isString( o ) && o === "" ) return true;
        if( isArray( o )  && o.length === 0 ) return true;
        if( isObject( o ) ) {
            for( var i in o ) {
                if( o[ i ] ) return false;
            }
            return true;
        }
        return false;
    };

    function extend()
    {
    	var options, name, src, copy, copyIsArray, clone,

            target = arguments[ 0 ] || {},
            i      = 1,
            length = arguments.length,
            deep   = false;

        if ( typeof target === "boolean" )
        {
            deep   = target;
            target = arguments[ i ] || {};
            i++;
        }
        if ( typeof target !== "object" && typeof target !== 'function' )
        {
            target = {};
        }
        if ( i === length )
        {
            target = this;
            i--;
        }
        for ( ; i < length; i++ )
        {
            if ( ( options = arguments[ i ] ) != null )
            {
                for ( name in options )
                {
                    src  = target[ name ];
                    copy = options[ name ];

                    if ( target === copy )
                    {
                        continue;
                    }
                    if ( deep && copy && ( isObject( copy ) || ( copyIsArray = isArray( copy ) ) ) )
                    {
                        if ( copyIsArray )
                        {
                            copyIsArray = false;
                            clone = src && isArray( src ) ? src : [];
                        }
                        else
                        {
                            clone = src && isObject( src ) ? src : {};
                        }
                        target[ name ] = extend( deep, clone, copy );
                    }
                    else if ( copy !== undefined )
                    {
                        target[ name ] = copy;
                    }
                }
            }
        }
        return target;
    };

    function each( elem , fn )
    {
    	var i , v , len = elem.length;

        if( len || isArray( elem ) )
        {
            for( i = 0 ; i < len ; i++ )
            {
                v = fn( i , elem[ i ] );
                if( v === false ) break;
                if( v !== undefined ) return v;
            }
        }
        else if( isObject( elem ) )
        {
            for( i in elem )
            {
                v = fn( i , elem[ i ] );
                if( v === false ) break;
                if( v !== undefined ) return v;
            }
        }
    };

    function map( elems , callback , args )
    {
    	var length, value,
            i = 0,
            r = [],
            ret = [];

        if ( length = elems.length ) 
        {        	
            for ( ; i < length; i++ ) 
            {
                value = callback( elems[ i ], i, args );

                if ( value != null )
                {
                    ret.push.apply( ret , value.length ? value : [ value ] );
                }
            }
        } 
        else 
        {
            for ( i in elems ) 
            {
                value = callback( elems[ i ], i, args );

                if ( value != null ) 
                {
                    ret.push.apply( ret , value.length ? value : [ value ] );
                }
            }
        }

        return ret;
    };

    function unique( arr ) 
    {
        var results = [] , i = 0 , a;

        for( ; i < arr.length; i++ )
        {
            a = arr[ i ];
            if( inArray( a , results ) === -1 ) results.push( a );
        }

        return results;
    };

    function inArray( elem , arr , i )
    {
        var i = i || 0 ,  l = arr.length ;

        for( ; i < l ; i++ )
        {
            if( arr[ i ] == elem ) return i;
        }

        return -1;
    };

    function arg2arr( arg )
    {
        var arr = [] , i = 0 , l = arg.length;

        for( ; i < l ; i++ )
        {
            arr[ i ] = arg[ i ];
        }

        return arr;
    };

    function DOMCreate( node )
    {
    	return document.createElement( node );
    };

    function DOMParse( text )
    {
    	var e = DOMCreate('div')
    		e.innerHTML = text;
    	return e.childNodes[0].cloneNode( true );
    };

    function DOMEval( text )
    {
    	var script = document.createElement('script');
    		script.text = text;
    	document.head.appendChild( script ).parentNode.removeChild( script );
    };

    function DOMQueryByAttr( attr , val )
    {
    	var all = document.getElementsByTagName('*') , elem,
		i = 0 , len = all.length , results = [];

		for(; i < len ;i++)
		{
			elem = all[ i ];

			if( elem.getAttribute( attr ) == val )
			{
				results.push( elem );
			}
		}
		return results;
    };

    function DOMQuery( seletor )
    {
        var quickExpr = /^(\*|\w+)|#(\w+)|.(\w+)/ , match = quickExpr.exec( seletor ) , m;

        if( match )
        {
            if( m = match[2] )
            {
                return [ document.getElementById( m ) ];
            }
            else if( m = match[3] )
            {
                if( Support.queryByClass )
                {
                    return document.getElementsByClassName( m );
                }
                else
                {
                    return DOMQueryByAttr( 'class' , m );
                }
            }
            else if( m = match[1] )
            {
                return document.getElementsByTagName( m );
            }
        }

        if( Support.querySelector )
        {
            return document.querySelectorAll( seletor );
        }
        
        return [];
    };

    function access( elems , fn , v , chainable )
    {
    	var i = 0 , len = elems.length , e;

    	if( typeof v === 'function' )
    	{
    		for( ; i < len ; i++ )
    		{
    			e = elems[i];
    			fn.call( $( e ) , v.call( e , i ) )
    		}
    	}
    	else if( v !== undefined )
    	{
    		fn.call( elems , v );
    	}

    	if( chainable )
    	{
    		return elems;
    	}

    	return fn.call( elems , v );
    };

    function domManip( elems , value , fn )
    {
    	var node , m , i = 0 , len = elems.length , nocopy = len - 1 , p;

    	if( typeof value === 'string' || typeof value === 'number' )
    	{
    		value += '';

    		if( m = /^<(\w+)>$/.exec( value ) )
	    	{
	    		node = DOMCreate( m[1] );
	    	}
	    	else if( /^<.+>$/.test( value ) )
	    	{
	    		node = DOMParse( value );
	    	}
	    	else
	    	{
	    		node = document.createTextNode( value );
	    	}
    	}
    	else if( value.nodeType == 1 )
    	{
    		node = value;
    	}
    	else if( value.length )
    	{
    		for(; i < value.length ; i++)
    		{
    			domManip( elems , value[i] , fn );
    		}
    		return elems;
    	}

    	for( ; i < len ; i++ )
    	{
    		fn.call( elems[i] , i === nocopy ? node : node.cloneNode(true) );
    	}

    	return elems;
    };

    function regClass( name )
    {
        return new RegExp('(^|\\s)'+name+'(\\s+|$)');
    };

    function classHander( elems , names , callback )
    {
        names = names.split(/\s+/g);

        var i , name;

        for( i = 0 ; i < names.length; i++ )
        {
            name = names[i];

            var reg = regClass( name );

            elems.each(function( i , e ){
                callback.call( e, reg , name );
            });
        }

        return elems;
    };

    function $( seletor )
    {
    	return new $.fn.init( seletor );
    };

    $.fn = 
    {
    	extend : extend,

    	zapper : true,

    	init : function( seletor )
    	{
    		var node , i ,len;

            if( typeof seletor === 'string' )
            {
                if( /^</.test( seletor ) )
                {
                    if( node = /^<(\w+)>$/.exec( seletor ) )
                    {
                        this[0] = DOMCreate( node[1] );
                    }
                    else if( /^<.+>$/.test( seletor ) )
                    {
                        this[0] = DOMParse( seletor );
                    }
                    this.length = 1;
                }
                else
                {
                    var results = DOMQuery( seletor );

                    if( len = results.length )
                    {
                        i = 0 ;
                        for( ; i < len ; i++ )
                        {
                            this[ i ] = results[ i ];
                        }
                        this.length = len;
                    }
                }
            }
            else if( seletor.nodeType )
            {
                this[0] = seletor;
                this.length = 1;
            }
            else if( seletor.zapper )
            {
                return seletor;
            }
            else if( len = seletor.length )
            {
                i = 0 ;
                for( ; i < len ; i++ )
                {
                    this[ i ] = seletor[ i ];
                }
                this.length = len;
            }
    		return this;
    	},

    	get : function( i )
    	{
    		return this[ i ];
    	},

    	eq : function( i )
    	{
    		var len = this.length,
            j = +i + ( i < 0 ? len : 0 );
    		return $( this[ j ] );
    	},

    	first : function()
    	{
    		return this.eq(0);
    	},

    	last : function()
    	{
    		return this.eq(-1);
    	},

    	push : function( arr )
    	{
    		var len = this.length , i = 0;

    		for( ; i < arr.length; i++ )
    		{
    			this[ len++ ].push( arr[ i ] );
    		}

    		return this;
    	},

    	each : function( fn )
    	{
    		each( this , fn );
    		return this;
    	},

    	// 值操作
    	html : function( val )
    	{
            // this.each(function( i , e ){
            //     e.innerHTML = val;
            // });

            // return this;
    		return access( this , function( v ){
    			return v !== undefined ? this.each(function( i , e ){
    				e.innerHTML = v;
    			}) : this.get(0).innerHTML;
    		} , val , arguments.length );
    	},

    	text : function( val )
    	{
			return access( this , function( v ){
    			return v !== undefined ? this.each(function( e ){
    				e.innerText = v;
    			}) : this.get(0).innerText;
    		} , val , arguments.length );
    	},

    	value : function( val )
    	{
    		return access( this , function( v ){
    			return v !== undefined ? this.each(function( e ){
    				e.value = v;
    			}) : this.get(0).value;
    		} , val , arguments.length );
    	},

    	css : function( o )
    	{
    		var p , v;

    		for( p in o )
    		{
    			v = o[ p ];

    			if( typeof v === 'number' && !cssNumber[ p ] ) v += 'px';

    			this.each(function( i , e ){
    				e.style[ p ] = v;
    			});
    		}

    		return this;
    	},

    	// dom 操作
    	append : function( val )
    	{
    		return domManip( this , val , function( elem ){
    			if ( elem && this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
                    this.appendChild( elem, this.firstChild );
                }
    		});
    	},

    	appendTo : function( target )
    	{
    		$( target ).append( this );
    		return this;
    	},

    	prepend: function( val ) {
            return domManip( this, val, function( elem ) {
                if ( elem && this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
                    this.insertBefore( elem, this.firstChild );
                }
            });
        },

        prependTo : function( target )
        {
        	$( target ).prepend( this );
    		return this;
        },

        before: function( val ) {
            return domManip( this, val, function( elem ) {
                if ( elem && this.parentNode ) {
                    this.parentNode.insertBefore( elem, this );
                }
            });
        },

        insertBefore : function( target )
        {
        	$( target ).before( this );
    		return this;
        },

        after: function( val ) {
            return domManip( this, val, function( elem ) {
                if ( elem && this.parentNode ) {
                    this.parentNode.insertBefore( elem, this.nextSibling );
                }
            });
        },

        insertAfter : function( target )
        {
        	$( target ).after( this );
        	return this;
        },

    	remove : function()
    	{
    		this.each(function( i , e ){
    			e.parentNode.removeChild( e );
    		});
    		return this;
    	},

    	// 属性绑定
    	attr : function( k , v )
    	{
    		var a , i;

    		if( typeof k === 'string' && v !== undefined )
    		{
    			a = {};
    			a[ k ] = v;
    		}
    		else if( typeof k === 'object' )
    		{
    			a = k;
    		}
    		else if( typeof k === 'string' && v === undefined )
    		{
    			return this[0].getAttribute( k );
    		}

    		for( i in a )
    		{
    			k = i;
    			v = a[i];

    			this.each(function( i , e ){
    				e.setAttribute( k , v );
    			});
    		}

    		return this;
    	},

    	removeAttr : function( k )
    	{
    		this.each(function( i , e ){
    			e.removeAttribute( k );
    		});

    		return this;
    	},

    	addClass : function( names )
        {
            return classHander( this , names , function( reg , name ){
                if( !reg.test( this.className ) ) this.className = (this.className + ' ' + name).replace(/^\s/ , '');
            });
        },
        removeClass : function( names )
        {
            return classHander( this , names , function( reg , name ){
                if( reg.test( this.className ) ) this.className = this.className.replace( reg , ' ' );
            });
        },
        toggleClass : function( names )
        {
            return classHander( this , names , function( reg , name ){
                if( !reg.test( this.className ) ) this.className = (this.className + ' ' + name).replace(/^\s/ , '');
                else this.className = this.className.replace( reg , ' ' );
            });
        },


    	// 简单效果
    	hide : function()
    	{
    		this.each(function( i , e ){
    			e.style.display = 'none';
    		});
    		return this;
    	},

    	show : function()
    	{
    		this.each(function( i , e ){
    			e.style.display = 'block';
    		});
    		return this;
    	},

    	toggle : function()
    	{
    		var display;

    		this.each(function( i , e ){
    			display = e.style.display;
    			e.style.display = display === 'none' ? 'block' : 'none';
    		});
    		return this;
    	},

    	on : function( event , fn )
    	{
    		this.each(function( i , e ){
    			e.addEventListener( event , fn );
    		});
    		return this;
    	}
    };

    function sibling( cur, dir ) 
    {
        while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
        return cur;
    };

    function siblings( parent, elem ) 
    {
        var matched = [] , elems = parent.children, node , i = 0 , l = elems.length;
        
        if( !elem ) return arr.slice.call( elems );

        for( ; i < l; i++ )
        {
            node = elems[ i ];

            if( elem !== node )
            {
                matched.push( node );
            }
        }
        return matched;
    };

    function dir( elem, dir ) 
    {
        var matched = [];

        while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) 
        {
            if ( elem.nodeType === 1 ) 
            {
                matched.push( elem );
            }
        }
        return matched;
    };

    each({
    	parent: function( elem ) 
        {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function( elem ) 
        {
            return dir( elem, "parentNode" );
        },
        next: function( elem ) 
        {
            return sibling( elem, "nextSibling" );
        },
        prev: function( elem ) 
        {
            return sibling( elem, "previousSibling" );
        },
        nextAll: function( elem ) 
        {
            return dir( elem, "nextSibling" );
        },
        prevAll: function( elem ) 
        {
            return dir( elem, "previousSibling" );
        },
        siblings: function( elem ) 
        {
            return siblings( ( elem.parentNode || {} ), elem );
        },
        children: function( elem ) 
        {
            return siblings( elem );
        },
    },function( name , fn ){

    	$.fn[ name ] = function() 
        {
            var matched = map( this , fn , undefined );
            return $( unique( matched ) );
        };
    })

    $.fn.init.prototype = $.fn;


    $.type = type;
    $.isObject = isObject;
    $.isArray = isArray;
    $.isFunction = isFunction;
    $.isString = isString;
    $.isUndefined = isUndefined;
    $.isNull = isNull;
    $.isBoolean = isBoolean;
    $.isEmpty = isEmpty;
    $.isDocument = isDocument;
    $.isWindow = isWindow;
    $.isNumber = isNumber;

    $.each = each;
    $.extend = extend;
    $.map = map;
    $.unique = unique;
    $.inArray = inArray;
    $.arg2arr = arg2arr;
    $.createElem = DOMCreate;
    $.parseHTML = DOMParse;
    $.select = DOMQuery;
    

    var ua = navigator.userAgent.toLowerCase();

    function core()
    {
        if(/webkit/.test( ua ) && !/chrome/.test( ua )) return 'safari';
        if(/opera/.test( ua ) || /opr/.test( ua )) return 'opera';
        if(/chrome/.test( ua )) return 'chrome';
        if(/mozilla/.test( ua ) && !/msie/.test( ua )) return 'mozilla';
    };

    function platform()
    {
        if(/ipanel/.test( ua )) return 'ipanel'; // 茁壮
        if(/rocme/.test( ua )) return 'suma'; // 数码
        if(/cos/.test(ua)) return 'cos'; // tvos
        try{ if(guangxi && guangxi.getStbNum) return 'ipanel.GX'; }catch (e){}; // 茁壮广西中间件
        return 'pc';
    };

    function local()
    {
    	var map = 
     	{
            "mozilla/4.0(compatible;msie6.0;eisipanel3.0;hi3716m)" : 'SH.songjiang',
            "mozilla/4.0(compatible;msie6.0;eisipanel3.0;trident)" : 'SH.jiading',
        };

        return map[ ua.replace(/\s/g , '') ] || 'local';
    };

    $.browser = 
    {
    	ua : ua,
    	platform : platform(),
    	core : core(),
    	local : local()
    };


    function Url( url )
    {
        var parse = function( param )
        {
            var p = {} , param = param.split('&') , i , pi , p1 , p2;

            for( i in param )
            {
                pi = param[ i ].split('=');
                p1 = pi[ 0 ];
                p2 = pi[ 1 ];
                p[ p1 ] = isNaN( p2 * 1 ) ? p2 : p2 * 1;
            }
            return p;
        };

        var search = location.search.replace(/^\?/,'');

        return {
            host : location.host,
            IP   : location.hostname,
            port : location.port,
            path : location.pathname,
            hash : location.hash,
            href : location.href,
            protocol : location.protocol,
            protocolHost : location.protocol+'//' + location.hostname,
            allPath : location.href.split('?')[0],
            parse : parse,
            search : search,
            param : parse( search ),
        }
    };

    $.url = Url();


    function JSONStringify( obj )
    {
    	var str = '', i , oi;

    	if( isArray( obj ) )
    	{
    		i = 0 ; str += '[';

    		for( i = 0 ; i < obj.length; i++ )
    		{
    			oi = obj[i];

    			if( typeof oi === 'number' )
    			{
    				str += oi + ',';
    			}
    			else if( typeof oi === 'object' || typeof oi === 'array' )
    			{
    				str += JSONStringify( oi ) + ',';
    			}
    			else
    			{
    				str += '"'+ oi +'",';
    			}
    		}

    		str = str.substr(0, str.length - 1);

    		str += ']';
    	}
    	else
    	{
    		str += '{';

    		for( i in obj )
    		{
    			oi = obj[i];

    			if( typeof oi === 'number' )
    			{
    				str += '"'+ i +'":' + oi + ',';
    			}
    			else if( typeof oi === 'object' || typeof oi === 'array' )
    			{
    				str += JSONStringify( oi ) + ',';
    			}
    			else
    			{
    				str += '"'+ i +'":' + '"'+ oi +'",';
    			}
    		}

			str = str.substr(0, str.length - 1);

    		str += '}';
    	}

    	return str;
    };

    $.json = 
    {
    	parse : function( str )
        {
            if( JSON )
            {
                return JSON.parse( str );
            }
            else
            {
                return eval('(' + str + ')')
            }
        },

        toString : function( obj )
        {
        	if( typeof obj === 'object' || typeof obj == 'array' )
        	{
        		if( JSON.stringify )
	        	{
	        		return JSON.stringify( obj );
	        	}
	        	else
	        	{
	        		return JSONStringify( obj );
	        	}
        	}        	
            return typeof obj === 'object' && JSON.stringify( obj )
        }
    };


    // 内置函数

    function createOptions( opt )
    {
        var options = {};
        each( opt.match(/\w+/) || [], function( i , v ){
            options[ v ] = true;
        });

        return options;
    };

    function Callbacks( options ) 
    {
        options = typeof options === "string" ?
            createOptions( options ) :
            extend( {}, options );

        var 
            firing,
            memory,
            fired,
            locked,
            list = [],
            queue = [],
            firingIndex = -1,
            fire = function() 
            {
                locked = options.once;
                fired = firing = true;
                for ( ; queue.length; firingIndex = -1 ) 
                {
                    memory = queue.shift();
                    while ( ++firingIndex < list.length ) 
                    {
                        if ( list[ firingIndex ].apply( memory[ 0 ] , memory[1] || arr  ) === false && options.stopOnFalse ) 
                        {
                            firingIndex = list.length;
                            memory = false;
                        }
                    }
                }

                if ( !options.memory ) 
                {
                    memory = false;
                }

                firing = false;

                if ( locked ) 
                {
                    list = memory ? [] : "" ;
                }
            },

            self = 
            {
                add: function() 
                {
                    if ( list ) 
                    {
                        if ( memory && !firing ) 
                        {
                            firingIndex = list.length - 1;
                            queue.push( memory );
                        }

                        ( function add( args ) {
                            each( args ,function( _ , arg ){
                                if ( typeof arg === 'function' ) 
                                {
                                    if ( !options.unique || !self.has( arg ) ) 
                                    {
                                        list.push( arg );
                                    }
                                } 
                                else if ( arg && arg.length && typeof arg !== 'string' ) 
                                {
                                    add( arg );
                                }
                            });
                        } )( arguments );

                        if ( memory && !firing ) 
                        {
                            fire();
                        }
                    }
                    return this;
                },
                remove: function() 
                {
                    each( arguments, function( _, arg ) 
                    {
                        var index;
                        while ( ( index = inArray( arg, list, index ) ) > -1 ) 
                        {
                            list.splice( index, 1 );
                            if ( index <= firingIndex ) 
                            {
                                firingIndex--;
                            }
                        }
                    } );
                    return this;
                },
                has: function( fn ) 
                {
                    return fn ?
                        inArray( fn, list ) > -1 :
                        list.length > 0;
                },
                empty: function() 
                {
                    if ( list ) 
                    {
                        list = [];
                    }
                    return this;
                },
                disable: function() 
                {
                    locked = queue = [];
                    list = memory = "";
                    return this;
                },
                disabled: function() 
                {
                    return !list;
                },
                lock: function() 
                {
                    locked = queue = [];
                    if ( !memory && !firing ) 
                    {
                        list = memory = "";
                    }
                    return this;
                },
                locked: function()
                {
                    return !!locked;
                },

                fireWith: function( context, args ) 
                {
                    if ( !locked ) 
                    {
                        args = args || [];
                        args = [ context , args ];
                        queue.push( args );
                        if ( !firing )
                        {
                            fire();
                        }
                    }
                    return this;
                },

                fire: function() 
                {
                    self.fireWith( this, arguments );
                    return this;
                },
                fired: function() 
                {
                    return !!fired;
                }
            };

        return self;
    };


    $.Callbacks = Callbacks;


    function Identity( v ) 
    {
        return v;
    };

    function Thrower( ex ) 
    {
        throw ex;
    };

    function adoptValue( value, resolve, reject ) 
    {
        var method;

        try {

            if ( value && isFunction( ( method = value.promise ) ) ) {
                method.call( value ).done( resolve ).fail( reject );
            } else if ( value && isFunction( ( method = value.then ) ) ) {
                method.call( value, resolve, reject );
            } else {
                resolve.call( undefined, value );
            }
        } catch ( value ) {
            reject.call( undefined, value );
        }
    };

    function Deferred( func ) 
    {
        var tuples = [
                [ "notify", "progress", Callbacks( "memory" )       ,Callbacks( "memory" ), 2 ],
                [ "resolve", "done"   , Callbacks( "once memory" )  ,Callbacks( "once memory" ), 0, "resolved" ],
                [ "reject", "fail"    , Callbacks( "once memory" )  ,Callbacks( "once memory" ), 1, "rejected" ]
            ],
            state = "pending",

            promise = 
            {
                state: function() 
                {
                    return state;
                },
                always: function() 
                {
                    deferred.done( arguments ).fail( arguments );
                    return this;
                },
                "catch": function( fn ) 
                {
                    return promise.then( null, fn );
                },
                pipe: function() 
                {
                    var fns = arguments;
                    return Deferred( function( newDefer ) {
                        each( tuples, function( i, tuple ) {
                            var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];
                            deferred[ tuple[ 1 ] ]( function() {
                                var returned = fn && fn.apply( this, arguments );
                                if ( returned && isFunction( returned.promise ) ) {
                                    returned.promise()
                                        .progress( newDefer.notify )
                                        .done( newDefer.resolve )
                                        .fail( newDefer.reject );
                                } else {
                                    newDefer[ tuple[ 0 ] + "With" ](
                                        this,
                                        fn ? [ returned ] : arguments
                                    );
                                }
                            } );
                        } );
                        fns = null;
                    } ).promise();
                },
                then: function( onFulfilled, onRejected, onProgress ) 
                {
                    var maxDepth = 0;
                    function resolve( depth, deferred, handler, special ) 
                    {
                        return function() 
                        {
                            var that = this,
                                args = arguments,
                                mightThrow = function() 
                                {
                                    var returned, then;
                                    if ( depth < maxDepth ) 
                                    {
                                        return;
                                    }

                                    returned = handler.apply( that, args );

                                    if ( returned === deferred.promise() ) 
                                    {
                                        throw new TypeError( "Thenable self-resolution" );
                                    }

                                    then = returned &&
                                        ( typeof returned === "object" ||
                                            typeof returned === "function" ) &&
                                        returned.then;

                                    if ( isFunction( then ) ) 
                                    {

                                        if ( special ) 
                                        {
                                            then.call(
                                                returned,
                                                resolve( maxDepth, deferred, Identity, special ),
                                                resolve( maxDepth, deferred, Thrower, special )
                                            );
                                        } 
                                        else 
                                        {
                                            maxDepth++;

                                            then.call(
                                                returned,
                                                resolve( maxDepth, deferred, Identity, special ),
                                                resolve( maxDepth, deferred, Thrower, special ),
                                                resolve( maxDepth, deferred, Identity,
                                                    deferred.notifyWith )
                                            );
                                        }
                                    } 
                                    else 
                                    {
                                        if ( handler !== Identity ) 
                                        {
                                            that = undefined;
                                            args = [ returned ];
                                        }
                                        ( special || deferred.resolveWith )( that, args );
                                    }
                                },

                                process = special ?
                                    mightThrow :
                                    function() 
                                    {
                                        try 
                                        {
                                            mightThrow();
                                        } 
                                        catch ( e ) 
                                        {
                                            if ( Deferred.exceptionHook ) 
                                            {
                                                Deferred.exceptionHook( e,
                                                    process.stackTrace );
                                            }

                                            if ( depth + 1 >= maxDepth ) 
                                            {
                                                if ( handler !== Thrower ) 
                                                {
                                                    that = undefined;
                                                    args = [ e ];
                                                }

                                                deferred.rejectWith( that, args );
                                            }
                                        }
                                    };

                            if ( depth ) 
                            {
                                process();
                            } 
                            else 
                            {
                                if ( Deferred.getStackHook ) 
                                {
                                    process.stackTrace = Deferred.getStackHook();
                                }
                                window.setTimeout( process );
                            }
                        };
                    }

                    return Deferred( function( newDefer ) 
                    {
                        tuples[ 0 ][ 3 ].add(
                            resolve(
                                0,
                                newDefer,
                                isFunction( onProgress ) ?
                                    onProgress :
                                    Identity,
                                newDefer.notifyWith
                            )
                        );

                        tuples[ 1 ][ 3 ].add(
                            resolve(
                                0,
                                newDefer,
                                isFunction( onFulfilled ) ?
                                    onFulfilled :
                                    Identity
                            )
                        );

                        tuples[ 2 ][ 3 ].add(
                            resolve(
                                0,
                                newDefer,
                                isFunction( onRejected ) ?
                                    onRejected :
                                    Thrower
                            )
                        );
                    } ).promise();
                },

                promise: function( obj ) 
                {
                    return obj != null ? extend( obj, promise ) : promise;
                }
            },

            deferred = {};

        each( tuples, function( i, tuple ) {
            var list = tuple[ 2 ],
                stateString = tuple[ 5 ];

            promise[ tuple[ 1 ] ] = list.add;

            if ( stateString ) 
            {
                list.add(
                    function() 
                    {
                        state = stateString;
                    },
                    tuples[ 3 - i ][ 2 ].disable,

                    tuples[ 0 ][ 2 ].lock
                );
            }

            list.add( tuple[ 3 ].fire );

            deferred[ tuple[ 0 ] ] = function() 
            {
                deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
                return this;
            };

            deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
        } );

        promise.promise( deferred );

        if ( func ) 
        {
            func.call( deferred, deferred );
        }

        return deferred;
    };

    $.Deferred = Deferred;

    function Param( param )
    {
        if( isObject( param ) )
        {
        	var p = '' , i , pi , c = 0;

            for( i in param )
            {
                pi = param[ i ];
                if( isArray( pi ) ) pi = pi.toString();
                else if( typeof pi === 'object' ) pi = $.json.toString( pi );
                p += i + '=' + pi + '&'; 
            }

            p = p.substr( 0 , p.length - 1 );

            return p;
        }
        else if( isString( param) )
        {
        	return param.replace(/^\&*/,'');
        }
        else if( param )
        {
        	return param.toString();
        }
    };

    $.param = Param;


    function DataFactory( responseText , type )
    {
        switch( type.toLowerCase() )
        {
            case 'text' : return responseText;
            case 'json' : return $.json.parse( responseText );
            case 'html' : return DOMParse( responseText );
            case 'script' : return responseText;
            default : return responseText;
        }
    };

    function DataFilter( data )
    {
        return data;
    };

    function Jsonp( url , jsonpCallback , fn )
    {
    	var script = document.createElement('script');
    		script.src = url;

    	var head = document.getElementsByTagName('head')[0];
    		head.appendChild( script );

    	window[ jsonpCallback ] = function( json )
    	{
    		fn( json );
    		window[ jsonpCallback ] = null;
    		head.removeChild( script );
    	}
    };

    function Ajax( opt )
    {
    	var url = opt.url,
    		type = opt.type || 'GET',
    		async = opt.async || true,
    		data = Param( opt.data ),
    		dataType = opt.dataType || 'json',
    		jsonp,
    		jsonpCallback,
    		deferred = Deferred();
    		promise = deferred.promise();

    	if( type.toUpperCase() === 'GET' )
		{
			url += ( /\?/.test( url ) ? '&' : '?' ) + data;
		}

    	if( dataType === 'jsonp' )
    	{
    		jsonp = opt.jsonp || 'callback';
    		jsonpCallback = opt.jsonpCallback || 'jsonpCallback' + Date.parse( new Date() );
    		url += '&' + jsonp + '=' + jsonpCallback;
    		Jsonp( url , jsonpCallback , deferred.resolve );
    	}
    	else
    	{
            var events = [
                false,
                false,
                false,
                false,
                function( xhr )
                {
                    if( xhr.status === 200 )
                    {
                        deferred.resolve( DataFactory( xhr.responseText , dataType ) , xhr , 'success' );
                    }
                }
            ];

    		var xhr = new XMLHttpRequest();

    			xhr.onreadystatechange = function()
    			{
    				promise.readyState = xhr.readyState;
                	promise.status = xhr.status;
                    if( events[ xhr.readyState ] ) events[ xhr.readyState ]( xhr );
    			}

    			xhr.open( type , url, opt.async != false );
    			xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    			xhr.send( type.toUpperCase() === 'POST' ? data : null );
    	}

    	return promise;
    };

    $.ajax = Ajax;

    // 由于机顶盒script onload事件无效  zapper模块化加载器改为同步加载方式
    function Zloader()
    {
    	this.modules = {};
    	this.queue = [];
    	this.cache = {};
    	this.conf = {};
    };

    Zloader.prototype.config = function( conf )
    {
    	return this;
    };

    Zloader.prototype.makeUrl = function( baseurl , targeturl )
    {
        if( typeof targeturl === 'function' )
        {
            targeturl = targeturl( $ );
        }

    	if( /^\//.test( targeturl) ) return $.url.protocolHost + targeturl;

    	baseurl = baseurl.split('/');
    	baseurl.pop();

    	targeturl = targeturl.split('../');
    	var path = targeturl.pop();

    	return baseurl.slice( 0 , baseurl.length - targeturl.length ).concat( path ).join('/');
    };

    Zloader.prototype.addQueue = function( mod )
    {
    	this.queue.push( mod );
    };

    Zloader.prototype.shiftQueue = function()
    {
    	return this.queue.shift();
    };

    Zloader.prototype.getQueue = function( i )
    {
    	return this.queue[ i ];
    };

    Zloader.prototype.getModule = function( key )
    {
    	return this.modules[ key ];
    }

    Zloader.prototype.setModule = function( key , mod )
    {
    	this.modules[ key ] = mod;
    	return this;
    };

    Zloader.prototype.load = function()
    {
    	var mod = this.queue[0] , url;

    	if( !mod ) return this;

    	url = mod.url;

    	if( this.modules[ url ] )
    	{
    		this.shiftQueue();
    		this.load();
    		return this;
    	}

    	var script = document.createElement('script');
    		script.src = url + '?v=' + expando;
    	document.getElementsByTagName('head')[0].appendChild( script );

    	return this;
    };

    Zloader.prototype.getDependencies = function( key )
    {
    	var mod = this.modules[ key ], dep = mod.dependencies , __this__ = this;

    	return function( name )
    	{ 
    		var modkey = dep[ name ];

    		if( !modkey ) return;

    		if( __this__.cache[ modkey ] )
    		{
    			return __this__.cache[ modkey ];
    		}
    		else
    		{
    			var m = __this__.modules[ modkey ];

    			__this__.cache[ modkey ] = m.callback( $ , __this__.getDependencies( modkey ) );

    			return __this__.cache[ modkey ];
    		}
    	};
    };

    Zloader.prototype.triggerModule = function( key )
    {
    	return this.modules[ key ].callback( $ , this.getDependencies( key ) );
    };

    var zloader = new Zloader();

    var rootModule = $.url.allPath;

    function zapper( ids , callback )
    {
    	if( arguments.length == 1 )
    	{
    		callback = ids;
    		ids = undefined;
    	}

    	var mod = zloader.shiftQueue() || { name : rootModule , url : rootModule };
    		mod.dependencies = {};
    		mod.callback = callback;

    	zloader.setModule( mod.url , mod );

    	if( ids && isObject( ids ) )
    	{
    		for( var i in ids )
	    	{
	    		var url = mod.dependencies[ i ] = zloader.makeUrl( mod.url , ids[ i ] )
	    		zloader.addQueue({ name : i , url : url  });
	    	}
    	}

    	zloader.load();

    	if( !zloader.queue.length )
    	{
    		zloader.triggerModule( rootModule );
    	}
    };

    zapper.config = zloader.config;

    window.zapper = zapper;

    window.$ = $;

})();