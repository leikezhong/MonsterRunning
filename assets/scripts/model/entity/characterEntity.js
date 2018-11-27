var baseEntity = require("baseEntity");
cc.Class({
    extends:baseEntity,

    init:function(){
        this._super();
        this.initParams();
        this.initEntity();
    },

    initParams:function(){
        this.entityType = gameConst.ENTITY_TYPE.CHARACTER;
        this.nowEntityPos = cc.p(0, 0);
        this.entityYDirect = 1;
        this.startJumpStatus = false;
        this.jumpCut = 0.7;
        this.jumpMaxVelY = 20;
    },

    initEntity:function(){
        this.useEntity = cc.instantiate(cc.loader.getRes("prefab/character_prefab"));
        this.useEntity.parent = battle.layerManager.playerLayer;

        this.useCollision = this.useEntity.getChildByName("character_collision").getComponent(cc.CircleCollider);
        if(this.useCollision){
            this.useRadius = this.useCollision.radius;
            this.useCollision.host = this;
        }
    },

    onCollisionEnter:function(other){
        // console.log("enter");
    },

    onCollisionStay:function(other){
        // console.log("stay");
    },

    onCollisionExit:function(other){
        // console.log("exit");
    },

    setEntityPos:function(xPos, yPos){
        this.nowEntityPos.x = xPos;
        this.nowEntityPos.y = yPos;
        this.useEntity.x = xPos;
        this.useEntity.y = yPos;
    },

    setEntityPosX:function(xPos){
        this.nowEntityPos.x = xPos;
        this.useEntity.x = xPos;
    },

    setEntityPosY:function(yPos){
        this.nowEntityPos.y = yPos;
        this.useEntity.y = yPos;
    },

    startJump:function(){
        if(!this.startJumpStatus){
            this.jumpStartY = this.nowEntityPos.y;
            this.startJumpStatus = true;
            this.jumpVelY = this.jumpMaxVelY;
        }
    },

    changeDirect:function(){
        if(!this.startJumpStatus){
            this.entityYDirect = -this.entityYDirect;
            this.setEntityPosY(this.nowEntityPos.y + this.entityYDirect * this.useRadius * 2);
        }
    },

    step:function(){
        this._super();
        this.jumpStep();
    },

    jumpStep:function(){
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
