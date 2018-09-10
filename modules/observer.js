zapper(function( $ , module ){
    // 观察者
    function Observer()
    {
        this.events = {};
    }

    Observer.prototype.__className__ = 'Observer';
    Observer.prototype.__zapperInstance__ = true;

    Observer.prototype.on = function ( events , fn , once )
    {
        var i = 0 , 
            events = events.replace(/\s+/g,'').split(',') , 
            len = events.length , 
            e = this.events, 
            evt,
            event;

        for( ; i < len ; i++ )
        {
            event = events[ i ]; 

            if( !event ) continue;

            evt = e[ event ] || ( e[ event ] = $.Callbacks() );

            if( !once )
            {
                evt.add( fn );
                continue;
            };

            (function( e , f ){ 
                var callback = function(){ f.apply( this , arguments ); e.remove( callback ); };
                e.add( callback );
            })( evt , fn );
        }

        return this;
    };

    Observer.prototype.once = function ( events , fn )
    {
        return this.on( events , fn , true );
    };

    Observer.prototype.off = function ( event )
    {
        this.events[ event ].empty();
        return this;
    };

    Observer.prototype.remove = function ( event , callback )
    {
        this.events[ event ].remove( callback );
        return this;
    };

    Observer.prototype.trigger = function ()
    {
        var args = $.arg2arr( arguments ), 
            evts = args.shift(),
            i = 0 , 
            events = evts.replace(/\s+/g,'').split(',') , 
            len = events.length,
            event;

        for( ; i < len ; i++ )
        {
            event = events[ i ];
            if( !event ) continue;

            while( event )
            {
                this.events[ event ] && this.events[ event ].fireWith( this , args );
                event = event.substr( 0 , event.lastIndexOf('.') );
            }
            
        }

        return this;
    };

    Observer.prototype.fire = function( k , args )
    {
        return this.trigger.apply( this , [ k ].concat( args ) );
    };

    return Observer;

});