'use client';

import { useState, useCallback, useMemo } from 'react';
import { tv } from 'tailwind-variants';
import { clsx } from 'clsx';
import Avatar from '@/components/Avatar/Avatar';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import { ProfileData, ProfileProps } from '@/types/Wiki';

const ProfileStyle = tv({
  base: 'relative w-[400px] max-[1024px]:w-full h-auto bg-white rounded-[10px] flex flex-col items-center pt-[60px] max-[1024px]:pt-5 max-[640px]:pt-[15px] px-[30px] max-[1024px]:px-[30px] max-[640px]:px-5 pb-[48px] max-[1024px]:pb-6 max-[640px]:pb-[22px]',
  variants: {
    shadow: {
      default: 'shadow-[0_4px_20px_0_rgba(0,0,0,0.08)]',
    },
  },
  defaultVariants: {
    shadow: 'default',
  },
});

const ProfileContentsStyle = tv({
  base: 'w-full text-left',
});

const ProfileItemStyle = tv({
  base: 'flex items-center gap-5',
});

const ProfileLabelStyle = tv({
  base: 'responsive-text text-md-to-xs text-grayscale-400 w-[60px] shrink-0',
});

const ProfileValueStyle = tv({
  base: 'responsive-text text-md-to-xs text-grayscale-500',
});

const ProfileInputStyle = tv({
  base: 'responsive-text text-md-to-xs text-grayscale-500 bg-grayscale-100 border border-transparent rounded-lg px-5 py-[14px] w-full focus:outline-none focus:border-primary-200',
});

const AvatarOverlayStyle = tv({
  base: 'absolute inset-0 rounded-full flex items-center justify-center cursor-pointer',
});

export default function Profile({
  imgUrl,
  name,
  data,
  className,
  isEditMode = false,
  canEditProfile = false,
  onProfileChange,
  onAvatarChange,
}: ProfileProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editData, setEditData] = useState<ProfileData>(data);

  const profileClass = ProfileStyle();
  const contentsClass = ProfileContentsStyle();
  const itemClass = ProfileItemStyle();
  const labelClass = ProfileLabelStyle();
  const valueClass = ProfileValueStyle();
  const inputClass = ProfileInputStyle();
  const overlayClass = AvatarOverlayStyle();

  const handleToggle = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const handleInputChange = useCallback(
    (key: keyof ProfileData, value: string) => {
      const newData = { ...editData, [key]: value };
      setEditData(newData);
      onProfileChange?.(newData);
    },
    [editData, onProfileChange]
  );

  const basicItems = useMemo(
    () => [
      {
        label: '거주 도시',
        key: '거주도시' as keyof ProfileData,
        value: isEditMode && canEditProfile ? editData.거주도시 : data.거주도시,
      },
      {
        label: 'MBTI',
        key: 'MBTI' as keyof ProfileData,
        value: isEditMode && canEditProfile ? editData.MBTI : data.MBTI,
      },
      {
        label: '직업',
        key: '직업' as keyof ProfileData,
        value: isEditMode && canEditProfile ? editData.직업 : data.직업,
      },
    ],
    [isEditMode, canEditProfile, editData, data]
  );

  const additionalItems = useMemo(
    () => [
      {
        label: 'SNS 계정',
        key: 'SNS계정' as keyof ProfileData,
        value: isEditMode && canEditProfile ? editData.SNS계정 : data.SNS계정,
      },
      {
        label: '생일',
        key: '생일' as keyof ProfileData,
        value: isEditMode && canEditProfile ? editData.생일 : data.생일,
      },
      {
        label: '별명',
        key: '별명' as keyof ProfileData,
        value: isEditMode && canEditProfile ? editData.별명 : data.별명,
      },
      {
        label: '혈액형',
        key: '혈액형' as keyof ProfileData,
        value: isEditMode && canEditProfile ? editData.혈액형 : data.혈액형,
      },
      {
        label: '국적',
        key: '국적' as keyof ProfileData,
        value: isEditMode && canEditProfile ? editData.국적 : data.국적,
      },
    ],
    [isEditMode, canEditProfile, editData, data]
  );

  const allItems = useMemo(
    () => [...basicItems, ...additionalItems],
    [basicItems, additionalItems]
  );

  return (
    <div
      className={clsx(profileClass, className, {
        'pb-9': isEditMode,
        'max-[1024px]:px-4 max-[1024px]:pt-5 max-[1024px]:pb-[35px]': isEditMode,
        'max-[640px]:px-[30px] max-[640px]:pt-6 max-[640px]:pb-[17px]': isEditMode,
      })}
    >
      {/* Avatar */}
      <div className="relative mb-[60px] shrink-0 max-[1024px]:mb-10 max-[640px]:mb-5">
        <div className="relative">
          <Avatar imgUrl={imgUrl} name={name} variant="profile" priority={true} />
          {isEditMode && canEditProfile && (
            <div className={overlayClass} onClick={onAvatarChange}>
              <div
                className="absolute inset-0 rounded-full transition-opacity"
                style={{ backgroundColor: 'black', opacity: 0.5 }}
              />
              <SVGIcon
                icon="IC_Camera"
                className="relative z-10 h-9 w-9 text-white max-[1024px]:h-5 max-[1024px]:w-5 max-[640px]:h-[17px] max-[640px]:w-[17px]"
              />
            </div>
          )}
        </div>
      </div>

      {/* Profile Contents */}
      <div
        className={clsx(contentsClass, {
          'max-[1024px]:ml-10 max-[640px]:ml-5': !isEditMode,
          'w-full': isEditMode,
        })}
      >
        {/* PC에서는 모든 항목 표시 */}
        <div className="flex flex-col gap-4 max-[1024px]:hidden">
          {allItems.map((item) => (
            <div key={item.label} className={itemClass}>
              <span className={labelClass}>{item.label}</span>
              {isEditMode && canEditProfile && 'key' in item ? (
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) => handleInputChange(item.key, e.target.value)}
                  className={inputClass}
                />
              ) : (
                <span className={valueClass}>{item.value}</span>
              )}
            </div>
          ))}
        </div>

        {/* 태블릿/모바일 레이아웃 */}
        {isEditMode ? (
          /* 편집 모드: 태블릿 2열, 모바일 1열 */
          <div className="hidden max-[1024px]:block">
            {/* 태블릿: 2열 레이아웃 - itemClass가 한 줄에 2개씩 */}
            <div
              className="grid grid-cols-2 gap-y-4 max-[641px]:hidden min-[641px]:max-[1024px]:grid"
              style={{ columnGap: 'clamp(20px, 5vw, 40px)' }}
            >
              {allItems.map((item) => (
                <div key={item.label} className={itemClass}>
                  <span className={labelClass}>{item.label}</span>
                  {canEditProfile && 'key' in item ? (
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => handleInputChange(item.key, e.target.value)}
                      className={inputClass}
                    />
                  ) : (
                    <span className={valueClass}>{item.value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* 모바일: 1열 레이아웃 */}
            <div className="flex flex-col gap-4 max-[640px]:flex min-[641px]:hidden">
              {allItems.map((item) => (
                <div key={item.label} className={itemClass}>
                  <span className={labelClass}>{item.label}</span>
                  {canEditProfile && 'key' in item ? (
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => handleInputChange(item.key, e.target.value)}
                      className={inputClass}
                    />
                  ) : (
                    <span className={valueClass}>{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* 일반 모드: 기존 레이아웃 */
          <div className="hidden max-[1024px]:flex max-[1024px]:flex-col max-[1024px]:gap-2 max-[640px]:gap-2">
            {/* 기본 3개 항목 */}
            {basicItems.map((item, index) => (
              <div key={index} className={itemClass}>
                <span className={labelClass}>{item.label}</span>
                <span className={valueClass}>{item.value}</span>
              </div>
            ))}

            {/* 추가 항목들 - 확장될 때만 표시 */}
            {isExpanded &&
              additionalItems.map((item, index) => (
                <div key={index} className={itemClass}>
                  <span className={labelClass}>{item.label}</span>
                  <span className={valueClass}>{item.value}</span>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* 드롭 아이콘 - 편집 모드가 아닌 경우에만 표시 */}
      {!isEditMode && (
        <button
          onClick={handleToggle}
          className="absolute bottom-px left-1/2 hidden -translate-x-1/2 transform transition-transform duration-200 max-[1024px]:block"
          style={{
            transform: `translateX(-50%) ${isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'}`,
          }}
        >
          <SVGIcon
            icon="IC_Drop"
            className="text-grayscale-400 hover:text-grayscale-500 h-6 w-6 transition-colors"
          />
        </button>
      )}
    </div>
  );
}
