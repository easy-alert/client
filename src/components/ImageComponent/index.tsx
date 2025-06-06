// COMPONENTS
import * as Style from './styles';
import { IImg } from './types';

export const ImageComponent = ({
  src,
  size = '24px',
  width,
  height,
  alt = '',
  radius = '0%',
  rotate = '0deg',
  maxHeight,
}: IImg) => (
  <Style.Img
    maxHeight={maxHeight}
    src={src}
    alt={alt}
    radius={radius}
    size={size}
    width={width}
    height={height}
    rotate={rotate}
  />
);
