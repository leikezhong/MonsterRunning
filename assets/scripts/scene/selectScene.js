cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.allManager = [
            "dungeonManager"
        ];

        for(let i = 0; i < this.allManager.length; i++){
            let manager = require(this.allManager[i]);
            battle[this.allManager[i]] = new manager();
            battle[this.allManager[i]].init();
        }
    },

    start () {
        cc.director.preloadScene("battleScene", function () {
            cc.log("battleScene preloaded");
        });
    },

    selectDungeonFunc:function(event, customEventData){
        // console.log(event);
        // console.log(customEventData);
        battle.dungeonManager.nowDungeonIndex = customEventData;
        cc.director.loadScene("battleScene");
    }

    // update (dt) {},
});
