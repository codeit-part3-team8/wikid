module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 커밋 유형 (영어 소문자)
    'type-enum': [
      2,
      'always',
      [
        'feat', // 새로운 기능 추가
        'fix', // 버그 수정
        'docs', // 문서 변경
        'style', // 코드 포맷팅
        'refactor', // 리팩토링
        'test', // 테스트 코드
        'chore', // 빌드, 패키지 매니저 설정 등
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],

    // 커밋 제목 (한글 허용)
    'subject-empty': [2, 'never'],
    'subject-max-length': [2, 'always', 50], // 50자 이내
    'subject-min-length': [2, 'always', 5],
    'subject-full-stop': [2, 'never', '.'], // 마침표 금지
    'subject-case': [0], // 대소문자 규칙 비활성화 (한글 허용)

    // 전체 헤더 길이
    'header-max-length': [2, 'always', 72],

    // 본문과 제목 사이 빈 줄
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
  },
};
