import { createContext, useState } from "react";

export const VideosEscenarioContext = createContext();

export function VideosEscenarioContextProvider({ children }) {
  const [videosEscenario, setVideosEscenario] = useState([]);

  return (
    <VideosEscenarioContext.Provider
      value={{ videosEscenario, setVideosEscenario }}
    >
      {children}
    </VideosEscenarioContext.Provider>
  );
}
