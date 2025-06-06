import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

import { Button } from '@components/Buttons/Button';

import { DotSpinLoading } from '@components/Loadings/DotSpinLoading';
import * as Style from './styles';

interface ISignaturePad {
  onSave: (signature: string) => void;
  loading?: boolean;
}

const SignaturePad = ({ onSave, loading }: ISignaturePad) => {
  const [isEmpty, setIsEmpty] = useState(true);

  const sigCanvas = useRef<SignatureCanvas | null>(null);

  const clearPad = () => {
    sigCanvas.current?.clear();
    setIsEmpty(true);
  };

  const save = () => {
    if (sigCanvas.current?.isEmpty()) return;

    const signature = sigCanvas.current?.getTrimmedCanvas().toDataURL('image/png'); // Salva como imagem PNG

    onSave(signature!);
  };

  return (
    <Style.SignaturePadContainer>
      {loading ? (
        <DotSpinLoading />
      ) : (
        <>
          <SignatureCanvas ref={sigCanvas} penColor="black" onEnd={() => setIsEmpty(false)} />
          <Style.ButtonsContainer>
            <Button label="Assinar" bgColor="transparent" textColor="finished" onClick={save} />

            <Button
              label="Limpar"
              bgColor="transparent"
              textColor="black"
              disabled={isEmpty}
              onClick={clearPad}
            />
          </Style.ButtonsContainer>
        </>
      )}
    </Style.SignaturePadContainer>
  );
};

export default SignaturePad;
