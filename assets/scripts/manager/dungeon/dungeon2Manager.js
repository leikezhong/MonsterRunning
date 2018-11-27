var monster2Entity = require("monster2Entity");
cc.Class({
    init:function () {
        // console.log("---init dungeon1Manager---");
        
    },

    initDungeon:function(){
        this.dungeonCount = 0;
        for(var i = 0; i < 10; i++){
            var mon = new monster2Entity();
            mon.init();
            mon.setEntityPos(2000, 0);
            battle.poolManager.putInPool(mon);
        }
    },

    step:function(){
        if(battle.battleManager.isGameOver) return;
        this.dungeonCount++;
        if(this.dungeonCount % 120 == 0){
            this.createMonsterStep();
        }
    },

    createMonsterStep : function(){
        let mon = battle.poolManager.getFromPool(gameConst.ENTITY_TYPE.MONSTER1);
        if(!mon){
            mon = new monster2Entity();
            mon.init();
        }else{
            mon.getFromPool();
        }
        let monType = battle.battleManager.getRandom()<0.5?-1:1;
        mon.resetStatus(battle.battleManager.winSize.width, 0, monType);
    },

    clear:function(){
        
    }
});
