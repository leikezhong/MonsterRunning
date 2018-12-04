//会爆炸
var monsterEntity = require("monsterEntity");
cc.Class({
    extends:monsterEntity,

    initParams:function(){
        this._super();
        this.entityType = gameConst.ENTITY_TYPE.MONSTER107;
        this.prefabName = "bossMouse_prefab";
        this.moveXSpeed = 5;
    },

    resetStatus:function(xPos, yPos, type){
        this.entityYDirect = type;
        this.moveType = -1;
        this.moveXSpeed = 5;
        this.setEntityPos(xPos, type==1?(yPos+this.useCollisionHei*.5):(-yPos-this.useCollisionHei*.5));
    },

    step:function(){
        this._super();
    },

    moveStep:function(){
        if(this.nowEntityPos.x > battle.battleManager.winSize.width - 200){
            this.setEntityPosX(this.nowEntityPos.x + this.moveType * this.moveXSpeed);
        }
    },

    clear:function(){
        this._super();
    }
});