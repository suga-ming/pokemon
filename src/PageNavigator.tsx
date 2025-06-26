import { Route, Routes } from "react-router-dom";
import PokeCardList from "./List/PokeCardList";
import PokeDetail from "./Detail/PokeDetail";

const PageNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<PokeCardList />}></Route>
      <Route path="/pokemon/:name" element={<PokeDetail />}></Route>
    </Routes>
  );
};

export default PageNavigator;
