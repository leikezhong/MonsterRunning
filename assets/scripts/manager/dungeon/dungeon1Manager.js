cc.Class({
    init:function () {
        // console.log("---init dungeon1Manager---");
        
    },

    initDungeon:function(){
        this.dungeonMonsters = [
            "roundMouseEntity",
            "jumpMouseEntity",
            "impactMouseEntity",
            "bombMouseEntity",
            "laserMouseEntity",
            "fastMouseEntity",
            "bossMouseEntity"
        ];
        this.dungeonEntity = [];
        this.dungeonCount = 0;
        for(let i = 0; i < this.dungeonMonsters.length; i++){
            let nowMonster = require(this.dungeonMonsters[i]);
            this.dungeonEntity.push(nowMonster);
            for(let j = 0; j < 10; j++){
                let mon = new nowMonster();
                mon.init();
                mon.setEntityPos(2000, 0);
                battle.poolManager.putInPool(mon);
            }
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
        let monIndex = Math.floor(battle.battleManager.getRandom() * 6);
        let mon = battle.poolManager.getFromPool(101 + monIndex);
        if(!mon){
            mon = new this.dungeonEntity[monIndex];
            mon.init();
        }else{
            mon.getFromPool();
        }
        let monType = battle.battleManager.getRandom()<0.5?-1:1;
        mon.resetStatus(battle.battleManager.winSize.width, battle.battleManager.winSize.height * .25 * battle.battleManager.getRandom(), monType);
    },

    clear:function(){
        
    }
});
