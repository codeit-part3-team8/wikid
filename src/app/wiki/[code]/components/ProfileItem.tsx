import React from 'react';
import { tv } from 'tailwind-variants';
import { ProfileData } from '@/types/Wiki';

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

interface ProfileItemProps {
  label: string;
  itemKey: keyof ProfileData;
  value: string;
  isEditMode: boolean;
  canEditProfile: boolean;
  onInputChange: (key: keyof ProfileData, value: string) => void;
  className?: string;
}

export default function ProfileItem({
  label,
  itemKey,
  value,
  isEditMode,
  canEditProfile,
  onInputChange,
  className,
}: ProfileItemProps) {
  const itemClass = ProfileItemStyle();
  const labelClass = ProfileLabelStyle();
  const valueClass = ProfileValueStyle();
  const inputClass = ProfileInputStyle();

  return (
    <div className={`${itemClass} ${className || ''}`}>
      <span className={labelClass}>{label}</span>
      {isEditMode && canEditProfile ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onInputChange(itemKey, e.target.value)}
          className={inputClass}
        />
      ) : (
        <span className={valueClass}>{value}</span>
      )}
    </div>
  );
}
