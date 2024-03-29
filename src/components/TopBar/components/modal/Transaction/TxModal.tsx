import React, {useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {useWallet} from 'use-wallet';

import IconButton from '@material-ui/core/IconButton';

import {useGetActiveChainId} from '../../../../../state/chains/hooks';
import {
  isTransactionRecent,
  useAllTransactions,
  useClearAllTransactions,
} from '../../../../../state/transactions/hooks';
import {TransactionDetails} from '../../../../../state/transactions/reducer';

import SingleTransaction from './SingleTransaction';
import ConfirmationModal from '../../../../ConfirmationModal';
import IconLoader from "../../../../IconLoader";

interface props {
  openModal: boolean;
  onDismiss: () => void;
}

const TxModal: React.FC<props> = ({openModal, onDismiss}) => {
  const {account} = useWallet();

  const allTransactions = useAllTransactions();
  const chainId = useGetActiveChainId();
  const {clearAllTransactions} = useClearAllTransactions();

  const [openConfirmationModal, setOpenConfirmationModal] = useState<boolean>(false);

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions);
    return txs
      .filter((tx) => isTransactionRecent(tx) && tx.from === account)
      .sort(newTransactionsFirst);
  }, [allTransactions, account]);

  const handleClose = () => {
    onDismiss();
  };

  if (!openModal) return null;

  return (
    <div>
      <ConfirmationModal
        modalOpen={openConfirmationModal}
        onClose={() => setOpenConfirmationModal(false)}
        modalTitle={'Clear all transaction'}
        title={'Are you sure you want to clear all transaction?'}
        yesText={'Yes'}
        noText={'No'}
        yesAction={() => {
          setOpenConfirmationModal(false);
          clearAllTransactions();
        }}
        noAction={() => setOpenConfirmationModal(false)}
      />
      <ModalHeader>
        <Title>Recent Transactions</Title>
        <RightSubHeader>
          {sortedRecentTransactions.length > 0 && (
            <ClearAll onClick={() => setOpenConfirmationModal(true)}>Clear all</ClearAll>
          )}
          <CrossIcon>
            <IconButton aria-label="close" onClick={() => handleClose()}>
              <IconLoader iconName={'Cross'} width={24}/>
            </IconButton>
          </CrossIcon>
        </RightSubHeader>
      </ModalHeader>
      <ModalBody>
        {sortedRecentTransactions.length === 0 && (
          <div>
            <NoTransaction>You haven’t done any transaction yet.</NoTransaction>
          </div>
        )}
        <StyledTransactionList>
          {sortedRecentTransactions.map((tx) => (
            <SingleTransaction key={tx.hash} tx={tx} chainId={chainId}/>
          ))}
        </StyledTransactionList>
        {/*{
            pending?.length > 0
              ? (

              ) : (
                <div className="m-b-20 m-t-20">
                  <Label text="No pending transactions." color="#777" />
                </div>
              )
          }
          {
            confirmed?.length > 0
              ? (
                <>
                  <Divider
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      margin: '15px 0px',
                    }}
                  />
                  <StyledTitleArea style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <Label text="Recent transactions" />
                    {"  "}
                    <StyledClearIconWrapper>
                      <Trash onClick={clearAllTransactions} size="16" />
                    </StyledClearIconWrapper>
                  </StyledTitleArea>
                  <StyledTransactionList>
                    {confirmed.map((tx) => (
                      <Transaction key={tx.hash} tx={tx} />
                    ))}
                  </StyledTransactionList>
                </>
              )
              : (
                <div className="m-t-20 m-b-20">
                  <Label text="No recent transactions." color="#777" />
                </div>
              )
          }*/}
      </ModalBody>
    </div>
  );
};

const ModalHeader = styled.div`
  padding: 0 0 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  margin-bottom: 0;
`;

const RightSubHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ClearAll = styled.p`
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 130%;
  color: rgba(255, 255, 255, 0.32);
  cursor: pointer;
  margin-bottom: 0;
`;

const CrossIcon = styled.div`
  margin-right: -12px;
`;

const ModalBody = styled.div`
  padding: 24px 0 0 0;
  overflow-y: scroll;
  max-height: calc(360px - 72px);
  @media (max-width: 600px) {
    max-height: calc(100vh - 114px);
  }
`;

const NoTransaction = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 8px;
  padding: 0 12px;
  text-align: center;
`;

const CallToAction = styled(Link)`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  color: #f7653b;
  text-align: center;
  width: 100%;
  display: block;

  &:hover {
    color: #f7653b;
  }
`;

const StyledTransactionList = styled.div`
  display: flex;
  flex-direction: column;
`;

// we want the latest one to come first, so return negative if an is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime;
}

export default TxModal;
