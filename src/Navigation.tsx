import { Redirect, Route, Switch } from "react-router-dom";

import Page from "./components/Page/Page";
import NoPageFound from "./components/NoPageFound";
import ARTHETH from "./views/arth-eth";
import ARTHUSDC from "./views/arth-usdc";
import Home from "./views/Home";

const Navigation = () => {

  return (
    <Switch>
      {/* <Route exact path="/">
        <Page>
          <Home/>
        </Page>
      </Route> */}
      <Route exact path="/arth-eth-strategy">
        <Page>
          <ARTHETH />
        </Page>
      </Route>
      <Route exact path="/arth-usdc-strategy">
        <Page>
          <ARTHUSDC />
        </Page>
      </Route>
      <Route exact path="*">
        {/* <NoPageFound /> */}
        <Redirect to="/arth-eth-strategy" />
      </Route>
    </Switch>
  );
}

export default Navigation;
