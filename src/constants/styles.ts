// 브레이크포인트 상수
export const BREAKPOINTS = {
  MOBILE_MAX: 640,
  TABLET_MIN: 641,
  TABLET_MAX: 1024,
  PC_MIN: 1025,
} as const;

// 스타일 값 상수
export const SPACING = {
  PROFILE: {
    PC: {
      PADDING_TOP: 60,
      PADDING_X: 30,
      PADDING_BOTTOM: 48,
      MARGIN_BOTTOM: 60,
    },
    TABLET: {
      PADDING_TOP: 5,
      PADDING_X: 30,
      PADDING_BOTTOM: 6,
      MARGIN_BOTTOM: 10,
    },
    MOBILE: {
      PADDING_TOP: 15,
      PADDING_X: 5,
      PADDING_BOTTOM: 22,
      MARGIN_BOTTOM: 5,
    },
  },
  EDIT_MODE: {
    TABLET: {
      PADDING_TOP: 5,
      PADDING_X: 4,
      PADDING_BOTTOM: 35,
    },
    MOBILE: {
      PADDING_TOP: 6,
      PADDING_X: 30,
      PADDING_BOTTOM: 17,
    },
  },
} as const;

export const LAYOUT = {
  PROFILE_WIDTH: 400,
  MAX_CONTENT_WIDTH: 1520,
  GAP: {
    PC: 20,
    TABLET: 60,
    MOBILE: 10,
  },
} as const;

export const SHADOW = {
  DEFAULT: '0_4px_20px_0_rgba(0,0,0,0.08)',
} as const;
