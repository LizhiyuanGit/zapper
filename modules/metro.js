zapper(
{
    observer : 'observer.js'
},
function( $ , module ){

     var observer = module('observer');

     function Metro( P )
     {
        this.__super__();

     	this.rows = P.rows;
     	this.cols = P.cols;

     	this.cellWidth  = P.cellWidth  || 120;
        this.cellHeight = P.cellHeight || 100;

        this.gapX = P.gapX || 5;
        this.gapY = P.gapY || 5;

        this.rowIndex = P.rowIndex || 0;
        this.colIndex = P.colIndex || 0;

        this.cacheRow = 0;
        this.cacheCol = 0;

     	this.cells = [];

     	this.layout = P.layout || 'h';
     	this.tileCount = 0;

     	this.init();
     }

     Metro.prototype.__super__ = function()
     {
        observer.apply( this , arguments );
        return this;
     };

     Metro.prototype.extend = $.extend;
     Metro.prototype.extend( observer.prototype );
     Metro.prototype.extend({

     	__className__ : 'Metro', // 标示类名

     	cache : function()
     	{
     		var o = {};
 			return function( k , v )
 			{
 				return v ? o[ k ] : ( o[ k ] = v );
 			}
     	},

     	init : function()
     	{
     		var r = this.rows , c = this.cols;
     		
     		if( !r ) 
     			this.layout = 'v';
     		else if( !c )	 
     			this.layout = 'h';

     		this.on('key.left'  ,function(){ this.move(  0 , -1 ); });
     		this.on('key.right' ,function(){ this.move(  0 ,  1 ); });
     		this.on('key.up'	,function(){ this.move( -1 ,  0 ); });
     		this.on('key.down'  ,function(){ this.move(  1 ,  0 ); });

            this.on('key.enter',function(){ this.enter() });

            return this.fire('init');
     	},

     	load : function( data )
     	{
     		this.data = data;

     		var i = 0 , l = data.length , item , size , tile;

            this.fire('eachstart');

     		for( ; i < l ; i++ )
     		{
     			item = data[ i ];
     			size = item.size.split('*');
     			tile = this.createTile( size[0] * 1 , size[1] * 1 , item );
     			tile && this.trigger( 'each' , tile , this.rowIndex , this.colIndex , i );
     		}

            this.fire('eachend');

     		// 索引修正
     		if( this.rowIndex >= this.cells.length ) 
     			this.rowIndex  = this.cells.length - 1;
     		if( this.colIndex >= this.cells[ this.rowIndex ].length ) 
     			this.colIndex  = this.cells[ this.rowIndex ].length - 1;

     		return this.fire('load');
     	},

     	// 返回值 -1 ：跳过填充 ； 0 ：不可填充； 1 ： 可填充 ， 
     	isEmptyCells : function( _r , _c , _w , _h , cache )
     	{
     		var cells = this.cells , rows = this.rows , cols = this.cols;

            if( rows && _r >= rows ) return -1;
            if( cols && _c >= cols ) return -1;

     		cells[ _r ] || ( cells[ _r ] = [] );
     		if( cells[ _r ][ _c ] ) return 0;

     		// 索引存储
     		cache && cache.call( this , _r , _c );

     		var h = _h + _r ,
     			w = _w + _c ,
     			r , c;

     		for( r = _r ; r < h; r++ )
     		{
     			for( c = _c ; c < w; c++ )
     			{
                    cells[ r ] || ( cells[ r ] = [] );

     				if( cells[ r ][ c ] )
     				{
     					return 0;
     				}
     				else if( rows && cols )
     				{
                        if( r >= rows ) return 0;
                        if( c >= cols ) return 0;
     				}
     				else if( rows && r >= rows ) return 0;
     				else if( cols && c >= cols ) return 0;
     			}
     		}
     		return 1;
     	},

     	createTile : function( w , h , data )
     	{
     		var rows  = this.rows,
     			cols  = this.cols;

     		if( rows && h > rows ) return false;
     		if( cols && w > cols ) return false;

     		var cw = this.cellWidth,
     			ch = this.cellHeight,
     			r  = this.cacheRow, 
     			c  = this.cacheCol,
     			gx = this.gapX,
     			gy = this.gapY,
     			t , 
     			isCache = false;

     		// 计算优化处理
     		var cache = function(){
     			return !isCache && function( r , c ){ 
     				isCache = true; 
     				this.cacheRow = r ;  
     				this.cacheCol = c ; 
     			};
     		}

     		if( this.layout === 'h' )
     		{
     			while( !(t = this.isEmptyCells( r , c , w , h , cache() )) )
	     		{
	     			r = ( r + 1 ) % rows;
	     			r === 0 && ( c++ );
	     		}
     		}
     		else
     		{
     			while( !(t = this.isEmptyCells( r , c , w , h , cache() )) )
	     		{
	     			c = ( c + 1 ) % cols;
	     			c === 0 && ( r++ );
	     		}
     		}

     		if( t === -1 ) return false;

     		return this.saveTile( r , c , w , h , {
     			r : r,
     			c : c,
     			y : r * ch + r * gy,
     			x : c * cw + c * gx,
     			w : w * cw + ( w - 1 ) * gx,
     			h : h * ch + ( h - 1 ) * gy,
     			id : this.tileCount++,
     			data : data
     		});
     	},

     	saveTile : function( _r , _c , _w , _h , tile )
     	{
     		var cells = this.cells , h = _h + _r , w = _w + _c , r , c;

     		for( r = _r; r < h; r++ )
     		{
     			for( c = _c; c < w; c++ )
	     		{
	     			cells[ r ][ c ] = tile;
	     		}
     		}
     		return tile;
     	},

     	focus : function()
     	{
     		return this.fire('focus');
     	},

     	blur : function()
     	{
     		return this.fire('blur');
     	},

        enter : function()
        {
            return this.fire('enter');
        },

     	move : function( r , c , dir )
        {
            var cells = this.cells,
        		rows  = cells.length,
        		cols  = cells[ this.rowIndex ].length;

        	if( !dir )
        	{
        		if( r && r > 0 ) 
        			dir = 'down';
        		else if ( r && r < 0 )
        			dir = 'up';
        		else if ( c && c > 0 )
        			dir = 'right';
        		else if ( c && c < 0 )
        			dir = 'left';
        	}

            var bT = this.cells[ this.rowIndex ][ this.colIndex ],
            	rIndex = this.rowIndex + r,
            	cIndex = this.colIndex + c;

            if( rIndex < 0 )
            {
                this.fire('over.up');
                return this;
            }

            if( rIndex > rows - 1 )
            {
                this.fire('over.down');
                return this;
            }

            if( cIndex < 0 )
            {
                this.fire('over.left');
                return this;
            }

            if( cIndex > cols - 1 || !cells[ rIndex ][ cIndex ] )
            {
                this.fire('over.right');
                return this;
            }

            if( rIndex < 0 || rIndex > rows - 1 ) return this;
            if( cIndex < 0 || cIndex > cols - 1 ) return this;

            var cT = cells[ rIndex ][ cIndex ];

            if( !cT ) return this;

            if( bT != cT )
            {
                this.blur();
                
                this.rowIndex = rIndex;
            	this.colIndex = cIndex;

                this.focus();
                this.fire('move.' + dir);
            }
            else
            {
            	this.rowIndex = rIndex;
            	this.colIndex = cIndex;

                this.move( r , c , dir );
                return this;
            }
        },

        position : function( r , c )
        {
        	r = typeof r == 'number' ? r : this.rowIndex;
        	c = typeof c == 'number' ? c : this.colIndex;

            if( !this.cells[ r ] ) 
                r = this.cells.length - 1;
            if( !this.cells[ r ][ c ] )
                c = this.cells[ r ].length - 1;

            if( this.cells[ r ] && this.cells[ r ][ c ] )
            {
                this.rowIndex = r;
                this.colIndex = c;
            }
            return this;
        },

        getTile : function()
        {
			var rows = this.cells[ this.rowIndex ];
        	return rows && rows[ this.colIndex ];
        },

     	fire : function( k , args )
        {
            var a = [ k , this.getTile() , this.rowIndex , this.colIndex ].concat( args );
            return this.trigger.apply( this , a );
        },

        reset : function()
        {
            this.rowIndex = 0;
            this.colIndex = 0;
            return this;
        }
     });

     return Metro;
});