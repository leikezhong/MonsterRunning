var baseBuff = require("baseBuff");
cc.Class({
    extends:baseBuff,
    ctor: function () {
        this._super();
        this.buffName = "giddyBuff";
    },

    buffStart:function(){
        this._super();
        this.host.canOperate = false;
    },

    buffComplete:function(){
        this._super();
        this.host.canOperate = true;
    }
})