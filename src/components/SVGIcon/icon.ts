import IC_Alarm from '@/assets/icons/alarm-icon.svg';
import IC_Arrow from '@/assets/icons/arrow-icon.svg';
import IC_Camera from '@/assets/icons/camera-icon.svg';
import IC_Check from '@/assets/icons/check-icon.svg';
import IC_Close from '@/assets/icons/close-icon.svg';
import IC_Delete from '@/assets/icons/delete-icon.svg';
import IC_Edit from '@/assets/icons/edit-icon.svg';
import IC_Error from '@/assets/icons/error-icon.svg';
import IC_Expand from '@/assets/icons/expand-icon.svg';
import IC_Heart from '@/assets/icons/heart-icon.svg';
import IC_Image from '@/assets/icons/image-icon.svg';
import IC_Info from '@/assets/icons/info-icon.svg';
import IC_InvisibleEyes from '@/assets/icons/invisible-eyes.svg';
import IC_Link from '@/assets/icons/link-icon.svg';
import IC_Lock from '@/assets/icons/lock-icon.svg';
import IC_Menu from '@/assets/icons/menu-icon.svg';
import IC_Profile from '@/assets/icons/profile-icon.svg';
import IC_Search from '@/assets/icons/search-icon.svg';
import IC_VisibleEyes from '@/assets/icons/visible-eyes.svg';

export const IconMap = {
  IC_Alarm,
  IC_Arrow,
  IC_Camera,
  IC_Check,
  IC_Close,
  IC_Delete,
  IC_Edit,
  IC_Error,
  IC_Expand,
  IC_Heart,
  IC_Image,
  IC_Info,
  IC_InvisibleEyes,
  IC_Link,
  IC_Lock,
  IC_Menu,
  IC_Profile,
  IC_Search,
  IC_VisibleEyes,
} as const;

export const IconSizes = {
  sm: 20,
  md: 24,
  lg: 32,
} as const;

export type IconMapTypes = keyof typeof IconMap;
export type IconSizeTypes = keyof typeof IconSizes;
