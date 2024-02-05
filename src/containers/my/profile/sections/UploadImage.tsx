import {useRef, useCallback} from 'react';
import CircleImage from '../components/CircleImage/CircleImage';

interface Props {
  acceptType?: string;
  onUploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function UploadImage({acceptType = 'image/*', onUploadImage}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) return;
    inputRef.current.click();
  }, []);

  const handleUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      onUploadImage(e);
    },
    []
  );

  return (
    <div>
      <CircleImage
        src="/assets/profile/image.svg"
        alt="프로필이미지 업로드"
        width={20}
        height={20}
        isAbsolute={true}
        onClick={handleUploadImageButtonClick}
      />
      <input
        style={{display: 'none'}}
        type="file"
        accept={acceptType}
        ref={inputRef}
        onChange={handleUploadImage}
      />
    </div>
  );
}

export default UploadImage;
