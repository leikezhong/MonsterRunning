var monsterEntity = require("monsterEntity");
cc.Class({
    extends:monsterEntity,

    initParams:function(){
        this._super();
        this.entityType = gameConst.ENTITY_TYPE.MONSTER1;
        this.moveXSpeed = 5;
    },

    resetStatus:function(xPos, yPos, type){
        this.monType = type;
        this.setEntityPos(xPos, type==0?yPos:-yPos);
    },

    onCollisionEnter:function(other){
        // console.log("enter");
        if(this.monType == 0){
            if(this.nowEntityPos.y > other.nowEntityPos.y){
                battle.battleManager.gameOver();
            }else{
                battle.poolManager.putInPool(this);
            }
        }else{
            if(this.nowEntityPos.y < other.nowEntityPos.y){
                battle.battleManager.gameOver();
            }else{
                battle.poolManager.putInPool(this);
            }
        }
    },

    onCollisionStay:function(other){
        // console.log("stay");
    },

    onCollisionExit:function(other){
        // console.log("exit");
    },

    step:function(){
        this._super();
        this.moveStep();
    },

    moveStep:function(){
        this.setEntityPosX(this.nowEntityPos.x - this.moveXSpeed);
        if(this.nowEntityPos.x < -200){
            battle.poolManager.putInPool(this);
        }
    },

    clear:function(){
        this._super();
    }
});
