// ฟังก์ชันสลับการแสดงผลหน้า UI ต่าง ๆ (Single Page Application)
function switchView(viewId) {
    // ซ่อนเซกชันทั้งหมด
    const sections = document.querySelectorAll('.view-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // เปิดการแสดงผลเฉพาะเซกชันที่เลือก
    const targetSection = document.getElementById(viewId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // เลื่อนหน้าจอกลับขึ้นไปด้านบนสุดอย่างนุ่มนวลทุกครั้งที่เปลี่ยนหน้า
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ฟังก์ชันเปิด-ปิด โหมดกลางคืน (Dark Mode Toggle)
function toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
}

// ฟังก์ชันจำลองแจ้งเตือนเหตุการณ์ต่าง ๆ ของระบบ
function triggerAlert(actionType) {
    switch(actionType) {
        case 'credits':
            alert('ผู้พัฒนาโครงการ: Anonymous Consulting Space Team\nขอบคุณที่แวะเข้ามาใช้งานพื้นที่ปลอดภัยของเราครับ');
            break;
        case 'find-listener':
            alert('ระบบกำลังทำการสุ่มจับคู่คุณเข้ากับผู้ให้คำปรึกษาแบบนิรนาม กรุณารอสักครู่...');
            break;
        case 'be-advisor':
            alert('กำลังเปิดระบบลงทะเบียนคิวเพื่อสลับไปรับฟังปัญหาของเพื่อน ๆ ในระบบนิรนาม...');
            break;
        default:
            console.log('Action type unknown');
    }
}
