//工具方法
var tool = {
    //圣杯模式
    inherit: function (target, origin) {
      function F(){}
      F.prototype = origin.prototype;
      target.prototype  = new F();
      target.prototype.constructor = target;
    },
    //继承模式
    extends:function(origin){
    var result = function(){
         origin.apply(this,arguments)
    }
    this.inherit(result,origin);
    return result;
    },
    //单例模式
    single:function(origin){
        var singleResult=(function(){
            var instance;
            return function(){
                if(typeof instance =='object'){
                    return instance;
                }
                origin && origin.apply(this,arguments)
                instance = this;
            }
        })()
        origin && this.inherit(singleResult,origin)
        return singleResult;
    },
    
}



