var monster1Entity = require("monster1Entity");
cc.Class({
    init:function () {
        // console.log("---init dungeon1Manager---");
        
    },

    initDungeon:function(){
        this.dungeonCount = 0;
        for(var i = 0; i < 10; i++){
            var mon = new monster1Entity();
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
            mon = new monster1Entity();
            mon.init();
        }else{
            mon.getFromPool();
        }
        let monType = Math.floor(battle.battleManager.getRandom() * 2);
        mon.resetStatus(battle.battleManager.winSize.width, battle.battleManager.winSize.height * .1 +  battle.battleManager.winSize.height * .3 * battle.battleManager.getRandom(), monType);
    },

    clear:function(){
        
    }
});
