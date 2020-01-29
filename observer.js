/**
 * 事件
 * 观察者模式
 */
var Observer = (function(slice) {

    function bind(event, fn) {
        var events = this.events = this.events || {},
        /*if (this._events) {
        do nothing, this._events is already defined
        } else {
        this._events = {};
        } */

            parts = event.split(/\s+/),
           /* /\s+/这是正则表达式。
            \s匹配任何空白字符，包括空格、制表符、换页符等等。等价于[ \f\n\r\t\v]。
            +匹配前面的子表达式一次或多次。
            split( )分割字符串函数; 
            */
            i = 0,
            num = parts.length,
            part;

        if (events[event] && events[event].length) return this;

        for (; i < num; i++) {
            events[(part = parts[i])] = events[part] || [];
            events[part].push(fn);
        }
        return this;
    }

    function one(event, fn) {
        this.bind(event, function fnc() {
            fn.apply(this, slice.call(arguments));
            this.unbind(event, fnc);
        });
        return this;
    }

    function unbind(event, fn) {
        var events = this.events,
            eventName, i, parts, num;

        if (!events) return;

        parts = event.split(/\s+/);
        for (i = 0, num = parts.length; i < num; i++) {
            if ((eventName = parts[i]) in events !== false) {
                events[eventName].splice(events[eventName].indexOf(fn), 1);
                if (!events[eventName].length) { //修正没有事件直接删除空数组
                    delete events[eventName];
                }
            }
        }
        return this;
    }

    function trigger(event) {
        var events = this.events,
            i, args, falg;

        if (!events || event in events === false) return;

        args = slice.call(arguments, 1);
        for (i = events[event].length - 1; i >= 0; i--) {
            falg = events[event][i].apply(this, args);
        }
        return falg; //修正带返回
    }

    return function() {
        this.on =
            this.subscribe = bind;
        this.off =
            this.unsubscribe = unbind;
        this.trigger =
            this.publish = trigger;
        this.one = one;
        return this;
    };
})([].slice);
