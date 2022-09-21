import React from 'react';
import styled from 'styled-components';
import IconLoader from '../../../../IconLoader';
import TextWrapper from '../../../../TextWrapper';


interface Iprops {
  openModal: boolean;
  onDismiss: () => void;
}

const DesktopProjectRoute = (props: Iprops) => {
  const {
    openModal,
    onDismiss,
  } = props;

  if (!openModal) return null;

  return (
    <MainDiv>
      <BackgroundAbsolute onClick={() => onDismiss()}/>
      <PositionDiv>
        <ProjectDiv id={"desktop_project_modal"}>
          <div className='single-line-center-start m-b-40 pointer' onClick={() => {
            window.open('https://arthcoin.com/')
          }}>
            <IconLoader iconName={'Loans'} iconType={'products'} className={'m-r-16'}/>
            <div>
              <TextWrapper text={'Interest free Loans'} fontWeight={600} className={'m-b-4'}/>
              <TextWrapper text={'Interest free ARTH loans.'}/>
            </div>
          </div>
          <div className='single-line-center-start pointer' onClick={() => {
            window.open('https://mahastarter.com/#/')
          }}>
            <IconLoader iconName={'Starter'} iconType={'products'} className={'m-r-16'}/>
            <div>
              <TextWrapper text={'MahaStarter'} fontWeight={600} className={'m-b-4'}/>
              <TextWrapper text={'Incubator for the MahaDAO Ecosystem'}/>
            </div>
          </div>
        </ProjectDiv>
      </PositionDiv>
    </MainDiv>
  )
};

export default DesktopProjectRoute;

const BackgroundAbsolute = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

const MainDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  width: 100vw;
  height: 100vh;
`;

const PositionDiv = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
  position: relative;
`;

const ProjectDiv = styled.div`
  position: absolute;
  background: linear-gradient(180deg, #48423e 0%, #373030 100%);
  border-radius: 6px;
  right: 320px;
  top: 75px;
  width: 360px;
  z-index: 10;
  transition: 1s ease-in-out;
  padding: 24px 16px 24px 24px;
  @media (max-width: 600px) {
    width: 100vw;
    left: 0;
    right: 0;
  }
`;
