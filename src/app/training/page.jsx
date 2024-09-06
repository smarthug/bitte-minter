'use client'
// src/App.js
import React, { useState } from "react";
import { Container, Grid2 } from "@mui/material";
import ProgressWithTimeout from "@/components/ProgressBar";
import SimpleProgress from "@/components/SimpleProgress";



const items = [
  {
    id: 1,
    name: "The Crown",
    description: "A crown that grants the wearer unlimited power",
    price: 1000000,
    image: "/imgs/crown.png",
  },
];

const App = () => {
  const [purchasedItems, setPurchasedItems] = useState([]);

  const handlePurchase = (item) => {};

  return (
    <Container
      maxWidth="xs"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "auto",
        // paddingTop: "164px",
      }}
    >
      <Grid2 container spacing={2}>
        <Grid2 item xs={12} sm={12} md={12}>
            <h1>Shop</h1>
            {/* <ProgressWithTimeout /> */}
            <SimpleProgress />
        </Grid2>
      </Grid2>
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
