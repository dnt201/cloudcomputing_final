import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const CropImageContainer = styled.div`
  ${tw``}

  & img {
    /* opacity: 100 !important; */
  }
`;

interface ICropImage {
  src?: string;
  handleGetCropData: any;
}

const CropImage: FC<ICropImage> = ({ src, handleGetCropData }) => {
  const [cropper, setCropper] = useState<Cropper>();

  useEffect(() => {
    handleGetCropData.current = getCropData;
  }, []);

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      let imageCrop = cropper.getCroppedCanvas().toDataURL();
      console.log(imageCrop);

      return imageCrop;
    }

    return null;
  };

  return (
    <CropImageContainer>
      {src && (
        <Cropper
          style={{ height: 500, width: "100%" }}
          zoomTo={0.4}
          initialAspectRatio={1}
          src={src}
          viewMode={1}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={true}
        />
      )}
    </CropImageContainer>
  );
};

export default CropImage;
