import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { pageEndPoints } from "./constants/api";
import AuthProvider from "./contexts/AuthProvider";
import ChannelPage from "./pages/Channel/Channel";
import HomePage from "./pages/Home/Home";
import LoadingPage from "./pages/Loading/Loading";
import TestPage from "./pages/Test/Test";
//import FeedChannelsPage from "./pages/Feed/Channels";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path={pageEndPoints.HOME} element={<HomePage />} />
          <Route path={pageEndPoints.LOADING} element={<LoadingPage />} />
          {/* <Route
            path={pageEndPoints.MYSUBSCRIPTIONS}
            //element={<FeedChannelsPage />}
          />
          <Route path="/watch" element={<VideoPlayer />} />
            element={<FeedChannelsPage />}
          /> */}
          <Route path={pageEndPoints.CHANNEL} element={<ChannelPage />} />
          <Route path={pageEndPoints.TEST} element={<TestPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
