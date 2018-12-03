//会爆炸
var monsterEntity = require("monsterEntity");
cc.Class({
    extends:monsterEntity,

    initParams:function(){
        this._super();
        this.entityType = gameConst.ENTITY_TYPE.MONSTER3;
        this.prefabName = "bombMouse_prefab";
        this.moveXSpeed = 5;
        this.moveYSpeed = 3;
    },

    resetStatus:function(xPos, yPos, type){
        this.entityYDirect = type;
        this.moveType = -1;
        this.moveXSpeed = 5;
        this.setEntityPos(xPos, type==1?(yPos+this.useCollisionHei*.5):(-yPos-this.useCollisionHei*.5));
    },

    setMainEntityGiddy:function(){
        if(this.entityYDirect == 1){
            if(battle.battleManager.mainEntity.nowEntityPos.y == 0){
                
            }
        }
        battle.poolManager.putInPool(this);
    },

    step:function(){
        this._super();
        this.moveStep();
    },

    moveStep:function(){
        this.setEntityPos(this.nowEntityPos.x + this.moveType * this.moveXSpeed, this.nowEntityPos.y - this.entityYDirect * this.moveYSpeed);
        if(this.nowEntityPos.x < -200 || this.nowEntityPos.x > battle.battleManager.winSize.width + 200){
            battle.poolManager.putInPool(this);
        }
        if(this.entityYDirect == 1){
            if(this.nowEntityPos.y < 0){
                this.setMainEntityGiddy();
            }
        }else if(this.entityYDirect == -1){
            if(this.nowEntityPos.y > 0){
                this.setMainEntityGiddy();
            }
        }
    },

    clear:function(){
        this._super();
    }
});
