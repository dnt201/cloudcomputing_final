import * as AWSpro from "@aws-sdk/client-textract";
import {useState} from "react"
import AWS from "aws-sdk";
import { ITranslateTextPayload } from "./interface";
import { decode } from "base64-arraybuffer";


import {
  AnalyzeDocumentCommand,
  AnalyzeDocumentCommandInput,
} from "@aws-sdk/client-textract";
import { stringMap } from "aws-sdk/clients/backup";
import { env } from "process";

AWS.config.region = "us-east-1";
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//   IdentityPoolId: "us-east-1:e8ecc73b-676d-46f8-89ba-e957866f07e6",
//AKIAS7PNU27UDS4IMPU5
//l/48aIWo9Vc2ZPPaELdjToMhT907h1MpaRtIl5Dt
// });

console.log(process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,"bbbbb",process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,"aaaa",process.env.NEXT_PUBLIC_AWS_SESSION_TOKEN)

process.env.AWS_SDK_LOAD_CONFIG = "true";

const awsCof ={
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
    sessionToken:process.env.NEXT_PUBLIC_AWS_SESSION_TOKEN,
  },
}
console.log(process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,"bbbbb",process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,"aaaa",process.env.NEXT_PUBLIC_AWS_SESSION_TOKEN)
const AWSTranslate = (function () {

  const translate = new AWS.Translate(awsCof);
  const polly = new AWS.Polly(awsCof);
  const textractClient = new AWSpro.Textract(awsCof);

  const doTranslate = (payload: ITranslateTextPayload) => {
    if (!payload.Text) {
      throw "Vui lòng nhập đầu vào";
    }

    return translate.translateText(payload).promise();
  };

  const doTextract = async (image?: string) => {
    if (!image) return;

    try {
      let result = await fetch(image) // pass in some data-uri
        .then(function (response) {
          return response.arrayBuffer();
        });

      let buffer = new Uint8Array(result);

      let params: AnalyzeDocumentCommandInput = {
        Document: {
          Bytes: buffer,
        },
        FeatureTypes: ["TABLES", "FORMS"],
      };

      const response = await textractClient.analyzeDocument(params);

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const doSynthesize = (text: string, languageCode: string, callback: any) => {
    var voiceId;
    switch (languageCode) {
      case "de":
        voiceId = "Marlene";
        break;
      case "en":
        voiceId = "Joanna";
        break;
      case "es":
        voiceId = "Penelope";
        break;
      case "fr":
        voiceId = "Celine";
        break;
      case "pt":
        voiceId = "Vitoria";
        break;
      default:
        voiceId = null;
        break;
    }
    if (!voiceId) {
      alert('Hiện tại polly chưa hỗ trợ ngôn ngữ: "' + languageCode + '"');
      return;
    }
    var params = {
      OutputFormat: "mp3",
      SampleRate: "8000",
      Text: text,
      TextType: "text",
      VoiceId: voiceId,
    };
    polly.synthesizeSpeech(params, (err, data) => {
      if (!data) return;

      var uInt8Array = new Uint8Array(data.AudioStream as any);
      var arrayBuffer = uInt8Array.buffer;
      var blob = new Blob([arrayBuffer]);
      var url = URL.createObjectURL(blob);
      let audioElement = new Audio([url] as any);
      callback(audioElement);
    });
  };
  return {
    doTranslate: doTranslate,
    doTextract: doTextract,
    doSynthesize: doSynthesize,
  };
})();

export default AWSTranslate;
