'use client'
// src/App.js
import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
// import Grid from '@mui/material/Grid2';
// import ProgressWithTimeout from "@/components/ProgressBar";
import SimpleProgress from "@/components/SimpleProgress";
import RoundTable from "@/components/RoundTable";
import GradientCircular from "@/components/GradientCircular";
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
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [roundAverages, setRoundAverages] = useState([]);

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

  useEffect(() => {

    const tmp =calculateAccuracyAverage(MockJSON)
    console.log(tmp)
    setRoundAverages(tmp)

    setTimeout(() => {
      setLoading(false);
    }

      , 3000);
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
        loading ? <GradientCircular /> : <RoundTable roundAverages={roundAverages} />
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
