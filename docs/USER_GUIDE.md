# راهنمای استفاده از نغمه | Naghmeh User Guide

## فارسی

### شروع
1. مخزن را دریافت کنید یا در GitHub از فایل‌ها استفاده کنید.
2. پوشه‌ی پروژه را با یک وب‌سرور استاتیک اجرا کنید؛ اجرای مستقیم با `file://` برای ES Modules و Service Worker مناسب نیست.
3. با Node.js 18 یا جدیدتر می‌توانید در ریشه‌ی پروژه دستور `npm test` را برای تست‌های موسیقی اجرا کنید.
4. برای اجرای محلی، در ریشه‌ی پروژه اجرا کنید:
   ```bash
   python -m http.server 8080
   ```
   سپس `http://localhost:8080` را باز کنید.

### یادگیری
- از فهرست سمت راست/چپ گروه درس را انتخاب کنید.
- نت روی خطوط حامل نمایش داده می‌شود؛ برای شنیدن آن «شنیدن نت» را بزنید.
- کلید متناظر را روی پیانوی مجازی انتخاب کنید. تشخیص پاسخ با MIDI انجام می‌شود، بنابراین اکتاو هم باید درست باشد.
- پاسخ صحیح درس را تکمیل می‌کند؛ «تمرین دوباره» برای تکرار تمرین بدون حذف سابقه است.
- «تمرین تصادفی» آزمون ۱۰ سوالی را بدون نمایش نام نت آغاز می‌کند.
- از EN/فا برای جابه‌جایی زبان و جهت صفحه استفاده کنید.

### ذخیره و آفلاین
- پیشرفت درس‌ها در localStorage همان مرورگر ذخیره می‌شود؛ حساب کاربری یا همگام‌سازی ابری وجود ندارد.
- با میزبانی روی HTTPS، برنامه Service Worker را ثبت می‌کند و فایل‌های اصلی را برای استفاده‌ی آفلاین cache می‌کند.
- پاک‌کردن داده‌های سایت یا localStorage پیشرفت را پاک می‌کند.
- برای نصب به‌صورت اپ، از گزینه‌ی Install app مرورگر (در مرورگرهای سازگار) استفاده کنید.

### دامنه و محدودیت
صدا در این نسخه با موج سینوسی ساخته می‌شود و نمونه‌ی ضبط‌شده‌ی پیانو نیست. نمایش حامل برای آموزش تک‌نت طراحی شده، نه صفحه‌آرایی پارتیتور کامل. برنامه فعلاً اکانت، بک‌اند، تشخیص صدای ساز از میکروفون یا sync بین دستگاه‌ها ندارد.

## English

### Getting started
Serve the project from a static web server (ES modules and service workers are not reliable from `file://`). For a quick local run:

```bash
python -m http.server 8080
```

Open `http://localhost:8080`. Node.js 18+ is required to run `npm test`.

### Lessons and practice
- Choose a curriculum group and lesson from the navigation.
- Read the staff note; press “Hear note” to listen.
- Select the corresponding virtual piano key. Answers are MIDI- and octave-sensitive.
- A correct answer completes the lesson; “Repeat practice” lets you try again without erasing history.
- “Random practice” starts a 10-question quiz that hides the note name.
- Switch Persian/English using the language control.

### Progress and offline
Progress is stored locally in this browser only. On HTTPS hosts, the service worker caches the app shell for offline use. Clearing site data clears progress. Compatible browsers may offer “Install app”.

### Scope
The current audio is a synthesized sine tone, not a sampled piano. The SVG renderer is for single-note learning, not full score engraving. No user accounts, backend, cloud sync, or microphone-based pitch detection are included.
