// LIBS
import { useDropzone } from 'react-dropzone';

// COMPONENTS
import { useEffect, useState } from 'react';
import { IImage, IModalAddBanners } from './types';
import { Image } from '../../../components/Image';

// STYLES
import * as Style from './styles';

// FUNCTIONS
import { requestRegisterBuildingBanners } from './functions';
import { icon } from '../../../assets/icons';
import { Button } from '../../../components/Buttons/Button';
import { ImagePreview } from '../../../components/ImagePreview';
import { Input } from '../../../components/Inputs/Input';
import { DotLoading } from '../../../components/Loadings/DotLoading';
import { Modal } from '../../../components/Modal';
import { uploadFile } from '../../../utils/functions';

export const ModalManageBanners = ({
  setModal,
  buildingId,
  currentBanners,
  requestBuildingDetailsCall,
}: IModalAddBanners) => {
  // REFATORAR ISSO PRA TRABALHAR COM MAIS BANNERS
  const [bannerName, setBannerName] = useState<string>('');
  const [bannerLink, setBannerLink] = useState<string>('');

  const [onQuery, setOnQuery] = useState<boolean>(false);

  const [onWebQuery, setWebOnQuery] = useState<boolean>(false);

  const [onMobileQuery, setMobileOnQuery] = useState<boolean>(false);

  const [webBanner, setWebBanner] = useState<IImage[]>([]);
  const {
    acceptedFiles: acceptedWeb,
    getRootProps: getRootPropsWeb,
    getInputProps: getInputPropsWeb,
  } = useDropzone({
    multiple: false,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
    },
    disabled: onWebQuery,
  });

  const [mobileBanner, setMobileBanner] = useState<IImage[]>([]);
  const {
    acceptedFiles: acceptedMobile,
    getRootProps: getRootPropsMobile,
    getInputProps: getInputPropsMobile,
  } = useDropzone({
    multiple: false,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
    },
    disabled: onMobileQuery,
  });

  useEffect(() => {
    if (acceptedWeb.length > 0) {
      const uploadAcceptedWeb = async () => {
        setWebOnQuery(true);

        const { Location: fileUrl, originalname: originalName } = await uploadFile(acceptedWeb[0]);

        setWebBanner((prevState) => {
          let newState = [...prevState];
          newState = [{ name: originalName, url: fileUrl }];
          return newState;
        });
        setWebOnQuery(false);
      };

      uploadAcceptedWeb();
    }
  }, [acceptedWeb]);

  useEffect(() => {
    if (acceptedMobile.length > 0) {
      const uploadAcceptedMobile = async () => {
        setMobileOnQuery(true);

        const { Location: fileUrl, originalname: originalName } = await uploadFile(
          acceptedMobile[0],
        );

        setMobileBanner((prevState) => {
          let newState = [...prevState];
          newState = [{ name: originalName, url: fileUrl }];
          return newState;
        });
        setMobileOnQuery(false);
      };

      uploadAcceptedMobile();
    }
  }, [acceptedMobile]);

  useEffect(() => {
    if (currentBanners.length > 0) {
      setBannerName(currentBanners[0].bannerName);
      setBannerLink(
        // eslint-disable-next-line no-nested-ternary
        currentBanners[0].redirectUrl
          ? currentBanners[0].redirectUrl.startsWith('//')
            ? currentBanners[0].redirectUrl.slice(2)
            : currentBanners[0].redirectUrl
          : '',
      );
      currentBanners.forEach((banner) => {
        if (banner.type === 'Web') {
          setWebBanner([{ name: banner.originalName, url: banner.url }]);
        }

        if (banner.type === 'Mobile') {
          setMobileBanner([{ name: banner.originalName, url: banner.url }]);
        }
      });
    }
  }, []);
  // REFATORAR ISSO PRA TRABALHAR COM MAIS BANNERS

  return (
    <Modal title="Gerenciar banners" setModal={setModal}>
      <Style.Container>
        <Input
          label="Nome do banner *"
          maxLength={100}
          value={bannerName}
          placeholder="Ex: Foto do Edifício"
          onChange={(e) => {
            setBannerName(e.target.value);
          }}
        />
        <Input
          label="Link do banner"
          maxLength={600}
          value={bannerLink ?? ''}
          placeholder="Ex: www.easyalert.com.br"
          onChange={(e) => {
            setBannerLink(e.target.value);
          }}
        />

        <Style.DragAndDropGrid>
          <Style.DragAndDropWrapper>
            <h6>Banner web</h6>
            {webBanner.length === 0 &&
              (onWebQuery ? (
                <Style.ImageLoading>
                  <DotLoading />
                </Style.ImageLoading>
              ) : (
                <Style.DragAndDropZone {...getRootPropsWeb({ className: 'dropzone' })}>
                  <input {...getInputPropsWeb()} />

                  <Style.Content>
                    <Image img={icon.addImage} width="48px" height="46px" radius="0" />
                  </Style.Content>
                </Style.DragAndDropZone>
              ))}
            {webBanner.length > 0 && (
              <Style.ImagePreviewWrapper>
                <ImagePreview
                  src={webBanner[0].url}
                  imageCustomName={webBanner[0].name}
                  height="202px"
                  width="100%"
                  onTrashClick={() => {
                    setWebBanner([]);
                  }}
                />
              </Style.ImagePreviewWrapper>
            )}
          </Style.DragAndDropWrapper>

          <Style.DragAndDropWrapper>
            <h6>Banner mobile</h6>
            {mobileBanner.length === 0 &&
              (onMobileQuery ? (
                <Style.ImageLoading>
                  <DotLoading />
                </Style.ImageLoading>
              ) : (
                <Style.DragAndDropZone {...getRootPropsMobile({ className: 'dropzone' })}>
                  <input {...getInputPropsMobile()} />

                  <Style.Content>
                    <Image img={icon.addImage} width="48px" height="46px" radius="0" />
                  </Style.Content>
                </Style.DragAndDropZone>
              ))}
            {mobileBanner.length > 0 && (
              <Style.ImagePreviewWrapper>
                <ImagePreview
                  src={mobileBanner[0].url}
                  imageCustomName={mobileBanner[0].name}
                  height="202px"
                  width="100%"
                  onTrashClick={() => {
                    setMobileBanner([]);
                  }}
                />
              </Style.ImagePreviewWrapper>
            )}
          </Style.DragAndDropWrapper>
        </Style.DragAndDropGrid>

        <p className="p3" style={{ opacity: 0.7 }}>
          Resolução recomendada: 1300 x 300 pixels
        </p>

        <Button
          center
          loading={onQuery}
          disable={onMobileQuery || onWebQuery}
          label="Salvar"
          onClick={() => {
            requestRegisterBuildingBanners({
              setOnQuery,
              buildingId,
              setModal,
              bannerLink,
              bannerName,
              mobileBanner,
              webBanner,
              requestBuildingDetailsCall,
            });
          }}
        />
      </Style.Container>
    </Modal>
  );
};
