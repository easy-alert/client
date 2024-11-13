// COMPONENTS
import * as Style from './styles';

// TYPES
import { IEventTag } from './types';

// FUNCTIONS
import { getStatusName } from './functions';

export const EventTag = ({ status, color, bgColor, label }: IEventTag) => {
  const eventTagName = getStatusName(label || status || '');

  return (
    <Style.TagContainer label={label} status={status} color={color} bgColor={bgColor}>
      <p className="p7">{eventTagName}</p>
    </Style.TagContainer>
  );
};
