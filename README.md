# 알고살자 (algosalja.com)

애드센스 수익형 건강 정보 사이트입니다. 순수 HTML/CSS/JS로 만들어져 GitHub Pages 등 어디서든 호스팅할 수 있습니다.
레이아웃·구조는 자매 사이트와 동일하며, 글 주제는 서로 겹치지 않도록 구성했습니다.

## 화면 구성
- **상단**: 로고(알고살자) + 검색창 + 카테고리 네비게이션 (건강음식·건강정보 활성 / 건강운동·다이어트·질환병·생활정보 준비중)
- **히어로**: 대표기사(큰 카드) + 보조 카드 2개 + 헤드라인 목록
- **본문 2단**: 좌측 기사 목록(썸네일+제목+요약) / 우측 사이드바(최신 글)
- **푸터**: 회사 정보(굿윌스토어) + 정책 링크

광고 자리는 상단 배너 / 기사목록 상단 / 사이드바 / 글 본문 중간에 준비되어 있으며, 현재는 꺼진 상태입니다(`ADS_SHOW = false`).

## 폴더 구조
```
index.html            홈(메인) 페이지
category.html         카테고리 페이지 (?cat=food / ?cat=info)
about/contact/privacy/terms.html   필수 페이지
posts/
  _template.html      새 글 작성용 템플릿 (복사해서 사용)
  *.html              실제 글
css/style.css         전체 디자인
js/posts.js           ★ 글 목록 데이터 (여기서 글을 관리)
js/site.js            헤더/푸터/광고 공통
js/home.js            홈 렌더링
js/category.js        카테고리 렌더링
CNAME                 도메인 연결 (algosalja.com)
ads.txt, robots.txt, sitemap.xml
```

## 새 글 추가하기
1. `posts/_template.html` 을 복사해 `posts/새이름.html` 로 저장하고 내용을 채웁니다.
2. `js/posts.js` 의 `POSTS` 배열 **맨 위**에 글 정보를 추가합니다.
3. `sitemap.xml` 에도 글 주소를 추가하면 검색 노출에 좋습니다.

## 애드센스 설정
승인 후 발급받은 **게시자 ID(ca-pub-...)** 로 아래를 교체하세요.
- `js/site.js` 의 `ADSENSE.client` 와 각 `slots` 번호
- 각 HTML `<head>` 의 애드센스 로더 스크립트 `client=ca-pub-...`
- `ads.txt` 의 `pub-...`
- 광고를 켤 때는 `js/site.js` 의 `ADS_SHOW` 를 `true` 로 변경

## 도메인 연결 (algosalja.com)
GitHub Pages 기준 안내입니다.
1. GitHub 저장소 → **Settings → Pages** 에서 Source 를 `main` 브랜치로 설정
2. `CNAME` 파일이 `algosalja.com` 으로 지정되어 있습니다 (이미 포함됨)
3. 도메인 등록업체 DNS 설정:
   - `www` → CNAME → `<사용자명>.github.io`
   - 루트(`@`) → A 레코드 4개:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
4. GitHub Pages 설정에서 **Enforce HTTPS** 활성화 (인증서 발급까지 수십 분 소요)
