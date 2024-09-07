'use client'
// src/App.js
import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
// import Grid from '@mui/material/Grid2';
// import ProgressWithTimeout from "@/components/ProgressBar";
import SimpleProgress from "@/components/SimpleProgress";
import RoundTable from "@/components/RoundTable";
import GradientCircular from "@/components/GradientCircular";
import Minter from "@/components/Minter";
import MockJSON from '../../../mock.json'
console.log(MockJSON)



// const App = () => {
//   const [purchasedItems, setPurchasedItems] = useState([]);

//   const handlePurchase = (item) => {};

//   return (
//     <Container
//       maxWidth="xs"
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         overflow: "auto",
//         // paddingTop: "164px",
//       }}
//     >
//       <Grid2 container spacing={2}>
//         <Grid2 item xs={12} sm={12} md={12}>
//             {/* <ProgressWithTimeout /> */}
//             <SimpleProgress />
//         </Grid2>
//       </Grid2>
//     </Container>
//   );
// };

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [roundAverages, setRoundAverages] = useState([]);
  const [trainersList, setTrainersList] = useState([]);

  function calculateAccuracyAverage(data) {
    const learningProgress = data.learning_progress;
    const roundAverages = [];

    // 각 라운드에 대해 반복문 실행
    for (const round in learningProgress) {
      const accuracies = learningProgress[round].accuracies;

      // %를 제거하고 숫자로 변환한 후 합산
      const accuracySum = accuracies.reduce((sum, acc) => {
        return sum + parseFloat(acc.replace("%", ""));
      }, 0);

      // 평균을 구한 후 배열에 추가
      const averageAccuracy = accuracySum / accuracies.length;
      const roundedAverageAccuracy = parseFloat(averageAccuracy.toFixed(1));
      roundAverages.push(roundedAverageAccuracy);
    }

    return roundAverages;
  }

  function getTrainersList(data) {
    const learningProgress = data.learning_progress;
    const trainersList = [];

    // 각 라운드에 대해 반복문 실행
    for (const round in learningProgress) {
      const trainers = learningProgress[round].trainers;
      trainersList.push(trainers);
    }

    return trainersList;
  }

  useEffect(() => {

    // const postData = async () => {
    //   try {
    //     const response = await fetch('https://example.com/api', {
    //       method: 'POST', // HTTP 메서드 설정
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer token', // 필요한 경우 인증 헤더 추가
    //       },
    //       body: JSON.stringify({
    //         key1: 'value1',
    //         key2: 'value2',
    //       }), // 요청에 보낼 데이터
    //     });

    //     if (!response.ok) {
    //       throw new Error('네트워크 응답이 정상적이지 않습니다');
    //     }

    //     const data = await response.json(); // 응답 데이터를 JSON으로 변환
    //     console.log('응답 데이터:', data);

    //     const tmp = calculateAccuracyAverage(MockJSON)
    //     // console.log(tmp)
    //     setRoundAverages(tmp)

    //     const trainersList = getTrainersList(MockJSON);
    //     console.log(trainersList);
    //     setTrainersList(trainersList);

    //     setLoading(false);
    //   } catch (error) {
    //     console.error('에러 발생:', error);
    //   }
    // };

    // postData();


    /////////////////////////////////////////

    const tmp = calculateAccuracyAverage(MockJSON)
    // console.log(tmp)
    setRoundAverages(tmp)

    const trainersList = getTrainersList(MockJSON);
    console.log(trainersList);
    setTrainersList(trainersList);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }
    , []);


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

      {/* <ProgressWithTimeout /> */}
      {/* <SimpleProgress /> */}

      {
        loading ? <GradientCircular /> :
          <>

            <RoundTable roundAverages={roundAverages} trainersList={trainersList} />
            <Minter />
          </>
      }


      {/* <GradientCircular /> */}

    </Container>
  );
};

export default App;

// import { Account } from "@nice-xrpl/react-xrpl";
// import { ShowNFTs } from "../../components/wallet-ui/show-nfts-sell";

// export default function Shop() {
//   return (
//     <>
//       <Account address="rhhJKjedTEzXidrP3mqS4kr5d9xFxFEfUp">
//         <ShowNFTs />
//       </Account>
//     </>
//   );
// }
