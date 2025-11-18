// كود اللعبة النهائي والمكتمل (الخلفية، الجاذبية، القفز، الأرضية)

const config = {
    type: Phaser.AUTO,
    width: 800, // عرض شاشة اللعبة
    height: 600, // ارتفاع شاشة اللعبة
    // إعدادات الفيزياء (الجاذبية والتصادم)
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }, // قيمة الجاذبية، تجعل الأشياء تسقط للأسفل
            debug: false // اجعلها true لرؤية حدود الأجسام (للمطورين)
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
let platforms; // تعريف مجموعة المنصات/الأرضية

// 1. تحميل الصور (اللاعب والخلفية)
function preload ()
{
    // تحميل الخلفية
    this.load.image('sky', 'أصول/background.png'); 
    // تحميل اللاعب
    this.load.image('player', 'أصول/player.png'); 
    // تحميل صورة لأرضية بسيطة صلبة
    this.load.image('ground', 'أصول/ground_tile.png'); 
    // ملاحظة: إذا لم يكن لديك ground_tile.png، يمكنك استخدام أي صورة مؤقتًا
}

// 2. بناء عالم اللعبة (إضافة الخلفية، الأرضية، اللاعب)
function create ()
{
    // إضافة الخلفية وتوسيعها لتملأ الشاشة
    this.add.image(400, 300, 'sky').setDisplaySize(800, 600);
    
    // إنشاء مجموعة للأرضيات الصلبة (ستكون ثابتة ولا تتأثر بالجاذبية)
    platforms = this.physics.add.staticGroup();
    
    // إضافة الأرضية الرئيسية في أسفل الشاشة (مكان Y=580)
    // .create(x, y, 'ground')
    platforms.create(400, 580, 'ground').setScale(2).refreshBody(); // SetScale(2) لتكبيرها.

    // إذا أردت إخفاء الأرضية لتظهر الخلفية فقط، فاستخدم السطر التالي:
    platforms.getChildren()[0].setVisible(false);

    // إضافة اللاعب وتطبيق الفيزياء عليه
    player = this.physics.add.image(400, 300, 'player'); 
    player.setCollideWorldBounds(true); // منع اللاعب من الخروج من حواف الشاشة

    // *** التصادم ***
    // جعل اللاعب يتفاعل ويتصادم مع الأرضية (هذا يمنعه من السقوط)
    this.physics.add.collider(player, platforms); 

    cursors = this.input.keyboard.createCursorKeys();
}

// 3. تحديث الحركة والقفز في كل إطار
function update ()
{
    // إيقاف الحركة الأفقية عندما لا يكون هناك زر مضغوط
    player.setVelocityX(0); 
    const speed = 160; 
    
    // الحركة لليسار واليمين
    if (cursors.left.isDown)
    {
        player.setVelocityX(-speed);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(speed);
    }
    
    // القفز (يسمح بالقفز فقط إذا كان اللاعب يلامس الأرض)
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330); // قيمة سالبة تعني القفز للأعلى
    }
}
