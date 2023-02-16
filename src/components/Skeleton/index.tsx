// COMPONENTS
import * as Style from './styles';

// TYPES
import { ISkeleton } from './types';

export const Skeleton = ({ isInvalid }: ISkeleton) => <Style.Container isInvalid={isInvalid} />;
