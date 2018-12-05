//普通，被角色踩踏会返回，并且与后续的碰撞会让后续的返回
var monsterEntity = require("monsterEntity");
cc.Class({
    extends:monsterEntity,

    initParams:function(){
        this._super();
        this.entityType = gameConst.ENTITY_TYPE.MONSTER101;
        this.prefabName = "mouse/roundMouse_prefab";
        this.moveXSpeed = battle.nowDungeonManager.dungeonMoveXSpeed;
    },

    resetStatus:function(xPos, yPos, type){
        this.entityYDirect = type;
        this.moveType = -1;
        this.moveXSpeed = battle.nowDungeonManager.dungeonMoveXSpeed;
        this.setEntityPos(xPos, type==1?(yPos+this.useCollisionHei*.5):(-yPos-this.useCollisionHei*.5));
    },

    onCollisionEnter:function(other){
        // console.log("enter");
        if(other.entityType == gameConst.ENTITY_TYPE.CHARACTER){
            if(this.entityYDirect == 1){
                if(this.nowEntityPos.y >= other.nowEntityPos.y){
                    battle.battleManager.gameOver();
                }else{
                    this.moveType = 1;
                    this.moveXSpeed = battle.nowDungeonManager.dungeonMoveXMaxSpeed;
                    // this.useCollision.enabled = false;
                }
            }else if(this.entityYDirect == -1){
                if(this.nowEntityPos.y <= other.nowEntityPos.y){
                    battle.battleManager.gameOver();
                }else{
                    this.moveType = 1;
                    this.moveXSpeed = battle.nowDungeonManager.dungeonMoveXMaxSpeed;
                    // this.useCollision.enabled = false;
                }
            }
        }else if(other.entityType == gameConst.ENTITY_TYPE.MONSTER1){
            this.moveType = -this.moveType;
            this.moveXSpeed = battle.nowDungeonManager.dungeonMoveXMaxSpeed;
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
