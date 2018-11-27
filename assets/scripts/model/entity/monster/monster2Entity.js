var monsterEntity = require("monsterEntity");
cc.Class({
    extends:monsterEntity,

    initParams:function(){
        this._super();
        this.entityType = gameConst.ENTITY_TYPE.MONSTER1;
        this.prefabName = "monster1_prefab";
        this.moveXSpeed = 5;
        this.startJumpStatus = false;
        this.jumpCut = 0.7;
        this.jumpMaxVelY = 20;
        this.preJumpCount = 0;
    },

    resetStatus:function(xPos, yPos, type){
        this.entityYDirect = type;
        this.moveType = -1;
        this.moveXSpeed = 5;
        this.setEntityPos(xPos, type==1?(yPos+this.useCollisionHei*.5):(-yPos-this.useCollisionHei*.5));
    },

    startJump:function(){
        if(!this.startJumpStatus){
            this.jumpStartY = this.nowEntityPos.y;
            this.startJumpStatus = true;
            this.jumpVelY = this.jumpMaxVelY;
        }
    },

    onCollisionEnter:function(other){
        // console.log("enter");
        if(other.entityType == gameConst.ENTITY_TYPE.CHARACTER){
            if(this.entityYDirect == 1){
                if(this.nowEntityPos.y >= other.nowEntityPos.y){
                    battle.battleManager.gameOver();
                }else{
                    this.moveType = 1;
                    this.moveXSpeed = 15;
                    this.useCollision.enabled = false;
                }
            }else if(this.entityYDirect == -1){
                if(this.nowEntityPos.y <= other.nowEntityPos.y){
                    battle.battleManager.gameOver();
                }else{
                    this.moveType = 1;
                    this.moveXSpeed = 15;
                    this.useCollision.enabled = false;
                }
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
        this.jumpStep();
    },

    moveStep:function(){
        this.setEntityPosX(this.nowEntityPos.x + this.moveType * this.moveXSpeed);
        if(this.nowEntityPos.x < -200 || this.nowEntityPos.x > battle.battleManager.winSize.width + 200){
            battle.poolManager.putInPool(this);
        }
    },

    jumpStep:function(){
        if(battle.battleManager.mainEntity
             && battle.battleManager.mainEntity.entityYDirect == this.entityYDirect 
             && battle.battleManager.mainEntity.startJumpStatus 
             && !this.startJumpStatus){
            this.preJumpCount++;
            if(this.preJumpCount > 20){
                this.preJumpCount = 0;
                this.startJump();
            }
        }
        if(this.startJumpStatus){
            this.setEntityPosY(this.nowEntityPos.y + this.jumpVelY * this.entityYDirect);
            if(this.entityYDirect == 1){
                if(this.nowEntityPos.y < this.jumpStartY){
                    this.setEntityPosY(this.jumpStartY);
                    this.startJumpStatus = false;
                    return;
                }
            }else{
                if(this.nowEntityPos.y > this.jumpStartY){
                    this.setEntityPosY(this.jumpStartY);
                    this.startJumpStatus = false;
                    return;
                }
            }
            this.jumpVelY -= this.jumpCut;
        }
    },

    clear:function(){
        this._super();
    }
});
