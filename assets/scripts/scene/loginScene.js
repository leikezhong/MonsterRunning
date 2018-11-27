window.battle = window.battle || {};
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.director.preloadScene("selectScene", function () {
            cc.log("selectScene preloaded");
        });
    },

    startGameFunc:function (event) {
        cc.director.loadScene("selectScene");
    },

    // update (dt) {},
});
