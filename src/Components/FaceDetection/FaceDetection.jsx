// /* The above code is a React component that uses the face-api.js library to perform face detection on a
// webcam video feed. It loads the necessary models from a specified URL, starts the webcam video, and
// continuously detects faces in the video frames. The detected faces are then displayed on a canvas
// element. */
// import Webcam from "react-webcam";
// import * as faceapi from "face-api.js";
// import React, { useEffect } from "react";

// function FaceDetection() {
//   const [modelsLoaded, setModelsLoaded] = React.useState(false);
//   const [captureVideo, setCaptureVideo] = React.useState(false);

//   const videoRef = React.useRef();
//   const videoHeight = 480;
//   const videoWidth = 640;
//   const canvasRef = React.useRef();

//   useEffect(() => {
//     const loadModels = async () => {
//       const MODEL_URL = process.env.PUBLIC_URL + "/models";

//       Promise.all([
//         await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
//         await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
//         await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
//         await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
//       ]).then(setModelsLoaded(true));
//     };
//     loadModels();
//   }, []);

//   const startVideo = () => {
//     setCaptureVideo(true);
//     navigator.mediaDevices
//       .getUserMedia({ video: { width: 300 } })
//       .then((stream) => {
//         let video = videoRef.current;
//         video.srcObject = stream;
//         video.play();
//       })
//       .catch((err) => {
//         console.error("error:", err);
//       });
//   };

//   const handleVideoOnPlay = () => {
//     setInterval(async () => {
//       if (canvasRef && captureVideo &&canvasRef.current) {
//         canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
//           videoRef.current
//         );
//         const displaySize = {
//           width: videoWidth,
//           height: videoHeight,
//         };

//         faceapi.matchDimensions(canvasRef.current, displaySize);

//         const detections = await faceapi
//           .detectSingleFace(
//             videoRef.current,
//             new faceapi.TinyFaceDetectorOptions()
//           )
//           .withFaceLandmarks()
//           .withFaceExpressions()
//           .withFaceDescriptor();
//         if (detections) {
//           const resizedDetections = faceapi.resizeResults(
//             detections,
//             displaySize
//           );
//           console.log(resizedDetections);
//           console.log(videoRef.current);
//           // canvasRef &&
//           //   canvasRef.current &&
//           //   canvasRef.current
//           //     .getContext("2d")
//           //     .clearRect(0, 0, videoWidth, videoHeight);
//           // canvasRef &&
//           //   canvasRef.current &&
//           //   faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
//           // canvasRef &&
//           //   canvasRef.current &&
//           //   faceapi.draw.drawFaceLandmarks(
//           //     canvasRef.current,
//           //     resizedDetections
//           //   );
//           // canvasRef &&
//           //   canvasRef.current &&
//           //   faceapi.draw.drawFaceExpressions(
//           //     canvasRef.current,
//           //     resizedDetections
//           //   );
//           console.log(detections.descriptor)  
//           const myFace=Object.values({
//             "0": -0.05223884433507919,
//             "1": 0.06862904131412506,
//             "2": 0.07786332070827484,
//             "3": -0.019762886688113213,
//             "4": -0.07610349357128143,
//             "5": -0.07271411269903183,
//             "6": -0.020235903561115265,
//             "7": 0.0034276845399290323,
//             "8": 0.11709482967853546,
//             "9": -0.0237815510481596,
//             "10": 0.21654967963695526,
//             "11": -0.012999444268643856,
//             "12": -0.2115432620048523,
//             "13": -0.038932837545871735,
//             "14": 0.040439870208501816,
//             "15": 0.10621392726898193,
//             "16": -0.08396081626415253,
//             "17": -0.07971460372209549,
//             "18": -0.14188063144683838,
//             "19": -0.1012805923819542,
//             "20": -0.019471075385808945,
//             "21": 0.06207120046019554,
//             "22": -0.005074719432741404,
//             "23": 0.04428565874695778,
//             "24": -0.046796053647994995,
//             "25": -0.2564373314380646,
//             "26": -0.04480075463652611,
//             "27": -0.13342535495758057,
//             "28": 0.08642175793647766,
//             "29": -0.15920062363147736,
//             "30": -0.004072053357958794,
//             "31": 0.03517015278339386,
//             "32": -0.11329729855060577,
//             "33": -0.06827440857887268,
//             "34": -0.009787390008568764,
//             "35": 0.02211245335638523,
//             "36": 0.0047781094908714294,
//             "37": -0.1083257868885994,
//             "38": 0.11892315000295639,
//             "39": -0.04508434981107712,
//             "40": -0.1338423639535904,
//             "41": -0.04182297736406326,
//             "42": 0.010943609289824963,
//             "43": 0.29670464992523193,
//             "44": 0.1442795991897583,
//             "45": 0.01356731541454792,
//             "46": 0.06226576864719391,
//             "47": -0.02888481877744198,
//             "48": 0.07956087589263916,
//             "49": -0.2551113963127136,
//             "50": 0.05101894587278366,
//             "51": 0.07027864456176758,
//             "52": 0.074040986597538,
//             "53": 0.11455215513706207,
//             "54": 0.07684005796909332,
//             "55": -0.1913769692182541,
//             "56": 0.05193736404180527,
//             "57": 0.06695102900266647,
//             "58": -0.1622319221496582,
//             "59": 0.06077617406845093,
//             "60": 0.0659012421965599,
//             "61": 0.0016528842970728874,
//             "62": -0.05827036127448082,
//             "63": -0.11692839860916138,
//             "64": 0.265098512172699,
//             "65": 0.051788873970508575,
//             "66": -0.12000095844268799,
//             "67": -0.11455001682043076,
//             "68": 0.0688200369477272,
//             "69": -0.15251705050468445,
//             "70": -0.03266764059662819,
//             "71": 0.1080944687128067,
//             "72": -0.12224332243204117,
//             "73": -0.13529817759990692,
//             "74": -0.21622447669506073,
//             "75": 0.10152614861726761,
//             "76": 0.3276422619819641,
//             "77": 0.16271141171455383,
//             "78": -0.19829446077346802,
//             "79": 0.03406934440135956,
//             "80": -0.1054367944598198,
//             "81": 0.025196244940161705,
//             "82": 0.032487913966178894,
//             "83": 0.02328239195048809,
//             "84": -0.028198683634400368,
//             "85": 0.03430340439081192,
//             "86": -0.10603700578212738,
//             "87": 0.01364865992218256,
//             "88": 0.15626992285251617,
//             "89": -0.06392376124858856,
//             "90": 0.008696475066244602,
//             "91": 0.17799074947834015,
//             "92": 0.013301674276590347,
//             "93": -0.03998676314949989,
//             "94": 0.0009233788587152958,
//             "95": 0.044714346528053284,
//             "96": -0.06326298415660858,
//             "97": 0.012993664480745792,
//             "98": -0.049933113157749176,
//             "99": 0.031062498688697815,
//             "100": 0.10324911773204803,
//             "101": -0.10493407398462296,
//             "102": -0.0021113213151693344,
//             "103": 0.03876977786421776,
//             "104": -0.17091284692287445,
//             "105": 0.1900050938129425,
//             "106": 0.009046345017850399,
//             "107": 0.02532990835607052,
//             "108": 0.03603240102529526,
//             "109": 0.02365904301404953,
//             "110": -0.050426188856363297,
//             "111": -0.0481240339577198,
//             "112": 0.1848115175962448,
//             "113": -0.2546822428703308,
//             "114": 0.18572388589382172,
//             "115": 0.17455756664276123,
//             "116": 0.05060141161084175,
//             "117": 0.1493191123008728,
//             "118": -0.034417059272527695,
//             "119": 0.14603132009506226,
//             "120": -0.05728739872574806,
//             "121": -0.012287491001188755,
//             "122": -0.10572881251573563,
//             "123": -0.06137680634856224,
//             "124": 0.029006529599428177,
//             "125": -0.017414966598153114,
//             "126": -0.03711922839283943,
//             "127": 0.051966261118650436
//           })
//           const dist = faceapi.euclideanDistance(myFace, detections.descriptor)
//           console.log(dist)
//         }
//       }
//     }, 100);
//   };

//   const closeWebcam = () => {
//     videoRef.current.pause();
//     videoRef.current.srcObject.getTracks()[0].stop();
//     setCaptureVideo(false);
//   };

//   return (
//     <div>
//       <div style={{ textAlign: "center", padding: "10px" }}>
//         {captureVideo && modelsLoaded ? (
//           <button
//             onClick={closeWebcam}
//             style={{
//               cursor: "pointer",
//               backgroundColor: "green",
//               color: "white",
//               padding: "15px",
//               fontSize: "25px",
//               border: "none",
//               borderRadius: "10px",
//             }}
//           >
//             Close Webcam
//           </button>
//         ) : (
//           <button
//             onClick={startVideo}
//             style={{
//               cursor: "pointer",
//               backgroundColor: "green",
//               color: "white",
//               padding: "15px",
//               fontSize: "25px",
//               border: "none",
//               borderRadius: "10px",
//             }}
//           >
//             Open Webcam
//           </button>
//         )}
//       </div>
//       {captureVideo ? (
//         modelsLoaded ? (
//           <div>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 padding: "10px",
//               }}
//             >
//               <video
//                 ref={videoRef}
//                 height={videoHeight}
//                 width={videoWidth}
//                 onPlay={handleVideoOnPlay}
//                 style={{ borderRadius: "10px" }}
//               />
//               <canvas ref={canvasRef} style={{ position: "absolute" }} />
//             </div>
//           </div>
//         ) : (
//           <div>loading...</div>
//         )
//       ) : (
//         <></>
//       )}
//     </div>
//   );
// }

// export default FaceDetection;
// // // 1. Install dependencies DONE
// // // 2. Import dependencies DONE
// // // 3. Setup webcam and canvas DONE
// // // 4. Define references to those DONE
// // // 5. Load posenet DONE
// // // 6. Detect function DONE
// // // 7. Drawing utilities from tensorflow DONE
// // // 8. Draw functions DONE

// // // Face Mesh - https://github.com/tensorflow/tfjs-models/tree/master/facemesh

// // import React, { useRef, useEffect } from "react";
// // import * as tf from "@tensorflow/tfjs";
// // // OLD MODEL
// // //import * as facemesh from "@tensorflow-models/facemesh";

// // // NEW MODEL
// // import * as facemesh from "@tensorflow-models/face-landmarks-detection";
// // import Webcam from "react-webcam";
// // import { drawMesh } from "./utilities";

// // function FaceDetection() {
// //   const webcamRef = useRef(null);
// //   const canvasRef = useRef(null);

// //   //  Load posenet
// //   const runFacemesh = async () => {
// //     // OLD MODEL
// //     // const net = await facemesh.load({
// //     //   inputResolution: { width: 640, height: 480 },
// //     //   scale: 0.8,
// //     // });
// //     // NEW MODEL
// //     const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
// //     setInterval(() => {
// //       detect(net);
// //     }, 10);
// //   };

// //   const detect = async (net) => {
// //     if (
// //       typeof webcamRef.current !== "undefined" &&
// //       webcamRef.current !== null &&
// //       webcamRef.current.video.readyState === 4
// //     ) {
// //       // Get Video Properties
// //       const video = webcamRef.current.video;
// //       const videoWidth = webcamRef.current.video.videoWidth;
// //       const videoHeight = webcamRef.current.video.videoHeight;

// //       // Set video width
// //       webcamRef.current.video.width = videoWidth;
// //       webcamRef.current.video.height = videoHeight;

// //       // Set canvas width
// //       canvasRef.current.width = videoWidth;
// //       canvasRef.current.height = videoHeight;

// //       // Make Detections
// //       // OLD MODEL
// //       //       const face = await net.estimateFaces(video);
// //       // NEW MODEL
// //       const face = await net.estimateFaces({input:video});
// //       console.log(face);

// //       // Get canvas context
// //       const ctx = canvasRef.current.getContext("2d");
// //       requestAnimationFrame(()=>{drawMesh(face, ctx)});
// //     }
// //   };

// //   useEffect(()=>{runFacemesh()}, []);

// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <Webcam
// //           ref={webcamRef}
// //           style={{
// //             position: "absolute",
// //             marginLeft: "auto",
// //             marginRight: "auto",
// //             left: 0,
// //             right: 0,
// //             textAlign: "center",
// //             zindex: 9,
// //             width: 640,
// //             height: 480,
// //           }}
// //         />

// //         <canvas
// //           ref={canvasRef}
// //           style={{
// //             position: "absolute",
// //             marginLeft: "auto",
// //             marginRight: "auto",
// //             left: 0,
// //             right: 0,
// //             textAlign: "center",
// //             zindex: 9,
// //             width: 640,
// //             height: 480,
// //           }}
// //         />
// //       </header>
// //     </div>
// //   );
// // }

// // export default FaceDetection;

import React, { useEffect } from "react";
import * as faceapi from "face-api.js";

function FaceDetection() {
  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [imageSelected, setImageSelected] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");
  const canvasRef = React.useRef();

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      setModelsLoaded(true);
      alert('Model')
    };
    loadModels();
  }, []);

  const handleImageInputChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
    setImageSelected(true);
  };

  const processImage = async () => {
    alert('I am Hit')
    const image = await faceapi.fetchImage(imageUrl);
    const detections = await faceapi
      .detectSingleFace(image, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()
      .withFaceDescriptor();

    if (detections) {
      const canvas = canvasRef.current;
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0);
      faceapi.draw.drawDetections(canvas, detections);
      faceapi.draw.drawFaceLandmarks(canvas, detections);
      faceapi.draw.drawFaceExpressions(canvas, detections);
      console.log(detections.descriptor)
      const myFace = Object.values({
    "0": -0.17934970557689667,
    "1": 0.08516005426645279,
    "2": 0.0879225954413414,
    "3": 0.013664576224982738,
    "4": -0.08102656155824661,
    "5": -0.0878402590751648,
    "6": -0.06178100407123566,
    "7": 0.0037732140626758337,
    "8": 0.07736353576183319,
    "9": -0.06955952942371368,
    "10": 0.24326568841934204,
    "11": -0.10276204347610474,
    "12": -0.20328326523303986,
    "13": 0.02643865905702114,
    "14": -0.03354427218437195,
    "15": 0.08342447876930237,
    "16": -0.1496230661869049,
    "17": -0.07646399736404419,
    "18": -0.08530247956514359,
    "19": -0.06253240257501602,
    "20": 0.09741928428411484,
    "21": 0.060889918357133865,
    "22": 0.013901165686547756,
    "23": 0.03016258031129837,
    "24": -0.16255232691764832,
    "25": -0.3222740888595581,
    "26": -0.09565158933401108,
    "27": -0.08458331227302551,
    "28": 0.020935259759426117,
    "29": -0.08448759466409683,
    "30": -0.001050144201144576,
    "31": 0.06326519697904587,
    "32": -0.13497664034366608,
    "33": -0.06299567967653275,
    "34": 0.07575681060552597,
    "35": 0.07249533385038376,
    "36": 0.03078991174697876,
    "37": -0.013006739318370819,
    "38": 0.2122899442911148,
    "39": -0.037933021783828735,
    "40": -0.1132054403424263,
    "41": -0.005636248271912336,
    "42": 0.11087492853403091,
    "43": 0.32577475905418396,
    "44": 0.13692425191402435,
    "45": 0.0927988812327385,
    "46": -0.0008574987878091633,
    "47": -0.07469651103019714,
    "48": 0.05203569307923317,
    "49": -0.24550840258598328,
    "50": 0.1051391139626503,
    "51": 0.15166574716567993,
    "52": 0.07317503541707993,
    "53": 0.08684294670820236,
    "54": 0.12890155613422394,
    "55": -0.14633871614933014,
    "56": 0.06559505313634872,
    "57": 0.037929221987724304,
    "58": -0.14678680896759033,
    "59": 0.11128842830657959,
    "60": 0.058632440865039825,
    "61": -0.012427864596247673,
    "62": 0.038320720195770264,
    "63": -0.025217970833182335,
    "64": 0.21352218091487885,
    "65": 0.04302789643406868,
    "66": -0.10440001636743546,
    "67": -0.11747772246599197,
    "68": 0.09096641093492508,
    "69": -0.15512530505657196,
    "70": -0.02481895498931408,
    "71": 0.10776486247777939,
    "72": -0.10289017111063004,
    "73": -0.1955881267786026,
    "74": -0.26378458738327026,
    "75": 0.04305511340498924,
    "76": 0.48039016127586365,
    "77": 0.14506465196609497,
    "78": -0.19886784255504608,
    "79": 0.06621840596199036,
    "80": -0.013838465325534344,
    "81": -0.15514352917671204,
    "82": 0.1170198917388916,
    "83": 0.09026136994361877,
    "84": -0.11038311570882797,
    "85": 0.01940836012363434,
    "86": -0.12089111655950546,
    "87": 0.11458956450223923,
    "88": 0.2327251434326172,
    "89": 0.0004599221865646541,
    "90": -0.047786734998226166,
    "91": 0.22776490449905396,
    "92": 0.04208756238222122,
    "93": -0.001746686757542193,
    "94": 0.09647863358259201,
    "95": 0.04111664369702339,
    "96": -0.10955541580915451,
    "97": -0.04861271008849144,
    "98": -0.13635024428367615,
    "99": -0.00857522338628769,
    "100": 0.06414531916379929,
    "101": -0.09266906976699829,
    "102": -0.05080784112215042,
    "103": 0.10135495662689209,
    "104": -0.14195512235164642,
    "105": 0.09582085907459259,
    "106": -0.02306993305683136,
    "107": -0.058725785464048386,
    "108": -0.09439760446548462,
    "109": 0.042125966399908066,
    "110": -0.15114785730838776,
    "111": -0.03133198618888855,
    "112": 0.1393229216337204,
    "113": -0.2121199518442154,
    "114": 0.10298102349042892,
    "115": 0.1257450133562088,
    "116": 0.04915536567568779,
    "117": 0.15327642858028412,
    "118": 0.08604156225919724,
    "119": 0.0610225684940815,
    "120": 0.05788407102227211,
    "121": 0.03597646579146385,
    "122": -0.08082013577222824,
    "123": -0.06579402834177017,
    "124": 0.020839067175984383,
    "125": 0.003324587130919099,
    "126": 0.09231927245855331,
    "127": 0.03995624929666519
  });
      const dist = faceapi.euclideanDistance(
        myFace,
        detections.descriptor
      );
      console.log(dist);
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center", padding: "10px" }}>
        {!imageSelected && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageInputChange}
          />
        )}
        {imageSelected && modelsLoaded && (
          <button
            onClick={processImage}
            style={{
              cursor: "pointer",
              backgroundColor: "green",
              color: "white",
              padding: "15px",
              fontSize: "25px",
              border: "none",
              borderRadius: "10px",
            }}
          >
            Process Image
          </button>
        )}
      </div>
      {imageSelected && modelsLoaded && (
        <div style={{ textAlign: "center" }}>
          <canvas ref={canvasRef} style={{ borderRadius: "10px" }} />
        </div>
      )}
    </div>
  );
}

export default FaceDetection;