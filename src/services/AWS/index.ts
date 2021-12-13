import * as AWSpro from "@aws-sdk/client-textract";

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
const awsCof ={
  region: "us-east-1",
  credentials: {
    accessKeyId: "ASIAZQXWA5Z5M7FOKNA6",
    secretAccessKey: "pmHlLPJ4GJowL5H9RS5doIVCtyqDppTpTzmf0UN8",
    sessionToken:"FwoGZXIvYXdzEG4aDN/hAqZeh7lwYY5fsCLPAeKTfuGHuu9ueToUKmznOA3/qF3YrInbET6ajuPzER9/g563XZpTUFCUtmQa+EO+Yv0WGfC6Ii7KKkIjxey6NUMBLNKFyid/lrzsx3zoMfMpS/SHseH8R+SmIoUH69sSPHhOKH23uiNn8HLmRPZi5GI/MFaJ4kkCt4COlNxttnOlKR9r/rDD0hEQECz44+9esZ6haY1c38XK4ChmlaDoBT6nSwyN9BJeLjL4IlPlAVQS7llyt2lbpwR6BPWlfqKgMHwtaodcDhJCFNNb7EkXbSiN9NyNBjItdLeFOBis19dwAWUeFHnpBO6UKeATM4BW2EdnI/InyWyyAQgBLSNsn8+rS9PN",
  },
}

console.log(process.env.AWS_NEXT_JS_accessKeyId,process.env.AWS_NEXT_JS_secretAccessKey, process.env.AWS_NEXT_JS_sessionToken)

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
