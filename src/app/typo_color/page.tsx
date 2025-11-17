'use client';

import React, { useState } from 'react';

// 타이포그래피 데이터
const typographyData = [
  {
    name: 'text-5xl',
    size: '48px',
    lineHeight: '46px',
    weight: 'Semibold (600)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-4xl',
    size: '40px',
    lineHeight: '42px',
    weight: 'Bold (700)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-3xl',
    size: '32px',
    lineHeight: '38px',
    weight: 'Bold (700)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-3xl-semibold',
    size: '32px',
    lineHeight: '42px',
    weight: 'Semibold (600)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-2xl',
    size: '24px',
    lineHeight: '32px',
    weight: 'Bold (700)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-2xl-semibold',
    size: '24px',
    lineHeight: '32px',
    weight: 'Semibold (600)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-2xl-medium',
    size: '24px',
    lineHeight: '32px',
    weight: 'Medium (500)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-2xl-regular',
    size: '24px',
    lineHeight: '32px',
    weight: 'Regular (400)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-xl',
    size: '20px',
    lineHeight: '32px',
    weight: 'Bold (700)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-xl-semibold',
    size: '20px',
    lineHeight: '32px',
    weight: 'Semibold (600)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-xl-medium',
    size: '20px',
    lineHeight: '32px',
    weight: 'Medium (500)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-xl-regular',
    size: '20px',
    lineHeight: '32px',
    weight: 'Regular (400)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-2lg',
    size: '18px',
    lineHeight: '26px',
    weight: 'Bold (700)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-2lg-semibold',
    size: '18px',
    lineHeight: '26px',
    weight: 'Semibold (600)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-2lg-medium',
    size: '18px',
    lineHeight: '26px',
    weight: 'Medium (500)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-2lg-regular',
    size: '18px',
    lineHeight: '26px',
    weight: 'Regular (400)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-lg',
    size: '16px',
    lineHeight: '26px',
    weight: 'Bold (700)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-lg-semibold',
    size: '16px',
    lineHeight: '26px',
    weight: 'Semibold (600)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-lg-medium',
    size: '16px',
    lineHeight: '26px',
    weight: 'Medium (500)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-lg-regular',
    size: '16px',
    lineHeight: '26px',
    weight: 'Regular (400)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-md',
    size: '14px',
    lineHeight: '24px',
    weight: 'Bold (700)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-md-semibold',
    size: '14px',
    lineHeight: '24px',
    weight: 'Semibold (600)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-md-medium',
    size: '14px',
    lineHeight: '24px',
    weight: 'Medium (500)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-md-regular',
    size: '14px',
    lineHeight: '24px',
    weight: 'Regular (400)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-sm',
    size: '13px',
    lineHeight: '22px',
    weight: 'Semibold (600)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-sm-medium',
    size: '13px',
    lineHeight: '22px',
    weight: 'Medium (500)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-xs',
    size: '12px',
    lineHeight: '20px',
    weight: 'Semibold (600)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-xs-medium',
    size: '12px',
    lineHeight: '18px',
    weight: 'Medium (500)',
    sample: '가나다라마바사아자차카타파하',
  },
  {
    name: 'text-xs-regular',
    size: '12px',
    lineHeight: '18px',
    weight: 'Regular (400)',
    sample: '가나다라마바사아자차카타파하',
  },
];

// 컬러 데이터
const colorData = [
  {
    category: 'Grayscale',
    colors: [
      {
        name: 'grayscale-50',
        variable: 'var(--grayscale-50)',
        tailwind: 'bg-grayscale-50',
        hex: '#FFFFFF',
        rgb: 'rgb(255, 255, 255)',
      },
      {
        name: 'grayscale-100',
        variable: 'var(--grayscale-100)',
        tailwind: 'bg-grayscale-100',
        hex: '#F7F7FA',
        rgb: 'rgb(247, 247, 250)',
      },
      {
        name: 'grayscale-200',
        variable: 'var(--grayscale-200)',
        tailwind: 'bg-grayscale-200',
        hex: '#E4E5F0',
        rgb: 'rgb(228, 229, 240)',
      },
      {
        name: 'grayscale-300',
        variable: 'var(--grayscale-300)',
        tailwind: 'bg-grayscale-300',
        hex: '#C6CADA',
        rgb: 'rgb(198, 202, 218)',
      },
      {
        name: 'grayscale-400',
        variable: 'var(--grayscale-400)',
        tailwind: 'bg-grayscale-400',
        hex: '#8F9BB2',
        rgb: 'rgb(143, 155, 178)',
      },
      {
        name: 'grayscale-500',
        variable: 'var(--grayscale-500)',
        tailwind: 'bg-grayscale-500',
        hex: '#474D66',
        rgb: 'rgb(71, 77, 102)',
      },
      {
        name: 'grayscale-600',
        variable: 'var(--grayscale-600)',
        tailwind: 'bg-grayscale-600',
        hex: '#3B4108',
        rgb: 'rgb(59, 65, 8)',
      },
    ],
  },
  {
    category: 'Primary Green',
    colors: [
      {
        name: 'primary-100',
        variable: 'var(--primary-100)',
        tailwind: 'bg-primary-100',
        hex: '#EEF9F6',
        rgb: 'rgb(238, 249, 246)',
      },
      {
        name: 'primary-200',
        variable: 'var(--primary-200)',
        tailwind: 'bg-primary-200',
        hex: '#4CBFA4',
        rgb: 'rgb(76, 191, 164)',
      },
      {
        name: 'primary-300',
        variable: 'var(--primary-300)',
        tailwind: 'bg-primary-300',
        hex: '#32A68A',
        rgb: 'rgb(50, 166, 138)',
      },
    ],
  },
  {
    category: 'Secondary Colors',
    colors: [
      {
        name: 'secondary-red-100',
        variable: 'var(--secondary-red-100)',
        tailwind: 'bg-secondary-red-100',
        hex: '#FBEDED',
        rgb: 'rgb(251, 237, 237)',
      },
      {
        name: 'secondary-red-200',
        variable: 'var(--secondary-red-200)',
        tailwind: 'bg-secondary-red-200',
        hex: '#D14343',
        rgb: 'rgb(209, 67, 67)',
      },
      {
        name: 'secondary-purple-100',
        variable: 'var(--secondary-purple-100)',
        tailwind: 'bg-secondary-purple-100',
        hex: '#131314',
        rgb: 'rgb(19, 19, 20)',
      },
      {
        name: 'secondary-yellow-100',
        variable: 'var(--secondary-yellow-100)',
        tailwind: 'bg-secondary-yellow-100',
        hex: '#FFD061',
        rgb: 'rgb(255, 208, 97)',
      },
    ],
  },
];

export default function TypoColorPage() {
  const [copiedItem, setCopiedItem] = useState<string>('');
  const [copyType, setCopyType] = useState<'css' | 'tailwind'>('tailwind');

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(itemId);
      setTimeout(() => setCopiedItem(''), 2000);
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
    }
  };

  const getTextColor = (bgHex: string) => {
    // 배경색이 밝으면 어두운 텍스트, 어두우면 밝은 텍스트
    const r = parseInt(bgHex.slice(1, 3), 16);
    const g = parseInt(bgHex.slice(3, 5), 16);
    const b = parseInt(bgHex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
  };

  return (
    <div
      style={{ backgroundColor: 'var(--grayscale-50)', minHeight: '100vh', padding: '40px 20px' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* 헤더 */}
        <header style={{ marginBottom: '60px', textAlign: 'center' }}>
          <h1 className="text-5xl" style={{ color: 'var(--primary-200)', marginBottom: '16px' }}>
            WIKID Design System
          </h1>
          <p className="text-lg-regular" style={{ color: 'var(--grayscale-500)' }}>
            타이포그래피와 컬러 시스템을 확인하고 클래스명을 복사하세요
          </p>
        </header>

        {/* 타이포그래피 섹션 */}
        <section style={{ marginBottom: '80px' }}>
          <h2 className="text-4xl" style={{ color: 'var(--grayscale-600)', marginBottom: '32px' }}>
            Typography Spec
          </h2>

          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '32px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '1px solid var(--grayscale-200)',
            }}
          >
            {typographyData.map((typo) => (
              <div
                key={typo.name}
                onClick={() => copyToClipboard(typo.name, `typo-${typo.name}`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '20px',
                  marginBottom: '16px',
                  backgroundColor:
                    copiedItem === `typo-${typo.name}`
                      ? 'var(--primary-100)'
                      : 'var(--grayscale-50)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: '1px solid var(--grayscale-200)',
                }}
                onMouseEnter={(e) => {
                  if (copiedItem !== `typo-${typo.name}`) {
                    e.currentTarget.style.backgroundColor = 'var(--grayscale-100)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (copiedItem !== `typo-${typo.name}`) {
                    e.currentTarget.style.backgroundColor = 'var(--grayscale-50)';
                  }
                }}
              >
                {/* 스펙 정보 */}
                <div style={{ width: '300px', flexShrink: 0 }}>
                  <div
                    className="text-md"
                    style={{ color: 'var(--grayscale-600)', marginBottom: '4px' }}
                  >
                    {typo.name}
                  </div>
                  <div className="text-sm-medium" style={{ color: 'var(--grayscale-400)' }}>
                    {typo.size} / {typo.lineHeight} • {typo.weight}
                  </div>
                </div>

                {/* 샘플 텍스트 */}
                <div style={{ flex: 1, paddingLeft: '20px' }}>
                  <div className={typo.name} style={{ color: 'var(--grayscale-600)' }}>
                    {typo.sample}
                  </div>
                </div>

                {/* 복사 표시 */}
                {copiedItem === `typo-${typo.name}` && (
                  <div
                    className="text-sm"
                    style={{
                      color: 'var(--primary-200)',
                      marginLeft: '16px',
                      fontWeight: '600',
                    }}
                  >
                    복사됨 ✓
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 컬러 섹션 */}
        <section>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '32px',
            }}
          >
            <h2 className="text-4xl" style={{ color: 'var(--grayscale-600)' }}>
              Color System
            </h2>

            {/* 복사 타입 토글 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="text-md-medium" style={{ color: 'var(--grayscale-500)' }}>
                복사 형식:
              </span>
              <div
                style={{
                  display: 'flex',
                  backgroundColor: 'var(--grayscale-100)',
                  borderRadius: '8px',
                  padding: '4px',
                  border: '1px solid var(--grayscale-200)',
                }}
              >
                <button
                  onClick={() => setCopyType('tailwind')}
                  className="text-sm"
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: copyType === 'tailwind' ? 'var(--primary-200)' : 'transparent',
                    color: copyType === 'tailwind' ? 'white' : 'var(--grayscale-600)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontWeight: copyType === 'tailwind' ? '600' : '500',
                  }}
                >
                  Tailwind
                </button>
                <button
                  onClick={() => setCopyType('css')}
                  className="text-sm"
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: copyType === 'css' ? 'var(--primary-200)' : 'transparent',
                    color: copyType === 'css' ? 'white' : 'var(--grayscale-600)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontWeight: copyType === 'css' ? '600' : '500',
                  }}
                >
                  CSS 변수
                </button>
              </div>
            </div>
          </div>

          {colorData.map((category) => (
            <div key={category.category} style={{ marginBottom: '48px' }}>
              <h3
                className="text-2xl"
                style={{ color: 'var(--grayscale-600)', marginBottom: '20px' }}
              >
                {category.category}
              </h3>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '16px',
                }}
              >
                {category.colors.map((color) => (
                  <div
                    key={color.name}
                    onClick={() =>
                      copyToClipboard(
                        copyType === 'tailwind' ? color.tailwind : color.variable,
                        `color-${color.name}`
                      )
                    }
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                      border:
                        copiedItem === `color-${color.name}`
                          ? '2px solid var(--primary-200)'
                          : '1px solid var(--grayscale-200)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      transform: copiedItem === `color-${color.name}` ? 'scale(1.02)' : 'scale(1)',
                    }}
                  >
                    {/* 컬러 스와치 */}
                    <div
                      style={{
                        height: '120px',
                        backgroundColor: color.hex,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                      }}
                    >
                      {copiedItem === `color-${color.name}` && (
                        <div
                          className="text-lg"
                          style={{
                            color: getTextColor(color.hex),
                            fontWeight: '600',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            padding: '8px 16px',
                            borderRadius: '20px',
                          }}
                        >
                          복사됨 ✓
                        </div>
                      )}
                    </div>

                    {/* 컬러 정보 */}
                    <div style={{ padding: '20px' }}>
                      <div
                        className="text-md"
                        style={{ color: 'var(--grayscale-600)', marginBottom: '8px' }}
                      >
                        {color.name}
                      </div>
                      <div
                        className="text-sm"
                        style={{
                          color: 'var(--primary-200)',
                          marginBottom: '8px',
                          fontWeight: '600',
                        }}
                      >
                        {copyType === 'tailwind'
                          ? `클릭 → ${color.tailwind}`
                          : `클릭 → ${color.variable}`}
                      </div>
                      <div
                        className="text-sm-medium"
                        style={{ color: 'var(--grayscale-400)', marginBottom: '4px' }}
                      >
                        {color.variable}
                      </div>
                      <div
                        className="text-sm-medium"
                        style={{ color: 'var(--grayscale-400)', marginBottom: '4px' }}
                      >
                        {color.hex}
                      </div>
                      <div className="text-sm-medium" style={{ color: 'var(--grayscale-400)' }}>
                        {color.rgb}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* 사용법 안내 */}
        <section
          style={{
            marginTop: '80px',
            padding: '40px',
            backgroundColor: 'var(--primary-100)',
            borderRadius: '12px',
            border: '1px solid var(--primary-200)',
          }}
        >
          <h3 className="text-2xl" style={{ color: 'var(--primary-300)', marginBottom: '16px' }}>
            💡 사용법
          </h3>
          <div
            className="text-lg-regular"
            style={{ color: 'var(--grayscale-600)', lineHeight: '1.6' }}
          >
            • <strong>타이포그래피:</strong> 원하는 텍스트 스타일을 클릭하면 클래스명이 복사됩니다
            <br />• <strong>컬러:</strong> 토글 버튼으로 복사 형식을 선택하고 컬러 카드를 클릭하세요
            <br />• <strong>Tailwind 방식:</strong> <code>className="bg-primary-200"</code> 형태로
            복사됩니다
            <br />• <strong>CSS 변수 방식:</strong>{' '}
            <code>style=&#123;&#123;backgroundColor: 'var(--primary-200)'&#125;&#125;</code> 형태로
            복사됩니다
          </div>
        </section>
      </div>
    </div>
  );
}
