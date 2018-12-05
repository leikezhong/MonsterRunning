//有角度飞入，碰撞地面，晕眩还在地面的主角
var monsterEntity = require("monsterEntity");
cc.Class({
    extends:monsterEntity,

    initParams:function(){
        this._super();
        this.entityType = gameConst.ENTITY_TYPE.MONSTER103;
        this.prefabName = "mouse/impactMouse_prefab";
        this.moveXSpeed = battle.nowDungeonManager.dungeonMoveXSpeed;
        this.moveYSpeed = 2;
    },

    resetStatus:function(xPos, yPos, type){
        this.entityYDirect = type;
        this.moveType = -1;
        this.moveXSpeed = battle.nowDungeonManager.dungeonMoveXSpeed;
        this.setEntityPos(xPos, type==1?(yPos+this.useCollisionHei*.5):(-yPos-this.useCollisionHei*.5));
    },

    setMainEntityGiddy:function(){
        if(this.entityYDirect == battle.battleManager.mainEntity.entityYDirect){
            //创建特效，晕眩角色
            if(!battle.battleManager.mainEntity.startJumpStatus){
                battle.battleManager.mainEntity.addBuff(gameConst.BUFF_TYPE.GIDDY_BUFF, 120);
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
