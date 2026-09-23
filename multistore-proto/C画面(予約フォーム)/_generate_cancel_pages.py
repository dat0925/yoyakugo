#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate multilingual cancel_verify / cancel_confirm / cancel_complete mock pages."""

import os

BASE = os.path.dirname(os.path.abspath(__file__))

LANGS = [
    ('ja', '', '日本語'),
    ('en', '_en', 'English'),
    ('zh-cn', '_zh-cn', '中文（简体）'),
    ('zh-tw', '_zh-tw', '中文（繁體）'),
    ('ko', '_ko', '한국어'),
]

REMOVED_SUFFIXES = ['_th', '_tl', '_vi', '_id', '_ms', '_fr', '_de', '_hi', '_ru', '_ar', '_pt']

T = {
    'ja': {
        'shop': '●●接骨院',
        'step1': '本人確認', 'step2': 'キャンセル確認', 'step3': 'キャンセル完了',
        'verify_title': '受付・予約キャンセル（本人確認）',
        'verify_lead': '受付・予約時に登録した電話番号の<strong>下4桁</strong>を入力してください。',
        'field_title': '電話番号（下4桁）', 'last4': '下4桁', 'required': '必須',
        'help': '例：03-0000-<strong>1111</strong> の場合、「1111」を入力',
        'submit_verify': '確認する', 'aria': '電話番号下4桁',
        'confirm_title': '受付・予約キャンセルの確認',
        'confirm_lead': '内容をご確認のうえ、問題なければ「受付・予約をキャンセルする」ボタンをクリックしてください。',
        'section_target': 'キャンセル対象の受付・予約内容',
        'reservation_no': '受付・予約番号', 'guests': '人数', 'guests_val': '1人',
        'service': '受付内容', 'service_val': 'カット（60分）',
        'datetime': '受付日時', 'datetime_val': '2026年6月15日（月）10:30',
        'price': '料金', 'price_val': '4,000円',
        'section_customer': '受付・予約者情報',
        'name': 'お名前', 'name_val': '山田\u3000太郎',
        'furigana': 'お名前（フリガナ）', 'furigana_val': 'ヤマダ\u3000タロウ',
        'phone': '電話番号', 'email': 'メールアドレス', 'comment': 'コメント',
        'comment_val': '女性の先生を希望します。',
        'notice1': '1度キャンセルすると元に戻すことは出来ません。',
        'notice2': 'キャンセル完了後、登録メールアドレス宛にキャンセル完了メールを送信します。',
        'submit_cancel': '受付・予約をキャンセルする',
        'complete_title': '受付・予約キャンセルが完了しました',
        'complete_lead1': '受付・予約キャンセル完了のお知らせを、登録メールアドレス宛に送信しました。',
        'complete_lead2': 'メールが届かない場合は、迷惑メールフォルダをご確認ください。',
        'form_link': '受付・予約フォームを表示する',
    },
    'en': {
        'shop': '●● Osteopathic Clinic',
        'step1': 'Identity Verification', 'step2': 'Cancel Confirmation', 'step3': 'Cancel Complete',
        'verify_title': 'Cancel Check-in / Reservation (Identity Verification)',
        'verify_lead': 'Please enter the <strong>last 4 digits</strong> of the phone number registered at check-in / reservation.',
        'field_title': 'Phone Number (Last 4 Digits)', 'last4': 'Last 4 digits', 'required': 'Required',
        'help': 'e.g. For 03-0000-<strong>1111</strong>, enter "1111"',
        'submit_verify': 'Verify', 'aria': 'Phone number last 4 digits',
        'confirm_title': 'Cancel Check-in / Reservation Confirmation',
        'confirm_lead': 'Please review the details below. If everything is correct, click "Cancel Check-in / Reservation".',
        'section_target': 'Check-in / Reservation to Cancel',
        'reservation_no': 'Check-in / Reservation No.', 'guests': 'Number of Guests', 'guests_val': '1',
        'service': 'Service', 'service_val': 'Haircut (60 min)',
        'datetime': 'Date & Time', 'datetime_val': 'Mon, June 15, 2026 10:30',
        'price': 'Price', 'price_val': '¥4,000',
        'section_customer': 'Guest Information',
        'name': 'Name', 'name_val': 'Yamada Taro',
        'furigana': 'Name (Furigana)', 'furigana_val': 'Yamada Taro',
        'phone': 'Phone Number', 'email': 'Email Address', 'comment': 'Comments',
        'comment_val': 'I would prefer a female practitioner.',
        'notice1': 'Once cancelled, this action cannot be undone.',
        'notice2': 'After cancellation, a confirmation email will be sent to your registered email address.',
        'submit_cancel': 'Cancel Check-in / Reservation',
        'complete_title': 'Check-in / Reservation Cancelled',
        'complete_lead1': 'A cancellation confirmation email has been sent to your registered email address.',
        'complete_lead2': 'If you do not receive the email, please check your spam folder.',
        'form_link': 'View Check-in / Reservation Form',
    },
    'zh-cn': {
        'shop': '●●接骨院',
        'step1': '身份验证', 'step2': '取消确认', 'step3': '取消完成',
        'verify_title': '取消预约/就诊（身份验证）',
        'verify_lead': '请输入预约/就诊时登记的电话号码的<strong>后4位</strong>。',
        'field_title': '电话号码（后4位）', 'last4': '后4位', 'required': '必填',
        'help': '例：03-0000-<strong>1111</strong> 请输入「1111」',
        'submit_verify': '确认', 'aria': '电话号码后4位',
        'confirm_title': '取消预约/就诊确认',
        'confirm_lead': '请确认以下内容，如无问题请点击「取消预约/就诊」按钮。',
        'section_target': '要取消的预约/就诊内容',
        'reservation_no': '预约/就诊编号', 'guests': '人数', 'guests_val': '1人',
        'service': '预约内容', 'service_val': '理发（60分钟）',
        'datetime': '预约日期时间', 'datetime_val': '2026年6月15日（周一）10:30',
        'price': '费用', 'price_val': '4,000日元',
        'section_customer': '预约/就诊者信息',
        'name': '姓名', 'name_val': '山田 太郎',
        'furigana': '姓名（假名）', 'furigana_val': 'ヤマダ タロウ',
        'phone': '电话号码', 'email': '电子邮箱', 'comment': '备注',
        'comment_val': '希望由女性老师服务。',
        'notice1': '一旦取消后将无法恢复。',
        'notice2': '取消完成后，将向登记的电子邮箱发送取消完成邮件。',
        'submit_cancel': '取消预约/就诊',
        'complete_title': '预约/就诊已取消',
        'complete_lead1': '取消完成的通知已发送至您登记的电子邮箱。',
        'complete_lead2': '如未收到邮件，请检查垃圾邮件文件夹。',
        'form_link': '显示预约/就诊表单',
    },
    'zh-tw': {
        'shop': '●●接骨院',
        'step1': '身分驗證', 'step2': '取消確認', 'step3': '取消完成',
        'verify_title': '取消預約/就診（身分驗證）',
        'verify_lead': '請輸入預約/就診時登記的電話號碼的<strong>後4碼</strong>。',
        'field_title': '電話號碼（後4碼）', 'last4': '後4碼', 'required': '必填',
        'help': '例：03-0000-<strong>1111</strong> 請輸入「1111」',
        'submit_verify': '確認', 'aria': '電話號碼後4碼',
        'confirm_title': '取消預約/就診確認',
        'confirm_lead': '請確認以下內容，如無問題請點擊「取消預約/就診」按鈕。',
        'section_target': '要取消的預約/就診內容',
        'reservation_no': '預約/就診編號', 'guests': '人數', 'guests_val': '1人',
        'service': '預約內容', 'service_val': '剪髮（60分鐘）',
        'datetime': '預約日期時間', 'datetime_val': '2026年6月15日（週一）10:30',
        'price': '費用', 'price_val': '4,000日圓',
        'section_customer': '預約/就診者資訊',
        'name': '姓名', 'name_val': '山田 太郎',
        'furigana': '姓名（假名）', 'furigana_val': 'ヤマダ タロウ',
        'phone': '電話號碼', 'email': '電子郵件', 'comment': '備註',
        'comment_val': '希望由女性老師服務。',
        'notice1': '一旦取消後將無法恢復。',
        'notice2': '取消完成後，將向登記的電子郵件發送取消完成郵件。',
        'submit_cancel': '取消預約/就診',
        'complete_title': '預約/就診已取消',
        'complete_lead1': '取消完成的通知已發送至您登記的電子郵件。',
        'complete_lead2': '如未收到郵件，請檢查垃圾郵件資料夾。',
        'form_link': '顯示預約/就診表單',
    },
    'ko': {
        'shop': '●●접골원',
        'step1': '본인 확인', 'step2': '취소 확인', 'step3': '취소 완료',
        'verify_title': '예약/내원 취소（본인 확인）',
        'verify_lead': '예약/내원 시 등록한 전화번호의 <strong>뒤 4자리</strong>를 입력해 주세요.',
        'field_title': '전화번호（뒤 4자리）', 'last4': '뒤 4자리', 'required': '필수',
        'help': '예: 03-0000-<strong>1111</strong>인 경우 「1111」을 입력',
        'submit_verify': '확인', 'aria': '전화번호 뒤 4자리',
        'confirm_title': '예약/내원 취소 확인',
        'confirm_lead': '내용을 확인하신 후 문제가 없으면 「예약/내원 취소」버튼을 클릭해 주세요.',
        'section_target': '취소 대상 예약/내원 내용',
        'reservation_no': '예약/내원 번호', 'guests': '인원', 'guests_val': '1명',
        'service': '예약 내용', 'service_val': '커트（60분）',
        'datetime': '예약 일시', 'datetime_val': '2026년 6월 15일（월）10:30',
        'price': '요금', 'price_val': '4,000엔',
        'section_customer': '예약/내원자 정보',
        'name': '이름', 'name_val': '야마다 타로',
        'furigana': '이름（후리가나）', 'furigana_val': 'ヤマダ タロウ',
        'phone': '전화번호', 'email': '이메일', 'comment': '코멘트',
        'comment_val': '여성 선생님을 희망합니다.',
        'notice1': '한 번 취소하면 되돌릴 수 없습니다.',
        'notice2': '취소 완료 후 등록된 이메일 주소로 취소 완료 메일을 발송합니다.',
        'submit_cancel': '예약/내원 취소',
        'complete_title': '예약/내원 취소가 완료되었습니다',
        'complete_lead1': '예약/내원 취소 완료 안내를 등록된 이메일 주소로 발송했습니다.',
        'complete_lead2': '메일이 도착하지 않는 경우 스팸 메일함을 확인해 주세요.',
        'form_link': '예약/내원 양식 표시',
    },
    'th': {
        'shop': '●● คลินิกกระดูกและกล้ามเนื้อ',
        'step1': 'ยืนยันตัวตน', 'step2': 'ยืนยันการยกเลิก', 'step3': 'ยกเลิกเสร็จสิ้น',
        'verify_title': 'ยกเลิกการเช็คอิน / จอง（ยืนยันตัวตน）',
        'verify_lead': 'กรุณากรอก<strong>4 หลักสุดท้าย</strong>ของหมายเลขโทรศัพท์ที่ลงทะเบียนไว้ตอนเช็คอิน / จอง',
        'field_title': 'หมายเลขโทรศัพท์（4 หลักสุดท้าย）', 'last4': '4 หลักสุดท้าย', 'required': 'จำเป็น',
        'help': 'เช่น 03-0000-<strong>1111</strong> ให้กรอก "1111"',
        'submit_verify': 'ยืนยัน', 'aria': '4 หลักสุดท้ายของหมายเลขโทรศัพท์',
        'confirm_title': 'ยืนยันการยกเลิกเช็คอิน / จอง',
        'confirm_lead': 'กรุณาตรวจสอบรายละเอียด หากถูกต้องให้คลิกปุ่ม "ยกเลิกเช็คอิน / จอง"',
        'section_target': 'รายละเอียดเช็คอิน / จองที่จะยกเลิก',
        'reservation_no': 'หมายเลขเช็คอิน / จอง', 'guests': 'จำนวนผู้เข้ารับบริการ', 'guests_val': '1 คน',
        'service': 'บริการ', 'service_val': 'ตัดผม（60 นาที）',
        'datetime': 'วันและเวลา', 'datetime_val': '15 มิ.ย. 2026（จ.）10:30',
        'price': 'ค่าบริการ', 'price_val': '4,000 เยน',
        'section_customer': 'ข้อมูลผู้เช็คอิน / จอง',
        'name': 'ชื่อ', 'name_val': 'Yamada Taro',
        'furigana': 'ชื่อ（ฟุริกานะ）', 'furigana_val': 'ヤマダ タロウ',
        'phone': 'หมายเลขโทรศัพท์', 'email': 'อีเมล', 'comment': 'ความคิดเห็น',
        'comment_val': 'ต้องการผู้ให้บริการหญิง',
        'notice1': 'เมื่อยกเลิกแล้วจะไม่สามารถกู้คืนได้',
        'notice2': 'หลังยกเลิกเสร็จสิ้น ระบบจะส่งอีเมลยืนยันการยกเลิกไปยังอีเมลที่ลงทะเบียน',
        'submit_cancel': 'ยกเลิกเช็คอิน / จอง',
        'complete_title': 'ยกเลิกเช็คอิน / จองเรียบร้อยแล้ว',
        'complete_lead1': 'ส่งอีเมลแจ้งการยกเลิกเสร็จสิ้นไปยังอีเมลที่ลงทะเบียนแล้ว',
        'complete_lead2': 'หากไม่ได้รับอีเมล กรุณาตรวจสอบโฟลเดอร์สแปม',
        'form_link': 'แสดงแบบฟอร์มเช็คอิน / จอง',
    },
    'tl': {
        'shop': '●● Klinika ng Osteopatiya',
        'step1': 'Pag-verify ng Pagkakakilanlan', 'step2': 'Kumpirmasyon ng Pagkansela', 'step3': 'Kumpleto ang Pagkansela',
        'verify_title': 'Kanselahin ang Check-in / Reserbasyon (Pag-verify ng Pagkakakilanlan)',
        'verify_lead': 'Ilagay ang <strong>huling 4 na digit</strong> ng numero ng telepono na nirehistro sa check-in / reserbasyon.',
        'field_title': 'Numero ng Telepono (Huling 4 na Digit)', 'last4': 'Huling 4 na digit', 'required': 'Kinakailangan',
        'help': 'hal. Para sa 03-0000-<strong>1111</strong>, ilagay ang "1111"',
        'submit_verify': 'I-verify', 'aria': 'Huling 4 na digit ng telepono',
        'confirm_title': 'Kumpirmasyon ng Pagkansela ng Check-in / Reserbasyon',
        'confirm_lead': 'Suriin ang mga detalye. Kung tama ang lahat, i-click ang "Kanselahin ang Check-in / Reserbasyon".',
        'section_target': 'Check-in / Reserbasyon na Ikakansela',
        'reservation_no': 'Numero ng Check-in / Reserbasyon', 'guests': 'Bilang ng Bisita', 'guests_val': '1',
        'service': 'Serbisyo', 'service_val': 'Gupit (60 min)',
        'datetime': 'Petsa at Oras', 'datetime_val': 'Lunes, Hunyo 15, 2026 10:30',
        'price': 'Presyo', 'price_val': '¥4,000',
        'section_customer': 'Impormasyon ng Bisita',
        'name': 'Pangalan', 'name_val': 'Yamada Taro',
        'furigana': 'Pangalan (Furigana)', 'furigana_val': 'ヤマダ タロウ',
        'phone': 'Numero ng Telepono', 'email': 'Email', 'comment': 'Komento',
        'comment_val': 'Mas gusto ko ang babaeng propesyonal.',
        'notice1': 'Kapag nakansela na, hindi na ito maaaring ibalik.',
        'notice2': 'Pagkatapos ng pagkansela, magpapadala ng email ng kumpirmasyon sa naka-rehistrong email.',
        'submit_cancel': 'Kanselahin ang Check-in / Reserbasyon',
        'complete_title': 'Nakansela ang Check-in / Reserbasyon',
        'complete_lead1': 'Naipadala na ang email ng kumpirmasyon ng pagkansela sa naka-rehistrong email.',
        'complete_lead2': 'Kung hindi natanggap ang email, suriin ang spam folder.',
        'form_link': 'Ipakita ang Form ng Check-in / Reserbasyon',
    },
    'vi': {
        'shop': '●● Phòng khám chỉnh xương',
        'step1': 'Xác minh danh tính', 'step2': 'Xác nhận hủy', 'step3': 'Hoàn tất hủy',
        'verify_title': 'Hủy check-in / đặt chỗ (Xác minh danh tính)',
        'verify_lead': 'Vui lòng nhập <strong>4 chữ số cuối</strong> của số điện thoại đã đăng ký khi check-in / đặt chỗ.',
        'field_title': 'Số điện thoại (4 chữ số cuối)', 'last4': '4 chữ số cuối', 'required': 'Bắt buộc',
        'help': 'VD: 03-0000-<strong>1111</strong> thì nhập "1111"',
        'submit_verify': 'Xác nhận', 'aria': '4 chữ số cuối số điện thoại',
        'confirm_title': 'Xác nhận hủy check-in / đặt chỗ',
        'confirm_lead': 'Vui lòng kiểm tra nội dung. Nếu không có vấn đề, nhấn nút "Hủy check-in / đặt chỗ".',
        'section_target': 'Nội dung check-in / đặt chỗ cần hủy',
        'reservation_no': 'Mã check-in / đặt chỗ', 'guests': 'Số khách', 'guests_val': '1 người',
        'service': 'Dịch vụ', 'service_val': 'Cắt tóc (60 phút)',
        'datetime': 'Ngày giờ', 'datetime_val': 'Thứ Hai, 15/6/2026 10:30',
        'price': 'Giá', 'price_val': '4.000 yên',
        'section_customer': 'Thông tin khách',
        'name': 'Họ tên', 'name_val': 'Yamada Taro',
        'furigana': 'Họ tên (Furigana)', 'furigana_val': 'ヤマダ タロウ',
        'phone': 'Số điện thoại', 'email': 'Email', 'comment': 'Ghi chú',
        'comment_val': 'Mong muốn được phục vụ bởi nữ.',
        'notice1': 'Sau khi hủy một lần sẽ không thể khôi phục.',
        'notice2': 'Sau khi hủy xong, email xác nhận sẽ được gửi đến địa chỉ email đã đăng ký.',
        'submit_cancel': 'Hủy check-in / đặt chỗ',
        'complete_title': 'Đã hủy check-in / đặt chỗ',
        'complete_lead1': 'Thông báo hoàn tất hủy đã được gửi đến email đã đăng ký.',
        'complete_lead2': 'Nếu không nhận được email, vui lòng kiểm tra thư mục spam.',
        'form_link': 'Hiển thị biểu mẫu check-in / đặt chỗ',
    },
    'id': {
        'shop': '●● Klinik Osteopati',
        'step1': 'Verifikasi Identitas', 'step2': 'Konfirmasi Pembatalan', 'step3': 'Pembatalan Selesai',
        'verify_title': 'Batalkan Check-in / Reservasi (Verifikasi Identitas)',
        'verify_lead': 'Masukkan <strong>4 digit terakhir</strong> nomor telepon yang didaftarkan saat check-in / reservasi.',
        'field_title': 'Nomor Telepon (4 Digit Terakhir)', 'last4': '4 digit terakhir', 'required': 'Wajib',
        'help': 'contoh: untuk 03-0000-<strong>1111</strong>, masukkan "1111"',
        'submit_verify': 'Verifikasi', 'aria': '4 digit terakhir nomor telepon',
        'confirm_title': 'Konfirmasi Pembatalan Check-in / Reservasi',
        'confirm_lead': 'Periksa isinya. Jika sudah benar, klik tombol "Batalkan Check-in / Reservasi".',
        'section_target': 'Check-in / Reservasi yang Dibatalkan',
        'reservation_no': 'No. Check-in / Reservasi', 'guests': 'Jumlah Tamu', 'guests_val': '1 orang',
        'service': 'Layanan', 'service_val': 'Potong rambut (60 menit)',
        'datetime': 'Tanggal & Waktu', 'datetime_val': 'Senin, 15 Juni 2026 10:30',
        'price': 'Harga', 'price_val': '¥4.000',
        'section_customer': 'Informasi Tamu',
        'name': 'Nama', 'name_val': 'Yamada Taro',
        'furigana': 'Nama (Furigana)', 'furigana_val': 'ヤマダ タロウ',
        'phone': 'Nomor Telepon', 'email': 'Alamat Email', 'comment': 'Komentar',
        'comment_val': 'Lebih suka praktisi wanita.',
        'notice1': 'Setelah dibatalkan, tidak dapat dikembalikan.',
        'notice2': 'Setelah pembatalan selesai, email konfirmasi akan dikirim ke alamat email terdaftar.',
        'submit_cancel': 'Batalkan Check-in / Reservasi',
        'complete_title': 'Check-in / Reservasi Dibatalkan',
        'complete_lead1': 'Pemberitahuan pembatalan telah dikirim ke alamat email terdaftar.',
        'complete_lead2': 'Jika email tidak diterima, periksa folder spam.',
        'form_link': 'Tampilkan Formulir Check-in / Reservasi',
    },
    'ms': {
        'shop': '●● Klinik Osteopati',
        'step1': 'Pengesahan Identiti', 'step2': 'Pengesahan Pembatalan', 'step3': 'Pembatalan Selesai',
        'verify_title': 'Batalkan Daftar Masuk / Tempahan (Pengesahan Identiti)',
        'verify_lead': 'Sila masukkan <strong>4 digit terakhir</strong> nombor telefon yang didaftarkan semasa daftar masuk / tempahan.',
        'field_title': 'Nombor Telefon (4 Digit Terakhir)', 'last4': '4 digit terakhir', 'required': 'Wajib',
        'help': 'cth: untuk 03-0000-<strong>1111</strong>, masukkan "1111"',
        'submit_verify': 'Sahkan', 'aria': '4 digit terakhir nombor telefon',
        'confirm_title': 'Pengesahan Pembatalan Daftar Masuk / Tempahan',
        'confirm_lead': 'Sila semak butiran. Jika tiada masalah, klik butang "Batalkan Daftar Masuk / Tempahan".',
        'section_target': 'Daftar Masuk / Tempahan untuk Dibatalkan',
        'reservation_no': 'No. Daftar Masuk / Tempahan', 'guests': 'Bilangan Tetamu', 'guests_val': '1 orang',
        'service': 'Perkhidmatan', 'service_val': 'Potong rambut (60 minit)',
        'datetime': 'Tarikh & Masa', 'datetime_val': 'Isnin, 15 Jun 2026 10:30',
        'price': 'Harga', 'price_val': '¥4,000',
        'section_customer': 'Maklumat Tetamu',
        'name': 'Nama', 'name_val': 'Yamada Taro',
        'furigana': 'Nama (Furigana)', 'furigana_val': 'ヤマダ タロウ',
        'phone': 'Nombor Telefon', 'email': 'E-mel', 'comment': 'Komen',
        'comment_val': 'Lebih suka praktisi wanita.',
        'notice1': 'Setelah dibatalkan, ia tidak boleh dipulihkan.',
        'notice2': 'Selepas pembatalan selesai, e-mel pengesahan akan dihantar ke alamat e-mel berdaftar.',
        'submit_cancel': 'Batalkan Daftar Masuk / Tempahan',
        'complete_title': 'Daftar Masuk / Tempahan Dibatalkan',
        'complete_lead1': 'Notis pembatalan telah dihantar ke alamat e-mel berdaftar.',
        'complete_lead2': 'Jika e-mel tidak diterima, sila semak folder spam.',
        'form_link': 'Paparkan Borang Daftar Masuk / Tempahan',
    },
    'fr': {
        'shop': "●● Cabinet d'ostéopathie",
        'step1': 'Vérification d\'identité', 'step2': 'Confirmation d\'annulation', 'step3': 'Annulation terminée',
        'verify_title': 'Annuler l\'enregistrement / la réservation (Vérification d\'identité)',
        'verify_lead': 'Veuillez saisir les <strong>4 derniers chiffres</strong> du numéro de téléphone enregistré lors de l\'enregistrement / de la réservation.',
        'field_title': 'Numéro de téléphone (4 derniers chiffres)', 'last4': '4 derniers chiffres', 'required': 'Obligatoire',
        'help': 'ex. : pour 03-0000-<strong>1111</strong>, saisissez "1111"',
        'submit_verify': 'Vérifier', 'aria': '4 derniers chiffres du téléphone',
        'confirm_title': 'Confirmation d\'annulation de l\'enregistrement / de la réservation',
        'confirm_lead': 'Veuillez vérifier les informations. Si tout est correct, cliquez sur "Annuler l\'enregistrement / la réservation".',
        'section_target': 'Enregistrement / Réservation à annuler',
        'reservation_no': 'N° d\'enregistrement / de réservation', 'guests': 'Nombre de personnes', 'guests_val': '1',
        'service': 'Prestation', 'service_val': 'Coupe (60 min)',
        'datetime': 'Date et heure', 'datetime_val': 'Lun. 15 juin 2026 10:30',
        'price': 'Tarif', 'price_val': '4 000 ¥',
        'section_customer': 'Informations du client',
        'name': 'Nom', 'name_val': 'Yamada Taro',
        'furigana': 'Nom (Furigana)', 'furigana_val': 'ヤマダ タロウ',
        'phone': 'Téléphone', 'email': 'E-mail', 'comment': 'Commentaire',
        'comment_val': 'Je préfère une praticienne.',
        'notice1': 'Une fois annulé, l\'action est irréversible.',
        'notice2': 'Après l\'annulation, un e-mail de confirmation sera envoyé à l\'adresse enregistrée.',
        'submit_cancel': 'Annuler l\'enregistrement / la réservation',
        'complete_title': 'Enregistrement / Réservation annulé(e)',
        'complete_lead1': 'Un e-mail de confirmation d\'annulation a été envoyé à l\'adresse enregistrée.',
        'complete_lead2': 'Si vous ne recevez pas l\'e-mail, vérifiez votre dossier spam.',
        'form_link': 'Afficher le formulaire d\'enregistrement / de réservation',
    },
    'de': {
        'shop': '●● Osteopathische Praxis',
        'step1': 'Identitätsprüfung', 'step2': 'Stornierungsbestätigung', 'step3': 'Stornierung abgeschlossen',
        'verify_title': 'Check-in / Reservierung stornieren (Identitätsprüfung)',
        'verify_lead': 'Bitte geben Sie die <strong>letzten 4 Ziffern</strong> der bei Check-in / Reservierung registrierten Telefonnummer ein.',
        'field_title': 'Telefonnummer (letzte 4 Ziffern)', 'last4': 'Letzte 4 Ziffern', 'required': 'Pflicht',
        'help': 'z. B. bei 03-0000-<strong>1111</strong> "1111" eingeben',
        'submit_verify': 'Bestätigen', 'aria': 'Letzte 4 Ziffern der Telefonnummer',
        'confirm_title': 'Stornierung Check-in / Reservierung bestätigen',
        'confirm_lead': 'Bitte prüfen Sie die Angaben. Wenn alles korrekt ist, klicken Sie auf "Check-in / Reservierung stornieren".',
        'section_target': 'Zu stornierender Check-in / Reservierung',
        'reservation_no': 'Check-in / Reservierungs-Nr.', 'guests': 'Anzahl Personen', 'guests_val': '1',
        'service': 'Leistung', 'service_val': 'Haarschnitt (60 Min.)',
        'datetime': 'Datum & Uhrzeit', 'datetime_val': 'Mo., 15. Juni 2026, 10:30',
        'price': 'Preis', 'price_val': '4.000 ¥',
        'section_customer': 'Kundendaten',
        'name': 'Name', 'name_val': 'Yamada Taro',
        'furigana': 'Name (Furigana)', 'furigana_val': 'ヤマダ タロウ',
        'phone': 'Telefonnummer', 'email': 'E-Mail', 'comment': 'Kommentar',
        'comment_val': 'Bevorzugt eine weibliche Behandlerin.',
        'notice1': 'Nach der Stornierung ist eine Wiederherstellung nicht möglich.',
        'notice2': 'Nach Abschluss der Stornierung wird eine Bestätigungs-E-Mail an die registrierte Adresse gesendet.',
        'submit_cancel': 'Check-in / Reservierung stornieren',
        'complete_title': 'Check-in / Reservierung storniert',
        'complete_lead1': 'Eine Stornierungsbestätigung wurde an die registrierte E-Mail-Adresse gesendet.',
        'complete_lead2': 'Falls keine E-Mail ankommt, prüfen Sie bitte den Spam-Ordner.',
        'form_link': 'Check-in / Reservierungsformular anzeigen',
    },
    'hi': {
        'shop': '●● अस्टियोपैथिक क्लिनिक',
        'step1': 'पहचान सत्यापन', 'step2': 'रद्दीकरण पुष्टि', 'step3': 'रद्दीकरण पूर्ण',
        'verify_title': 'चेक-इन / आरक्षण रद्द करें (पहचान सत्यापन)',
        'verify_lead': 'कृपया चेक-इन / आरक्षण के समय पंजीकृत फ़ोन नंबर के <strong>अंतिम 4 अंक</strong> दर्ज करें।',
        'field_title': 'फ़ोन नंबर (अंतिम 4 अंक)', 'last4': 'अंतिम 4 अंक', 'required': 'आवश्यक',
        'help': 'उदा. 03-0000-<strong>1111</strong> के लिए "1111" दर्ज करें',
        'submit_verify': 'पुष्टि करें', 'aria': 'फ़ोन नंबर के अंतिम 4 अंक',
        'confirm_title': 'चेक-इन / आरक्षण रद्दीकरण की पुष्टि',
        'confirm_lead': 'कृपया विवरण की जाँच करें। सब ठीक हो तो "चेक-इन / आरक्षण रद्द करें" बटन दबाएँ।',
        'section_target': 'रद्द किया जाने वाला चेक-इन / आरक्षण',
        'reservation_no': 'चेक-इन / आरक्षण संख्या', 'guests': 'अतिथियों की संख्या', 'guests_val': '1',
        'service': 'सेवा', 'service_val': 'हेयरकट (60 मिनट)',
        'datetime': 'दिनांक और समय', 'datetime_val': '15 जून 2026 (सोम) 10:30',
        'price': 'शुल्क', 'price_val': '¥4,000',
        'section_customer': 'अतिथि जानकारी',
        'name': 'नाम', 'name_val': 'Yamada Taro',
        'furigana': 'नाम (फुरिगाना)', 'furigana_val': 'ヤマダ タロウ',
        'phone': 'फ़ोन नंबर', 'email': 'ईमेल', 'comment': 'टिप्पणी',
        'comment_val': 'महिला प्रैक्टिशनर पसंद है।',
        'notice1': 'एक बार रद्द करने के बाद इसे वापस नहीं किया जा सकता।',
        'notice2': 'रद्दीकरण पूर्ण होने के बाद पंजीकृत ईमेल पर पुष्टि ईमेल भेजा जाएगा।',
        'submit_cancel': 'चेक-इन / आरक्षण रद्द करें',
        'complete_title': 'चेक-इन / आरक्षण रद्द हो गया',
        'complete_lead1': 'रद्दीकरण पूर्ण की सूचना आपके पंजीकृत ईमेल पर भेज दी गई है।',
        'complete_lead2': 'यदि ईमेल न मिले तो स्पैम फ़ोल्डर जाँचें।',
        'form_link': 'चेक-इन / आरक्षण फ़ॉर्म दिखाएँ',
    },
    'ru': {
        'shop': '●● Остеопатическая клиника',
        'step1': 'Подтверждение личности', 'step2': 'Подтверждение отмены', 'step3': 'Отмена завершена',
        'verify_title': 'Отмена регистрации / бронирования (Подтверждение личности)',
        'verify_lead': 'Введите <strong>последние 4 цифры</strong> телефона, указанного при регистрации / бронировании.',
        'field_title': 'Телефон (последние 4 цифры)', 'last4': 'Последние 4 цифры', 'required': 'Обязательно',
        'help': 'напр.: для 03-0000-<strong>1111</strong> введите «1111»',
        'submit_verify': 'Подтвердить', 'aria': 'Последние 4 цифры телефона',
        'confirm_title': 'Подтверждение отмены регистрации / бронирования',
        'confirm_lead': 'Проверьте данные. Если всё верно, нажмите «Отменить регистрацию / бронирование».',
        'section_target': 'Регистрация / бронирование для отмены',
        'reservation_no': '№ регистрации / бронирования', 'guests': 'Количество гостей', 'guests_val': '1',
        'service': 'Услуга', 'service_val': 'Стрижка (60 мин.)',
        'datetime': 'Дата и время', 'datetime_val': '15 июня 2026 (пн.) 10:30',
        'price': 'Стоимость', 'price_val': '4 000 ¥',
        'section_customer': 'Данные гостя',
        'name': 'Имя', 'name_val': 'Yamada Taro',
        'furigana': 'Имя (фуригана)', 'furigana_val': 'ヤマダ タロウ',
        'phone': 'Телефон', 'email': 'E-mail', 'comment': 'Комментарий',
        'comment_val': 'Предпочитаю женщину-специалиста.',
        'notice1': 'После отмены восстановление невозможно.',
        'notice2': 'После отмены на зарегистрированный e-mail будет отправлено письмо с подтверждением.',
        'submit_cancel': 'Отменить регистрацию / бронирование',
        'complete_title': 'Регистрация / бронирование отменены',
        'complete_lead1': 'Уведомление об отмене отправлено на зарегистрированный e-mail.',
        'complete_lead2': 'Если письмо не пришло, проверьте папку «Спам».',
        'form_link': 'Показать форму регистрации / бронирования',
    },
    'ar': {
        'shop': '●● عيادة العظام والتقويم',
        'step1': 'التحقق من الهوية', 'step2': 'تأكيد الإلغاء', 'step3': 'اكتمال الإلغاء',
        'verify_title': 'إلغاء تسجيل الوصول / الحجز (التحقق من الهوية)',
        'verify_lead': 'يرجى إدخال <strong>آخر 4 أرقام</strong> من رقم الهاتف المسجل عند تسجيل الوصول / الحجز.',
        'field_title': 'رقم الهاتف (آخر 4 أرقام)', 'last4': 'آخر 4 أرقام', 'required': 'مطلوب',
        'help': 'مثال: لـ 03-0000-<strong>1111</strong> أدخل "1111"',
        'submit_verify': 'تأكيد', 'aria': 'آخر 4 أرقام من الهاتف',
        'confirm_title': 'تأكيد إلغاء تسجيل الوصول / الحجز',
        'confirm_lead': 'يرجى مراجعة التفاصيل. إذا كان كل شيء صحيحًا، انقر على "إلغاء تسجيل الوصول / الحجز".',
        'section_target': 'تسجيل الوصول / الحجز المراد إلغاؤه',
        'reservation_no': 'رقم تسجيل الوصول / الحجز', 'guests': 'عدد الضيوف', 'guests_val': '1',
        'service': 'الخدمة', 'service_val': 'قص شعر (60 دقيقة)',
        'datetime': 'التاريخ والوقت', 'datetime_val': '15 يونيو 2026 (الإثنين) 10:30',
        'price': 'السعر', 'price_val': '4,000 ين',
        'section_customer': 'معلومات الضيف',
        'name': 'الاسم', 'name_val': 'Yamada Taro',
        'furigana': 'الاسم (فوريغانا)', 'furigana_val': 'ヤマダ タロウ',
        'phone': 'رقم الهاتف', 'email': 'البريد الإلكتروني', 'comment': 'تعليق',
        'comment_val': 'أفضل ممارسة أنثى.',
        'notice1': 'بمجرد الإلغاء لا يمكن التراجع.',
        'notice2': 'بعد اكتمال الإلغاء، سيتم إرسال بريد تأكيد إلى البريد الإلكتروني المسجل.',
        'submit_cancel': 'إلغاء تسجيل الوصول / الحجز',
        'complete_title': 'تم إلغاء تسجيل الوصول / الحجز',
        'complete_lead1': 'تم إرسال إشعار اكتمال الإلغاء إلى البريد الإلكتروني المسجل.',
        'complete_lead2': 'إذا لم يصل البريد، يرجى التحقق من مجلد الرسائل غير المرغوب فيها.',
        'form_link': 'عرض نموذج تسجيل الوصول / الحجز',
    },
    'pt': {
        'shop': '●● Clínica de Osteopatia',
        'step1': 'Verificação de Identidade', 'step2': 'Confirmação de Cancelamento', 'step3': 'Cancelamento Concluído',
        'verify_title': 'Cancelar Check-in / Reserva (Verificação de Identidade)',
        'verify_lead': 'Digite os <strong>últimos 4 dígitos</strong> do telefone registrado no check-in / reserva.',
        'field_title': 'Telefone (Últimos 4 Dígitos)', 'last4': 'Últimos 4 dígitos', 'required': 'Obrigatório',
        'help': 'ex.: para 03-0000-<strong>1111</strong>, digite "1111"',
        'submit_verify': 'Verificar', 'aria': 'Últimos 4 dígitos do telefone',
        'confirm_title': 'Confirmação de Cancelamento de Check-in / Reserva',
        'confirm_lead': 'Revise os detalhes. Se estiver tudo correto, clique em "Cancelar Check-in / Reserva".',
        'section_target': 'Check-in / Reserva a Cancelar',
        'reservation_no': 'Nº de Check-in / Reserva', 'guests': 'Número de Convidados', 'guests_val': '1',
        'service': 'Serviço', 'service_val': 'Corte (60 min)',
        'datetime': 'Data e Hora', 'datetime_val': 'Seg., 15 de jun. de 2026, 10:30',
        'price': 'Preço', 'price_val': '¥4.000',
        'section_customer': 'Informações do Convidado',
        'name': 'Nome', 'name_val': 'Yamada Taro',
        'furigana': 'Nome (Furigana)', 'furigana_val': 'ヤマダ タロウ',
        'phone': 'Telefone', 'email': 'E-mail', 'comment': 'Comentário',
        'comment_val': 'Prefiro profissional do sexo feminino.',
        'notice1': 'Após cancelar, não é possível reverter.',
        'notice2': 'Após o cancelamento, um e-mail de confirmação será enviado ao endereço registrado.',
        'submit_cancel': 'Cancelar Check-in / Reserva',
        'complete_title': 'Check-in / Reserva Cancelado(a)',
        'complete_lead1': 'A notificação de cancelamento foi enviada ao e-mail registrado.',
        'complete_lead2': 'Se não receber o e-mail, verifique a pasta de spam.',
        'form_link': 'Exibir Formulário de Check-in / Reserva',
    },
}


def page_name(prefix, suffix):
    return prefix + suffix + '.html' if suffix else prefix + '.html'


def flow_html(t, active):
    items = []
    for key, num in [('step1', 1), ('step2', 2), ('step3', 3)]:
        cls = ' class="active"' if active == num else ''
        items.append('                <li{0}>{1}</li>'.format(cls, t[key]))
    return '\n'.join(items)


def footer_scripts(include_tel_js=False):
    if include_tel_js:
        return '''    <script>
      (function() {
        var inputs = document.querySelectorAll('.cancel-tel-last4');
        inputs.forEach(function(input, index) {
          input.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '').slice(0, 1);
            if (this.value && inputs[index + 1]) {
              inputs[index + 1].focus();
            }
          });
          input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && !this.value && inputs[index - 1]) {
              inputs[index - 1].focus();
            }
          });
        });
      })();
    </script>
  </body>
</html>
'''
    return '  </body>\n</html>\n'


def gen_verify(lang, suffix):
    t = T[lang]
    confirm_target = page_name('cancel_confirm', suffix)
    title = t['verify_title']
    dir_attr = ''
    return '''<!doctype html>
<html class="no-js" lang="{lang}"{dir_attr}>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>{doc_title}｜{shop}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="./assets/css/main.css" rel="stylesheet">
  </head>
  <body>
{header}
    <main>
      <form action="./{confirm_target}" method="get" id="cancelVerifyForm">
        <section class="confirm01 cancel-flow">
          <div class="container gutters">
            <div class="text-center text-xlarge">{verify_title}</div>
            <div class="text-center text-large cancel-lead">
              {verify_lead}
            </div>
            <div class="box">
              <ul>
                <li>
                  <label>
                    <span class="title_txt">
                      <span>{field_title}</span>
                    </span>
                    <div class="table-container">
                      <div class="row cancel-tel-row">
                        <div class="cell cell-1 text-right cancel-tel-label-cell">{last4}<span class="required">{required}</span></div>
                        <div class="cell cell-2">
                          <div class="cancel-tel-last4-wrap">
                            <input type="text" class="input_tel02 cancel-tel-last4" id="telLast4_1" name="telLast4_1" maxlength="1" inputmode="numeric" pattern="[0-9]" aria-label="{aria} 1" required>
                            <input type="text" class="input_tel02 cancel-tel-last4" id="telLast4_2" name="telLast4_2" maxlength="1" inputmode="numeric" pattern="[0-9]" aria-label="{aria} 2" required>
                            <input type="text" class="input_tel02 cancel-tel-last4" id="telLast4_3" name="telLast4_3" maxlength="1" inputmode="numeric" pattern="[0-9]" aria-label="{aria} 3" required>
                            <input type="text" class="input_tel02 cancel-tel-last4" id="telLast4_4" name="telLast4_4" maxlength="1" inputmode="numeric" pattern="[0-9]" aria-label="{aria} 4" required>
                          </div>
                          <p class="cancel-help-text">{help}</p>
                        </div>
                      </div>
                    </div>
                  </label>
                </li>
              </ul>
              <div class="input_wrap">
                <p class="submit_wrap">
                  <input type="submit" value="{submit_verify}">
                </p>
              </div>
            </div>
          </div>
        </section>
      </form>
      <div class="foot">© 2025 IFLAG Co, Ltd.</div>
    </main>
{footer_scripts}'''.format(
        lang=lang, dir_attr=dir_attr, doc_title=title, shop=t['shop'],
        header=build_header(lang, t, 1),
        confirm_target=confirm_target,
        verify_title=t['verify_title'], verify_lead=t['verify_lead'],
        field_title=t['field_title'], last4=t['last4'], required=t['required'],
        help=t['help'], submit_verify=t['submit_verify'], aria=t['aria'],
        footer_scripts=footer_scripts(True),
    )


def build_header(lang, t, active_step, page_prefix=None):
    return '''    <header>
      <div class="primary_header">
        <div class="container">
          <div class="row">
            <h1 class="title"> {shop} </h1>
            <div class="flow">
              <ul>
{flow}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>'''.format(
        shop=t['shop'],
        flow=flow_html(t, active_step),
    )


def gen_confirm(lang, suffix):
    t = T[lang]
    complete_target = page_name('cancel_complete', suffix)
    dir_attr = ''
    return '''<!doctype html>
<html class="no-js" lang="{lang}"{dir_attr}>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>{doc_title}｜{shop}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="./assets/css/main.css" rel="stylesheet">
  </head>
  <body>
{header}
    <main>
      <form action="./{complete_target}" method="get">
        <section class="confirm01 cancel-flow">
          <div class="container gutters">
            <div class="text-center text-xlarge">{confirm_title}</div>
            <div class="text-center text-large cancel-lead">
              {confirm_lead}
            </div>
            <div class="box">
              <ul>
                <li>
                  <label>
                    <span class="title_txt">
                      <span>{section_target}</span>
                    </span>
                    <div class="table-container">
                      <div class="row">
                        <div class="cell cell-1 text-right">{reservation_no}</div>
                        <div class="cell cell-2">12345</div>
                      </div>
                      <div class="row">
                        <div class="cell cell-1 text-right">{guests}</div>
                        <div class="cell cell-2">{guests_val}</div>
                      </div>
                      <div class="row">
                        <div class="cell cell-1 text-right">{service}</div>
                        <div class="cell cell-2">{service_val}</div>
                      </div>
                      <div class="row">
                        <div class="cell cell-1 text-right">{datetime}</div>
                        <div class="cell cell-2">{datetime_val}</div>
                      </div>
                      <div class="row">
                        <div class="cell cell-1 text-right">{price}</div>
                        <div class="cell cell-2">{price_val}</div>
                      </div>
                    </div>
                  </label>
                </li>
                <li>
                  <label>
                    <span class="title_txt">
                      <span>{section_customer}</span>
                    </span>
                    <div class="table-container">
                      <div class="row">
                        <div class="cell cell-1 text-right">{name}</div>
                        <div class="cell cell-2">{name_val}</div>
                      </div>
                      <div class="row">
                        <div class="cell cell-1 text-right">{furigana}</div>
                        <div class="cell cell-2">{furigana_val}</div>
                      </div>
                      <div class="row">
                        <div class="cell cell-1 text-right">{phone}</div>
                        <div class="cell cell-2">03-0000-1111</div>
                      </div>
                      <div class="row">
                        <div class="cell cell-1 text-right">{email}</div>
                        <div class="cell cell-2">test@iflag.co.jp</div>
                      </div>
                      <div class="row">
                        <div class="cell cell-1 text-right">{comment}</div>
                        <div class="cell cell-2">{comment_val}</div>
                      </div>
                    </div>
                  </label>
                </li>
              </ul>
              <div class="cancel-notice-box">
                <p>{notice1}</p>
                <p>{notice2}</p>
              </div>
              <div class="input_wrap">
                <p class="submit_wrap cancel-submit-wrap">
                  <input type="submit" value="{submit_cancel}" class="cancel-submit-btn">
                </p>
              </div>
            </div>
          </div>
        </section>
      </form>
      <div class="foot">© 2025 IFLAG Co, Ltd.</div>
    </main>
{footer_scripts}'''.format(
        lang=lang, dir_attr=dir_attr, doc_title=t['confirm_title'], shop=t['shop'],
        header=build_header(lang, t, 2, 'cancel_confirm'),
        complete_target=complete_target,
        confirm_title=t['confirm_title'], confirm_lead=t['confirm_lead'],
        section_target=t['section_target'], reservation_no=t['reservation_no'],
        guests=t['guests'], guests_val=t['guests_val'], service=t['service'],
        service_val=t['service_val'], datetime=t['datetime'], datetime_val=t['datetime_val'],
        price=t['price'], price_val=t['price_val'], section_customer=t['section_customer'],
        name=t['name'], name_val=t['name_val'], furigana=t['furigana'],
        furigana_val=t['furigana_val'], phone=t['phone'], email=t['email'],
        comment=t['comment'], comment_val=t['comment_val'], notice1=t['notice1'],
        notice2=t['notice2'], submit_cancel=t['submit_cancel'],
        footer_scripts=footer_scripts(False),
    )


def gen_complete(lang, suffix):
    t = T[lang]
    index_target = page_name('index', suffix)
    dir_attr = ''
    return '''<!doctype html>
<html class="no-js" lang="{lang}"{dir_attr}>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>{doc_title}｜{shop}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="./assets/css/main.css" rel="stylesheet">
  </head>
  <body>
{header}
    <main>
      <section class="confirm01 cancel-flow">
        <div class="container gutters">
          <div class="text-center text-xlarge">{complete_title}</div>
          <div class="text-center text-large cancel-lead">
            {complete_lead1}<br>
            {complete_lead2}
          </div>
          <div class="input_wrap">
            <p class="submit_wrap">
              <a href="./{index_target}">{form_link}</a>
            </p>
          </div>
        </div>
      </section>
      <div class="foot">© 2025 IFLAG Co, Ltd.</div>
    </main>
{footer_scripts}'''.format(
        lang=lang, dir_attr=dir_attr, doc_title=t['complete_title'], shop=t['shop'],
        header=build_header(lang, t, 3, 'cancel_complete'),
        index_target=index_target,
        complete_title=t['complete_title'], complete_lead1=t['complete_lead1'],
        complete_lead2=t['complete_lead2'], form_link=t['form_link'],
        footer_scripts=footer_scripts(False),
    )


def main():
    count = 0
    for lang, suffix, _ in LANGS:
        for prefix, gen in [('cancel_verify', gen_verify), ('cancel_confirm', gen_confirm), ('cancel_complete', gen_complete)]:
            path = os.path.join(BASE, page_name(prefix, suffix))
            content = gen(lang, suffix)
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            count += 1
            print('Wrote', path)

    print('Total written:', count)


if __name__ == '__main__':
    main()
