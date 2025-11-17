# 📚 WIKID

**나만의 위키를 만들고, 다른 사람들의 위키를 수정하는 공간입니다.**

## ✨ 소개

WIKID는 누구나 쉽게 위키를 생성하고 편집할 수 있는 협업 플랫폼입니다. 개인의 지식을 공유하고, 다른 사람들과 함께 정보를 발전시켜 나갈 수 있는 공간을 제공합니다.

## 🛠️ 기술 스택

### 프레임워크 & 라이브러리

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

- **Vercel** (예정) - 배포

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

### ESLint 규칙

- **@typescript-eslint/recommended** - TypeScript 권장 규칙
- **@next/next/recommended** - Next.js 권장 규칙
- **React Hooks 규칙** - 훅 사용 규칙 준수
- **사용하지 않는 변수 경고** - 코드 품질 유지

### Prettier 설정

- **세미콜론**: 항상 사용
- **따옴표**: 싱글 쿼트 사용
- **들여쓰기**: 2칸 스페이스
- **줄바꿈 길이**: 100자
- **후행 쉼표**: ES5 호환

### Husky Git Hooks

- **pre-commit**: ESLint, Prettier, TypeScript 검사
- **commit-msg**: 커밋 메시지 컨벤션 검사

### Tailwind CSS 사용법

```tsx
// 디자인 시스템 컬러 사용 (권장)
<div className="bg-primary-200 text-white">버튼</div>
<p className="text-grayscale-600">텍스트</p>

// CSS 변수 직접 사용 (필요시)
<div style={{ backgroundColor: 'var(--primary-200)' }}>배경</div>
```

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

- **feature**: `feature/login-page`
- **hotfix**: `hotfix/fix-auth-bug`
- **release**: `release/v1.0.0`

### 커밋 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 스타일 변경 (포맷팅, 세미콜론 등)
refactor: 코드 리팩토링
test: 테스트 추가 또는 수정
chore: 빌드 과정 또는 도구 설정 변경
```

**예시:**

```bash
git commit -m "feat: 로그인 페이지 구현"
git commit -m "fix: 타이포그래피 폰트 로딩 오류 수정"
git commit -m "docs: README 업데이트"
```

## 💖 PR 규칙

### Code Rabbit 사용

- **자동 코드 리뷰** - AI 기반 코드 분석
- **보안 취약점 검사** - 잠재적 보안 이슈 탐지
- **성능 최적화 제안** - 코드 품질 개선 제안

### PR 체크리스트

- [ ] ESLint, Prettier 통과
- [ ] TypeScript 타입 에러 없음
- [ ] 빌드 성공
- [ ] 기능 테스트 완료
- [ ] 코드 리뷰 승인 (최소 1명)

### PR 템플릿

```markdown
## 📝 변경사항

- 구현한 기능이나 수정한 내용

## 🧪 테스트

- 테스트 방법 및 결과

## 📸 스크린샷 (선택사항)

- UI 변경사항이 있는 경우

## 📚 관련 이슈

- Close #이슈번호
```

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
http://localhost:3000/typo_color
```

## 🔗 링크

- **Figma 디자인**: [figma.com/design/7aLjzZy50LPISym2AMxuQW/-BBB-위키드](https://figma.com/design/7aLjzZy50LPISym2AMxuQW/-BBB-위키드)
- **GitHub 프로젝트**: [https://github.com/codeit-part3-team8/wikid](https://github.com/codeit-part3-team8/wikid)
- **배포 URL**: (미정)

---

- **Next.js 16.0.3** - React 기반 풀스택 프레임워크
- **React 19.2.0** - 사용자 인터페이스 구축
- **TypeScript 5** - 정적 타입 검사

### 스타일링

- **Tailwind CSS 4** - 유틸리티 퍼스트 CSS 프레임워크
- **Pretendard Font** - 한국어 최적화 폰트
- **CSS Custom Properties** - 디자인 시스템 컬러 변수

### 개발 도구

- **ESLint 9** - 코드 품질 관리
- **Prettier** - 코드 포맷팅
- **Husky** - Git hooks 자동화

### 배포 환경

- **Vercel** (예정) - 배포

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

### ESLint 규칙

- **@typescript-eslint/recommended** - TypeScript 권장 규칙
- **@next/next/recommended** - Next.js 권장 규칙
- **React Hooks 규칙** - 훅 사용 규칙 준수
- **사용하지 않는 변수 경고** - 코드 품질 유지

### Prettier 설정

- **세미콜론**: 항상 사용
- **따옴표**: 싱글 쿼트 사용
- **들여쓰기**: 2칸 스페이스
- **줄바꿈 길이**: 100자
- **후행 쉼표**: ES5 호환

### Husky Git Hooks

- **pre-commit**: ESLint, Prettier, TypeScript 검사
- **commit-msg**: 커밋 메시지 컨벤션 검사

### Tailwind CSS 사용법

```tsx
// 디자인 시스템 컬러 사용 (권장)
<div className="bg-primary-200 text-white">버튼</div>
<p className="text-grayscale-600">텍스트</p>

// CSS 변수 직접 사용 (필요시)
<div style={{ backgroundColor: 'var(--primary-200)' }}>배경</div>
```

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

- **feature**: `feature/login-page`
- **hotfix**: `hotfix/fix-auth-bug`
- **release**: `release/v1.0.0`

### 커밋 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 스타일 변경 (포맷팅, 세미콜론 등)
refactor: 코드 리팩토링
test: 테스트 추가 또는 수정
chore: 빌드 과정 또는 도구 설정 변경
```

**예시:**

```bash
git commit -m "feat: 로그인 페이지 구현"
git commit -m "fix: 타이포그래피 폰트 로딩 오류 수정"
git commit -m "docs: README 업데이트"
```

## 💖 PR 규칙

### Code Rabbit 사용

- **자동 코드 리뷰** - AI 기반 코드 분석
- **보안 취약점 검사** - 잠재적 보안 이슈 탐지
- **성능 최적화 제안** - 코드 품질 개선 제안

### PR 체크리스트

- [ ] ESLint, Prettier 통과
- [ ] TypeScript 타입 에러 없음
- [ ] 빌드 성공
- [ ] 기능 테스트 완료
- [ ] 코드 리뷰 승인 (최소 1명)

### PR 템플릿

```markdown
## 📝 변경사항

- 구현한 기능이나 수정한 내용

## 🧪 테스트

- 테스트 방법 및 결과

## 📸 스크린샷 (선택사항)

- UI 변경사항이 있는 경우

## 📚 관련 이슈

- Close #이슈번호
```

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
http://localhost:3000/typo_color
```

## 🔗 링크

- **Figma 디자인**: [figma.com/design/7aLjzZy50LPISym2AMxuQW/-BBB-위키드](https://figma.com/design/7aLjzZy50LPISym2AMxuQW/-BBB-위키드)
- **GitHub 프로젝트**: [https://github.com/codeit-part3-team8/wikid](https://github.com/codeit-part3-team8/wikid)
- **배포 URL**: (미정)

---
