import { useEffect, useRef, useState } from 'react';
import * as Style from './styles';
import { icon } from '../../assets/icons/index';
import { Image } from '../Image';
import { detectFileExtension } from '../../utils/functions';

interface IFile {
  name: string;
  url: string;
}

export const FileComponent = ({ name, url }: IFile) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClick = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const imageExtensions = ['png', 'jpg', 'svg', 'jpeg'];

  const handleFileIcon = () => {
    const fileExtension = url && detectFileExtension(url);

    if (fileExtension && imageExtensions.includes(fileExtension)) {
      return icon.placeholder;
    }

    return icon.grayPaper;
  };

  return (
    <Style.Background ref={dropdownRef}>
      <Style.Wrapper>
        <Style.Download href={url} download target="_blank" rel="noreferrer">
          <Image img={handleFileIcon()} size="16px" />
          <p className="p4" title={name}>
            {name}
          </p>
        </Style.Download>

        <button type="button" onClick={toggleDropdown}>
          <Image img={icon.dots} size="16px" />
        </button>
      </Style.Wrapper>
      {dropdownOpen && (
        <Style.Dropdown>
          <a href={url} download target="_blank" rel="noreferrer">
            <Image img={icon.grayDownload} size="16px" />
            <p className="p2">Download</p>
          </a>
        </Style.Dropdown>
      )}
    </Style.Background>
  );
};
