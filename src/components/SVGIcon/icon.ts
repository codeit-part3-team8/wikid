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
import IC_HeartFilled from '@/assets/icons/ic_heart_filled.svg';
import TTIC_AlignmentCenter from '@/assets/tiptap_icons/ic_Alignment_center.svg';
import TTIC_AlignmentLeft from '@/assets/tiptap_icons/ic_Alignment_left.svg';
import TTIC_AlignmentRight from '@/assets/tiptap_icons/ic_Alignment_right.svg';
import TTIC_Bold from '@/assets/tiptap_icons/ic_bold.svg';
import TTIC_Bullet from '@/assets/tiptap_icons/ic_Bullet.svg';
import TTIC_Coloring from '@/assets/tiptap_icons/ic_coloring.svg';
import TTIC_Image from '@/assets/tiptap_icons/ic_image.svg';
import TTIC_Italic from '@/assets/tiptap_icons/ic_italic.svg';
import TTIC_Movie from '@/assets/tiptap_icons/ic_movie.svg';
import TTIC_Numbering from '@/assets/tiptap_icons/ic_numbering.svg';
import TTIC_Underline from '@/assets/tiptap_icons/ic_underline.svg';

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
  IC_HeartFilled,
  TTIC_AlignmentCenter,
  TTIC_AlignmentLeft,
  TTIC_AlignmentRight,
  TTIC_Bold,
  TTIC_Bullet,
  TTIC_Coloring,
  TTIC_Image,
  TTIC_Italic,
  TTIC_Movie,
  TTIC_Numbering,
  TTIC_Underline,
} as const;

export const IconSizes = {
  xxs: 16,
  xs: 18,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
  xxl: 48,
} as const;

export type IconMapTypes = keyof typeof IconMap;
export type IconSizeTypes = keyof typeof IconSizes;
