# 🎨 WIKID Typography 사용 가이드

## 📋 개요

Pretendard 폰트를 기반으로 한 WIKID 프로젝트의 타이포그래피 시스템입니다.  
일관된 디자인을 위해 정의된 클래스들을 사용해주세요.

## 🚀 사용법

### 기본 사용

```tsx
// 제목 (기본은 Bold)
<h1 className="text-5xl">메인 제목 (Semibold)</h1>
<h2 className="text-4xl">섹션 제목 (Bold)</h2>
<h3 className="text-3xl">서브 제목 (Bold)</h3>

// 본문 텍스트
<p className="text-lg-regular">일반 본문 텍스트</p>
<p className="text-md-regular">작은 본문 텍스트</p>
<span className="text-sm">캡션 텍스트 (Semibold)</span>

// 다양한 weight 사용
<p className="text-2xl-medium">중간 굵기 제목</p>
<p className="text-lg-semibold">조금 굵은 본문</p>
```

### 특별 케이스

```tsx
// text-3xl은 두 가지 line-height 제공
<h3 className="text-3xl">32px/38px (Bold)</h3>
<h3 className="text-3xl-semibold">32px/42px (Semibold)</h3>

// text-xs는 두 가지 line-height 제공
<small className="text-xs">12px/20px (Semibold)</small>
<small className="text-xs-medium">12px/18px (Medium)</small>
<small className="text-xs-regular">12px/18px (Regular)</small>
```

## 📊 타이포그래피 스케일

| 클래스명   | 크기 | Line Height | Weight       | Weight 변형                                 |
| ---------- | ---- | ----------- | ------------ | ------------------------------------------- |
| `text-5xl` | 48px | 46px        | **Semibold** | -                                           |
| `text-4xl` | 40px | 42px        | **Bold**     | -                                           |
| `text-3xl` | 32px | 38px        | **Bold**     | `text-3xl-semibold` (32px/42px)             |
| `text-2xl` | 24px | 32px        | **Bold**     | `semibold`, `medium`, `regular`             |
| `text-xl`  | 20px | 32px        | **Bold**     | `semibold`, `medium`, `regular`             |
| `text-2lg` | 18px | 26px        | **Bold**     | `semibold`, `medium`, `regular`             |
| `text-lg`  | 16px | 26px        | **Bold**     | `semibold`, `medium`, `regular`             |
| `text-md`  | 14px | 24px        | **Bold**     | `semibold`, `medium`, `regular`             |
| `text-sm`  | 13px | 22px        | **Semibold** | `medium`                                    |
| `text-xs`  | 12px | 20px        | **Semibold** | `medium` (12px/18px), `regular` (12px/18px) |

## 🎯 Weight 변형

각 크기별로 다양한 font-weight를 제공합니다:

```tsx
// text-2xl ~ text-md는 4가지 weight 제공
<h2 className="text-2xl">Bold (기본)</h2>
<h2 className="text-2xl-semibold">Semibold</h2>
<h2 className="text-2xl-medium">Medium</h2>
<h2 className="text-2xl-regular">Regular</h2>

// text-sm은 2가지 weight 제공
<span className="text-sm">Semibold (기본)</span>
<span className="text-sm-medium">Medium</span>

// text-xs는 3가지 weight + line-height 변형
<small className="text-xs">Semibold, 12px/20px (기본)</small>
<small className="text-xs-medium">Medium, 12px/18px</small>
<small className="text-xs-regular">Regular, 12px/18px</small>
```

## 📱 반응형

> 현재 CSS에는 반응형이 구현되어 있지 않습니다. 필요시 추가 구현 가능합니다.

## ✅ 팀 사용 권장사항

### 🟢 권장 (DO)

```tsx
// 일관된 위계 구조 사용
<h1 className="text-5xl">메인 제목</h1>
<h2 className="text-4xl">섹션 제목</h2>
<h3 className="text-3xl">서브 제목</h3>

// 용도에 맞는 weight 선택
<p className="text-lg-regular">일반 본문</p>
<strong className="text-lg-semibold">강조 텍스트</strong>
<span className="text-sm">캡션</span>

// 특별한 경우 적절한 변형 사용
<h3 className="text-3xl-semibold">더 넓은 line-height가 필요한 제목</h3>
```

### 🔴 지양 (DON'T)

```tsx
// 인라인 스타일 지양
<p style={{fontSize: '16px'}}>텍스트</p>

// Tailwind 임의 크기 지양
<p className="text-[15px]">텍스트</p>

// 위계 무시 지양
<h1 className="text-lg">작은 제목</h1>
<p className="text-5xl">큰 본문</p>
```

## 🔧 커스터마이징

새로운 타이포그래피가 필요한 경우 `typo.css`에 추가 바람

```css
.custom-text {
  font-family: var(--font-pretendard);
  font-size: 22px;
  line-height: 30px;
  font-weight: 500;
}
```

---

💡 **팁**:

- VSCode에서 `text-`를 타이핑하면 자동완성으로 사용 가능한 클래스 확인 가능
