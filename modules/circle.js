/**
 * Created by L.lawliet on 2018/3/5. 项目测试
 */
zapper({
    observer : 'observer.js'
},function( $ , module ){

    var observer = module('observer');

    function Circle( opt )
    {
        this.__super__();

        this.index = opt.index || 0;
        this.start = opt.start || 0;

        this.size = opt.size || 0;
        this.layout = opt.layout || 'x';

        this.init();
    }

    Circle.prototype.__super__ = function()
    {
        observer.call( this );
    };

    Circle.prototype.extend = $.extend;
    Circle.prototype.extend( observer.prototype );
    Circle.prototype.extend({

        getDataIndex : function ()
        {
            return ( this.start + this.index ) % this.data.length;
        },

        getData : function ()
        {
            return this.data[ this.getDataIndex() ];
        },

        init : function ()
        {
            if( this.layout == 'y' )
            {
                this.on('key.down' ,function(){ this.next(); });
                this.on('key.up'   ,function(){ this.last(); });
                this.on('key.left' ,function(){ this.fire('over.left'); });
                this.on('key.right',function(){ this.fire('over.right'); });
            }
            else
            {
                this.on('key.right',function(){ this.next(); });
                this.on('key.left' ,function(){ this.last(); });
                this.on('key.down' ,function(){ this.fire('over.down'); });
                this.on('key.up'   ,function(){ this.fire('over.up'); });
            }

            this.on('key.enter',function(){ this.enter() });
            return this;
        },

        load : function ( data )
        {
            this.data = data;
            this.start++;
            return this.each( this.start - 1 );
        },

        each : function ( start )
        {
            var t = this.data.length,
                s = ( start % t + t ) % t;

            if( this.start == s ) return this;

            this.start = s;

            var i = 0, l = this.size,  dataIndex ;

            this.fire('eachstart');

            for( ; i < l ; i++ )
            {
                dataIndex = ( i + s ) % t ;
                this.trigger('each', i , this.data[ dataIndex ] , dataIndex );
            }

            this.fire('eachend');

            return this.fire('load');
        },

        move : function ( step )
        {
            return this.blur().each( this.start + step ).fire('move').focus();
        },

        next : function ()
        {
            return this.move( 1 ).fire('move.next');
        },

        last : function ()
        {
            return this.move( -1).fire('move.last');
        },

        fire : function ( k , args )
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
        Circle.prototype[ e ] = function(){
            return this.fire( e );
        }
    });

    return Circle;
});