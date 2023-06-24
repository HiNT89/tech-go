import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import publicRoutes from "./routes";
import { actionGetProduct } from "~/pages/saga/action";
import { useDispatch, useSelector } from "react-redux";
import { listProductSE, isLoadingSE } from "~/rootSaga/selectors";
import { useEffect, useState } from "react";
import Loading from "./pages/Loading";
interface Action {
  type: string;
  payload: any;
}
function App() {
  const listProduct = useSelector(listProductSE);
  const isLoading = useSelector(isLoadingSE);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch<Action>(actionGetProduct());
  }, []);
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <Router>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Routes>
      </Router>
    );
  }
}

export default App;
