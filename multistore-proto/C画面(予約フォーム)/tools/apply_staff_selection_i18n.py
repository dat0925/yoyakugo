#!/usr/bin/env python3
"""Add staff selection to non-Japanese C-screen pages."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

LANGS = {
    "en": {
        "flow_old": "Date & Time",
        "flow_new": "Staff & Date & Time",
        "staff_h2": "Select Staff Member",
        "no_preference": "No preference",
        "date_h2": "Select Date and Time",
        "date_confirm": "Date & Time",
        "staff_label": "Staff Member",
        "comment_a": "Feel free to ask about treatments or any concerns. For first-time visitors, I will carefully listen to your condition and preferences and suggest the best treatment plan.",
        "comment_b": "I focus on relaxation treatments to support your body care. I propose treatments tailored to each person to relieve daily fatigue and improve stiff shoulders.",
        "comment_c": "I will guide you carefully.",
    },
    "ko": {
        "flow_old": "날짜·시간",
        "flow_new": "담당자·날짜·시간",
        "staff_h2": "담당자 선택",
        "no_preference": "지정하지 않음",
        "date_h2": "날짜·시간 선택",
        "date_confirm": "날짜·시간",
        "staff_label": "담당자",
        "comment_a": "시술 상담이나 고민이 있으시면 편하게 말씀해 주세요. 처음 방문하시는 분께는 몸 상태와 희망 사항을 정성껏 듣고 최적의 시술 플랜을 제안해 드립니다.",
        "comment_b": "이완 시술을 중심으로 몸 관리를 돕습니다. 일상의 피로와 어깨 결림 개선을 위해 개인별 맞춤 시술을 제안합니다.",
        "comment_c": "정성껏 안내해 드리겠습니다.",
    },
    "zh-cn": {
        "flow_old": "日期与时间",
        "flow_new": "服务人员·日期与时间",
        "staff_h2": "选择服务人员",
        "no_preference": "不指定",
        "date_h2": "选择日期与时间",
        "date_confirm": "日期与时间",
        "staff_label": "服务人员",
        "comment_a": "如有治疗咨询或困扰，请随时告知。对于首次到访的顾客，我会仔细了解您的身体状况与需求，并推荐最合适的治疗方案。",
        "comment_b": "以放松护理为主，支持您的身体调养。我会根据每位顾客的情况，提出缓解日常疲劳与改善肩颈不适的护理方案。",
        "comment_c": "我将为您细心引导。",
    },
    "zh-tw": {
        "flow_old": "日期與時間",
        "flow_new": "服務人員·日期與時間",
        "staff_h2": "選擇服務人員",
        "no_preference": "不指定",
        "date_h2": "選擇日期與時間",
        "date_confirm": "日期與時間",
        "staff_label": "服務人員",
        "comment_a": "若有療程諮詢或困擾，歡迎隨時告知。對於首次到訪的顧客，我會仔細了解您的身體狀況與需求，並推薦最合適的療程方案。",
        "comment_b": "以放鬆療程為主，協助您的身體調養。我會依每位顧客的情況，提出緩解日常疲勞與改善肩頸不適的療程方案。",
        "comment_c": "我將為您細心引導。",
    },
    "th": {
        "flow_old": "วันที่และเวลา",
        "flow_new": "พนักงาน·วันที่และเวลา",
        "staff_h2": "เลือกพนักงาน",
        "no_preference": "ไม่ระบุ",
        "date_h2": "เลือกวันที่และเวลา",
        "date_confirm": "วันที่และเวลา",
        "staff_label": "พนักงาน",
        "comment_a": "หากมีคำปรึกษาเกี่ยวกับการรักษาหรือข้อกังวล กรุณาบอกได้เลย สำหรับลูกค้าใหม่ ฉันจะรับฟังสภาพร่างกายและความต้องการอย่างละเอียด และเสนอแผนการรักษาที่เหมาะสมที่สุด",
        "comment_b": "เน้นการรักษาแบบผ่อนคลายเพื่อดูแลร่างกายของคุณ ฉันเสนอการรักษาที่เหมาะกับแต่ละคนเพื่อบรรเทาความเหนื่อยล้าและอาการไหล่ติด",
        "comment_c": "ฉันจะให้คำแนะนำอย่างใส่ใจ",
    },
    "vi": {
        "flow_old": "Ngày & Giờ",
        "flow_new": "Nhân viên & Ngày & Giờ",
        "staff_h2": "Chọn nhân viên",
        "no_preference": "Không chỉ định",
        "date_h2": "Chọn ngày và giờ",
        "date_confirm": "Ngày & Giờ",
        "staff_label": "Nhân viên",
        "comment_a": "Nếu bạn cần tư vấn về liệu trình hoặc có thắc mắc, hãy cứ hỏi nhé. Với khách lần đầu, tôi sẽ lắng nghe cẩn thận tình trạng và mong muốn của bạn, rồi đề xuất phương án liệu trình phù hợp nhất.",
        "comment_b": "Tôi tập trung vào liệu trình thư giãn để hỗ trợ chăm sóc cơ thể. Tôi đề xuất liệu trình phù hợp với từng người để giảm mệt mỏi hằng ngày và cải thiện đau vai cổ.",
        "comment_c": "Tôi sẽ hướng dẫn bạn chu đáo.",
    },
    "id": {
        "flow_old": "Tanggal & Waktu",
        "flow_new": "Staf & Tanggal & Waktu",
        "staff_h2": "Pilih Staf",
        "no_preference": "Tidak ditentukan",
        "date_h2": "Pilih Tanggal dan Waktu",
        "date_confirm": "Tanggal & Waktu",
        "staff_label": "Staf",
        "comment_a": "Silakan bertanya tentang perawatan atau keluhan Anda. Untuk pengunjung pertama kali, saya akan mendengarkan kondisi dan keinginan Anda dengan saksama serta menyarankan rencana perawatan terbaik.",
        "comment_b": "Saya berfokus pada perawatan relaksasi untuk mendukung perawatan tubuh Anda. Saya menyarankan perawatan yang disesuaikan untuk mengurangi kelelahan harian dan mengatasi pegal bahu.",
        "comment_c": "Saya akan memandu Anda dengan teliti.",
    },
    "ms": {
        "flow_old": "Tarikh & Masa",
        "flow_new": "Kakitangan & Tarikh & Masa",
        "staff_h2": "Pilih Kakitangan",
        "no_preference": "Tidak dinyatakan",
        "date_h2": "Pilih Tarikh dan Masa",
        "date_confirm": "Tarikh & Masa",
        "staff_label": "Kakitangan",
        "comment_a": "Sila bertanya tentang rawatan atau sebarang kebimbangan. Untuk pelanggan kali pertama, saya akan mendengar keadaan dan kehendak anda dengan teliti serta mencadangkan pelan rawatan terbaik.",
        "comment_b": "Saya memberi tumpuan kepada rawatan relaksasi untuk menyokong penjagaan badan anda. Saya mencadangkan rawatan mengikut keperluan setiap individu untuk mengurangkan keletihan harian dan melegakan bahu yang tegang.",
        "comment_c": "Saya akan membimbing anda dengan teliti.",
    },
    "tl": {
        "flow_old": "Petsa at Oras",
        "flow_new": "Staff at Petsa at Oras",
        "staff_h2": "Pumili ng Staff",
        "no_preference": "Hindi tukuyin",
        "date_h2": "Pumili ng Petsa at Oras",
        "date_confirm": "Petsa at Oras",
        "staff_label": "Staff",
        "comment_a": "Huwag mag-atubiling magtanong tungkol sa treatment o anumang alalahanin. Para sa mga first-time visitor, pakikinggan ko nang mabuti ang inyong kondisyon at hinihingi at magmumungkahi ng pinakamainam na treatment plan.",
        "comment_b": "Nakatuon ako sa relaxation treatment para suportahan ang pag-aalaga sa katawan. Magmumungkahi ako ng treatment na naaayon sa bawat tao upang maibsan ang pagod at paninigas ng balikat.",
        "comment_c": "Gabayan ko kayo nang maingat.",
    },
    "pt": {
        "flow_old": "Data e hora",
        "flow_new": "Profissional e Data e hora",
        "staff_h2": "Selecionar profissional",
        "no_preference": "Sem preferência",
        "date_h2": "Selecionar data e hora",
        "date_confirm": "Data e hora",
        "staff_label": "Profissional",
        "comment_a": "Sinta-se à vontade para perguntar sobre tratamentos ou qualquer dúvida. Para quem vem pela primeira vez, ouvirei com atenção suas necessidades e condições e sugerirei o melhor plano de tratamento.",
        "comment_b": "Foco em tratamentos de relaxamento para cuidar do seu corpo. Proponho tratamentos personalizados para aliviar o cansaço diário e melhorar dores nos ombros.",
        "comment_c": "Vou orientá-lo com atenção.",
    },
    "ar": {
        "flow_old": "التاريخ والوقت",
        "flow_new": "الموظف·التاريخ والوقت",
        "staff_h2": "اختيار الموظف",
        "no_preference": "بدون تحديد",
        "date_h2": "اختر التاريخ والوقت",
        "date_confirm": "التاريخ والوقت",
        "staff_label": "الموظف",
        "comment_a": "لا تتردد في السؤال عن العلاج أو أي استفسار. بالنسبة للزوار لأول مرة، سأستمع بعناية إلى حالتك ورغباتك وأقترح أفضل خطة علاج.",
        "comment_b": "أركز على علاجات الاسترخاء لدعم العناية بجسمك. أقترح علاجات مخصصة لكل شخص للتخفيف من التعب اليومي وتحسين آلام الكتف.",
        "comment_c": "سأرشدك بعناية.",
    },
    "ru": {
        "flow_old": "Дата и время",
        "flow_new": "Сотрудник·Дата и время",
        "staff_h2": "Выбор сотрудника",
        "no_preference": "Не указывать",
        "date_h2": "Выберите дату и время",
        "date_confirm": "Дата и время",
        "staff_label": "Сотрудник",
        "comment_a": "Не стесняйтесь спрашивать о процедурах или любых вопросах. Для новых клиентов я внимательно выслушаю ваше состояние и пожелания и предложу оптимальный план процедур.",
        "comment_b": "Я специализируюсь на расслабляющих процедурах для ухода за телом. Предлагаю индивидуальные процедуры для снятия усталости и улучшения состояния плеч.",
        "comment_c": "Я внимательно вас проконсультирую.",
    },
    "hi": {
        "flow_old": "दिनांक और समय",
        "flow_new": "कर्मचारी·दिनांक और समय",
        "staff_h2": "कर्मचारी चुनें",
        "no_preference": "निर्दिष्ट नहीं",
        "date_h2": "दिनांक और समय चुनें",
        "date_confirm": "दिनांक और समय",
        "staff_label": "कर्मचारी",
        "comment_a": "उपचार या किसी भी चिंता के बारे में बेझिझक पूछें। पहली बार आने वालों के लिए, मैं आपकी स्थिति और इच्छाएँ ध्यान से सुनूँगा/सुनूँगी और सर्वोत्तम उपचार योजना सुझाऊँगा/सुझाऊँगी।",
        "comment_b": "मैं शरीर की देखभाल के लिए विश्राम उपचार पर ध्यान केंद्रित करता/करती हूँ। दैनिक थकान और कंधे की अकड़न कम करने के लिए व्यक्तिगत उपचार सुझाता/सुझाती हूँ।",
        "comment_c": "मैं आपका ध्यानपूर्वक मार्गदर्शन करूँगा/करूँगी।",
    },
    "de": {
        "flow_old": "Datum & Uhrzeit",
        "flow_new": "Mitarbeiter & Datum & Uhrzeit",
        "staff_h2": "Mitarbeiter auswählen",
        "no_preference": "Keine Angabe",
        "date_h2": "Datum und Uhrzeit wählen",
        "date_confirm": "Datum & Uhrzeit",
        "staff_label": "Mitarbeiter",
        "comment_a": "Fragen Sie gerne zu Behandlungen oder Anliegen. Bei Erstbesuch höre ich mir Ihren Zustand und Ihre Wünsche sorgfältig an und schlage den besten Behandlungsplan vor.",
        "comment_b": "Ich konzentriere mich auf Entspannungsbehandlungen zur Körperpflege. Ich schlage individuelle Behandlungen vor, um tägliche Müdigkeit zu lindern und Verspannungen in den Schultern zu verbessern.",
        "comment_c": "Ich berate Sie sorgfältig.",
    },
    "fr": {
        "flow_old": "Date et heure",
        "flow_new": "Praticien·Date et heure",
        "staff_h2": "Choisir un praticien",
        "no_preference": "Sans préférence",
        "date_h2": "Choisir la date et l'heure",
        "date_confirm": "Date et heure",
        "staff_label": "Praticien",
        "comment_a": "N'hésitez pas à poser des questions sur les soins ou vos préoccupations. Pour les nouveaux clients, j'écouterai attentivement votre état et vos souhaits et proposerai le meilleur plan de soins.",
        "comment_b": "Je me concentre sur les soins de relaxation pour accompagner votre corps. Je propose des soins adaptés à chaque personne pour soulager la fatigue quotidienne et améliorer les tensions des épaules.",
        "comment_c": "Je vous guiderai avec soin.",
    },
}


def staff_block(lang: dict) -> str:
    return f'''            <h2>{lang["staff_h2"]}</h2>
            <div class="staff_select_wrap">
              <ul class="staff_list">
                <li>
                  <label for="staff_none">
                    <span class="title_txt title_txt_simple">
                      <input type="radio" name="staff" id="staff_none" value="" checked>
                      <span class="staff_info">
                        <span class="staff_name">{lang["no_preference"]}</span>
                      </span>
                    </span>
                  </label>
                </li>
                <li>
                  <label for="staff_a">
                    <span class="title_txt">
                      <input type="radio" name="staff" id="staff_a" value="staff_a">
                      <span class="staff_head">
                        <span class="staff_avatar" data-avatar-src="./assets/img/tencho.png" aria-hidden="true"></span>
                        <span class="staff_name">店長</span>
                      </span>
                      <span class="staff_comment_block">
                        <span class="staff_comment">{lang["comment_a"]}</span>
                      </span>
                    </span>
                  </label>
                </li>
                <li>
                  <label for="staff_b">
                    <span class="title_txt">
                      <input type="radio" name="staff" id="staff_b" value="staff_b">
                      <span class="staff_head">
                        <span class="staff_avatar" aria-hidden="true"></span>
                        <span class="staff_name">店舗 太郎</span>
                      </span>
                      <span class="staff_comment_block">
                        <span class="staff_comment">{lang["comment_b"]}</span>
                      </span>
                    </span>
                  </label>
                </li>
                <li>
                  <label for="staff_c">
                    <span class="title_txt">
                      <input type="radio" name="staff" id="staff_c" value="staff_c">
                      <span class="staff_head">
                        <span class="staff_avatar" aria-hidden="true"></span>
                        <span class="staff_name">店舗花子</span>
                      </span>
                      <span class="staff_comment_block">
                        <span class="staff_comment">{lang["comment_c"]}</span>
                      </span>
                    </span>
                  </label>
                </li>
              </ul>
            </div>
'''


def staff_confirm_row(lang: dict) -> str:
    return f'''                      <div class="row">
                        <div class="cell cell-1 text-right">{lang["staff_label"]}</div>
                        <div class="cell cell-2">店舗花子</div>
                      </div>
'''


def update_index(path: Path, lang: dict) -> bool:
    text = path.read_text(encoding="utf-8")
    if "staff_select_wrap" in text:
        print(f"  skip index (already has staff): {path.name}")
        return False

    flow_old = lang["flow_old"]
    flow_new = lang["flow_new"]
    if f'<li>{flow_old}</li>' not in text:
        # try HTML entity variant for &
        flow_old_amp = flow_old.replace("&", "&amp;")
        if f'<li>{flow_old_amp}</li>' in text:
            text = text.replace(f'<li>{flow_old_amp}</li>', f'<li>{flow_new}</li>', 1)
        else:
            print(f"  skip index (flow not found): {path.name}")
            return False
    else:
        text = text.replace(f'<li>{flow_old}</li>', f'<li>{flow_new}</li>', 1)

    date_h2 = lang["date_h2"]
    marker = f'            <h2>{date_h2}</h2>\n'
    if marker not in text:
        print(f"  skip index (date h2 not found): {path.name}")
        return False

    text = text.replace(marker, staff_block(lang) + marker, 1)
    path.write_text(text, encoding="utf-8")
    return True


def update_confirm_like(path: Path, lang: dict) -> bool:
    text = path.read_text(encoding="utf-8")
    if lang["staff_label"] in text and "店舗花子" in text:
        print(f"  skip confirm (already has staff): {path.name}")
        return False

    date_label = re.escape(lang["date_confirm"])
    pattern = (
        rf'(<div class="row">\s*<div class="cell cell-1 text-right">{date_label}</div>\s*'
        r'<div class="cell cell-2">[^<]*</div>\s*</div>\s*)'
    )
    m = re.search(pattern, text, re.DOTALL)
    if not m:
        print(f"  skip confirm (date row not found): {path.name}")
        return False

    insert_at = m.end(1)
    new_text = text[:insert_at] + staff_confirm_row(lang) + text[insert_at:]
    path.write_text(new_text, encoding="utf-8")
    return True


def main() -> None:
    for code, lang in LANGS.items():
        print(f"Processing {code}...")
        index_path = ROOT / f"index_{code}.html"
        if index_path.exists():
            if update_index(index_path, lang):
                print(f"  updated {index_path.name}")

        for prefix in ("confirm", "complete", "cancel_confirm"):
            p = ROOT / f"{prefix}_{code}.html"
            if p.exists():
                if update_confirm_like(p, lang):
                    print(f"  updated {p.name}")


if __name__ == "__main__":
    main()
