// COMPONENTS
import * as Style from './styles';

// FUNCTIONS
import { getStatusName } from './functions';

// TYPES
import type { IEventTag } from './types';

export const EventTag = ({ status, color, bgColor, label }: IEventTag) => {
  if (!status && !label) {
    return null;
  }

  const eventTagName = getStatusName(label || status || '');

  return (
    <Style.TagContainer label={label} status={status} color={color} bgColor={bgColor}>
      <p className="p7">{eventTagName}</p>
    </Style.TagContainer>
  );
};
