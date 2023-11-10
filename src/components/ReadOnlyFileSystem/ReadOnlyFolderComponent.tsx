import * as Style from './styles';
import { Image } from '../Image';
import { icon } from '../../assets/icons/index';

interface IFolder {
  name: string;
  onFolderClick: () => void;
}

export const ReadOnlyFolderComponent = ({ name, onFolderClick }: IFolder) => (
  <Style.Background>
    <Style.Wrapper>
      <Style.Label onClick={onFolderClick}>
        <Image img={icon.folder} size="16px" />
        <p className="p4" title={name}>
          {name}
        </p>
      </Style.Label>
    </Style.Wrapper>
  </Style.Background>
);
