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
    id: "vitamin-d-deficiency",
    title: "비타민D 결핍 증상과 보충 방법 (햇빛·음식)",
    summary:
      "피로·뼈 통증·잦은 감기처럼 애매하게 나타나는 비타민D 결핍 증상과, 햇빛·음식·보충제로 채우는 현실적인 방법을 정리했습니다.",
    category: "info",
    date: "2026-11-21",
    url: "/posts/vitamin-d-deficiency.html",
    image: "",
  },
  {
    id: "insomnia-sleep-quality",
    title: "불면증 원인과 숙면하는 방법 (잠 잘 오는 습관)",
    summary:
      "누워도 잠이 안 오는 불면증의 흔한 원인과, 약 없이 수면의 질을 높이는 숙면 습관(빛·카페인·기상 시간 관리)을 정리했습니다.",
    category: "info",
    date: "2026-11-21",
    url: "/posts/insomnia-sleep-quality.html",
    image: "",
  },
  {
    id: "reflux-esophagitis-symptoms",
    title: "역류성 식도염 증상과 생활습관 (목 이물감·속쓰림)",
    summary:
      "가슴 쓰림과 목 이물감, 마른기침까지 놓치기 쉬운 역류성 식도염 증상과 원인, 약 없이도 도움이 되는 생활습관을 정리했습니다.",
    category: "info",
    date: "2026-11-21",
    url: "/posts/reflux-esophagitis-symptoms.html",
    image: "",
  },
  {
    id: "eye-health-foods-lutein",
    title: "눈 건강에 좋은 음식과 루테인 (눈 피로·시력)",
    summary:
      "스마트폰·모니터로 지친 눈을 위한 눈 건강에 좋은 음식(시금치·당근·노른자·연어·블루베리)과 루테인, 눈 피로를 더는 생활 팁을 정리했습니다.",
    category: "food",
    date: "2026-11-21",
    url: "/posts/eye-health-foods-lutein.html",
    image: "",
  },
  {
    id: "constipation-good-foods",
    title: "변비에 좋은 음식 6가지와 생활습관",
    summary:
      "묵은 변을 밀어내는 변비에 좋은 음식 6가지(사과·고구마·미역·요구르트·키위·물)와 아침 습관 하나로 달라지는 배변 생활습관을 정리했습니다.",
    category: "food",
    date: "2026-11-21",
    url: "/posts/constipation-good-foods.html",
    image: "",
  },
  {
    id: "magnesium-rich-foods",
    title: "마그네슘 많은 음식과 마그네슘 부족 증상",
    summary:
      "눈 떨림·근육 경련으로 알아채기 쉬운 마그네슘 부족 증상과, 하루 권장량을 채워주는 마그네슘 많은 음식(견과류·시금치·두부·바나나)을 정리했습니다.",
    category: "food",
    date: "2026-11-21",
    url: "/posts/magnesium-rich-foods.html",
    image: "",
  },
];

/* 전역 노출 */
window.CATEGORIES = CATEGORIES;
window.NAV_ORDER = NAV_ORDER;
window.POSTS = POSTS;
