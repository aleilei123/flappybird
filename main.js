var mainState = {
    preload: function() { 
        game.load.image('bird', 'assets/bird.png');
        game.load.image('pipe','assets/pipe.png');
    },

    create: function() { 
        game.stage.backgroundColor = '#71c5cf';//设置背景颜色
        this.bird = game.add.sprite(100, 245, 'bird');//添加小鸟图片
        game.physics.arcade.enable(this.bird);//添加物理属性
        this.bird.body.gravity.y = 1000; //添加重力因子
        game.input.touch.onTouchStart=function(){this.jump};
        this.pipes=game.add.group();//建立pipes数组
        this.timer=game.time.events.loop(1500,this.addrowpipes,this);//每隔1500ms添加一列pipe
        this.score=0;//得分计算
        this.bird.angle=-20;
        flag=1;
        this.labelscore=game.add.text(20,20,"score:0",{font:"30px Arial",fill:"#fff"});
    },

    update: function() {
        if(flag){
            this.bird.angle+=1;
            if(this.bird.angle==20){
                flag=0;
            }
        }else{
            this.bird.angle-=1;
            if(this.bird.angle==-10){
                flag=1;
            }
        }
        game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame,null, this);
        if (this.bird.y < 0 || this.bird.y > 490)
            this.restartGame();  
    },

    jump:function(){
        this.bird.body.velocity.y = -400;//键盘按下后速度变为-100，向上走一下
    },
    restartGame:function(){
        game.state.start('main');
    },
    addrowpipes:function(){
        this.score+=1;
        this.labelscore.text="score:"+this.score;
        var hole=Math.floor(Math.random()*6);
        // console.log(hole);
        for(var i=0;i<8;i++){
            if(i!=hole&&i!=hole+1&&i!=hole-1){
                this.addonepipe(400,i*60);
            }
        }
    },
    addonepipe(x,y){
        this.pipe = game.add.sprite(x, y, 'pipe');//添加小鸟图片
        this.pipes.add(this.pipe);
        game.physics.arcade.enable(this.pipe);//添加物理属性
        this.pipe.body.velocity.x = -200; //添加重力因子
    }
};
var game = new Phaser.Game(400, 490);
game.state.add('main', mainState,true); //这句话相当于game.state.add('main', mainState);game.state.start('main');
