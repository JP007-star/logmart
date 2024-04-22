import { ThemeProvider } from "../../components/ThemeContext";
import { HomeContainer } from "../../components/HomeContainer";

export default function HomePage() {
  return (
    <>
   
      <ThemeProvider>
        <HomeContainer />
      </ThemeProvider>
     
    </>
  );
}
