/**
 * 第一副场景页面
 * @param  {[type]} argument [description]
 * @return {[type]}          [description]
 */
function pageA (element) {
    //根元素
	this.$root = element;
	//小男孩
	this.$boy = element.find(".chs-boy");
	//运行动画
	this.run();
}

/**
 * 运行下一个动画
 * @return {Function} [description]
 */
pageA.prototype.next = function(options) {
    var dfd = $.Deferred();
    this.$boy.transition(options.style, options.time, "linear",function() {
        dfd.resolve()
    });
    return dfd;
}


/**
 * 停止走路
 * @return {[type]} [description]
 */
pageA.prototype.stopWalk = function(){
    this.$boy.removeClass("chs-boy-deer")
}


/**
 * 路径
 * @return {[type]} [description]
 */
pageA.prototype.run = function(callback){
    var that = this;
    var next = function() {
        return this.next.apply(this, arguments)
    }.bind(this)
    //bind 和 call/apply 一样，都是用来改变上下文 this 指向的，不同的是，call/apply 是直接使用在函数上，而 bind 绑定 this 后返回一个函数


    next({
        "time": 10000,
        "style": {
            "top": "4rem",
            "right": "16rem",
            "scale": "1.2"
        }
    })
    .then(function() {
       return next({
            "time":500,
            "style": {
               "rotateY" : "-180",
               "scale": "1.5"
            }
        })
    })    
    .then(function() {
		return  next({
			"time": 7000,
			"style": {
				"top": "7.8rem",
				"right": "1.2rem"
			}
		})
		})
    .then(function(){
        that.stopWalk();
    })  

}


