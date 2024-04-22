import { createContext, useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

const ChatContext = createContext(undefined);

export const ChatContextProvider = ({ children, initialState }) => {
  function reducer(prevState, action) {
    switch (action.type) {
      case "ADD_MESSAGE":
        const newState = {
          ...prevState,
          messages: [...prevState.messages, action.payload],
        };
        return newState;
      default:
        return prevState;
    }
  }
  const [state, dispatch] = useReducer(
    reducer,
    initialState || {
      messages: [
        {
          id: uuidv4(),
          sender: "Frenk Sewy",
          text: "You re right. Usability testing helps us identify any usability issues and refine our designs for a better user ",
        },
        {
          id: uuidv4(),
          sender: "Joel Rolened",
          text: "I also think creating user personas and journey maps based on our research findings would be beneficial. It helps us visualize and empathize with our users, guiding our design decisions.",
        },
        {
          id: uuidv4(),
          sender: "Frenk Sewy",
          text: "Absolutely! User research is crucial for understanding our target audience and their needs. ",
        },
        {
          id: uuidv4(),
          sender: "Joel Rolened",
          text: "I completely agree. By conducting user interviews and surveys, we can gather valuable insights into their preferences and pain points. ",
        },
        {
          id: uuidv4(),
          sender: "Darren Kruger",
          text: "Definitely. And lets not forget about usability testing. Watching users interact withour prototypes gives us direct feedback on the usability and effectiveness of our designs.",
        },
        {
          id: uuidv4(),
          sender: "Frenk Sewy",
          text: "Youre right. Usability testing helps us identify any usability issues and refine our designs for a better user experience.",
        },
        {
          id: uuidv4(),
          sender: "Frenk Sewy",
          text: "Youre right. Usability testing helps us identify any usability issues and refine our designs for a better user experience.",
        },
      ],
    }
  );

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("Context not available");
  }
  return context;
};
