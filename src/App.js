import { ThemeProvider } from "styled-components"
import { 
  crukTheme,
  GlobalStyle
} from "@cruk/cruk-react-components"
import LoadingProvider from "./components/loadingContext"
import Main from "./pages/main"

function App() {
  return (
    <ThemeProvider theme={crukTheme}>
      <GlobalStyle />
      <LoadingProvider>

        <Main />

      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App
