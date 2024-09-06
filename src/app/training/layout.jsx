import { NearWalletConnector } from "@/components/NearWalletSelector";

export default function RootLayout({
    children,
  }) {
    // return <AppProvider> <SocialMedias /> {children} </AppProvider>;
    return <><NearWalletConnector/> {children}  </>;
  }
  