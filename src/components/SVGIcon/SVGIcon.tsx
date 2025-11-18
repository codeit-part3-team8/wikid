import React from 'react';

import { IconMap, IconMapTypes, IconSizeTypes, IconSizes } from './icon';

export interface SVGIconProps
  extends Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height' | 'viewBox'> {
  icon: IconMapTypes;
  size?: IconSizeTypes;
}

const SVGIcon: React.FC<SVGIconProps> = ({ icon, size = 'md', ...props }) => {
  const Icon = IconMap[icon];

  if (!Icon) return null;

  return <Icon {...props} width={IconSizes[size]} height={IconSizes[size]} />;
};

export default SVGIcon;
