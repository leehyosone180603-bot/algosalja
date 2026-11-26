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
    id: "chapped-lips",
    title: "입술 트는 이유와 관리법 (건조·습관·영양)",
    summary:
      "겨울마다 입술이 갈라진다면? 입술 트는 이유를 건조·자외선·핥는 습관·구강호흡·영양 부족으로 나눠 정리했습니다. 올바른 립밤 보습과 피할 습관, 병원 신호까지.",
    category: "info",
    date: "2026-11-26",
    url: "/posts/chapped-lips.html",
    image: "/img/chapped-lips-1.jpg",
  },
  {
    id: "fiber-foods",
    title: "식이섬유 많은 음식 총정리 (콩·통곡물·채소·과일)",
    summary:
      "변비·더부룩함이 걱정된다면? 식이섬유 많은 음식(콩·통곡물·채소·과일)을 수용성·불용성으로 나눠 정리했습니다. 하루 섭취 기준과 갑자기 늘릴 때 주의점까지.",
    category: "food",
    date: "2026-11-26",
    url: "/posts/fiber-foods.html",
    image: "/img/fiber-foods-1.jpg",
  },
  {
    id: "seongnam-property-tax-reduction-issue",
    title: "성남시 재산세 감면 논란 — 지자체 감면, 내 재산세도 줄까",
    summary:
      "성남시 1세대 1주택 재산세 한시 감면 조례안이 시의회 상임위에서 부결된 논란을 정리했습니다. 감면 내용(9억 이하 50%·9~12억 20%), 쟁점, 진행 상황과 내 재산세에 미칠 영향까지.",
    category: "info",
    date: "2026-11-26",
    url: "/posts/seongnam-property-tax-reduction-issue.html",
    image: "/img/seongnam-property-tax-reduction-issue-1.jpg",
  },
  {
    id: "property-tax-ctax-health-insurance-link",
    title: "재산세·종부세·건강보험료, 공시가격 오르면 다 오른다? 연결 구조",
    summary:
      "공시가격 하나가 오르면 재산세, 종합부동산세, 지역가입자 건강보험료와 피부양자 자격까지 함께 움직입니다. 공시가격이 세금·보험료로 번지는 연결 구조를 한 번에 정리했습니다.",
    category: "info",
    date: "2026-11-26",
    url: "/posts/property-tax-ctax-health-insurance-link.html",
    image: "/img/property-tax-ctax-health-insurance-link-1.jpg",
  },
  {
    id: "comprehensive-real-estate-tax-exclusion",
    title: "종부세 합산배제(임대주택 등) 신청 대상과 기간",
    summary:
      "임대주택·사원용주택 등은 종부세 합산배제를 신청하면 과세 대상에서 빠집니다. 합산배제 대상과 9월 신청 기간, 주의할 점을 정리했습니다.",
    category: "info",
    date: "2026-11-26",
    url: "/posts/comprehensive-real-estate-tax-exclusion.html",
    image: "/img/comprehensive-real-estate-tax-exclusion-1.jpg",
  },
  {
    id: "property-holding-tax-reform-2026",
    title: "2026 보유세 개편안 정리 — 내 세금 어떻게 바뀌나(확정 전 포함)",
    summary:
      "2026년 발표된 보유세·종부세 개편안(실거주 1주택 공제 14억, 공정시장가액비율 단계 인상 등)을 정리했습니다. 아직 입법 전으로 2026년 고지는 현행 기준이 적용된다는 점까지.",
    category: "info",
    date: "2026-11-26",
    url: "/posts/property-holding-tax-reform-2026.html",
    image: "/img/property-holding-tax-reform-2026-1.jpg",
  },
  {
    id: "comprehensive-real-estate-tax-joint-ownership",
    title: "부부 공동명의 종부세, 1주택 특례 vs 각자 9억 뭐가 유리할까",
    summary:
      "부부 공동명의 1주택은 각자 9억씩 합 18억을 공제받거나, 1세대 1주택 특례(12억+고령·장기보유 공제)를 선택할 수 있습니다. 어느 쪽이 유리한지 기준을 정리했습니다.",
    category: "info",
    date: "2026-11-26",
    url: "/posts/comprehensive-real-estate-tax-joint-ownership.html",
    image: "/img/comprehensive-real-estate-tax-joint-ownership-1.jpg",
  },
  {
    id: "comprehensive-real-estate-tax-installment-deferral",
    title: "종부세 분납·납부유예 신청 조건과 절차",
    summary:
      "종부세 세액이 250만원을 넘으면 6개월 내 분납할 수 있고, 고령·장기보유 1주택자는 납부유예도 가능합니다. 분납·납부유예의 조건과 신청 절차를 정리했습니다.",
    category: "info",
    date: "2026-11-26",
    url: "/posts/comprehensive-real-estate-tax-installment-deferral.html",
    image: "/img/comprehensive-real-estate-tax-installment-deferral-1.jpg",
  },
  {
    id: "comprehensive-real-estate-tax-credit-80",
    title: "종부세 세액공제(고령·장기보유) 최대 80% 받는 법",
    summary:
      "1세대 1주택 종부세는 고령자 공제(최대 40%)와 장기보유 공제(최대 50%)를 합쳐 최대 80%까지 세액공제를 받을 수 있습니다. 연령·보유기간별 공제율과 요건을 정리했습니다.",
    category: "info",
    date: "2026-11-26",
    url: "/posts/comprehensive-real-estate-tax-credit-80.html",
    image: "/img/comprehensive-real-estate-tax-credit-80-1.jpg",
  },
  {
    id: "comprehensive-real-estate-tax-2026-criteria",
    title: "2026 종부세 대상 기준 — 공시 9억·1주택 12억 쉽게 이해",
    summary:
      "2026년 종합부동산세 대상 기준을 쉽게 정리했습니다. 1세대 1주택 12억·일반 9억 공제, 공정시장가액비율 60%, 공시가격 합산 방식과 내가 대상인지 확인하는 법까지.",
    category: "info",
    date: "2026-11-26",
    url: "/posts/comprehensive-real-estate-tax-2026-criteria.html",
    image: "/img/comprehensive-real-estate-tax-2026-criteria-1.jpg",
  },
  {
    id: "comprehensive-real-estate-tax-vs-property-tax",
    title: "종합부동산세란? 재산세와 뭐가 다른지 한눈에",
    summary:
      "종합부동산세(종부세)가 무엇인지, 재산세와 무엇이 다른지 과세 주체·시기·대상·계산 방식까지 한눈에 비교했습니다. 둘을 묶은 보유세 개념까지.",
    category: "info",
    date: "2026-11-26",
    url: "/posts/comprehensive-real-estate-tax-vs-property-tax.html",
    image: "/img/comprehensive-real-estate-tax-vs-property-tax-1.jpg",
  },
  {
    id: "property-tax-objection-correction",
    title: "재산세 많이 나왔을 때 이의신청·경정청구 하는 법",
    summary:
      "재산세가 잘못 부과됐다고 판단될 때 이의신청(90일), 경정청구, 심사·심판청구 등 대응 방법과 기한을 정리했습니다. 공시가격 이의와의 차이까지.",
    category: "info",
    date: "2026-11-26",
    url: "/posts/property-tax-objection-correction.html",
    image: "/img/property-tax-objection-correction-1.jpg",
  },
  {
    id: "property-tax-commercial-land-difference",
    title: "상가·토지 재산세는 주택과 뭐가 다를까",
    summary:
      "상가(건축물)와 토지의 재산세가 주택과 어떻게 다른지, 부과 시기·세율·토지 합산 방식(종합합산·별도합산)까지 쉽게 정리했습니다.",
    category: "info",
    date: "2026-11-26",
    url: "/posts/property-tax-commercial-land-difference.html",
    image: "/img/property-tax-commercial-land-difference-1.jpg",
  },
  {
    id: "property-tax-how-to-check-pay",
    title: "재산세 조회·납부 방법 (위택스·인터넷지로 따라하기)",
    summary:
      "재산세를 위택스, 인터넷지로, 스마트위택스 앱, ARS, 은행에서 조회하고 납부하는 방법을 단계별로 정리했습니다. 전자송달·자동납부 신청까지.",
    category: "info",
    date: "2026-11-26",
    url: "/posts/property-tax-how-to-check-pay.html",
    image: "/img/property-tax-how-to-check-pay-1.jpg",
  },
  {
    id: "property-tax-card-installment-reduction",
    title: "재산세 카드납부·분할납부·감면 총정리(절세 체크)",
    summary:
      "재산세를 카드로 내는 법, 세액 250만원 초과 시 분할납부, 전자송달·자동납부 세액공제, 각종 감면까지 재산세 부담을 줄이는 방법을 한 번에 정리했습니다.",
    category: "info",
    date: "2026-11-26",
    url: "/posts/property-tax-card-installment-reduction.html",
    image: "/img/property-tax-card-installment-reduction-1.jpg",
  },
  {
    id: "property-tax-one-house-special-check",
    title: "1세대 1주택 재산세 특례, 나도 받고 있나 확인하는 법",
    summary:
      "1세대 1주택자는 공정시장가액비율 43~45%와 특례세율(0.05~0.35%)로 재산세가 크게 줄어듭니다. 요건과 고지서에서 특례 적용 여부를 확인하는 법을 정리했습니다.",
    category: "info",
    date: "2026-11-26",
    url: "/posts/property-tax-one-house-special-check.html",
    image: "/img/property-tax-one-house-special-check-1.jpg",
  },
  {
    id: "property-tax-official-price-how-determined",
    title: "재산세 공시가격은 어떻게 정해지나 — 공시가격 알리미 확인법",
    summary:
      "재산세의 출발점인 공시가격이 어떻게 산정되는지, 시세와 무엇이 다른지, 부동산 공시가격 알리미에서 내 집 공시가격을 확인하고 이의신청하는 법까지 정리했습니다.",
    category: "info",
    date: "2026-11-26",
    url: "/posts/property-tax-official-price-how-determined.html",
    image: "/img/property-tax-official-price-how-determined-1.jpg",
  },
  {
    id: "property-tax-why-july-september",
    title: "재산세 7월·9월 왜 두 번 나눠 낼까 (주택·건물·토지 구분)",
    summary:
      "재산세가 7월과 9월 두 번 나오는 이유와, 주택·건축물·토지가 각각 언제 부과되는지 정리했습니다. 주택분은 절반씩, 연세액 20만원 이하는 7월에 한 번.",
    category: "info",
    date: "2026-11-26",
    url: "/posts/property-tax-why-july-september.html",
    image: "/img/property-tax-why-july-september-1.jpg",
  },
  {
    id: "property-tax-assessment-date-june-1",
    title: "재산세 과세 기준일 6월 1일이 중요한 이유, 매매 시 누가 낼까",
    summary:
      "재산세는 매년 6월 1일 현재 소유자가 1년치를 전부 냅니다. 집을 사고팔 때 잔금일·등기일에 따라 누가 재산세를 부담하는지, 하루 차이로 수십만 원이 갈리는 기준을 사례로 정리했습니다.",
    category: "info",
    date: "2026-11-26",
    url: "/posts/property-tax-assessment-date-june-1.html",
    image: "/img/property-tax-assessment-date-june-1-1.jpg",
  },
  {
    id: "property-tax-assessment-criteria",
    title: "재산세 책정 기준 완전정리 — 공시가격·공정시장가액비율·세율",
    summary:
      "재산세가 어떤 기준으로 책정되는지 공시가격, 공정시장가액비율(일반 60%·1주택 43~45%), 누진세율, 과세표준상한제까지 2026년 기준으로 한 번에 정리했습니다.",
    category: "info",
    date: "2026-11-26",
    url: "/posts/property-tax-assessment-criteria.html",
    image: "/img/property-tax-assessment-criteria-1.jpg",
  },
  {
    id: "property-tax-basics-who-when-how-much",
    title: "재산세란? 누가·언제·얼마 내는지 처음부터 쉽게",
    summary:
      "재산세가 무엇인지, 누가(6월 1일 소유자) 언제(7·9월) 얼마나 내는지 처음 보는 사람도 이해하도록 정리했습니다. 공시가격·공정시장가액비율·세율 구조와 바로 계산하는 법까지.",
    category: "info",
    date: "2026-11-26",
    url: "/posts/property-tax-basics-who-when-how-much.html",
    image: "/img/property-tax-basics-who-when-how-much-1.jpg",
  },
  {
    id: "foot-odor",
    title: "발 냄새 원인과 없애는 법 (땀·세균·신발 관리)",
    summary:
      "발 냄새, 땀 아닌 세균이 핵심입니다. 발 냄새 원인(땀+세균·밀폐 신발·무좀·다한증)과 씻고 말리기·신발 2~3켤레 번갈아 신기 등 없애는 법, 피할 방법까지 정리했습니다.",
    category: "info",
    date: "2026-11-26",
    url: "/posts/foot-odor.html",
    image: "/img/foot-odor-1.jpg",
  },
  {
    id: "folate-foods",
    title: "엽산 많은 음식 총정리 (콩·시금치·아스파라거스)",
    summary:
      "임신 준비·빈혈이 걱정된다면? 엽산 많은 음식(콩류·녹색 잎채소·아스파라거스)과 함량, 조리 손실 줄이는 법, 하루 섭취 기준과 보충제 주의점(B12)까지 정리했습니다.",
    category: "food",
    date: "2026-11-26",
    url: "/posts/folate-foods.html",
    image: "/img/folate-foods-1.jpg",
  },
  {
    id: "eyelid-twitch",
    title: "눈 밑 떨림 원인과 완화법 (피로·카페인·마그네슘)",
    summary:
      "눈 밑이 파르르 떨린다면? 눈 밑 떨림 원인을 피로·스트레스·카페인·눈 피로로 나눠 정리했습니다. 마그네슘 부족 여부, 집에서 하는 관리와 병원 가야 할 신호까지.",
    category: "info",
    date: "2026-11-26",
    url: "/posts/eyelid-twitch.html",
    image: "/img/eyelid-twitch-1.jpg",
  },
  {
    id: "vitamin-c-foods",
    title: "비타민C 많은 음식 총정리 (파프리카·브로콜리·키위)",
    summary:
      "레몬보다 많은 비타민C 음식? 파프리카·브로콜리·딸기·키위 등 비타민C 많은 음식과 함량, 손실 줄이는 조리법, 하루 섭취 기준과 과다·보충제 주의점까지 정리했습니다.",
    category: "food",
    date: "2026-11-26",
    url: "/posts/vitamin-c-foods.html",
    image: "/img/vitamin-c-foods-1.jpg",
  },
  {
    id: "dry-mouth-causes",
    title: "입 마름 원인과 완화법 (구강건조증·약물·당뇨)",
    summary:
      "물을 마셔도 입이 마른다면? 입 마름(구강건조증) 원인을 약물·당뇨·생활습관·침샘 질환으로 나눠 정리했습니다. 침 분비 자극·수분 관리와 병원 가야 할 신호까지.",
    category: "info",
    date: "2026-11-26",
    url: "/posts/dry-mouth-causes.html",
    image: "/img/dry-mouth-causes-1.jpg",
  },
  {
    id: "zinc-foods",
    title: "아연 많은 음식 총정리 (굴·소고기·견과·콩)",
    summary:
      "면역·상처 회복에 필요한 아연, 어떤 음식에 많을까요? 굴·소고기·갑각류·씨앗·콩 등 아연 많은 음식과 함량, 하루 섭취 기준, 보충제 주의점(구리·철분)까지 정리했습니다.",
    category: "food",
    date: "2026-11-25",
    url: "/posts/zinc-foods.html",
    image: "/img/zinc-foods-1.jpg",
  },
  {
    id: "leg-cramps-night",
    title: "다리에 쥐 나는 이유와 예방법 (야간 종아리 경련)",
    summary:
      "자다가 종아리에 쥐가 난다면? 다리에 쥐 나는 이유(탈수·전해질·순환·피로)와 쥐 났을 때 푸는 법, 스트레칭·수분 예방법, 병원 가야 할 신호까지 정리했습니다.",
    category: "info",
    date: "2026-11-25",
    url: "/posts/leg-cramps-night.html",
    image: "/img/leg-cramps-night-1.jpg",
  },
  {
    id: "potassium-foods",
    title: "칼륨 많은 음식 총정리 (감자·시금치·바나나)",
    summary:
      "짜게 먹고 붓거나 혈압이 걱정된다면? 칼륨 많은 음식(감자·시금치·바나나·콩)과 함량, 하루 섭취 기준, 신장질환 주의점과 조리법까지 정리했습니다.",
    category: "food",
    date: "2026-11-25",
    url: "/posts/potassium-foods.html",
    image: "/img/potassium-foods-1.jpg",
  },
  {
    id: "tinnitus-causes",
    title: "이명 원인과 완화법 (소음·스트레스·돌발성 난청)",
    summary:
      "귀에서 삐 소리가 난다면? 이명 원인을 소음·노화, 스트레스, 질환, 박동성으로 나눠 정리했습니다. 돌발성 난청 신호, 집에서 하는 소리 관리와 병원 가야 할 경우까지.",
    category: "info",
    date: "2026-11-25",
    url: "/posts/tinnitus-causes.html",
    image: "/img/tinnitus-causes-1.jpg",
  },
  {
    id: "uric-acid-foods",
    title: "요산 낮추는 음식과 피해야 할 음식 (통풍 식단)",
    summary:
      "통풍·고요산이 걱정된다면? 요산 낮추는 음식(물·저지방 유제품·콩·체리)과 피해야 할 음식(술·내장·과당), 커피 효과, 생활습관까지 근거 위주로 정리했습니다.",
    category: "food",
    date: "2026-11-25",
    url: "/posts/uric-acid-foods.html",
    image: "/img/uric-acid-foods-1.jpg",
  },
  {
    id: "hand-foot-numbness",
    title: "손발 저림 원인과 관리법 (손목터널·당뇨·디스크)",
    summary:
      "손발 저림, 혈액순환 탓만은 아닙니다. 손목터널증후군·목디스크·당뇨병성 신경병증 등 원인과 저리는 위치로 구분하는 법, 집에서 하는 관리와 병원 가야 할 신호까지 정리했습니다.",
    category: "info",
    date: "2026-11-25",
    url: "/posts/hand-foot-numbness.html",
    image: "/img/hand-foot-numbness-1.jpg",
  },
  {
    id: "gut-health-foods",
    title: "장 건강에 좋은 음식 총정리 (발효식품·식이섬유)",
    summary:
      "속이 더부룩하다면? 장 건강에 좋은 음식을 정리했습니다. 김치·요구르트 등 발효식품, 마늘·양파 프리바이오틱스, 통곡물·콩 식이섬유와 피해야 할 음식, 생활습관까지.",
    category: "food",
    date: "2026-11-25",
    url: "/posts/gut-health-foods.html",
    image: "/img/gut-health-foods-1.jpg",
  },
  {
    id: "migraine-relief",
    title: "편두통 완화 방법 총정리 (휴식·냉찜질·생활습관)",
    summary:
      "한쪽 머리가 지끈거리는 편두통, 집에서 할 수 있는 완화 방법을 정리했습니다. 어둡고 조용한 휴식·냉찜질·수분·카페인 조절과 생활습관, 병원 가야 할 위험 신호까지.",
    category: "info",
    date: "2026-11-25",
    url: "/posts/migraine-relief.html",
    image: "/img/migraine-relief-1.jpg",
  },
  {
    id: "menopause-foods",
    title: "갱년기에 좋은 음식 총정리 (콩·두부·유제품)",
    summary:
      "얼굴 화끈거림·불면이 잦아지는 갱년기, 콩·두부·유제품·등푸른생선 등 갱년기에 좋은 음식과 줄여야 할 음식, 칼슘·비타민D 뼈 건강 팁까지 정리했습니다.",
    category: "food",
    date: "2026-11-25",
    url: "/posts/menopause-foods.html",
    image: "/img/menopause-foods-1.jpg",
  },
  {
    id: "winter-dry-skin-itch",
    title: "겨울 피부 건조 가려움증 관리법 (보습·샤워·습도)",
    summary:
      "긁을수록 심해지는 겨울 피부 건조 가려움증, 원인과 관리법을 정리했습니다. 샤워 직후 3분 보습, 미지근한 물, 실내 습도 40~60%, 주의사항과 병원 가야 할 신호까지.",
    category: "info",
    date: "2026-11-25",
    url: "/posts/winter-dry-skin-itch.html",
    image: "/img/winter-dry-skin-itch-1.jpg",
  },
  {
    id: "nasal-congestion-relief",
    title: "코막힘 뚫는 법 7가지 (식염수·증기·자세)",
    summary:
      "밤에 코가 막혀 괴롭다면? 코막힘 원인과 집에서 할 수 있는 코막힘 뚫는 법(생리식염수 세척·증기·온찜질·자세·습도), 약 주의점과 병원 가야 할 신호까지 정리했습니다.",
    category: "info",
    date: "2026-11-25",
    url: "/posts/nasal-congestion-relief.html",
    image: "/img/nasal-congestion-relief-1.jpg",
  },
  {
    id: "hangover-relief-foods",
    title: "숙취 해소에 좋은 음식과 피해야 할 것 (북엇국·물)",
    summary:
      "연말 회식 다음 날, 숙취 해소에 좋은 음식을 근거 위주로 정리했습니다. 물·북엇국·콩나물·맑은 국물과 피해야 할 해장술·커피·찬 음식, 가장 확실한 방법까지.",
    category: "food",
    date: "2026-11-24",
    url: "/posts/hangover-relief-foods.html",
    image: "/img/hangover-relief-foods-1.jpg",
  },
  {
    id: "cholesterol-lowering-foods",
    title: "콜레스테롤 낮추는 음식 총정리 (귀리·콩·견과)",
    summary:
      "LDL 콜레스테롤이 걱정된다면? 귀리·콩·등푸른생선·견과 등 콜레스테롤 낮추는 음식과 줄여야 할 음식(포화·트랜스지방), 생활습관까지 정리했습니다.",
    category: "food",
    date: "2026-11-24",
    url: "/posts/cholesterol-lowering-foods.html",
    image: "/img/cholesterol-lowering-foods-1.jpg",
  },
  {
    id: "magnesium-foods-guide",
    title: "마그네슘 많은 음식 총정리 (호박씨·시금치·콩)",
    summary:
      "다리에 쥐가 자주 난다면? 마그네슘 많은 음식과 식품별 함량, 하루 권장 섭취량, 음식으로 챙기는 팁까지 정리했습니다. 호박씨·잎채소·콩·통곡물 중심으로.",
    category: "food",
    date: "2026-11-24",
    url: "/posts/magnesium-foods-guide.html",
    image: "/img/magnesium-foods-guide-1.jpg",
  },
  {
    id: "winter-joint-pain-care",
    title: "겨울철 관절 통증, 왜 심해질까? 원인과 집에서 하는 관리법",
    summary:
      "겨울에 무릎·손가락 관절 통증이 심해지는 이유와 집에서 하는 관리법을 정리했습니다. 보온·스트레칭·적정 활동·체중 관리, 병원에 가야 할 신호까지.",
    category: "info",
    date: "2026-11-24",
    url: "/posts/winter-joint-pain-care.html",
    image: "/img/winter-joint-pain-care-1.jpg",
  },
  {
    id: "hypertension-foods-sodium",
    title: "고혈압에 좋은 음식과 나트륨 줄이는 법",
    summary:
      "고혈압에 좋은 칼륨 풍부 음식과 DASH 식단, 나트륨 줄이는 실천법, 피해야 할 음식까지 혈압 관리 식단을 한눈에 정리했습니다.",
    category: "food",
    date: "2026-11-24",
    url: "/posts/hypertension-foods-sodium.html",
    image: "/img/hypertension-foods-sodium-1.jpg",
  },
  {
    id: "omega3-foods-benefits",
    title: "오메가3 많은 음식과 효능 (심혈관·염증·눈·뇌)",
    summary:
      "오메가3가 많은 음식(고등어·연어·정어리·들기름·견과류)과 EPA·DHA의 심혈관·염증·눈·뇌 효능, 섭취 요령과 주의점을 정리했습니다.",
    category: "food",
    date: "2026-11-24",
    url: "/posts/omega3-foods-benefits.html",
    image: "/img/omega3-foods-benefits-1.jpg",
  },
  {
    id: "winter-dry-eye-relief",
    title: "겨울 안구건조증 완화 방법 7가지 (집·사무실에서)",
    summary:
      "난방으로 건조한 겨울, 안구건조증 완화 방법을 정리했습니다. 실내 습도·온도, 의식적 깜빡임, 눈 휴식, 온찜질과 인공눈물 올바른 사용법, 안과 가야 할 신호까지.",
    category: "info",
    date: "2026-11-24",
    url: "/posts/winter-dry-eye-relief.html",
    image: "/img/winter-dry-eye-relief-1.jpg",
  },
  {
    id: "cold-hands-feet-foods",
    title: "수족냉증에 좋은 음식 7가지와 피해야 할 음식",
    summary:
      "겨울 손발이 차가운 수족냉증, 생강·마늘·등푸른생선 등 몸을 덥히는 음식과 피해야 할 음식, 생활습관, 병원 가야 할 신호까지 정리했습니다.",
    category: "food",
    date: "2026-11-24",
    url: "/posts/cold-hands-feet-foods.html",
    image: "/img/cold-hands-feet-foods-1.jpg",
  },
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
