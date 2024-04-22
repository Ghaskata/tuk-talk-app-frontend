// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ThemeSettings from "./components/settings";
import { SocketContextProvider } from "./contexts/socketProvider";
import { ChatContextProvider } from "./contexts/chatContex";

function App() {
  return (
    <SocketContextProvider>
      <ChatContextProvider>
        <ThemeProvider>
          <ThemeSettings>
            {" "}
            <Router />{" "}
          </ThemeSettings>
        </ThemeProvider>
      </ChatContextProvider>
    </SocketContextProvider>
  );
}

export default App;
