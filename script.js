const EXAM_DURATION_MINUTES = 120;
const STORAGE_KEY = "immigration-exam-answers";
const THAI_CHOICE_IDS = ["ก", "ข", "ค", "ง"];

const multipleChoiceData = [
  [1, "พระราชบัญญัติคนเข้าเมืองฉบับแรกตราขึ้นในปีใด", ["2469", "2470", "2480", "2493"]],
  [2, "วันสถาปนากรมตรวจคนเข้าเมืองคือวันใด", ["1 ม.ค.2470", "1 ต.ค.2470", "1 เม.ย.2475", "17 ต.ค.2541"]],
  [3, "พระราชบัญญัติคนเข้าเมือง พ.ศ.2522 ใช้บังคับเมื่อพ้นกำหนดกี่วัน", ["30 วัน", "60 วัน", "90 วัน", "120 วัน"]],
  [4, "พ.ร.บ.คนเข้าเมือง พ.ศ.2522 มีทั้งหมดกี่มาตรา", ["90", "91", "92", "93"]],
  [5, "พ.ร.บ.คนเข้าเมือง พ.ศ.2522 มีกี่หมวด", ["6", "7", "8", "9"]],
  [6, "ผู้รักษาการตาม พ.ร.บ.คนเข้าเมืองคือใคร", ["นายกรัฐมนตรี", "รมว.มหาดไทย", "ผบ.ตร.", "นายกรัฐมนตรีและ รมว.มหาดไทย"]],
  [7, "กฎกระทรวงมีผลใช้บังคับเมื่อใด", ["รัฐมนตรีลงนาม", "ครม.อนุมัติ", "ประกาศในราชกิจจานุเบกษา", "สตม.ประกาศ"]],
  [8, "คนต่างด้าวหมายถึงใคร", ["ไม่มีบัตรประชาชน", "ไม่มีทะเบียนบ้าน", "บุคคลธรรมดาซึ่งไม่มีสัญชาติไทย", "ผู้ถือพาสปอร์ตต่างชาติ"]],
  [9, "คนเข้าเมืองหมายถึงใคร", ["คนต่างด้าวที่ได้รับวีซ่า", "คนต่างด้าวซึ่งเข้ามาในราชอาณาจักร", "นักท่องเที่ยว", "ผู้มีถิ่นที่อยู่"]],
  [10, "พาหนะหมายความรวมถึงอะไร", ["ยานพาหนะ", "สัตว์พาหนะ", "สิ่งอื่นที่นำบุคคลจากที่หนึ่งไปอีกที่หนึ่ง", "ถูกทุกข้อ"]],
  [11, "เจ้าของพาหนะหมายความรวมถึง", ["ผู้เช่า", "ผู้ครอบครอง", "ตัวแทน", "ถูกทุกข้อ"]],
  [12, "ผู้ควบคุมพาหนะหมายถึง", ["คนโดยสาร", "นายเรือหรือผู้รับผิดชอบในการควบคุมพาหนะ", "ผู้เช่า", "ผู้ครอบครอง"]],
  [13, "คนประจำพาหนะคือ", ["ผู้มีหน้าที่ประจำพาหนะ", "ผู้โดยสาร", "คนต่างด้าว", "ผู้เช่า"]],
  [14, "คนโดยสารคือ", ["ผู้ควบคุมพาหนะ", "คนประจำพาหนะ", "ผู้เดินทางโดยพาหนะยกเว้นสองบุคคลข้างต้น", "เจ้าของพาหนะ"]],
  [15, "แพทย์ตรวจคนเข้าเมืองแต่งตั้งโดยใคร", ["รัฐมนตรี", "ผบ.ตร.", "อธิบดี", "นายกรัฐมนตรี"]],
  [16, "เจ้าบ้านหมายถึง", ["เจ้าของบ้านเท่านั้น", "ผู้เช่าเท่านั้น", "หัวหน้าครอบครองบ้าน", "กำนัน"]],
  [17, "เคหสถานหมายถึง", ["บ้าน", "เรือ", "แพ", "ถูกทุกข้อ"]],
  [18, "โรงแรมใช้นิยามตามกฎหมายใด", ["พ.ร.บ.อาคาร", "พ.ร.บ.โรงแรม", "ป.พ.พ.", "พ.ร.บ.สาธารณสุข"]],
  [19, "พนักงานเจ้าหน้าที่แต่งตั้งโดยใคร", ["ผบ.ตร.", "อธิบดี", "รัฐมนตรี", "คณะกรรมการ"]],
  [20, "คณะกรรมการ หมายถึง", ["ก.ตร.", "คณะกรรมการพิจารณาคนเข้าเมือง", "ก.พ.", "กฤษฎีกา"]],
  [21, "การเข้าออกราชอาณาจักรอยู่ในมาตราใด", ["6-10", "11-22", "23-33", "34-39"]],
  [22, "คนต่างด้าวต้องเข้ามาตามช่องทางใด", ["ช่องทางใดก็ได้", "ช่องทางอนุญาต", "ทางธรรมชาติ", "ทางเรือเท่านั้น"]],
  [23, "มาตรา 12 กล่าวถึงเรื่องใด", ["คณะกรรมการ", "ลักษณะต้องห้าม", "ถิ่นที่อยู่", "การส่งกลับ"]],
  [24, "ผู้ไม่มีหนังสือเดินทางเข้าข่ายใด", ["มาตรา 11", "มาตรา 12", "มาตรา 37", "มาตรา 54"]],
  [25, "ผู้เคยถูกเนรเทศอาจเป็นบุคคลตามมาตราใด", ["12", "37", "40", "54"]],
  [26, "การตรวจพาหนะอยู่ในมาตราใด", ["11-22", "23-33", "34-39", "40-52"]],
  [27, "การอยู่ชั่วคราวอยู่ในมาตราใด", ["23-33", "34-39", "40-52", "53-56"]],
  [28, "การมีถิ่นที่อยู่ในราชอาณาจักรอยู่ในมาตราใด", ["34-39", "40-52", "53-56", "57-60"]],
  [29, "การส่งคนต่างด้าวกลับอยู่ในมาตราใด", ["40-52", "53-56", "57-60", "61-92"]],
  [30, "การพิสูจน์สัญชาติไทยอยู่ในมาตราใด", ["57", "58", "59", "60"]],
  [31, "เจ้าบ้านต้องแจ้งที่พักคนต่างด้าวตามมาตราใด", ["36", "37", "38", "39"]],
  [32, "รายงานตัว 90 วันตามมาตราใด", ["36", "37", "38", "39"]],
  [33, "การเพิกถอนการอนุญาตอยู่ตามมาตราใด", ["35", "36", "37", "38"]],
  [34, "การมีถิ่นที่อยู่เริ่มต้นมาตราใด", ["39", "40", "41", "42"]],
  [35, "คณะกรรมการพิจารณาคนเข้าเมืองอยู่มาตราใด", ["4-5", "6-10", "11-22", "23-33"]],
  [36, "ประธานคณะกรรมการพิจารณาคนเข้าเมืองคือ", ["ผบ.ตร.", "ผบช.สตม.", "ปลัด มท.", "รมว.มท."]],
  [37, "เลขานุการคณะกรรมการคือ", ["ผบ.ตร.", "ผบช.สตม.", "ปลัด มท.", "รอง ผบ.ตร."]],
  [38, "คนต่างด้าวไม่มีสัญชาติไทยเป็นบุคคลประเภทใด", ["คนเข้าเมือง", "คนต่างด้าว", "คนภายใน", "คนโดยสาร"]],
  [39, "พ.ร.บ.2522 ยกเลิก พ.ร.บ.2493 หรือไม่", ["ไม่ยกเลิก", "ยกเลิก", "บางส่วน", "ไม่เกี่ยวข้อง"]],
  [40, "พ.ร.บ.2522 ยกเลิก พ.ร.บ.2497 หรือไม่", ["ไม่ยกเลิก", "ยกเลิก", "เฉพาะบางมาตรา", "ไม่เกี่ยว"]],
  [41, "สำนักงานตรวจคนเข้าเมืองอยู่ในสังกัดใดปัจจุบัน", ["มท.", "ยุติธรรม", "สำนักงานตำรวจแห่งชาติ", "กลาโหม"]],
  [42, "สตม. อยู่ในสังกัด ตร. ตั้งแต่ปีใด", ["2539", "2541", "2545", "2552"]],
  [43, "สตม. มีฐานะเทียบเท่าอะไร", ["กอง", "กองบังคับการ", "กองบัญชาการ", "สำนัก"]],
  [44, "วันประกาศใช้ พ.ร.ฎ.โอนกรมตำรวจไปเป็น สตช. คือ", ["16 ต.ค.2541", "17 ต.ค.2541", "18 ต.ค.2541", "19 ต.ค.2541"]],
  [45, "พระราชบัญญัติคนเข้าเมืองฉบับปัจจุบันคือ", ["2493", "2497", "2522", "2561"]],
  [46, "การแก้ไขครั้งล่าสุดเกี่ยวกับมาตรา 12 ในปีใด", ["2558", "2559", "2560", "2561"]],
  [47, "มาตรา 4 คืออะไร", ["บทกำหนดโทษ", "บทนิยาม", "คณะกรรมการ", "พาหนะ"]],
  [48, "มาตรา 5 กล่าวถึงอะไร", ["อำนาจผู้รักษาการ", "บทนิยาม", "ลักษณะต้องห้าม", "การส่งกลับ"]],
  [49, "ผู้รักษาการมีอำนาจออกอะไร", ["พ.ร.บ.", "รัฐธรรมนูญ", "กฎกระทรวง", "ข้อบัญญัติท้องถิ่น"]],
  [50, "ค่าธรรมเนียมต้องไม่เกินอะไร", ["กฎกระทรวง", "บัญชีท้าย พ.ร.บ.", "มติ ครม.", "ระเบียบ ตร."]]
];

const shortAnswerData = [
  [51, "ช่องทางอนุญาตเกิดจากมาตราใด"],
  [52, "ลักษณะต้องห้ามออกสอบบ่อยที่สุดมาตราใด"],
  [53, "ผู้มีหมายจับอาจเข้าข่ายมาตราใด"],
  [54, "ผู้ไม่มีวีซ่าเข้าข่ายมาตราใด"],
  [55, "ผู้เป็นภัยต่อความมั่นคงเข้าข่ายมาตราใด"],
  [56, "คนต่างด้าวอยู่เกินกำหนดเรียกว่าอะไร"],
  [57, "TM.30 เกี่ยวข้องกับมาตราใด"],
  [58, "TM.47 เกี่ยวข้องกับมาตราใด"],
  [59, "Residence คืออะไร"],
  [60, "Repatriation คืออะไร"],
  [61, "คนภายในหมายถึงใคร"],
  [62, "การอยู่ถาวรอยู่หมวดใด"],
  [63, "การอยู่ชั่วคราวอยู่หมวดใด"],
  [64, "การส่งกลับอยู่หมวดใด"],
  [65, "การตรวจพาหนะอยู่หมวดใด"],
  [66, "พาหนะรวมสัตว์พาหนะหรือไม่"],
  [67, "คนโดยสารรวมผู้ควบคุมพาหนะหรือไม่"],
  [68, "ผู้ควบคุมพาหนะเป็นคนประจำพาหนะได้หรือไม่"],
  [69, "เจ้าบ้านรวมผู้เช่าหรือไม่"],
  [70, "โรงแรมอ้างอิงกฎหมายใด"],
  [71, "อธิบดีตามนิยามหมายถึงใคร"],
  [72, "รัฐมนตรีตามนิยามหมายถึงใคร"],
  [73, "กฎกระทรวงต้องประกาศที่ใด"],
  [74, "ประกาศกระทรวงต่างจากกฎกระทรวงอย่างไร"],
  [75, "คำสั่งมีผลเมื่อใด"],
  [76, "ประกาศมีผลเมื่อใด"],
  [77, "ระเบียบมีผลเมื่อใด"],
  [78, "บทเฉพาะกาลอยู่ท้ายกฎหมายหรือไม่"],
  [79, "บทเฉพาะกาลรองรับกฎหมายเดิมหรือไม่"],
  [80, "พ.ร.บ.2522 มีบทเฉพาะกาลกี่บท"],
  [81, "คนเข้าเมืองต้องผ่านการตรวจของใคร"],
  [82, "ผู้อนุญาตเข้าเมืองคือใคร"],
  [83, "การตรวจคนเข้าเมืองมีวัตถุประสงค์ใด"],
  [84, "การรักษาความมั่นคงเกี่ยวข้องกับ ตม. หรือไม่"],
  [85, "คนต่างด้าวสามารถมีถิ่นที่อยู่ได้หรือไม่"],
  [86, "ผู้มีถิ่นที่อยู่ยังเป็นคนต่างด้าวหรือไม่"],
  [87, "คนเข้าเมืองผิดกฎหมายอาจถูกส่งกลับตามมาตราใด"],
  [88, "การพิสูจน์สัญชาติอยู่ในหมวดใด"],
  [89, "พนักงานเจ้าหน้าที่มีหน้าที่ใด"],
  [90, "แพทย์ตรวจคนเข้าเมืองมีหน้าที่ใด"],
  [91, "ผู้จัดการโรงแรมเกี่ยวข้องกับมาตราใด"],
  [92, "เจ้าของพาหนะมีหน้าที่ใด"],
  [93, "คนประจำพาหนะต้องผ่านการตรวจหรือไม่"],
  [94, "ช่องทางอนุญาตกำหนดโดยใคร"],
  [95, "ด่าน ตม. จัดตั้งขึ้นเพื่ออะไร"],
  [96, "ผู้ไม่มีหนังสือเดินทางเข้าประเทศได้หรือไม่"],
  [97, "ผู้เคยถูกเนรเทศเข้าประเทศได้หรือไม่"],
  [98, "ผู้ฝ่าฝืน พ.ร.บ. อาจถูกจับกุมได้หรือไม่"],
  [99, "พ.ร.บ.คนเข้าเมืองเป็นกฎหมายมหาชนหรือไม่"],
  [100, "ข้อใดเป็นกฎหมายแม่บทของงานตรวจคนเข้าเมือง"]
];

const questions = [
  ...multipleChoiceData.map(([id, question, choices]) => ({
    id,
    question,
    type: "choice",
    choices: choices.map((text, index) => ({ id: THAI_CHOICE_IDS[index], text }))
  })),
  ...shortAnswerData.map(([id, question]) => ({
    id,
    question,
    type: "text",
    choices: []
  }))
];

const answerKey = {
  1: "ข", 2: "ข", 3: "ค", 4: "ค", 5: "ค", 6: "ง", 7: "ค", 8: "ค", 9: "ข", 10: "ง",
  11: "ง", 12: "ข", 13: "ก", 14: "ค", 15: "ค", 16: "ค", 17: "ง", 18: "ข", 19: "ค", 20: "ข",
  21: "ข", 22: "ข", 23: "ข", 24: "ข", 25: "ก", 26: "ข", 27: "ข", 28: "ข", 29: "ข", 30: "ก",
  31: "ค", 32: "ข", 33: "ข", 34: "ข", 35: "ข", 36: "ค", 37: "ข", 38: "ข", 39: "ข", 40: "ข",
  41: "ค", 42: "ข", 43: "ค", 44: "ก", 45: "ค", 46: "ง", 47: "ข", 48: "ก", 49: "ค", 50: "ข",
  51: "ก", 52: "ข", 53: "ข", 54: "ข", 55: "ข", 56: "Overstay", 57: "ค", 58: "ข", 59: "ถิ่นที่อยู่", 60: "ส่งกลับ",
  61: "คนมีถิ่นที่อยู่", 62: "หมวด 5", 63: "หมวด 4", 64: "หมวด 6", 65: "หมวด 3", 66: "ใช่", 67: "ไม่", 68: "ได้", 69: "ใช่", 70: "พ.ร.บ.โรงแรม",
  71: "อธิบดีกรมตำรวจ", 72: "รัฐมนตรีผู้รักษาการ", 73: "ราชกิจจานุเบกษา", 74: "ระดับกฎหมายต่างกัน", 75: "ตามคำสั่ง", 76: "เมื่อประกาศ", 77: "ตามระเบียบ", 78: "ใช่", 79: "ใช่", 80: "1 บท",
  81: "พนักงานเจ้าหน้าที่", 82: "พนักงานเจ้าหน้าที่", 83: "ควบคุมการเข้าออก", 84: "ใช่", 85: "ได้", 86: "ใช่", 87: "ม.54", 88: "เบ็ดเตล็ด", 89: "ปฏิบัติตาม พ.ร.บ.", 90: "ตรวจโรค",
  91: "ม.38", 92: "แจ้งข้อมูลพาหนะ", 93: "ต้อง", 94: "รัฐมนตรี มท.", 95: "ตรวจบุคคล", 96: "ไม่ได้", 97: "โดยหลักไม่ได้", 98: "ได้", 99: "ใช่", 100: "พ.ร.บ.คนเข้าเมือง พ.ศ.2522"
};

const examQuestions = questions;
const examAnswerKey = answerKey;

const state = {
  currentIndex: 0,
  answers: loadSavedAnswers(),
  submitted: false,
  reviewMode: false,
  endsAt: Date.now() + EXAM_DURATION_MINUTES * 60 * 1000,
  timerId: null
};

const elements = {
  emptyState: document.getElementById("emptyState"),
  examApp: document.getElementById("examApp"),
  resultPanel: document.getElementById("resultPanel"),
  timer: document.getElementById("timer"),
  scorePreview: document.getElementById("scorePreview"),
  progressBar: document.getElementById("progressBar"),
  questionNumbers: document.getElementById("questionNumbers"),
  questionCounter: document.getElementById("questionCounter"),
  savedStatus: document.getElementById("savedStatus"),
  questionText: document.getElementById("questionText"),
  choiceList: document.getElementById("choiceList"),
  prevBtn: document.getElementById("prevBtn"),
  nextBtn: document.getElementById("nextBtn"),
  submitBtn: document.getElementById("submitBtn"),
  finalScore: document.getElementById("finalScore"),
  resultSummary: document.getElementById("resultSummary"),
  reviewBtn: document.getElementById("reviewBtn"),
  restartBtn: document.getElementById("restartBtn")
};

document.addEventListener("DOMContentLoaded", initExam);

function initExam() {
  if (questions.length === 0 || Object.keys(answerKey).length === 0) {
    elements.emptyState.classList.remove("d-none");
  }

  renderQuestionNumbers();
  renderQuestion();
  updateProgress();
  startTimer();
  bindEvents();
}

function bindEvents() {
  elements.prevBtn.addEventListener("click", () => moveQuestion(-1));
  elements.nextBtn.addEventListener("click", () => moveQuestion(1));
  elements.submitBtn.addEventListener("click", submitExam);
  elements.reviewBtn.addEventListener("click", showReview);
  elements.restartBtn.addEventListener("click", restartExam);
}

function renderQuestionNumbers() {
  elements.questionNumbers.innerHTML = "";

  examQuestions.forEach((question, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "question-number";
    button.textContent = index + 1;
    button.setAttribute("aria-label", `ไปยังข้อ ${index + 1}`);
    button.addEventListener("click", () => {
      state.currentIndex = index;
      renderQuestion();
    });
    elements.questionNumbers.appendChild(button);
  });
}

function renderQuestion() {
  const question = examQuestions[state.currentIndex];
  elements.questionCounter.textContent = `ข้อ ${state.currentIndex + 1} / ${examQuestions.length}`;
  elements.questionText.textContent = question.question;
  elements.choiceList.innerHTML = "";

  if (question.type === "text") {
    renderTextAnswer(question);
  } else {
    renderChoiceAnswer(question);
  }

  elements.prevBtn.disabled = state.currentIndex === 0;
  elements.nextBtn.disabled = state.currentIndex === examQuestions.length - 1;
  elements.submitBtn.disabled = state.submitted;
  updateQuestionNumberStates();
  updateProgress();
}

function renderChoiceAnswer(question) {
  question.choices.forEach((choice) => {
    const label = document.createElement("label");
    label.className = "choice-item";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = `question-${question.id}`;
    input.value = choice.id;
    input.checked = state.answers[question.id] === choice.id;
    input.disabled = state.submitted;
    input.addEventListener("change", () => saveAnswer(question.id, choice.id));

    const text = document.createElement("span");
    text.textContent = `${choice.id}. ${choice.text}`;

    if (state.reviewMode) {
      const correctAnswer = examAnswerKey[question.id];
      if (choice.id === correctAnswer) label.classList.add("correct-answer");
      if (state.answers[question.id] === choice.id && choice.id !== correctAnswer) {
        label.classList.add("wrong-answer");
      }
    }

    label.append(input, text);
    elements.choiceList.appendChild(label);
  });
}

function renderTextAnswer(question) {
  const wrapper = document.createElement("div");
  wrapper.className = "text-answer";

  const label = document.createElement("label");
  label.className = "form-label";
  label.setAttribute("for", `text-answer-${question.id}`);
  label.textContent = "พิมพ์คำตอบ";

  const input = document.createElement("input");
  input.id = `text-answer-${question.id}`;
  input.className = "form-control";
  input.type = "text";
  input.value = state.answers[question.id] || "";
  input.disabled = state.submitted;
  input.placeholder = "กรอกคำตอบสั้น ๆ";
  input.addEventListener("input", () => saveAnswer(question.id, input.value));

  wrapper.append(label, input);

  if (state.reviewMode) {
    const answer = document.createElement("div");
    const isCorrect = isCorrectAnswer(state.answers[question.id], examAnswerKey[question.id]);
    answer.className = `answer-review ${isCorrect ? "correct" : "wrong"}`;
    answer.textContent = `เฉลย: ${examAnswerKey[question.id]}`;
    wrapper.appendChild(answer);
  }

  elements.choiceList.appendChild(wrapper);
}

function moveQuestion(direction) {
  const nextIndex = state.currentIndex + direction;
  if (nextIndex < 0 || nextIndex >= examQuestions.length) return;
  state.currentIndex = nextIndex;
  renderQuestion();
}

function saveAnswer(questionId, choiceId) {
  state.answers[questionId] = choiceId;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.answers));
  elements.savedStatus.textContent = "บันทึกอัตโนมัติแล้ว";
  updateQuestionNumberStates();
  updateProgress();
}

function loadSavedAnswers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function updateQuestionNumberStates() {
  const buttons = elements.questionNumbers.querySelectorAll(".question-number");

  buttons.forEach((button, index) => {
    const question = examQuestions[index];
    button.className = "question-number";
    if (hasAnswer(question.id)) button.classList.add("answered");
    if (index === state.currentIndex) button.classList.add("active");

    if (state.submitted) {
      button.classList.add(isCorrectAnswer(state.answers[question.id], examAnswerKey[question.id]) ? "correct" : "wrong");
    }
  });
}

function updateProgress() {
  const answeredCount = examQuestions.filter((question) => hasAnswer(question.id)).length;
  const percent = Math.round((answeredCount / examQuestions.length) * 100);
  elements.progressBar.style.width = `${percent}%`;
  elements.progressBar.textContent = `${percent}%`;
}

function startTimer() {
  updateTimer();
  state.timerId = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const remaining = Math.max(0, state.endsAt - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  elements.timer.textContent = `${minutes}:${seconds}`;

  if (remaining <= 0 && !state.submitted) {
    submitExam({ force: true });
  }
}

function submitExam(options = {}) {
  if (state.submitted) return;

  const unanswered = examQuestions.filter((question) => !hasAnswer(question.id)).length;
  if (unanswered > 0 && !options.force) {
    const confirmed = window.confirm(`ยังไม่ได้ตอบ ${unanswered} ข้อ ต้องการส่งข้อสอบหรือไม่`);
    if (!confirmed) return;
  }

  state.submitted = true;
  clearInterval(state.timerId);
  const result = calculateResult();
  elements.scorePreview.textContent = `${result.correct}/${examQuestions.length}`;
  renderQuestion();
  renderResult(result);
}

function calculateResult() {
  const details = examQuestions.map((question) => {
    const selected = state.answers[question.id] || "-";
    const correct = examAnswerKey[question.id] || "-";
    return {
      question,
      selected,
      correct,
      isCorrect: isCorrectAnswer(selected, correct)
    };
  });

  return {
    correct: details.filter((item) => item.isCorrect).length,
    details
  };
}

function renderResult(result) {
  elements.resultPanel.classList.remove("d-none");
  elements.finalScore.textContent = `ได้คะแนน ${result.correct} จาก ${examQuestions.length} ข้อ`;
  elements.resultSummary.innerHTML = "";

  result.details.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = `result-item ${item.isCorrect ? "correct" : "wrong"}`;
    div.innerHTML = `
      <strong>ข้อ ${index + 1}: ${item.isCorrect ? "ถูก" : "ผิด"}</strong>
      <div>${escapeHtml(item.question.question)}</div>
      <div>คำตอบของคุณ: ${escapeHtml(item.selected)}</div>
      <div>เฉลย: ${escapeHtml(item.correct)}</div>
    `;
    elements.resultSummary.appendChild(div);
  });

  elements.resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function showReview() {
  state.reviewMode = true;
  state.currentIndex = 0;
  renderQuestion();
  elements.examApp.scrollIntoView({ behavior: "smooth", block: "start" });
}

function restartExam() {
  localStorage.removeItem(STORAGE_KEY);
  state.currentIndex = 0;
  state.answers = {};
  state.submitted = false;
  state.reviewMode = false;
  state.endsAt = Date.now() + EXAM_DURATION_MINUTES * 60 * 1000;
  elements.resultPanel.classList.add("d-none");
  elements.scorePreview.textContent = "-";
  clearInterval(state.timerId);
  startTimer();
  renderQuestion();
}

function hasAnswer(questionId) {
  return normalizeAnswer(state.answers[questionId] || "") !== "";
}

function isCorrectAnswer(selected, correct) {
  return normalizeAnswer(selected) === normalizeAnswer(correct);
}

function normalizeAnswer(value) {
  return String(value || "").trim().replace(/\s+/g, " ").toLowerCase();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

if (typeof window !== "undefined") {
  window.examTestApi = {
    answerKey,
    calculateResult,
    escapeHtml,
    examQuestions,
    hasAnswer,
    isCorrectAnswer,
    normalizeAnswer,
    renderQuestion,
    showReview,
    state,
    submitExam,
    updateTimer
  };
}
