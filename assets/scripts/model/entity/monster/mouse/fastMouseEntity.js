//会爆炸
var monsterEntity = require("monsterEntity");
cc.Class({
    extends:monsterEntity,

    initParams:function(){
        this._super();
        this.entityType = gameConst.ENTITY_TYPE.MONSTER106;
        this.prefabName = "mouse/fastMouse_prefab";
        this.moveXSpeed = battle.nowDungeonManager.dungeonMoveXSpeed * 2;
    },

    resetStatus:function(xPos, yPos, type){
        this.entityYDirect = type;
        this.moveType = -1;
        this.moveXSpeed = battle.nowDungeonManager.dungeonMoveXSpeed;
        this.setEntityPos(xPos, type==1?(yPos+this.useCollisionHei*.5):(-yPos-this.useCollisionHei*.5));
    },
    
    step:function(){
        this._super();
        this.moveStep();
    },

    moveStep:function(){
        this.setEntityPosX(this.nowEntityPos.x + this.moveType * this.moveXSpeed);
        if(this.nowEntityPos.x < -200 || this.nowEntityPos.x > battle.battleManager.winSize.width + 200){
            battle.poolManager.putInPool(this);
        }
    },

    clear:function(){
        this._super();
    }
});
