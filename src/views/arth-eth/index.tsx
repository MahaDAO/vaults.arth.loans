import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { useMediaQuery } from "react-responsive";
import { Helmet } from "react-helmet";
import Confetti from 'react-confetti'
import styled from "styled-components";

import PostionDetails from "./PostionDetails";
import OpenPosition from "./OpenPosition";
import Header from "./components/Header";
import SummaryView from "./components/SummaryView";
import StrategyInfo from "./components/StrategyInfo";
import LoadingPage from "../../components/LoadingPage";
import Footer from "../../components/Footer";

import useGetIsEligible from "../../hooks/state/useGetIsEligible";
import useGetPositionDetails from "../../hooks/state/useGetPositionDetails";

import bgImage from '../../assets/images/bg.png';

const Campaign = () => {
  const [ethAmount, setEthAmount] = useState<string>("");

  const isEligible = useGetIsEligible();
  const positionDetails = useGetPositionDetails();
  const isMobile = useMediaQuery({ maxWidth: '600px' });

  console.log(positionDetails, positionDetails.value?.isActive)

  return (
    <div className={'custom-container'}>
      <Helmet>
        <title>ETH Single Asset Staking Program powered by MahaDAO</title>
        <meta name="description"
          content="ETH Single Asset Staking Program lets you earn rewards in MAHA by staking ETH on our platform. " />
      </Helmet>
      <BgImage src={bgImage} />
      <Header />
      {
        isEligible.isLoading
          ? <LoadingPage />
          : <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div className={'mo-custom-container'}>
                {
                  isMobile && <StrategyInfo />
                }
                <FormPart isEligibile={isEligible.value}>
                  {/*{!isEligible.value && <Hidden>
                    <div>
                      <TextWrapper
                        text={<div>Check your eligibility</div>}
                        align={'center'}
                        className={'m-b-4'}
                      />
                      <div style={{ width: 'max-content', margin: "auto" }}>
                        <ActionButton
                          text={'Check'}
                          onClick={() => {
                          }}
                        />
                      </div>
                    </div>
                  </Hidden>}*/}
                  {/* <OpenPosition ethAmount={ethAmount} setEthAmount={setEthAmount} /> */}
                  {
                    positionDetails.value?.isActive
                      ? <PostionDetails />
                      : <OpenPosition ethAmount={ethAmount} setEthAmount={setEthAmount} />
                  }
                </FormPart>
              </div>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div className={'mo-custom-container'}>
                {!isMobile && <StrategyInfo />}
                {!positionDetails.value?.isActive && !isMobile && <SummaryView ethAmount={ethAmount} />}
                {/* <PoolInfo /> */}
                {/* <AprInfo /> */}
              </div>
            </Grid>
          </Grid>
      }
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </div>
  )
}

export default Campaign;

const BgImage = styled.img`
  position: absolute;
  left: 0;
  width: 100vw;
  top: 0;
  z-index: -1;
  height: 100vh;
  opacity: 0.5;
`

const FormPart = styled.div<{ isEligibile: boolean }>`
  position: relative;
    //padding: ${(props) => props.isEligibile ? '0' : '16px'};
`

const Hidden = styled.div`
  position: absolute;
  background: aliceblue;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  background: rgba(255, 255, 255, 0.02);
  -webkit-backdrop-filter: blur(21px);
  backdrop-filter: blur(21px);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
`
