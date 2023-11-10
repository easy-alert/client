// COMPONENTS
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '../../components/Skeleton';

// STYLES
import * as Style from './styles';

// FUNCTIONS
import { requestAnnexInformations, requestFolderDetails } from './functions';
import { Folder, Folders } from './types';
import {
  ReadOnlyFolderComponent,
  ReadOnlyFileComponent,
} from '../../components/ReadOnlyFileSystem';

// TYPES

export const Annexes = () => {
  const { buildingNanoId } = useParams() as { buildingNanoId: string };

  const [buildingName, setBuildingName] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const [informations, setInformations] = useState<Folders>();

  const [folderId, setFolderId] = useState<string | null>(null);
  const [rootFolder, setRootFolder] = useState<Folder>({ id: '', name: '' });
  const [breadcrumb, setBreadcrumb] = useState<Folder[]>([{ id: '', name: 'Início' }]);

  useEffect(() => {
    if (folderId) {
      requestFolderDetails({
        folderId,
        setInformations,
        setBreadcrumb,
        rootFolder,
      });
    }
  }, [folderId]);

  useEffect(() => {
    requestAnnexInformations({
      buildingNanoId,
      setLoading,
      setInformations,
      setBuildingName,
      setRootFolder,
    });
  }, []);

  return (
    <Style.Container>
      {loading ? <Skeleton height="24px" width="248px" /> : <h2>{buildingName}</h2>}
      <Style.Card>
        <Style.Header>
          <h4>Anexos</h4>
          <Style.BreadcrumbWrapper>
            {breadcrumb.map((element, i) => (
              <React.Fragment key={element.id}>
                <button
                  type="button"
                  onClick={() => {
                    setFolderId(element.id);
                  }}
                >
                  {element.name}
                </button>

                {i === 0 && breadcrumb.length > 1 && <p className="p3">/</p>}

                {i > 0 && breadcrumb.length > 1 && i + 1 !== breadcrumb.length && (
                  <p className="p3">{'>'}</p>
                )}
              </React.Fragment>
            ))}
          </Style.BreadcrumbWrapper>
        </Style.Header>

        {loading && (
          <Style.CardRow>
            <Skeleton height="32px" />
            <Skeleton height="32px" />
            <Skeleton height="32px" />
            <Skeleton height="32px" />
            <Skeleton height="32px" />
            <Skeleton height="32px" />
            <Skeleton height="32px" />
            <Skeleton height="32px" />
            <Skeleton height="32px" />
          </Style.CardRow>
        )}

        {!loading &&
          informations &&
          (informations?.Files?.length > 0 || informations?.Folders?.length > 0) && (
            <Style.TagWrapper>
              {informations?.Folders?.map((element) => (
                <ReadOnlyFolderComponent
                  key={element.id}
                  name={element.name}
                  onFolderClick={() => {
                    setFolderId(element.id);
                  }}
                />
              ))}
              {informations?.Files?.map((element) => (
                <ReadOnlyFileComponent key={element.id} name={element.name} url={element.url} />
              ))}
            </Style.TagWrapper>
          )}

        {!loading && informations?.Files?.length === 0 && informations?.Folders?.length === 0 && (
          <Style.NoAnnexes className="bottom">
            <h5>Nenhum anexo cadastrado.</h5>
          </Style.NoAnnexes>
        )}
      </Style.Card>
    </Style.Container>
  );
};
