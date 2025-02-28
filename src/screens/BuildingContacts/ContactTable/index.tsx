/* eslint-disable react/no-array-index-key */
// TYPES
import { ITableBody, ITableHeader } from './types';

// COMPONENTS
import * as Style from './styles';
import { theme } from '../../../styles/theme';

export const ContactTable = ({ colsHeader, children }: ITableHeader) => (
  <Style.Background>
    <Style.TableContainer>
      <Style.TableHead>
        <Style.TableRowHead>
          {colsHeader.map((col) => (
            <Style.TableColHeader
              key={col.label}
              cssProps={col.cssProps}
              cssOnMedia={col.cssOnMedia}
            >
              {col.label}
            </Style.TableColHeader>
          ))}
        </Style.TableRowHead>
      </Style.TableHead>
      <Style.TableBody>{children}</Style.TableBody>
    </Style.TableContainer>
  </Style.Background>
);

export const ContactTableContent = ({ colsBody, bgColor = theme.color.white }: ITableBody) => (
  <Style.TableRow bgColor={bgColor}>
    {colsBody.map((col, i: number) => (
      <Style.TableColBody key={col.cell + i} cssOnMedia={col.cssOnMedia} cssProps={col.cssProps}>
        {col.cell}
      </Style.TableColBody>
    ))}
  </Style.TableRow>
);
