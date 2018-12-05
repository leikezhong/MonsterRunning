//会爆炸
var skillEntity = require("skillEntity");
cc.Class({
    extends:skillEntity,

    initParams:function(){
        this._super();
        this.entityType = gameConst.ENTITY_TYPE.SKILL102;
        this.prefabName = "mouse/skill/laserMouseSkill1_prefab";
    },

    resetStatus:function(xPos, yPos){
        this.moveType = 1;
        this.moveXSpeed = 15;
        this.setEntityPos(xPos, yPos);
    },

    onCollisionEnter:function(other){
        // console.log("enter");
        this._super();
        battle.battleManager.gameOver();
        battle.poolManager.putInPool(this);
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
