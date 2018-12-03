//普通，被角色踩踏会返回，并且与后续的碰撞会让后续的返回
var monsterEntity = require("monsterEntity");
cc.Class({
    extends:monsterEntity,

    initParams:function(){
        this._super();
        this.entityType = gameConst.ENTITY_TYPE.MONSTER1;
        this.prefabName = "roundMouse_prefab";
        this.moveXSpeed = 5;
    },

    resetStatus:function(xPos, yPos, type){
        this.entityYDirect = type;
        this.moveType = -1;
        this.moveXSpeed = 5;
        this.setEntityPos(xPos, type==1?(yPos+this.useCollisionHei*.5):(-yPos-this.useCollisionHei*.5));
    },

    onCollisionEnter:function(other){
        // console.log("enter");
        this._super();
        if(other.entityType == gameConst.ENTITY_TYPE.CHARACTER){
            if(this.entityYDirect == 1){
                if(this.nowEntityPos.y >= other.nowEntityPos.y){
                    battle.battleManager.gameOver();
                }else{
                    this.moveType = 1;
                    this.moveXSpeed = 15;
                    // this.useCollision.enabled = false;
                }
            }else if(this.entityYDirect == -1){
                if(this.nowEntityPos.y <= other.nowEntityPos.y){
                    battle.battleManager.gameOver();
                }else{
                    this.moveType = 1;
                    this.moveXSpeed = 15;
                    // this.useCollision.enabled = false;
                }
            }
        }else if(other.entityType == gameConst.ENTITY_TYPE.MONSTER1){
            this.moveType = -this.moveType;
            this.moveXSpeed = 15;
            this.useCollision.enabled = false;
        }
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