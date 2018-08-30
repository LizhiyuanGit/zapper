zapper(
{
    observer : 'observer.js'
},

function( $ , module ){

    var observer = module('observer');

    function Zone( P )
    {
        this.__super__();
        
        this.index = P.index || 0;
        this.rows  = P && P.rows;
        this.cols  = P && P.cols;
        this.cells = this.rows * this.cols;
        this.data  = [];

        this.page = 0;
        this.pageCount = 0;
        this.pageSize = 0;

        this.init();
    }

    Zone.prototype.__super__ = function()
    {
       observer.call( this );
    };

    Zone.prototype.extend = $.extend;
    Zone.prototype.extend( observer.prototype );
    Zone.prototype.extend({

        __className__ : 'Zone', // 标示类名

        getCurrentIndex : function()
        {
            return this.index + this.page * this.cells;
        },

        getCurrentData : function()
        {
            return this.data[ this.getCurrentIndex() ];
        },

        init : function()
        {
            var __this__ = this;

            $.each(['left','right','up','down'],function( i , key ){
                __this__.on('key.' + key , function(){
                    this['move'+ key ]();
                });
            });

            this.on('key.enter',function(){ this.enter() });

            return this.trigger('init');
        },

        load : function( data )
        {
            if( data )
            {
                this.data = data;
                this.pageCount = Math.ceil( this.data.length / this.cells ) - 1;
            }

            if( this.pageCount < 0 )
            {
                return this.trigger('nodata');
            }

            var i = 0 , s = this.page * this.cells , o , pagesize = 0 , r , c;

            this.fire('eachstart');

            for( ; i < this.cells; i++ )
            {
                o = this.data[ i + s ];
                r = Math.floor( i / this.cols );
                c = i % this.cols;
                if( o ) pagesize++;
                this.trigger('each', i , o , r , c );
            }

            this.pageSize = pagesize - 1;

            this.fire('eachend');

            if( this.index > this.pageSize ) this.index = this.pageSize;

            return this.fire('load');
        },

        turnPage : function( page )
        {
            var p = this.page;

            this.page = page < 0 ? 0 : page > this.pageCount ? this.pageCount : page;

            if( p !== this.page ) return this.load().fire('turn');

            return this;
        },

        nextPage : function()
        {
            return this.turnPage( this.page + 1 ) && this.fire('turn.nextpage');
        },

        lastPage : function()
        {
            return this.turnPage( this.page - 1 ) && this.fire('turn.lastpage');
        },

        fire : function( k , args )
        {
            var a = [ k , this.index , this.getCurrentData() ].concat( args );
            return this.trigger.apply( this , a );
        },

        reset : function()
        {
            this.index = 0;
            this.page = 0;
            return this;
        }
    });

    $.each(['focus' , 'blur' , 'enter'],function( i , e ){
        Zone.prototype[ e ] = function(){
            return this.fire( e );
        }
    });

    $.each({
        left  : function( step , fn ){ 
            if( this.index % this.cols != 0 && this.index - step >= 0 )
            {
                return fn.call( this, this.index - step );
            }
        },
        right : function( step , fn ){ 
            if( this.index % this.cols != this.cols - 1 && this.index + step <= this.pageSize )
            {
                return fn.call( this, this.index + step ); 
            }
        },
        up    : function( step , fn ){ 
            step *= this.cols
            if( this.index - step >= 0 )
            {
                return fn.call( this, this.index - step ); 
            }
        },
        down  : function( step , fn ){ 
            step *= this.cols
            if( this.index + step <= this.pageSize )
            {
                return fn.call( this, this.index + step ); 
            }
        },
    },function( n , moveFn ){
        Zone.prototype[ 'move' + n ] = function( step )
        {
            step = step || 1;
            var move = moveFn.call( this , step , function( index ){
                this.blur();
                this.index = index;
                this.focus();
                this.fire('move.' + n);
                return true;
            });

            if( !move ) this.fire('over.' + n );

            return this;
        }
    });

    return Zone;

});