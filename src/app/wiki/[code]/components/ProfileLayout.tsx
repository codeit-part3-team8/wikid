import React from 'react';
import { ProfileData } from '@/types/Wiki';
import ProfileItem from './ProfileItem';

interface ProfileItemData {
  label: string;
  key: keyof ProfileData;
  value: string;
}

interface ProfileLayoutProps {
  items: ProfileItemData[];
  isEditMode: boolean;
  canEditProfile: boolean;
  onInputChange: (key: keyof ProfileData, value: string) => void;
}

export default function ProfileLayout({
  items,
  isEditMode,
  canEditProfile,
  onInputChange,
}: ProfileLayoutProps) {
  if (isEditMode) {
    return (
      <div className="block min-[1025px]:hidden">
        {/* 태블릿: 2열 레이아웃 */}
        <div
          className="grid grid-cols-2 gap-y-4 max-[640px]:hidden min-[641px]:max-[1024px]:grid"
          style={{ columnGap: 'clamp(20px, 5vw, 40px)' }}
        >
          {items.map((item) => (
            <ProfileItem
              key={item.label}
              label={item.label}
              itemKey={item.key}
              value={item.value}
              isEditMode={isEditMode}
              canEditProfile={canEditProfile}
              onInputChange={onInputChange}
            />
          ))}
        </div>

        {/* 모바일: 1열 레이아웃 */}
        <div className="flex flex-col gap-4 max-[640px]:flex min-[641px]:hidden">
          {items.map((item) => (
            <ProfileItem
              key={item.label}
              label={item.label}
              itemKey={item.key}
              value={item.value}
              isEditMode={isEditMode}
              canEditProfile={canEditProfile}
              onInputChange={onInputChange}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 max-[640px]:gap-2 min-[1025px]:hidden">
      {items.map((item, index) => (
        <ProfileItem
          key={index}
          label={item.label}
          itemKey={item.key}
          value={item.value}
          isEditMode={isEditMode}
          canEditProfile={canEditProfile}
          onInputChange={onInputChange}
        />
      ))}
    </div>
  );
}
