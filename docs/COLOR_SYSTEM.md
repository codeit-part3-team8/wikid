# 🎨 WIKID Color System 사용 가이드

## 📋 개요

디자인 시스템을 기반으로 한 WIKID 프로젝트의 컬러 시스템입니다.  
일관된 브랜딩과 사용자 경험을 위해 정의된 컬러를 사용해주세요.

## 🚀 사용법

### CSS 변수 사용 (권장 방식)

### Tailwind 클래스 사용 (권장 방식)

```tsx
// Tailwind 클래스로 간편하게 사용
<div className="bg-grayscale-100">연한 회색 배경</div>
<div className="bg-primary-200 text-white">메인 브랜드 컬러 배경</div>

// 텍스트 색상
<p className="text-grayscale-600">진한 회색 텍스트</p>
<span className="text-primary-200">브랜드 컬러 텍스트</span>

// 테두리 색상
<input className="border border-grayscale-300" />
<button className="border border-primary-200">버튼</button>

// 반응형 디자인
<div className="bg-grayscale-100 md:bg-primary-200 lg:bg-primary-300">
  반응형 배경색
</div>
```

### CSS 변수 직접 사용 (대안)

```tsx
// 인라인 스타일로 CSS 변수 사용
<div style={{ backgroundColor: 'var(--grayscale-100)' }}>연한 회색 배경</div>
<div style={{ backgroundColor: 'var(--primary-200)', color: 'white' }}>메인 브랜드 컬러 배경</div>

// 텍스트 색상
<p style={{ color: 'var(--grayscale-600)' }}>진한 회색 텍스트</p>
<span style={{ color: 'var(--primary-200)' }}>브랜드 컬러 텍스트</span>

// 테두리 색상
<input style={{ borderColor: 'var(--grayscale-300)', borderWidth: '1px' }} />
<button style={{ borderColor: 'var(--primary-200)', borderWidth: '1px' }}>버튼</button>
```

### 인라인 스타일로 사용

```tsx
// 배경색
<div style={{ backgroundColor: 'var(--primary-200)', color: 'white' }}>
  메인 브랜드 컬러 박스
</div>

// 복합 스타일
<div
  style={{
    backgroundColor: 'var(--grayscale-50)',
    color: 'var(--grayscale-600)',
    borderColor: 'var(--grayscale-200)',
    borderWidth: '1px'
  }}
>
  카드 컨테이너
</div>
```

## 🎯 컬러 팔레트

### Grayscale (회색조)

| 클래스명        | HEX 코드  | RGB                  |
| --------------- | --------- | -------------------- |
| `grayscale-50`  | `#FFFFFF` | `rgb(255, 255, 255)` |
| `grayscale-100` | `#F7F7FA` | `rgb(247, 247, 250)` |
| `grayscale-200` | `#E4E5F0` | `rgb(228, 229, 240)` |
| `grayscale-300` | `#C6CADA` | `rgb(198, 202, 218)` |
| `grayscale-400` | `#8F9BB2` | `rgb(143, 155, 178)` |
| `grayscale-500` | `#474D66` | `rgb(71, 77, 102)`   |
| `grayscale-600` | `#3B4108` | `rgb(59, 65, 8)`     |

### Primary Green (메인 브랜드 컬러)

| 클래스명      | HEX 코드  | RGB                  |
| ------------- | --------- | -------------------- |
| `primary-100` | `#EEF9F6` | `rgb(238, 249, 246)` |
| `primary-200` | `#4CBFA4` | `rgb(76, 191, 164)`  |
| `primary-300` | `#32A68A` | `rgb(50, 166, 138)`  |

### Secondary Colors (보조 컬러)

| 컬러       | 클래스명               | HEX 코드  |
| ---------- | ---------------------- | --------- |
| **Red**    | `secondary-red-100`    | `#FBEDED` |
| **Red**    | `secondary-red-200`    | `#D14343` |
| **Purple** | `secondary-purple-100` | `#131314` |
| **Yellow** | `secondary-yellow-100` | `#FFD061` |

## ✅ 팀 사용 권장사항

### 🟢 권장 (DO)

```tsx
// Tailwind 클래스로 일관된 컬러 사용 (권장)
<button className="bg-primary-200 text-white">확인</button>
<div className="bg-secondary-red-200 text-white">에러 메시지</div>

// 일관된 컬러 시스템 사용
<div className="bg-grayscale-100 text-grayscale-600">
  <h3 className="text-grayscale-600">제목</h3>
  <p className="text-grayscale-400">내용</p>
</div>

// 반응형 디자인과 조합
<div className="bg-grayscale-50 text-grayscale-600 md:bg-primary-100">
  반응형 컬러
</div>

// CSS 변수 직접 사용 (필요시)
<div style={{
  backgroundColor: 'var(--grayscale-50)',
  color: 'var(--grayscale-600)'
}}>
  커스텀 스타일
</div>
```

### 🔴 지양 (DON'T)

```tsx
// 임의의 HEX 컬러 사용 지양
<div style={{backgroundColor: '#ff5733'}}>임의 컬러</div>
<div className="bg-[#ff5733]">임의 컬러 Tailwind</div>

// 정의되지 않은 컬러 변수 사용 지양
<div style={{backgroundColor: 'var(--undefined-color)'}}>정의되지 않은 컬러</div>
<div className="bg-undefined-color">정의되지 않은 클래스</div>

// 복잡한 인라인 스타일 남발 지양
<div style={{
  backgroundColor: '#4cbfa4',
  color: '#ffffff',
  borderColor: '#32a68a'
}}>복잡한 인라인 스타일</div>
```

## 🔧 커스터마이징

새로운 컬러가 필요한 경우 `color.css`의 `:root`에 추가해주세요.

```css
:root {
  /* 기존 컬러들... */

  /* 새로운 커스텀 컬러 */
  --custom-blue: #3b82f6;
  --custom-orange: #f97316;
}
```

그리고 컴포넌트에서 사용:

```tsx
<div style={{ backgroundColor: 'var(--custom-blue)', color: 'white' }}>커스텀 블루 배경</div>
```

💡 **팁**:

- 디자인 시스템의 모든 컬러가 구현되어 있으니 일관성을 위해 정의된 변수만 사용해주세요.
- `color.css` 파일을 확인하면 사용 가능한 모든 컬러 변수를 볼 수 있습니다.
