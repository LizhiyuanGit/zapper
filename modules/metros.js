zapper(
{
    observer : 'observer.js',
    metro    : 'metro.js'
},
function( $ , module ){

    var metro    = module('metro');
    var observer = module('observer');

    function Metros( opt )
    {
        this.__super__();

        this.options = opt;
        this.groups  = [];
        this.index = 0;

        this.cols = opt.cols;
        this.rows = opt.rows;

        this.init();
    }

    Metros.prototype.__super__ = function()
    {
        observer.apply( this , arguments );
        return this;
    };

    Metros.prototype.extend = $.extend;
    Metros.prototype.extend( observer.prototype );
    Metros.prototype.extend({

        __className__ : 'Metros',

        init : function ()
        {
            var __this__ = this;

            $.each([
                'key.up',
                'key.down',
                'key.left',
                'key.right',
                'key.enter',
            ],function( i , evt ){
                __this__.on( evt , function(){
                    __this__.get().fire( evt );
                })
            });
        },

        load : function( data , index )
        {
            index = index || this.index;

            if( this.groups[ index ] ) return this;

            var m = this.createMetro( index ).load( data );

            this.groups[ index ] = m;

            return this;
        },

        createMetro : function( index )
        {
            var m = new metro( this.options ), __this__ = this;

            m.groupIndex = index;

            $.each([
                'eachstart',
                'each',
                'eachend',
                'load',
                'focus',
                'blur',
                'enter',
                'over',
                'over.up',
                'over.down',
                'over.left',
                'over.right',
                'move',
                'move.up',
                'move.down',
                'move.left',
                'move.right',
            ],function( i , evt ){
                m.on( evt , function(){
                    var args = $.arg2arr( arguments );
                        args.unshift( m );
                    __this__.fire( evt , args );
                });
            });

            return m;
        },

        focus : function ()
        {
            this.fire('focus');
            return this;
        },

        blur : function ()
        {
            this.fire('blur');
            return this;
        },

        enter : function ()
        {
            this.fire('enter');
            return this;
        },

        position : function( r , c )
        {
            this.get().position( r , c );
            return this;
        },

        turn : function( i )
        {
            var max = this.groups.length - 1 , index = this.index;

            this.index = i < 0 ? 0 : i > max ? max : i;

            if( index != this.index )
            {
                if( this.index - 1 == index )
                {
                    this.fire('turn.next');
                }
                else if( this.index + 1 == index )
                {
                    this.fire('turn.last');
                }

                return this.fire('turn');
            }

            return this;          
        },

        next : function()
        {
            return this.turn( this.index + 1 );
        },

        last : function()
        {
            return this.turn( this.index - 1 );
        },

        get : function ( i )
        {
            return this.groups[ i || this.index ];
        },

        fire : function ( k , args )
        {
            if( args === undefined )
            {
                var m = this.get(), t = m.getTile() , r = m.rowIndex , c = m.colIndex;
                args = [ m , t , r , c ];
            }
            var a = [ k ].concat( args );
            return this.trigger.apply( this , a );
        },

        reset : function( i )
        {
            this.get( i ).reset();
            return this;
        }
    });


    return Metros;
});