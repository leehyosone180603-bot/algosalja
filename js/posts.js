/*
 * 알고살자 - 블로그 글 목록 데이터
 * ==================================================================
 * ▷ 새 글을 추가하는 방법
 *   1) /posts/ 폴더에 새 글 HTML 파일을 만듭니다.
 *      (가장 쉬운 방법: posts/_template.html 을 복사해서 내용만 수정)
 *   2) 아래 POSTS 배열의 "맨 위"에 아래 형식으로 한 줄(객체)을 추가합니다.
 *      → 배열 앞쪽에 넣을수록 최신글로 취급되어 상단에 노출됩니다.
 *
 *   {
 *     id: "unique-slug",              // 영문/숫자 고유값 (파일명과 동일 권장)
 *     title: "글 제목",
 *     summary: "홈/목록에 노출될 1~2줄 요약",
 *     category: "food",               // "food"(건강음식) 또는 "info"(건강정보)
 *     date: "2026-11-21",             // 작성일 (YYYY-MM-DD)
 *     url: "/posts/unique-slug.html", // 실제 글 페이지 경로
 *     image: "/img/unique-slug.jpg",  // 대표 이미지 (없으면 "" 로 두면 됩니다)
 *   }
 *
 *   * 이미지가 없으면 image 를 "" 로 두세요. 색상 썸네일이 자동 생성됩니다.
 * ==================================================================
 */

/* 카테고리 정의 (ready:false = 준비중, 클릭 시 준비중 안내) */
const CATEGORIES = {
  food:     { slug: "food",     name: "건강음식", ready: true  },
  info:     { slug: "info",     name: "건강정보", ready: true  },
  exercise: { slug: "exercise", name: "건강운동", ready: false },
  diet:     { slug: "diet",     name: "다이어트", ready: false },
  disease:  { slug: "disease",  name: "질환·병",  ready: false },
  life:     { slug: "life",     name: "생활정보", ready: false },
};

/* 상단 네비게이션에 노출할 순서 */
const NAV_ORDER = ["food", "info", "exercise", "diet", "disease", "life"];

/*
 * 실제 발행 글 목록 (최신 글이 위로).
 * 새 글을 추가할 때 이 배열 맨 위에 객체를 추가하세요.
 */
const POSTS = [
  {
    id: "winter-vitamin-d-foods",
    title: "겨울 비타민D 많은 음식 총정리 (연어·버섯·달걀)",
    summary:
      "햇빛이 부족한 겨울, 비타민D 많은 음식으로 채우는 법. 연어·고등어·달걀 노른자·버섯 등 공급원과 하루 권장 섭취량, 흡수 높이는 습관까지 정리했습니다.",
    category: "food",
    date: "2026-11-23",
    url: "/posts/winter-vitamin-d-foods.html",
    image: "/img/winter-vitamin-d-foods-1.jpg",
  },
  {
    id: "vitamin-d-deficiency",
    title: "비타민D 결핍 증상과 보충 방법 (햇빛·음식)",
    summary:
      "피로·뼈 통증·잦은 감기처럼 애매하게 나타나는 비타민D 결핍 증상과, 햇빛·음식·보충제로 채우는 현실적인 방법을 정리했습니다.",
    category: "info",
    date: "2026-11-21",
    url: "/posts/vitamin-d-deficiency.html",
    image: "/img/vitamin-d-deficiency-1.jpg",
  },
  {
    id: "insomnia-sleep-quality",
    title: "불면증 원인과 숙면하는 방법 (잠 잘 오는 습관)",
    summary:
      "누워도 잠이 안 오는 불면증의 흔한 원인과, 약 없이 수면의 질을 높이는 숙면 습관(빛·카페인·기상 시간 관리)을 정리했습니다.",
    category: "info",
    date: "2026-11-21",
    url: "/posts/insomnia-sleep-quality.html",
    image: "/img/insomnia-sleep-quality-1.jpg",
  },
  {
    id: "reflux-esophagitis-symptoms",
    title: "역류성 식도염 증상과 생활습관 (목 이물감·속쓰림)",
    summary:
      "가슴 쓰림과 목 이물감, 마른기침까지 놓치기 쉬운 역류성 식도염 증상과 원인, 약 없이도 도움이 되는 생활습관을 정리했습니다.",
    category: "info",
    date: "2026-11-21",
    url: "/posts/reflux-esophagitis-symptoms.html",
    image: "/img/reflux-esophagitis-symptoms-1.jpg",
  },
  {
    id: "eye-health-foods-lutein",
    title: "눈 건강에 좋은 음식과 루테인 (눈 피로·시력)",
    summary:
      "스마트폰·모니터로 지친 눈을 위한 눈 건강에 좋은 음식(시금치·당근·노른자·연어·블루베리)과 루테인, 눈 피로를 더는 생활 팁을 정리했습니다.",
    category: "food",
    date: "2026-11-21",
    url: "/posts/eye-health-foods-lutein.html",
    image: "/img/eye-health-foods-lutein-1.jpg",
  },
  {
    id: "constipation-good-foods",
    title: "변비에 좋은 음식 6가지와 생활습관",
    summary:
      "묵은 변을 밀어내는 변비에 좋은 음식 6가지(사과·고구마·미역·요구르트·키위·물)와 아침 습관 하나로 달라지는 배변 생활습관을 정리했습니다.",
    category: "food",
    date: "2026-11-21",
    url: "/posts/constipation-good-foods.html",
    image: "/img/constipation-good-foods-1.jpg",
  },
  {
    id: "magnesium-rich-foods",
    title: "마그네슘 많은 음식과 마그네슘 부족 증상",
    summary:
      "눈 떨림·근육 경련으로 알아채기 쉬운 마그네슘 부족 증상과, 하루 권장량을 채워주는 마그네슘 많은 음식(견과류·시금치·두부·바나나)을 정리했습니다.",
    category: "food",
    date: "2026-11-21",
    url: "/posts/magnesium-rich-foods.html",
    image: "/img/magnesium-rich-foods-1.jpg",
  },
  {
    id: "protein-rich-foods",
    title: "단백질이 풍부한 음식과 단백질 부족 증상",
    summary:
      "탈모·손톱 약화·잦은 피로로 나타나는 단백질 부족 증상과, 끼니마다 챙기기 좋은 고단백 음식(닭가슴살·달걀·두부·그릭요거트)을 정리했습니다.",
    category: "food",
    date: "2026-11-20",
    url: "/posts/protein-rich-foods.html",
    image: "/img/protein-rich-foods-1.jpg",
  },
  {
    id: "blood-sugar-lowering-foods",
    title: "혈당 낮추는 데 좋은 음식과 식사 습관 (당뇨 예방)",
    summary:
      "식후 쏟아지는 졸음, 혈당 스파이크 때문일 수 있어요. 혈당을 천천히 올리는 음식과 식사 순서·습관으로 당뇨를 예방하는 방법을 정리했습니다.",
    category: "food",
    date: "2026-11-20",
    url: "/posts/blood-sugar-lowering-foods.html",
    image: "/img/blood-sugar-lowering-foods-1.jpg",
  },
  {
    id: "liver-health-foods",
    title: "간에 좋은 음식과 간 건강 관리 (피로·지방간)",
    summary:
      "이유 없는 피로와 더딘 숙취 회복은 간이 지쳤다는 신호일 수 있어요. 간에 좋은 음식(브로콜리·마늘·커피·베리류)과 지방간을 줄이는 습관을 정리했습니다.",
    category: "food",
    date: "2026-11-19",
    url: "/posts/liver-health-foods.html",
    image: "/img/liver-health-foods-1.jpg",
  },
  {
    id: "immunity-boosting-foods",
    title: "면역력에 좋은 음식과 환절기 관리",
    summary:
      "환절기마다 감기를 달고 사는 분들을 위한 면역력에 좋은 음식(발효식품·마늘·버섯·제철 과채)과, 음식만큼 중요한 잠·체온 관리 습관을 정리했습니다.",
    category: "food",
    date: "2026-11-19",
    url: "/posts/immunity-boosting-foods.html",
    image: "/img/immunity-boosting-foods-1.jpg",
  },
  {
    id: "gastritis-good-foods",
    title: "위염에 좋은 음식과 피해야 할 음식 (속쓰림·더부룩함)",
    summary:
      "속이 쓰리고 더부룩한 위염, 뭘 먹느냐가 회복을 좌우합니다. 위 점막을 달래는 음식(양배추·마·죽·바나나)과 피해야 할 음식을 정리했습니다.",
    category: "food",
    date: "2026-11-18",
    url: "/posts/gastritis-good-foods.html",
    image: "/img/gastritis-good-foods-1.jpg",
  },
  {
    id: "calcium-rich-foods",
    title: "칼슘이 풍부한 음식과 뼈 건강 (골다공증 예방)",
    summary:
      "우유 말고도 칼슘 보충 방법은 많아요. 칼슘이 풍부한 음식(멸치·두부·치즈·녹색채소)과 칼슘 흡수를 돕는 비타민D·생활습관을 정리했습니다.",
    category: "food",
    date: "2026-11-18",
    url: "/posts/calcium-rich-foods.html",
    image: "/img/calcium-rich-foods-1.jpg",
  },
  {
    id: "anemia-iron-foods",
    title: "빈혈에 좋은 음식과 철분 흡수 높이는 법",
    summary:
      "일어설 때 핑 도는 어지럼증은 철분 부족 때문일 수 있어요. 빈혈에 좋은 음식(소고기·굴·시금치·달걀)과 철분 흡수를 높이는 먹는 법을 정리했습니다.",
    category: "food",
    date: "2026-11-17",
    url: "/posts/anemia-iron-foods.html",
    image: "/img/anemia-iron-foods-1.jpg",
  },
  {
    id: "turtle-neck-stretch",
    title: "거북목·목 어깨 결림 원인과 스트레칭",
    summary:
      "모니터·스마트폰에 시달린 목과 어깨. 거북목·어깨 결림의 원인과 틈틈이 따라 하기 좋은 목 스트레칭·자세 교정법을 정리했습니다.",
    category: "info",
    date: "2026-11-17",
    url: "/posts/turtle-neck-stretch.html",
    image: "/img/turtle-neck-stretch-1.jpg",
  },
  {
    id: "plantar-fasciitis",
    title: "족저근막염 증상과 관리 방법 (아침 발뒤꿈치 통증)",
    summary:
      "아침 첫발을 디딜 때 발뒤꿈치가 찌릿하다면 족저근막염일 수 있어요. 증상과 원인, 집에서 하는 스트레칭·관리법을 정리했습니다.",
    category: "info",
    date: "2026-11-16",
    url: "/posts/plantar-fasciitis.html",
    image: "/img/plantar-fasciitis-1.jpg",
  },
  {
    id: "hypothyroidism-symptoms",
    title: "갑상선 기능저하증 증상과 관리 (피로·체중 증가)",
    summary:
      "늘 춥고 피곤하고 살이 찐다면? 쉽게 지나치는 갑상선 기능저하증의 증상과 원인, 검사와 생활 관리 방법을 정리했습니다.",
    category: "info",
    date: "2026-11-16",
    url: "/posts/hypothyroidism-symptoms.html",
    image: "/img/hypothyroidism-symptoms-1.jpg",
  },
  {
    id: "dizziness-bppv",
    title: "어지럼증 원인과 이석증 (빙글빙글 도는 어지러움)",
    summary:
      "자세를 바꿀 때 세상이 빙글빙글 돈다면 이석증일 수 있어요. 어지럼증의 다양한 원인과 이석증의 특징, 대처법을 정리했습니다.",
    category: "info",
    date: "2026-11-15",
    url: "/posts/dizziness-bppv.html",
    image: "/img/dizziness-bppv-1.jpg",
  },
  {
    id: "bad-breath-causes",
    title: "입냄새(구취) 원인과 없애는 방법",
    summary:
      "양치를 해도 가시지 않는 입냄새, 원인이 입안에만 있는 게 아닐 수 있어요. 구취의 다양한 원인(설태·구강건조·비염 등)과 없애는 방법을 정리했습니다.",
    category: "info",
    date: "2026-11-15",
    url: "/posts/bad-breath-causes.html",
    image: "/img/bad-breath-causes-1.jpg",
  },
  {
    id: "stye-eye-causes",
    title: "눈 다래끼 원인과 치료·예방 (눈꺼풀 붓고 아플 때)",
    summary:
      "눈꺼풀이 붓고 콕콕 아픈 다래끼, 짜도 될까요? 다래끼가 생기는 원인과 집에서 하는 온찜질 관리, 병원에 가야 할 때와 예방법을 정리했습니다.",
    category: "info",
    date: "2026-11-14",
    url: "/posts/stye-eye-causes.html",
    image: "/img/stye-eye-causes-1.jpg",
  },
  {
    id: "snoring-causes-improvement",
    title: "코골이 원인과 개선 방법 (수면무호흡 주의)",
    summary:
      "단순 습관이 아닐 수 있는 코골이. 코골이의 원인과 집에서 할 수 있는 개선 방법, 수면무호흡을 의심해야 할 신호를 정리했습니다.",
    category: "info",
    date: "2026-11-14",
    url: "/posts/snoring-causes-improvement.html",
    image: "/img/snoring-causes-improvement-1.jpg",
  },
];

/* 전역 노출 */
window.CATEGORIES = CATEGORIES;
window.NAV_ORDER = NAV_ORDER;
window.POSTS = POSTS;
