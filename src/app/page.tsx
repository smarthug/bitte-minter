"use client";

import { useMbWallet } from "@mintbase-js/react";
import { NearWalletConnector } from "@/components/NearWalletSelector";
import TrainigCard from "@/components/TrainingCard";

import Head from "next/head";
import Minter from "@/components/Minter";
import { useSearchParams } from "next/navigation";
import { SuccessPage } from "@/components/Success";
import { mbUrl, nearblocksUrl } from "@/config/setup";
import { getTxnHash } from "@/hooks/utils";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Box, Container, styled } from "@mui/material";

// const modelDetails = {
//   modelName: 'Image Classification Model',
//   requiredParticipants: 10,
//   rewardRate: 100,
//   restrictions: [
//       { label: 'Android Only', value: 'android' },
//       { label: 'Share Location', value: 'location' },
//       { label: 'Upload Images', value: 'images' },
//   ],
// };

const modelDetails = [
  {
    modelName: "#1 Handwritten Digit Recognition",
    requiredParticipants: 10,
    rewardRate: 100,
    restrictions: [
      { label: "Android 8.0+", value: "android" },
      { label: "Upload Handwritten Digit Images", value: "digit_images" },
      { label: "Allow Background Processing", value: "background" },
      { label: "Type : Arabic", value: "type" },
    ],
    trainingData: "Handwritten digit images from users' devices",
  },
  {
    modelName: "#2 Facial Expression Recognition",
    requiredParticipants: 15,
    rewardRate: 120,
    restrictions: [
      { label: "iPhone iOS 10+", value: "ios" },
      { label: "Access Front Camera", value: "front_camera" },
      { label: "Upload Facial Expressions", value: "facial_images" },
      { label: "Allow Real-time Processing", value: "real_time" },
    ],
    trainingData: "Facial expression images captured from users",
  },
  {
    modelName: "#3 Traffic Sign Recognition",
    requiredParticipants: 20,
    rewardRate: 90,
    restrictions: [
      { label: "Android 9.0+ or iPhone iOS 11+", value: "cross_platform" },
      { label: "Access Camera", value: "camera" },
      { label: "Upload Traffic Sign Images", value: "traffic_sign_images" },
      { label: "Allow GPS for Traffic Sign Context", value: "gps" },
    ],
    trainingData: "Traffic sign images with GPS data from users",
  },
];

const HorizontalContainer = styled(Box)(({ theme }) => ({
  // display: "flex",
  // flexDirection: "row",
  // gap: theme.spacing(4), // 카드 사이의 간격
  // overflowX: "auto", // 가로로 넘칠 경우 스크롤 추가
  // padding: theme.spacing(2),

  display: "flex",
  overflowX: "auto",
  width: "100%",
  gap: "16px", // 카드 간의 간격을 설정
  padding: "16px", // 컨테이너 padding
  "&::-webkit-scrollbar": {
    display: "none", // 모바일에서 스크롤바 숨기기 (optional)
  },
}));

export default function Home() {
  const { isConnected } = useMbWallet();
  const [txnUrl, setTxnUrl] = useState("");

  const params = useSearchParams();

  const mintedParams = params.get("signMeta")
    ? JSON.parse(params.get("signMeta") as string)
    : "";
  const txnHashes = params.get("transactionHashes")
    ? params.get("transactionHashes")
    : "";

  useEffect(() => {
    const fetchTxnHash = async () => {
      const txn = await getTxnHash(txnHashes as string);
      if (txn) {
        setTxnUrl(txn);
      }
    };

    fetchTxnHash();
  }, [txnHashes]);

  if (mintedParams) {
    const metaPage = `${mbUrl}/ref/${mintedParams.args.ref}?type=meta`;
    const txnHashUrl = `${nearblocksUrl}/txns/${txnUrl}`;

    const successPageData = {
      nftTitle: mintedParams.args.title as string,
      mediaUrl: mintedParams.args.mediaUrl as string,
      metaPage,
      txnHashUrl,
    };

    return <SuccessPage data={successPageData} />;
  }

  if (isConnected)
    return (
      <Container
        maxWidth="lg"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "auto",
          height: "100vh",
          // paddingTop: "164px",
        }}
      >
        <NearWalletConnector />
        {/* <Link href="/training">training</Link> */}
        <HorizontalContainer>
          <TrainigCard modelDetails={modelDetails[0]} />
          <TrainigCard modelDetails={modelDetails[1]} />
          <TrainigCard modelDetails={modelDetails[2]} />
        </HorizontalContainer>
        {/* <Minter /> */}
      </Container>
    );

  return (
    <>
      <main className="flex flex-col items-center justify-center mt-2 ">
        <div className="flex flex-1 flex-col w-full flex flex-col justify-center items-center space-y-8  min-h-screen text-gray-500">
          <Head>
            <title>Federated Learning</title>
          </Head>
          <div className=" mt-4 mb-4">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="w-full flex flex-col justify-center items-center space-y-8">
                <div className="flex flex-col justify-center items-center space-y-8">
                  <h1 className="h1-90 text-5xl text-white">
                    Federated Learning
                  </h1>
                  <h2 className="p-big-90 text-white">
                    Federated Learning
                    <Link href="/training">training</Link>
                  </h2>
                </div>
                <div>
                  <NearWalletConnector />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
