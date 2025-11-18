// كود لعبة اختبارية بسيط باستخدام محرك Phaser

// إعدادات اللعبة (الحجم، اللون)
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update 
    }
};

const game = new Phaser.Game(config);
let player;
let cursors;

// تحميل الموارد (هنا لا نحمل شيء، لكن يمكن وضع صور لعبتك هنا)
function preload ()
{
    // يمكنك تحميل صورة هنا إذا أردت: this.load.image('اسم', 'رابط_الصورة.png');
}

// بناء عالم اللعبة (إضافة الكائنات)
function create ()
{
    // إضافة مربع يمثل اللاعب في المنتصف
    const graphics = this.add.graphics();
    graphics.fillStyle(0xffaa00, 1); // لون برتقالي ناري
    graphics.fillRect(0, 0, 50, 50); // حجم 50x50 بكسل
    
    player = this.add.container(400, 300, [ graphics ]);
    
    // تمكين التحكم بالكيبورد (الأسهم)
    cursors = this.input.keyboard.createCursorKeys();
}

// تحديث اللعبة في كل إطار (الحركة والمنطق)
function update ()
{
    const speed = 4; // سرعة اللاعب

    if (cursors.left.isDown)
    {
        player.x -= speed;
    }
    else if (cursors.right.isDown)
    {
        player.x += speed;
    }

    if (cursors.up.isDown)
    {
        player.y -= speed;
    }
    else if (cursors.down.isDown)
    {
        player.y += speed;
    }
}
