window.battle = window.battle || {};
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.allManager = [
            "dungeonManager",
            "resourceManager"
        ];

        for(let i = 0; i < this.allManager.length; i++){
            let manager = require(this.allManager[i]);
            battle[this.allManager[i]] = new manager();
            battle[this.allManager[i]].init();
        }

    },

    start () {
        cc.director.preloadScene("selectScene", function () {
            cc.log("selectScene preloaded");
        });
    },

    startGameFunc:function (event) {
        cc.director.loadScene("selectScene");
    },

    // update (dt) {},
});
