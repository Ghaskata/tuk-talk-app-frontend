// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ThemeSettings from "./components/settings";
import { SocketContextProvider } from "./contexts/socketProvider";
import { ChatContextProvider } from "./contexts/chatContex";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
