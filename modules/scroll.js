/**
 * Created by L.lawliet on 2018/2/28.
 * 分支 模块
 */

 
zapper({
    observer : 'observer.js'
},function( $ , module ){

    var observer = module('observer');

    function Scroll( opt )
    {
        this.__super__();

        this.index = opt.index || 0;
        this.start = opt.start || 0;

        this.size   = opt.size;
        this.layout = opt.layout || 'y';

        this.init();
    }

    Scroll.prototype.__super__ = function()
    {
        observer.call( this );
    };

    Scroll.prototype.extend = $.extend;
    Scroll.prototype.extend( observer.prototype );
    Scroll.prototype.extend({

        init : function()
        {
            if( this.layout != 'y' )
            {
                this.on('key.up'   ,function(){ this.fire('over.up'); });
                this.on('key.down' ,function(){ this.fire('over.down'); });
                this.on('key.left' ,function(){ this.last(); });
                this.on('key.right',function(){ this.next(); });
            }
            else
            {
                this.on('key.up'   ,function(){ this.last(); });
                this.on('key.down' ,function(){ this.next(); });
                this.on('key.left' ,function(){ this.fire('over.left') });
                this.on('key.right',function(){ this.fire('over.right') });
            }
            return this;
        },

        getData : function ()
        {
            return this.data[ this.getDataIndex() ];
        },

        getDataIndex : function () // 获取数据索引
        {
            return this.start + this.index;
        },

        getPageNumber : function ()
        {
            return Math.floor( this.getDataIndex() / this.size );
        },

        load : function ( data )
        {
            this.data = data;
            this.start++;
            this.pageCount = Math.floor( data.length / this.size );
            this.each( this.start - 1 );
            return this;
        },

        each : function ( start )
        {
            var i = 0, l = this.size , len = this.data.length;
            
            this.data.length < l && ( len = l );

            if( start < 0 || start > len - l || this.start == start ) return this;

            this.start = start;

            this.fire('eachstart');
            
            for( ; i < l ; i++ )
            {
                this.trigger('each', i , this.data[ i + start ] );
            }

            this.fire('eachend');

            return this.fire('load');
        },

        move : function ( step )
        {
            var i = this.index + step, size = this.size - 1;

            if( i > size && this.start == this.data.length - this.size )
            {
                return this.fire( this.layout == 'y' ? 'over.down' : 'over.right');
            }
            else if ( i < 0 && this.start == 0 ) 
            {
                return this.fire( this.layout == 'y' ? 'over.up' : 'over.left');
            }

            this.blur();

            if( i > size )
            {
                var start = this.start + i - size, last = this.data.length - this.size;
                this.each( start > last ? last : start );
                this.index = size;
            }
            else if( i < 0 )
            {
                var start = this.start + i;
                this.each( start < 0 ? 0 : start );
                this.index = 0;
            }
            else if( i > this.data.length - 1)
            {
            	this.index = this.data.length - 1;
            }
            else
            {
                this.index = i;
            }

            this.focus();

            return this.fire('move');
        },

        next : function ( n )
        {
            return this.move( n || 1 ).fire('move.next');
        },

        last : function ( n )
        {
            return this.move( -n || -1 ).fire('move.last');
        },

        turn : function ( page )
        {
            if( page < 0 || page > this.pageCount ) return this;
            return this.each( page * this.size ).fire('turn');
        },

        nextPage : function ()
        {
            var start = this.start + this.size, last = this.data.length - this.size;
                start = start > last ? last : start;
            return this.each( start ).fire('turn.nextpage');
        },

        lastPage : function ()
        {
            var start = this.start - this.size;
                start = start > 0 ? start : 0;
            return this.each( start ).fire('turn.lastpage');
        },

        fire : function( k , args )
        {
            var dataIndex = this.getDataIndex();
            var a = [ k , this.index , this.data[ dataIndex ] , dataIndex ].concat( args );
            return this.trigger.apply( this , a );
        },

        reset : function()
        {
            this.index = 0;
            this.start = 0;
            return this;
        }

    });

    $.each(['focus' , 'blur' , 'enter'],function( i , e ){
        Scroll.prototype[ e ] = function(){
            return this.fire( e );
        }
    });

    return Scroll;

});