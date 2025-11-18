# 📚 WIKID

**나만의 위키를 만들고, 다른 사람들의 위키를 수정하는 공간입니다.**

## ✨ 소개

WIKID는 누구나 쉽게 위키를 생성하고 편집할 수 있는 협업 플랫폼입니다. 개인의 지식을 공유하고, 다른 사람들과 함께 정보를 발전시켜 나갈 수 있는 공간을 제공합니다.

## 🛠️ 기술 스택

### 프레임워크 & 라이브러리

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

- **Next.js 16.0.3** - React 기반 풀스택 프레임워크
- **React 19.2.0** - 사용자 인터페이스 구축
- **TypeScript 5** - 정적 타입 검사

### 스타일링

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

- **Tailwind CSS 4** - 유틸리티 퍼스트 CSS 프레임워크
- **Pretendard Font** - 한국어 최적화 폰트

### 개발 도구

![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black)

- **ESLint 9** - 코드 품질 관리
- **Prettier** - 코드 포맷팅
- **Husky** - Git hooks 자동화

### 배포 환경

![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

- **Vercel** - 배포 환경 (v1.0.0부터 시작)

## 👥 Team

| 이름       | 담당 업무                              |
| ---------- | -------------------------------------- |
| **권현성** | 메인페이지, 로그인, 회원가입, 계정설정 |
| **윤시현** | 내 위키 페이지                         |
| **양정훈** | 위키 목록 페이지, 자유게시판           |
| **방다연** | 게시글 상세페이지, 게시글 추가         |

## 📂 디렉토리 구조

```
wikid/
├── public/                 # 정적 파일
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── globals.css    # 전역 스타일
│   │   ├── layout.tsx     # 루트 레이아웃
│   │   ├── page.tsx       # 메인 페이지
│   │   ├── addboard/      # 게시글 추가
│   │   ├── boards/        # 게시판
│   │   ├── login/         # 로그인
│   │   ├── mypage/        # 마이페이지
│   │   ├── signup/        # 회원가입
│   │   ├── typo_color/    # 디자인 시스템 showcase
│   │   ├── wiki/          # 위키 상세
│   │   └── wikilist/      # 위키 목록
│   ├── components/        # 재사용 컴포넌트
│   ├── hooks/            # 커스텀 훅
│   ├── utils/            # 유틸리티 함수
│   ├── types/            # TypeScript 타입 정의
│   ├── apis/             # API 관련
│   ├── assets/           # 정적 자산
│   └── styles/           # 스타일 파일
│       ├── typo.css      # 타이포그래피 시스템
│       └── color.css     # 컬러 시스템
├── docs/                 # 문서
│   ├── COLOR_SYSTEM.md
│   ├── TYPOGRAPHY.md
│   └── DESIGN_SYSTEM_SHOWCASE.md
├── eslint.config.mjs     # ESLint 설정
├── tailwind.config.ts    # Tailwind 설정
├── .prettierrc           # Prettier 설정
└── package.json
```

## 🚩 Starting (프로젝트 시작 방법)

### 필수 조건

- **Node.js** 18.0.0 이상
- **npm**

### 설치 및 실행

1. **저장소 클론**

   ```bash
   git clone https://github.com/codeit-part3-team8/wikid.git
   cd wikid
   ```

2. **의존성 설치**

   ```bash
   npm install
   ```

3. **개발 서버 실행**

   ```bash
   npm run dev
   ```

4. **브라우저에서 확인**
   ```
   http://localhost:3000
   ```

### 사용 가능한 스크립트

```bash
npm run dev          # 개발 서버 실행
npm run build        # 프로덕션 빌드
npm run start        # 프로덕션 서버 실행
npm run lint         # ESLint 검사
npm run lint:fix     # ESLint 자동 수정
npm run format       # Prettier 포맷팅
npm run format:check # Prettier 검사만 실행
npm run type-check   # TypeScript 타입 검사
```

## 📋 개발 규칙

상세한 개발 규칙은 **[docs/CODE_CONVENTION.md](./docs/CODE_CONVENTION.md)**를 참고하세요.

### 핵심 규칙

- **네이밍**: 영문만 사용, 한글자 변수명 금지, 함수는 동사로 시작
- **파일명**: 컴포넌트/페이지는 PascalCase, 나머지는 kebab-case
- **스타일링**: Tailwind 클래스 순서 준수, 디자인 시스템 색상 사용
- **컴포넌트**: tailwind-variants + clsx 패턴 사용

### 자동화 도구

- **ESLint + Prettier**: 코드 품질 및 포맷팅 자동 관리
- **Husky**: 커밋 시 자동 검증
- **commitlint**: 커밋 메시지 규칙 강제

## ⚙️ Git 가이드라인

### Git Flow 전략

```
main (프로덕션)
├── dev (개발)
    ├── feature/기능명 (기능 개발)
    ├── hotfix/버그명 (긴급 수정)
    └── release/버전명 (배포 준비)
```

### 브랜치 네이밍

**이슈 생성 후 브랜치 생성**을 원칙으로 합니다:

- **feature**: `feature/#이슈번호-기능-디테일`
  - 예: `feature/#12-login-form-validation`
  - 예: `feature/#5-add-svgicon-component`
- **hotfix**: `hotfix/#이슈번호-버그-설명`
  - 예: `hotfix/#34-fix-auth-token-error`
- **release**: `release/v버전번호`
  - 예: `release/v1.0.0`, `release/v1.1.0`

### 커밋 컨벤션

상세한 커밋 규칙은 **[docs/COMMIT_CONVENTION.md](./docs/COMMIT_CONVENTION.md)**를 참고하세요.

**기본 형식**: `<type>: <subject> (#이슈번호)`

```bash
feat: 로그인 페이지 구현 (#12)
fix: 버그 수정 설명 (#34)
docs: 문서 업데이트
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 추가
chore: 빌드 설정 변경
```

**자동 검증**: commitlint로 커밋 메시지 규칙을 자동 검증합니다.

## 💖 PR 규칙

### Code Rabbit 사용

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/codeit-part3-team8/wikid?utm_source=oss&utm_medium=github&utm_campaign=codeit-part3-team8%2Fwikid&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

- **자동 코드 리뷰** - AI 기반 코드 분석
- **보안 취약점 검사** - 잠재적 보안 이슈 탐지
- **성능 최적화 제안** - 코드 품질 개선 제안

### PR 체크리스트

- [ ] ESLint, Prettier 통과
- [ ] TypeScript 타입 에러 없음
- [ ] 빌드 성공
- [ ] 기능 테스트 완료
- [ ] 코드 리뷰 승인 (최소 1명)

### GitHub 자동화

- **Issue 템플릿**: 5가지 타입별 템플릿 제공
- **PR 템플릿**: 구조화된 템플릿 자동 적용
- **자동 코드 리뷰**: CodeRabbit AI 리뷰 시스템

## 🎨 디자인 시스템

### 타이포그래피

- **29개 텍스트 스타일** - text-5xl부터 text-xs까지
- **Pretendard 폰트** - 한국어 최적화
- **일관된 line-height** - 가독성 최적화

### 컬러 시스템

- **Grayscale**: 7단계 회색조 (#FFFFFF ~ #3B4108)
- **Primary**: 브랜드 그린 3단계 (#EEF9F6, #4CBFA4, #32A68A)
- **Secondary**: 보조 컬러 (Red, Purple, Yellow)

### 디자인 시스템 확인

```bash
# 디자인 시스템 showcase 페이지
http://localhost:3000/typo-color
```

## 🔗 링크

- **Figma 디자인**: [figma.com/design/7aLjzZy50LPISym2AMxuQW/-BBB-위키드](https://figma.com/design/7aLjzZy50LPISym2AMxuQW/-BBB-위키드)
- **GitHub 프로젝트**: [https://github.com/codeit-part3-team8/wikid](https://github.com/codeit-part3-team8/wikid)
