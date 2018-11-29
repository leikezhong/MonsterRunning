cc.Class({
    extends: cc.Component,

    properties: {
       dungeon_layout:cc.Layout
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        battle.resourceManager.loadBaseResource(this.loadComplete.bind(this));
    },

    start () {
        cc.director.preloadScene("battleScene", function () {
            cc.log("battleScene preloaded");
        });
    },

    loadComplete:function(){
        for(let i = 0; i < 10; i++){
            let dungeonBtn = cc.instantiate(cc.loader.getRes("prefab/dungeon_btn_prefab"));
            dungeonBtn.parent = this.dungeon_layout.node;
            dungeonBtn.name = (i + 1) + "";
            dungeonBtn.getChildByName("dungeon_index").getComponent(cc.Label).string = (i + 1);
            dungeonBtn.on(cc.Node.EventType.TOUCH_START, this.selectDungeonFunc, this);
        }
    },

    selectDungeonFunc:function(event){
        // console.log(event);
        battle.dungeonManager.nowDungeonIndex = event.target.name;
        cc.director.loadScene("battleScene");
    }

    // update (dt) {},
});
