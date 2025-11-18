from flask import Flask, render_template
from datetime import datetime

# تهيئة تطبيق Flask
app = Flask(__name__)

# تحديد المسار الرئيسي (عند زيارة http://127.0.0.1:5000/)
@app.route('/')
def home_page():
    # 1. المنطق: جلب البيانات وتجهيزها
    current_user = "الرائي النبيل"  # بيانات ديناميكية (يمكن أن تكون من قاعدة بيانات)
    today_date = datetime.now().strftime("%Y-%m-%d") # تنسيق التاريخ

    # 2. إرسال البيانات إلى القالب
    # هنا نستخدم index.html ونرسل له المتغيرات
    return render_template('index.html', user=current_user, date=today_date)

# تشغيل التطبيق
if __name__ == '__main__':
    # سيتم تشغيل الخادم على http://127.0.0.1:5000/
    app.run(debug=True)
