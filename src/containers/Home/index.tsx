import { ILanguage } from "@common/constant/language";
import ChangeLanguage from "@components/ChangeLanguage";
import Input from "@components/Input";
import Header from "@components/Layout/Header";
import AWSTranslate from "@services/AWS";
import { ITranslateTextPayload } from "@services/AWS/interface";
import { useRouter } from "next/dist/client/router";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Button from "@design/Button";
import useToggleAndCloseVer2 from "src/hooks/useToggleAndCloseVer2";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import Loading from "@design/Loading";

const HomeContainer = styled.div`
  ${tw`mb-20 relative`}
`;

const HomeBox = styled.div`
  ${tw`container mx-auto`}
`;

const TranslateBox = styled.div`
  ${tw`w-full grid lg:grid-cols-2 gap-14`}
`;

const CropImageContainer = styled.div`
  ${tw`fixed h-[100vh] w-[100vw] top-0 z-50 `}
  background-color: rgba(0, 0, 0, 0.4);
`;
const CropImageBox = styled.div`
  ${tw`absolute bg-white`}
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface IHome {}

const Home: FC<IHome> = () => {
  //#region Handle Input String
  const router = useRouter();
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();
  const [selectInput, setSelectInput] = useState<ILanguage>();
  const [selectOutput, setSelectOutput] = useState<ILanguage>();
  const timer = useRef<any>(null);
  //#endregion

  //#region Handle Input String
  useEffect(() => {
    let url = new URL(location.origin + router.asPath);
    let text = url.searchParams.get("text");

    setInput(text || "Hello world! Who I am.");
  }, []);

  useEffect(() => {
    let url = new URL(location.origin + router.asPath);
    let query: any = handleInitQuery(url);

    if (input?.trim() !== "") {
      query.text = input;
    }

    if (selectInput && selectOutput) {
      handleCallApi();

      router.replace({
        query: query,
      });
    }
  }, [input]);

  useEffect(() => {
    if (input) return;
    clearTimeout(timer.current);
    setOutput("");
  }, [input]);

  useEffect(() => {
    handleCallApi();
  }, [selectInput]);

  useEffect(() => {
    handleCallApi();
  }, [selectOutput]);

  const handleInitQuery = (url: URL) => {
    let from = url.searchParams.get("from");
    let to = url.searchParams.get("to");

    return {
      from: selectInput?.LanguageCode || from,
      to: selectOutput?.LanguageCode || to,
    };
  };

  const handleCallApi = () => {
    if (input.trim() === "") return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setLoading(true);

      let payload: ITranslateTextPayload = {
        Text: input,
        SourceLanguageCode: selectInput?.LanguageCode || "auto",
        TargetLanguageCode: selectOutput?.LanguageCode || "vi",
      };

      handleTranslateApi(payload);
    }, 300);
  };

  const handleChangeOutput = (data: string) => {
    if (input !== "") {
      setOutput(data);
    }
  };

  const handleTranslateApi = async (payload: ITranslateTextPayload) => {
    let data = await AWSTranslate.doTranslate(payload);

    handleChangeOutput(data.TranslatedText);

    setLoading(false);
  };

  
  const handleChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };
  //#endregion

  //#region Hamdle Input Image
  const refImage = useRef<HTMLDivElement>(null);
  const [openImage, setOpenImage] = useToggleAndCloseVer2(refImage);
  const [image, setImage] = useState(
    "https://images.squarespace-cdn.com/content/v1/5930dc9237c5817c00b10842/1557980730821-E0BL40VN22LDSYKQH91O/images.png"
  );
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState<Cropper>();
  const [loadingImage, setLoadingImage] = useState<boolean>(false);

  useEffect(() => {
    if (cropData === "#" || cropData.trim() === "") return;
    handleTextract(cropData);
  }, [cropData]);

  const handleTextract = async (image: string) => {
    console.log(loadingImage);

    await setLoadingImage(true);
    let data = await AWSTranslate.doTextract(image);

    let result = "";
    if (data && data.Blocks) {
      data.Blocks.forEach((block) => {
        if (block.BlockType === "LINE" || block.BlockType === "CELL") {
          if ("Text" in block && block.Text !== undefined) {
            result += block.Text + "\n";
          }
        }
      });
    }
    await setInput(result.trim());
    setLoadingImage(false);
    setOpenImage(false);
  };

  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };
  //#endregion

  //#region Void
  const [voiceInput, setVoiceInput] = useState<HTMLAudioElement>();
  const [voiceOutput, setVoiceOutput] = useState<HTMLAudioElement>();

  useEffect(() => {
    console.log(123123);
    console.log(voiceInput);

    if (voiceInput) {
      console.log(123);

      voiceInput.play();
    }
  }, [voiceInput]);

  useEffect(() => {
    if (voiceOutput) {
      voiceOutput.play();
    }
  }, [voiceOutput]);

  const handleVoid = (data: string, langugeCode: string, callback: any) => {
    return AWSTranslate.doSynthesize(data, langugeCode, callback);
  };

  const handleVoidInput = () => {
    if (voiceInput) {
      console.log("pause");

      voiceInput.pause();
      setVoiceInput(undefined);
      return;
    }
    handleVoid(input, selectInput?.LanguageCode!, (data: HTMLAudioElement) => {
      setVoiceInput(data);
    });
  };
  const handleVoidOutput = () => {
    if (voiceOutput) {
      voiceOutput.pause();
      setVoiceOutput(undefined);
      return;
    }
    handleVoid(
      output,
      selectOutput?.LanguageCode!,
      (data: HTMLAudioElement) => {
        setVoiceOutput(data);
      }
    );
  };

  //#endregion

  return (
    <HomeContainer>
      <Header />
      <ChangeLanguage
        getSelectInput={setSelectInput}
        getSelectOutput={setSelectOutput}
      />
      <HomeBox>
        <TranslateBox>
          <Input
            value={input}
            onChange={handleChangeInput}
            volIcon={handleVoidInput}
            imageIcon={() => setOpenImage(true)}
            placeholder="Vui lòng nhập văn bản vào đây ..."
          />
          <Input
            loading={loading}
            value={output}
            eventPoiter={true}
            volIcon={handleVoidOutput}
            placeholder=""
          />
        </TranslateBox>
      </HomeBox>

      {openImage && (
        <CropImageContainer>
          {!loadingImage ? (
            <CropImageBox ref={refImage}>
              <label
                htmlFor="select"
                className=" w-full text-center block py-3"
              >
                Upload Image
              </label>
              <input
                id="select"
                className="hidden"
                type="file"
                onChange={onChange}
              />

              <Cropper
                style={{ height: 500, width: "100%" }}
                zoomTo={0.4}
                initialAspectRatio={1}
                src={image}
                viewMode={1}
                background={true}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                onInitialized={(instance) => {
                  setCropper(instance);
                }}
                guides={true}
              />
              <Button onClick={() => getCropData()} variant="container">
                Translate
              </Button>
            </CropImageBox>
          ) : (
            <Loading />
          )}
        </CropImageContainer>
      )}
    </HomeContainer>
  );
};

export default Home;
