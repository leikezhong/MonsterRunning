var baseEntity = require("baseEntity");
cc.Class({
    extends:baseEntity,

    init:function(){
        this._super();
        this.initParams();
        this.initEntity();
    },

    initParams:function(){
        this.nowEntityPos = cc.p(0, 0);
    },

    initEntity:function(){
        this.useEntity = cc.instantiate(cc.loader.getRes("prefab/monster_prefab"));
        this.useEntity.parent = battle.layerManager.playerLayer;

        this.useCollision = this.useEntity.getChildByName("monster_collision").getComponent(cc.BoxCollider);
        if(this.useCollision){
            this.useCollision.host = this;
        }
    },

    getFromPool:function(){
        this._super();
    },

    putInPool:function(){
        this._super();
        this.setEntityPos(-1000, 0);
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

    step:function(){
        this._super();
    },

    clear:function(){
        this._super();
    }
});
