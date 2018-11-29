cc.Class({
    extends: cc.Component,

    properties: {
        mainCamera:cc.Node,
        mainLayer:cc.Node,
        uiLayer:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.allManager = [
            "battleManager",
            "collisionManager",
            "entityManager",
            "layerManager",
            "poolManager",
            "visionManager"
        ];

        this.allManager.push("dungeon" + battle.dungeonManager.nowDungeonIndex + "Manager");
        
        for(let i = 0; i < this.allManager.length; i++){
            let manager = require(this.allManager[i]);
            battle[this.allManager[i]] = new manager();
            battle[this.allManager[i]].init();

            if(i == this.allManager.length - 1){
                battle.nowDungeonManager = battle[this.allManager[i]];
            }
        }
        this.loadComplete();
    },

    loadComplete:function (params) {
        this.initParams();
        battle.layerManager.initAllLayer(this);
        battle.collisionManager.initCollision();
        battle.battleManager.initBattle();
        battle.visionManager.initVision(this.mainCamera);

        battle.nowDungeonManager.initDungeon();
    },

    initParams:function(){
        this.jumpBtn = this.uiLayer.getChildByName("jumpBtn");
        this.changeBtn = this.uiLayer.getChildByName("changeBtn");

        this.jumpBtn.on(cc.Node.EventType.TOUCH_START, this.startJumpFunc, this);
        this.changeBtn.on(cc.Node.EventType.TOUCH_START, this.changeDirectFunc, this);
    },

    startJumpFunc:function(event){
        battle.battleManager.startJumpFunc();
    },

    changeDirectFunc:function(event){
        battle.battleManager.changeDirectFunc();
    },

    update:function(dt){
        battle.entityManager.step();
        battle.visionManager.step();
        battle.battleManager.step();
        battle.nowDungeonManager.step();
    },

    onDestroy:function(){
        console.log("battle scene clear!!!");
        battle.nowDungeonManager.clear();
        battle.battleManager.clear();
        battle.poolManager.clear();
        battle.entityManager.clear();
        battle.layerManager.clear();
        battle.resourceManager.clear();

        for(let i = 0; i < this.allManager.length; i++){
            let manager = require(this.allManager[i]);
            battle[this.allManager[i]] = null;
        }
    }

});
