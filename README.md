# 📚 WIKID

**나만의 위키를 만들고, 다른 사람들의 위키를 수정하는 공간입니다.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge)](https://wikid-19-8.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/codeit-part3-team8/wikid)

## ✨ 소개

WIKID는 누구나 쉽게 위키를 생성하고 편집할 수 있는 협업 플랫폼입니다. 개인의 지식을 공유하고, 다른 사람들과 함께 정보를 발전시켜 나갈 수 있는 공간을 제공합니다.

### 주요 기능

- **📝 위키 생성 및 편집** - TipTap 에디터로 직관적인 위키 작성 (이미지, 링크, 리스트 등 지원)
- **🔐 보안 퀴즈** - 위키 편집 권한 보호 시스템
- **⏱️ 편집 타이머** - 5분 타이머로 동시 편집 충돌 방지
- **🔔 실시간 알림** - 위키 수정 알림 시스템
- **👥 사용자 프로필** - 아바타 및 프로필 정보 관리
- **📋 자유게시판** - 커뮤니티 소통 공간 (댓글, 좋아요, 베스트 게시글)
- **🔍 검색 및 필터** - 위키 및 게시글 실시간 검색
- **🔒 자동 토큰 갱신** - 끊김 없는 사용자 경험 (토큰 만료 시 자동 갱신)
- **🌐 SEO 최적화** - Open Graph, JSON-LD, sitemap, robots.txt
- **📱 반응형 디자인** - 모바일, 태블릿, 데스크톱 완벽 지원

## 🛠️ 기술 스택

### 프레임워크 & 라이브러리

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

- **Next.js 16.0.3** - React 기반 풀스택 프레임워크 (App Router, Server Actions)
- **React 19.2.0** - 사용자 인터페이스 구축 (React Compiler 적용)
- **TypeScript 5** - 정적 타입 검사
- **TipTap** - 리치 텍스트 에디터 (ProseMirror 기반, 위키/게시글 작성)
- **DOMPurify** - XSS 보안 처리
- **Vercel Analytics** - 웹 분석 도구

### 스타일링

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

- **Tailwind CSS 4** - 유틸리티 퍼스트 CSS 프레임워크
- **tailwind-variants** - 타입 안전한 variant 관리
- **clsx & tailwind-merge** - 조건부 클래스 병합
- **Pretendard Font** - 한국어 최적화 폰트

### 개발 도구

![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black)

- **ESLint 9** - 코드 품질 관리
- **Prettier** - 코드 포맷팅
- **Husky** - Git hooks 자동화

### 배포 환경

![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

- **Vercel** - 자동 배포 환경
- **배포 URL**: [https://wikid-19-8.vercel.app](https://wikid-19-8.vercel.app)
- **자동 CI/CD** - main 브랜치 푸시 시 자동 배포
- **프리뷰 배포** - PR 생성 시 미리보기 환경 자동 생성

### SEO 및 성능 최적화

- **Open Graph** - SNS 링크 공유 시 리치 프리뷰
- **JSON-LD** - 구조화된 데이터 (Article, WebSite 스키마)
- **Dynamic Sitemap** - 자동 생성되는 사이트맵
- **robots.txt** - 검색엔진 크롤링 최적화
- **Image Optimization** - Next.js 이미지 최적화
- **Gzip Compression** - 응답 압축

## 👥 Team

| 이름       | 담당 업무                                          |
| ---------- | -------------------------------------------------- |
| **권현성** | 메인페이지, 로그인/회원가입, 계정설정, 인증 시스템 |
| **윤시현** | 위키 상세 페이지, 편집 기능, 보안 퀴즈, 타이머     |
| **양정훈** | 위키 목록, 자유게시판 목록, 검색/필터              |
| **방다연** | 게시글 상세, 게시글 작성, 댓글 시스템              |

## 📂 디렉토리 구조

```
wikid/
├── public/                 # 정적 파일
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── (route)/       # 라우트 그룹
│   │   │   ├── addboard/  # 게시글 추가
│   │   │   ├── boards/    # 게시판
│   │   │   ├── login/     # 로그인
│   │   │   ├── mypage/    # 마이페이지
│   │   │   ├── signup/    # 회원가입
│   │   │   ├── wiki/      # 위키 상세 [code]
│   │   │   └── wikilist/  # 위키 목록
│   │   ├── api/           # API Routes
│   │   │   ├── articles/  # 게시글 API
│   │   │   ├── auth/      # 인증 API
│   │   │   ├── images/    # 이미지 업로드 API
│   │   │   ├── notifications/ # 알림 API
│   │   │   ├── profiles/  # 프로필 API
│   │   │   └── proxy/     # 프록시 API
│   │   ├── globals.css    # 전역 스타일
│   │   ├── layout.tsx     # 루트 레이아웃 (SEO 메타데이터)
│   │   ├── page.tsx       # 메인 페이지 (JSON-LD)
│   │   ├── not-found.tsx  # 404 페이지
│   │   ├── robots.ts      # robots.txt 생성
│   │   ├── sitemap.ts     # 동적 sitemap.xml 생성
│   │   ├── og-image.png   # Open Graph 이미지
│   │   └── typo-color/    # 디자인 시스템 showcase
│   ├── components/        # 재사용 컴포넌트
│   │   ├── ArticleList/   # 게시글 목록
│   │   ├── Avatar/        # 아바타
│   │   ├── BestArticle/   # 베스트 게시글
│   │   ├── Button/        # 버튼
│   │   ├── Header/        # 헤더
│   │   ├── Input/         # 입력 필드
│   │   ├── Modal/         # 모달 (Alert, Confirm, Quiz)
│   │   ├── Notification/  # 알림
│   │   ├── Pagination/    # 페이지네이션
│   │   ├── SVGIcon/       # SVG 아이콘
│   │   ├── TextEditor/    # TipTap 에디터
│   │   └── ...
│   ├── contexts/          # React Context
│   │   ├── AuthContext.tsx     # 인증 컨텍스트
│   │   └── SnackBarContext.tsx # 스낵바 컨텍스트
│   ├── hooks/             # 커스텀 훅
│   │   ├── useIdleTimer.ts   # 편집 타이머
│   │   ├── useModal.ts       # 모달 훅
│   │   └── useUserInfo.ts    # 사용자 정보
│   ├── utils/             # 유틸리티 함수
│   │   ├── apiClient.ts       # API 클라이언트
│   │   ├── auth.ts           # 인증 헬퍼 (토큰 관리)
│   │   ├── fetchWithAuth.ts  # 자동 토큰 갱신 fetch wrapper
│   │   └── safeFetch.ts      # Safe Fetch
│   ├── types/             # TypeScript 타입
│   ├── constants/         # 상수 (API, 스타일, 검증)
│   ├── assets/            # 이미지, 아이콘, 로고
│   └── styles/            # 스타일 파일
│       ├── typography-system.css  # 타이포그래피
│       └── color-variables.css    # 컬러 시스템
├── docs/                  # 문서
│   ├── CODE_CONVENTION.md
│   ├── COLOR_SYSTEM.md
│   ├── COMMIT_CONVENTION.md
│   └── TYPOGRAPHY.md
├── eslint.config.mjs      # ESLint 설정
├── tailwind.config.ts     # Tailwind 설정
├── .prettierrc            # Prettier 설정
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

3. **환경 변수 설정**

   프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

   ```bash
   NEXT_PUBLIC_API_BASE_URL=https://wikied-api.vercel.app/19-8
   ```

4. **개발 서버 실행**

   ```bash
   npm run dev
   ```

5. **브라우저에서 확인**
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

## 🔌 API Routes

프로젝트는 Next.js App Router의 Route Handlers를 사용하여 백엔드 API를 구현합니다.

### API 엔드포인트

#### 게시글 (Articles)

| 경로                                             | 메서드 | 설명             |
| ------------------------------------------------ | ------ | ---------------- |
| `/api/articles`                                  | GET    | 게시글 목록 조회 |
| `/api/articles`                                  | POST   | 게시글 작성      |
| `/api/articles/[articleId]`                      | GET    | 게시글 상세 조회 |
| `/api/articles/[articleId]`                      | PATCH  | 게시글 수정      |
| `/api/articles/[articleId]`                      | DELETE | 게시글 삭제      |
| `/api/articles/[articleId]/like`                 | POST   | 좋아요 등록      |
| `/api/articles/[articleId]/like`                 | DELETE | 좋아요 취소      |
| `/api/articles/[articleId]/comments`             | GET    | 댓글 목록 조회   |
| `/api/articles/[articleId]/comments`             | POST   | 댓글 작성        |
| `/api/articles/[articleId]/comments/[commentId]` | PATCH  | 댓글 수정        |
| `/api/articles/[articleId]/comments/[commentId]` | DELETE | 댓글 삭제        |

#### 인증 (Auth)

| 경로                | 메서드 | 설명                                 |
| ------------------- | ------ | ------------------------------------ |
| `/api/auth/signin`  | POST   | 로그인 (Refresh Token을 쿠키로 설정) |
| `/api/auth/signup`  | POST   | 회원가입                             |
| `/api/auth/logout`  | POST   | 로그아웃 (쿠키 삭제)                 |
| `/api/auth/refresh` | POST   | 토큰 자동 갱신 (쿠키 기반)           |

#### 프로필 & 위키 (Profiles)

| 경로                  | 메서드 | 설명           |
| --------------------- | ------ | -------------- |
| `/api/profiles`       | POST   | 위키 생성      |
| `/api/profiles`       | GET    | 내 프로필 조회 |
| `/api/profiles`       | PATCH  | 내 프로필 수정 |
| `/api/passwordchange` | PATCH  | 비밀번호 변경  |

#### 기타

| 경로                      | 메서드 | 설명           |
| ------------------------- | ------ | -------------- |
| `/api/images/upload`      | POST   | 이미지 업로드  |
| `/api/notifications`      | GET    | 알림 목록 조회 |
| `/api/notifications/[id]` | DELETE | 알림 삭제      |
| `/api/proxy`              | GET    | 프록시 요청    |

### API 표준화 패턴

모든 API 라우트는 통일된 패턴을 따릅니다:

```typescript
import { NextRequest } from 'next/server';
import { API_BASE_URL } from '@/constants/api';
import { safeFetch } from '@/utils/safeFetch';
import {
  createErrorResponse,
  createSuccessResponse,
  validateEnvironmentVariables,
} from '@/utils/apiHelpers';
import { APIError } from '@/types/Error';

export async function GET(request: NextRequest) {
  try {
    // 1. 환경변수 검증
    validateEnvironmentVariables({ name: 'API_BASE_URL', value: API_BASE_URL });

    // 2. 인증 확인
    const authToken = request.headers.get('authorization');
    if (!authToken) {
      return createErrorResponse(
        APIError.unauthorized('인증이 필요합니다'),
        '인증이 필요한 요청입니다'
      );
    }

    // 3. API 호출
    const data = await safeFetch(`${API_BASE_URL}/endpoint`, {
      headers: { Authorization: authToken },
    });

    // 4. 성공 응답
    return createSuccessResponse(data, '조회 성공');
  } catch (error) {
    // 5. 에러 응답
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '조회에 실패했습니다'
    );
  }
}
```

### API 헬퍼 함수

- **`safeFetch`** - fetch wrapper with error handling
- **`createSuccessResponse`** - 통일된 성공 응답 포맷
- **`createErrorResponse`** - 통일된 에러 응답 포맷
- **`validateEnvironmentVariables`** - 환경변수 검증

## 📋 개발 규칙

상세한 개발 규칙은 [docs/CODE_CONVENTION.md](./docs/CODE_CONVENTION.md) 를 참고하세요.

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

상세한 커밋 규칙은 [docs/COMMIT_CONVENTION.md](./docs/COMMIT_CONVENTION.md) 를 참고하세요.

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

- **🌐 Live Demo**: [https://wikid-19-8.vercel.app](https://wikid-19-8.vercel.app)
- **🎨 Figma 디자인**: [figma.com/design/7aLjzZy50LPISym2AMxuQW/-BBB-위키드](https://figma.com/design/7aLjzZy50LPISym2AMxuQW/-BBB-위키드)
- **📦 GitHub**: [https://github.com/codeit-part3-team8/wikid](https://github.com/codeit-part3-team8/wikid)

### 메인 페이지

![Main Page](https://wikid-19-8.vercel.app/og-image.png)

### 주요 기능

- ✅ 위키 생성 및 편집 (보안 퀴즈, 5분 타이머)
- ✅ 게시판 (댓글, 좋아요, 베스트 게시글)
- ✅ 실시간 알림
- ✅ 검색 및 필터링
- ✅ 반응형 디자인

## 🚀 성능 최적화

- **React Compiler** - 자동 메모이제이션으로 리렌더링 최적화
- **Next.js Image** - 자동 이미지 최적화 (webp, avif)
- **Code Splitting** - 동적 임포트로 초기 로딩 속도 개선
- **Server Components** - 서버 사이드 렌더링으로 SEO 및 성능 향상
- **Gzip Compression** - 응답 데이터 압축
- **Font Optimization** - Pretendard 폰트 최적화 로딩

## 🔒 보안 및 인증

### Dual Token 아키텍처

프로젝트는 보안과 사용자 경험을 모두 만족시키는 **이중 토큰 시스템**을 구현합니다:

#### 🔑 Access Token (액세스 토큰)

- **저장 위치**: `localStorage`
- **용도**: API 요청 시 사용
- **특징**: 짧은 유효기간 (탈취 시 피해 최소화)

#### 🍪 Refresh Token (리프레시 토큰)

- **저장 위치**: `HttpOnly Cookie`
- **용도**: Access Token 갱신
- **특징**:
  - JavaScript 접근 불가 → XSS 공격 방어
  - 7일 유효기간
  - `httpOnly: true, secure: production, sameSite: 'lax'`

### 🔄 자동 토큰 갱신 (`fetchWithAuth`)

**핵심 기능**:

1. 모든 API 요청에 Access Token 자동 추가
2. 401 에러 감지 시 자동으로 토큰 갱신
3. 갱신 후 원래 요청 재시도
4. **중복 갱신 방지** - 여러 API가 동시에 401을 받아도 1번만 갱신

```typescript
// 사용 예시
import { fetchWithAuth } from '@/utils/fetchWithAuth';

// 토큰 만료 시 자동으로 갱신하고 재시도
const response = await fetchWithAuth('/api/endpoint', {
  method: 'POST',
  body: JSON.stringify(data),
});
```

**적용 범위**: 12개 Hook (좋아요, 댓글, 게시글, 위키 편집 등)

### 보안 기능

- **XSS 방어**: DOMPurify로 사용자 입력 sanitization
- **CSRF 방어**: SameSite 쿠키 정책
- **환경변수 검증**: API 키 및 민감 정보 보호
- **보안 퀴즈**: 위키 편집 권한 보호

## 📝 라이센스

이 프로젝트는 팀 프로젝트로, 교육 목적으로 제작되었습니다.

---

**Made with ❤️ by Team 8** (권현성, 윤시현, 양정훈, 방다연)
