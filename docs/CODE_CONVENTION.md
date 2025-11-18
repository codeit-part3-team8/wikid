# 📐 WIKID 코드 컨벤션

## 1️⃣ 네이밍 규칙

### 기본 원칙

- **한글자로 짓지 않는다**
- **변수명, 클래스명에는 영문만 사용**
- **클래스명, 변수명은 명사를 사용**
- **메서드명은 동사 사용**
- **this 사용 자제**
- **파일에서 한 개의 클래스를 export하는 경우, 파일명 === 클래스명**

### 케이스별 네이밍

```typescript
// 클래스, 컨스트럭터 (PascalCase) - 명사
class UserManager {}
const LoginForm = () => {};

// 변수, 함수 (camelCase)
const userData = 'john'; // 변수: 명사
const getUserData = () => {}; // 함수: 동사
const handleButtonClick = () => {}; // 이벤트 핸들러: handle + 동사

// 상수 (SCREAMING_SNAKE_CASE)
const API_BASE_URL = 'https://api.com';
const MAX_RETRY_COUNT = 3;
```

### 파일명/폴더명

```bash
# 컴포넌트, 페이지 (PascalCase)
LoginForm.tsx
UserProfile.tsx
src/components/UIComponents/
src/pages/UserProfile/

# 유틸 (kebab-case)
api-client.ts
auth-utils.ts
src/utils/api-helpers/
src/hooks/use-auth/

# 이미지 파일 (kebab-case)
user-profile.jpg
login-background.png
icon-search.svg
logo-primary.svg

# CSS 파일 (kebab-case)
global-styles.css
button-component.css
typography-system.css

# 기타 설정 파일 (kebab-case 또는 관례 따름)
next.config.ts          # 프레임워크 관례
tailwind.config.ts      # 프레임워크 관례
api-endpoints.json      # kebab-case
font-weights.json       # kebab-case
```

## 2️⃣ 포맷팅 규칙

### 기본 포맷팅

- **들여쓰기는 2칸**
- **따옴표는 싱글 쿼트(`'`) 사용**

### Tailwind 클래스 순서

**포지셔닝(위치) → 박스모델(크기) → 타이포그래피(글자) → 배경/비주얼(꾸미기) → 기타**

```tsx
// ✅ 좋은 예시
<div className="
  relative z-10          // 포지셔닝
  w-full h-64 p-4 m-2    // 박스모델
  text-lg font-semibold  // 타이포그래피
  bg-primary-200 border  // 배경/비주얼
  hover:bg-primary-300   // 기타
">

// ❌ 나쁜 예시
<div className="bg-blue-500 text-lg relative w-full p-4">
```

### 디자인 시스템 색상 사용

```tsx
// ✅ 정의된 디자인 시스템 색상 사용
<div className="bg-primary-200 text-grayscale-600">

// ❌ 임의의 색상값 금지
<div className="bg-[#ff5733]" style={{backgroundColor: '#4cbfa4'}}>
```

## 3️⃣ React 컴포넌트 작성 패턴

### tailwind-variants + clsx 표준 패턴

```tsx
import clsx from 'clsx';
import { tv } from 'tailwind-variants';

// 1. 스타일 정의 (tv 사용)
const ButtonStyle = tv({
  base: 'cursor-pointer transition duration-150 rounded-lg font-medium',
  variants: {
    variant: {
      filled: 'bg-primary-200 text-white hover:bg-primary-300',
      outlined: 'border-2 border-primary-200 text-primary-200 hover:bg-primary-100',
    },
    size: {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-md',
      lg: 'px-5 py-4 text-lg',
    },
  },
  defaultVariants: {
    variant: 'filled',
    size: 'md',
  },
});

// 2. Props 타입 정의 (extends HTML 속성)
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

// 3. 컴포넌트 정의
const Button = ({ variant, size, className, children, ...props }: ButtonProps) => {
  const classes = ButtonStyle({ variant, size });

  return (
    <button className={clsx(classes, className)} {...props}>
      {children}
    </button>
  );
};

// 4. displayName 설정 (디버깅 편의성)
Button.displayName = 'Button';

export default Button;
```

### 컴포넌트 작성 핵심 규칙

- **tv() 함수로 스타일 로직 분리**
- **extends React.HTMLAttributes<> 활용**
- **clsx로 className 병합**
- **displayName 설정**
- **defaultVariants로 기본값 명시**

## ✅ 커밋 전 체크리스트

### 네이밍 규칙

- [ ] **한글자 변수명 사용하지 않았는지** 확인
- [ ] **영문만 사용**했는지 확인 (한글 변수명/클래스명 금지)
- [ ] **클래스/변수는 명사, 메서드는 동사**로 명명했는지 확인
- [ ] **케이스 규칙** 준수 (camelCase, PascalCase, SCREAMING_SNAKE_CASE)
- [ ] **this 사용을 최소화**했는지 확인

### 포맷팅 규칙

- [ ] **들여쓰기 2칸, 싱글 쿼트** 사용했는지 확인
- [ ] **Tailwind 클래스 순서** (포지셔닝→박스모델→타이포→배경→기타) 준수
- [ ] **파일명/폴더명 규칙** 준수
- [ ] **컴포넌트/페이지**: PascalCase
- [ ] **유틸/이미지/CSS**: kebab-case

### 컴포넌트 패턴

- [ ] **tailwind-variants(tv) 사용**하여 스타일 정의했는지 확인
- [ ] **extends React.HTMLAttributes<>** 로 Props 타입 확장했는지 확인
- [ ] **displayName 설정**했는지 확인
- [ ] **clsx로 className 병합**했는지 확인
- [ ] **defaultVariants로 기본값** 명시했는지 확인

### 금지 사항

```typescript
// ❌ 절대 하지 말 것
const a = getUserData();     // 한글자 변수명
const 사용자이름 = 'john';    // 한글 변수명
const user = () => {};       // 함수명에 명사 사용
<div className="bg-[#ff5733]">  // 임의 색상값 사용
```

---

**💡 팁**: 이 컨벤션은 팀 협업의 효율성을 위한 필수 규칙입니다. 모든 팀원이 일관되게 준수해주세요!
