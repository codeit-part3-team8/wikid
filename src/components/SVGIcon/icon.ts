import IC_Alarm from '@/assets/icons/alarm-icon.svg';
import IC_Arrow from '@/assets/icons/arrow-icon.svg';
import IC_Camera from '@/assets/icons/camera-icon.svg';
import IC_Check from '@/assets/icons/check-icon.svg';
import IC_Close from '@/assets/icons/close-icon.svg';
import IC_Delete from '@/assets/icons/delete-icon.svg';
import IC_Drop from '@/assets/icons/drop-icon.svg';
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
import TTIC_AddColumn from '@/assets/tiptap_icons/ic_add_column.svg';
import TTIC_AddRow from '@/assets/tiptap_icons/ic_add_row.svg';
import TTIC_ColorText from '@/assets/tiptap_icons/ic_color_text.svg';
import TTIC_Divider from '@/assets/tiptap_icons/ic_divider.svg';
import TTIC_File from '@/assets/tiptap_icons/ic_file.svg';
import TTIC_Photo from '@/assets/tiptap_icons/ic_photo.svg';
import TTIC_Table from '@/assets/tiptap_icons/ic_table.svg';
import TTIC_Video from '@/assets/tiptap_icons/ic_video.svg';
import TTIC_H1 from '@/assets/tiptap_icons/ic_h1.svg';
import TTIC_H2 from '@/assets/tiptap_icons/ic_h2.svg';
import TTIC_H3 from '@/assets/tiptap_icons/ic_h3.svg';
import TTIC_Text from '@/assets/tiptap_icons/ic_text.svg';
import TTIC_ArrowDown from '@/assets/tiptap_icons/ic_arrow_down.svg';

export const IconMap = {
  IC_Alarm,
  IC_Arrow,
  IC_Camera,
  IC_Check,
  IC_Close,
  IC_Delete,
  IC_Drop,
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
  TTIC_AddColumn,
  TTIC_AddRow,
  TTIC_ColorText,
  TTIC_Divider,
  TTIC_File,
  TTIC_Photo,
  TTIC_Table,
  TTIC_Video,
  TTIC_H1,
  TTIC_H2,
  TTIC_H3,
  TTIC_Text,
  TTIC_ArrowDown,
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
