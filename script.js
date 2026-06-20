// ตัวแปรควบคุมระบบหน้าหลัก
function switchView(viewId) {
    const sections = document.querySelectorAll('.view-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const targetSection = document.getElementById(viewId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
}

function triggerAlert(actionType) {
    if(actionType === 'credits') {
        alert('ผู้พัฒนาโครงการ: Anonymous Consulting Space Team\nขอบคุณที่แวะเข้ามาใช้งานพื้นที่ปลอดภัยของเราครับ');
    }
}

// ================= ระบบจัดการเวลาคิวและแอนิเมชันฝึกหายใจ =================

let queueInterval = null;
let breathingInterval = null;
let countdownSeconds = 45;

// ฟังก์ชันเริ่มจับคู่คิวและเปิดใช้งาน Companion
function startMatching(roleName) {
    // ซ่อนสล็อตกล่องตัวเลือกบทบาท
    document.getElementById('role-selection').style.display = 'none';
    
    // อัปเดตข้อความหัวข้อให้เหมาะกับสถานการณ์
    document.getElementById('role-instruction').innerText = `คุณกำลังรอในฐานะ: ${roleName}`;
    
    // แสดงพานิยมินิเกมกำหนดลมหายใจ
    document.getElementById('breathing-companion').style.display = 'flex';
    
    // สั่งให้น้องก้อนเมฆเริ่มขยายตัวผ่านอนิเมชัน CSS
    const cloud = document.getElementById('cloud-mascot');
    cloud.classList.add('inhale-exhale');

    // เรียกเริ่มระบบนับถอยหลังเวลาและสลับคำพูดสอนหายใจ
    initQueueTimer();
    initBreathingGuide();
}

// ฟังก์ชันยกเลิกสถานะรอคิวและย้อนกลับ
function cancelMatching() {
    // ล้างตัวนับเวลาทั้งหมดเพื่อป้องกัน Memory Leak
    clearInterval(queueInterval);
    clearInterval(breathingInterval);
    
    // ถอดคลาสแอนิเมชันของก้อนเมฆออก
    const cloud = document.getElementById('cloud-mascot');
    cloud.classList.remove('inhale-exhale');
    
    // คืนค่ากล่องดั้งเดิม
    document.getElementById('role-selection').style.display = 'flex';
    document.getElementById('breathing-companion').style.display = 'none';
    document.getElementById('role-instruction').innerText = 'ยินดีต้อนรับทุกท่าน เข้าสู่การปรึกษาแบบไม่เปิดเผยตัวตน คุณสามารถเลือกได้ว่าวันนี้จะทำอะไร';
    
    // ย้อนกลับหน้าแรก
    switchView('home-page');
}

// ระบบนับถอยหลังคิวจำลอง
function initQueueTimer() {
    countdownSeconds = 45; // ตั้งค่าเริ่มต้นที่ 45 วินาที
    document.getElementById('queue-timer').innerText = `คาดว่าจะได้คุยภายใน: ${countdownSeconds} วินาที`;
    
    queueInterval = setInterval(() => {
        countdownSeconds--;
        if (countdownSeconds <= 0) {
            clearInterval(queueInterval);
            clearInterval(breathingInterval);
            document.getElementById('queue-timer').innerText = "จับคู่สำเร็จแล้ว!";
            document.getElementById('breathing-text').innerText = "กำลังเข้าสู่ห้องแชทสด...";
            setTimeout(() => {
                alert("ระบบทำการเชื่อมต่อสายแชทสดให้คุณเรียบร้อยแล้ว!");
                cancelMatching(); // ล้างหน้าจอกลับสู่สถานะปกติ
            }, 800);
        } else {
            document.getElementById('queue-timer').innerText = `คาดว่าจะได้คุยภายใน: ${countdownSeconds} วินาที`;
        }
    }, 1000);
}

// ระบบอัปเดตข้อความนำทางลมหายใจ (ทุกๆ 4 วินาที สลับเข้า-ออก)
function initBreathingGuide() {
    const textElement = document.getElementById('breathing-text');
    textElement.innerText = "หายใจเข้าช้าๆ... 🧘";
    
    let isInhaling = true;
    
    breathingInterval = setInterval(() => {
        isInhaling = !isInhaling;
        if (isInhaling) {
            textElement.innerText = "หายใจเข้าช้าๆ... 🧘";
        } else {
            textElement.innerText = "ผ่อนลมหายใจออก... 🍃";
        }
    }, 4000); // เปลี่ยนทุก 4 วินาที ให้สัมพันธ์กับ Scale แอนิเมชัน CSS ที่วิ่งรอบละ 8 วินาที
}
