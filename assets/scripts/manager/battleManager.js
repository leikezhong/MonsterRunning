var characterEntity = require("characterEntity");
cc.Class({
    init:function () {
        // console.log("---init battleManager---");
        
    },

    initBattle:function(){
        this.winSize = cc.director.getWinSize();
        this.isGameOver = false;
        
        this.mainMoveXSpeed = 5;

        this.mainEntity = new characterEntity();
        this.mainEntity.init();
        this.mainEntity.setEntityPos(this.winSize.width * .35, this.mainEntity.useRadius);
        battle.visionManager.setVisionEntity(this.mainEntity);
    },

    gameOver:function(){
        this.isGameOver = true;
    },

    getRandom:function(){
        return Math.random();
    },

    startJumpFunc:function(){
        if(this.mainEntity){
            this.mainEntity.startJump();
        }
    },

    changeDirectFunc:function(){
        if(this.mainEntity){
            this.mainEntity.changeDirect();
        }
    },

    step:function(){
        
    },

    clear:function(){
        
    }
});
