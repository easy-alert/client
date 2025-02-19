// GLOBAL ASSETS
import { icon } from '@assets/icons';

// GLOBAL UTILS
import { query } from '@utils/functions';

// UI
import * as Style from './styles';

// TYPES
import { IModal } from './utils/types';
import { theme } from '../../styles/theme';
import { IconButton } from '../Buttons/IconButton';

export const Modal = ({
  id = 'background',
  children,
  title,
  bodyWidth,
  closeOutside = true,
  deleteButton = false,
  setModal,
  handleDelete,
}: IModal) => (
  <Style.Background
    id={id}
    onMouseDown={(evt: any) => {
      if (evt.target.id === id && !query.get('flow') && closeOutside) setModal(false);
    }}
  >
    <Style.Body bodyWidth={bodyWidth}>
      <Style.Header>
        <h2>{title}</h2>

        <Style.IconsContainer>
          {deleteButton && (
            <IconButton
              icon={icon.grayTrash}
              color={theme.color.primary}
              onClick={() => handleDelete && handleDelete(true)}
            />
          )}

          <IconButton icon={icon.x} color={theme.color.primary} onClick={() => setModal(false)} />
        </Style.IconsContainer>
      </Style.Header>
      {children}
    </Style.Body>
  </Style.Background>
);
