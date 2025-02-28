// COMPONENTS
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getBuildingDocuments } from '@services/apis/getBuildingDocuments';
import { getBuildingFolderDetails } from '@services/apis/getBuildingFolderDetails';

import { Skeleton } from '@components/Skeleton';
import { ReadOnlyFolderComponent, ReadOnlyFileComponent } from '@components/ReadOnlyFileSystem';

// STYLES
import * as Style from './styles';

// TYPES
import type { Folder, Folders } from './types';

export const Annexes = () => {
  const { buildingId } = useParams() as { buildingId: string };

  const [buildingName, setBuildingName] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const [informations, setInformations] = useState<Folders>();

  const [folderId, setFolderId] = useState<string | null>(null);
  const [rootFolder, setRootFolder] = useState<Folder>({ id: '', name: '' });
  const [breadcrumb, setBreadcrumb] = useState<Folder[]>([{ id: '', name: 'Início' }]);

  // #region api calls
  const handleGetBuildingDocuments = async () => {
    setLoading(true);

    try {
      const responseData = await getBuildingDocuments({ buildingNanoId: buildingId });

      setBuildingName(responseData.name);
      setInformations(responseData.Folders);
      setRootFolder(responseData.Folders);
    } finally {
      setLoading(false);
    }
  };

  const handleGetFolderDetails = async () => {
    if (!folderId) return;

    const responseData = await getBuildingFolderDetails({ folderId, rootFolder });

    if (!responseData) return;

    setInformations(responseData?.informations);
    setBreadcrumb(responseData?.breadcrumb);
  };
  // #endregion

  useEffect(() => {
    handleGetBuildingDocuments();
  }, []);

  useEffect(() => {
    handleGetFolderDetails();
  }, [folderId]);

  return (
    <Style.Container>
      {loading ? <Skeleton height="24px" width="248px" /> : <h2>{buildingName}</h2>}
      <Style.Card>
        <Style.Header>
          <h4>Documentos</h4>

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
