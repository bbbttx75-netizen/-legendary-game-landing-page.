// كود اللعبة النهائي (الخلفية، الجاذبية، القفز، الأرضية)

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }, // قيمة الجاذبية
            debug: false 
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update 
    }
};

const game = new Phaser.Game(config);
let player;
let cursors;
let platforms; 

// 1. تحميل الصور (اللاعب والخلفية)
function preload ()
{
    this.load.image('sky', 'أصول/background.png'); 
    this.load.image('player', 'أصول/player.png'); 
    // ملاحظة: سنستخدم صورة بيضاء بسيطة كأرضية مؤقتًا
    this.load.image('ground', 'assets/ground.png'); // سنعتمد على صورة أرضية بسيطة
}

// 2. بناء العالم وإضافة الأرضية الصلبة
function create ()
{
    // إضافة الخلفية وتوسيعها
    this.add.image(400, 300, 'sky').setDisplaySize(800, 600);
    
    // إنشاء مجموعة (Group) للأرضية الصلبة
    platforms = this.physics.add.staticGroup();
    
    // إضافة الأرضية في أسفل الشاشة (مكان Y=568)
    // .create(x, y, 'ground') : x=400 (منتصف الشاشة)، y=568 (قرب الأسفل)
    platforms.create(400, 568, 'ground').setScale(2).refreshBody(); // SetScale(2) لتكبيرها
    
    // إخفاء الأرضية وجعلها غير مرئية (شفافة)
    platforms.getChildren()[0].setVisible(false);

    // إضافة اللاعب (الصورة)
    player = this.physics.add.image(400, 300, 'player'); 
    player.setCollideWorldBounds(true); // منع اللاعب من الخروج من حواف الشاشة

    // *** التفاعل الرئيسي: جعل اللاعب يتفاعل مع الأرضية ***
    this.physics.add.collider(player, platforms); 

    cursors = this.input.keyboard.createCursorKeys();
}

// 3. تحديث حركة اللاعب والقفز
function update ()
{
    player.setVelocityX(0); 
    const speed = 160; 
    
    if (cursors.left.isDown)
    {
        player.setVelocityX(-speed);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(speed);
    }
    
    // القفز
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330); 
    }
}
