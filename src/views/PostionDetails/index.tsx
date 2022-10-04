import styled from "styled-components";
import theme from "../../theme";
import DataField from "../../components/DataField";
import React, { useMemo }from "react";
import TextWrapper from "../../components/TextWrapper";
import Button from "../../components/Button";
import TextButton from "../../components/TextButton";
import useGetPositionDetails from "../../hooks/state/useGetPositionDetails";
import { getDisplayBalance } from "../../utils/formatBalance";
import useCollateralPriceFeed from "../../hooks/state/TroveManager/useCollateralPriceFeed";
import { BigNumber } from "ethers";
import useWithdraw from "../../hooks/callbacks/useWithdraw";

const PositionDetails = () => {
  const InRange = true;

  const price = useCollateralPriceFeed()
  const positionDetails = useGetPositionDetails();

  const withdrawHandler = useWithdraw(
    positionDetails.value?.uniswapNftId,
    positionDetails.value?.liquidity, 
    positionDetails.value?.amount0, 
    positionDetails.value?.amount1
  );
  const onWithdrawClick = () => withdrawHandler();

  const cr = useMemo(() => {
    if (price.isLoading || positionDetails.isLoading) return BigNumber.from(0)
    if (positionDetails.value.debt.lte(0)) return BigNumber.from(0)
    return price.value.mul(positionDetails.value.coll).div(positionDetails.value.debt);
  }, [price, positionDetails]);

  return (
    <div>
      <PositionContainer className={'material-primary m-b-24'}>
        <InRangeTag>
          <TagColor color={InRange ? theme.color.green[300] : theme.color.red[300]}/>
          <TextWrapper text={InRange ? 'In Range' : 'Out of Range'}/>
        </InRangeTag>
        <div className={'m-b-12'}>
          <DataField
            label={'NFT ID'}
            labelFontSize={16}
            labelFontColor={'white'}
            value={`#${Number(positionDetails.value?.uniswapNftId).toLocaleString('en-US', { maximumFractionDigits: 0})}`}
            valueFontColor={'white'}
            valueFontSize={16}
            valueFontWeight={600}
            className={'m-b-2'}
          />
          <TextButton text={'View position'} fontSize={12} fontWeight={600}
                      onClick={() => window.open('https://app.uniswap.org/#/pool/281910')} align={'right'}/>
        </div>
        <div className={'m-b-12'}>
          <DataField
            label={'Liquidity'}
            labelFontSize={16}
            labelFontColor={'white'}
            value={`${Number('2').toLocaleString('en-US', {maximumFractionDigits: 3})} ETH`}
            valueFontColor={'white'}
            valueFontSize={16}
            valueFontWeight={600}
            className={'m-b-4'}
          />
          <DataField
            value={`${Number('1200').toLocaleString('en-US', {maximumFractionDigits: 3})} ARTH`}
            valueFontColor={'white'}
            valueFontSize={16}
            valueFontWeight={600}
            className={'m-b-4'}
          />
        </div>
        <div className={'m-b-12'}>
          <DataField
            label={'Contribution to TVL'}
            labelFontSize={16}
            labelFontColor={'white'}
            value={`${Number('20').toLocaleString('en-US', {maximumFractionDigits: 3})}%`}
            valueFontColor={'white'}
            valueFontSize={16}
            valueFontWeight={600}
            className={'m-b-4'}
          />
        </div>
      </PositionContainer>
      <div className={'material-primary m-b-24'}>
        <div className={'m-b-12'}>
          <DataField
            label={'Total Collateral'}
            labelFontSize={16}
            labelFontColor={'white'}
            value={`${Number(getDisplayBalance(positionDetails.value.coll, 18)).toLocaleString('en-US', {maximumFractionDigits: 3})} ETH`}
            valueFontColor={'white'}
            valueFontSize={16}
            valueFontWeight={600}
            className={'m-b-4'}
          />
        </div>
        <div className={'m-b-12'}>
          <DataField
            label={'Total Debt'}
            labelFontSize={16}
            labelFontColor={'white'}
            value={`${Number(getDisplayBalance(positionDetails.value.debt, 18)).toLocaleString('en-US', {maximumFractionDigits: 3})} ETH`}
            valueFontColor={'white'}
            valueFontSize={16}
            valueFontWeight={600}
            className={'m-b-4'}
          />
        </div>
        <div className={'m-b-12'}>
          <DataField
            label={'Collateral Ratio'}
            labelFontSize={16}
            labelFontColor={'white'}
            value={`${Number(getDisplayBalance(cr, 16, 3)).toLocaleString('en-US', {maximumFractionDigits: 3})}%`}
            valueFontColor={'white'}
            valueFontSize={16}
            valueFontWeight={600}
            className={'m-b-4'}
          />
        </div>
      </div>
      <Rewards className={'material-primary m-b-24'}>
        <div className={'single-line-center-between m-b-24'}>
          <TextWrapper text={'Rewards'} fontSize={24} fontFamily={'Syne'}/>
          <RewardsBtn>
            <Button text={'Collect Rewards'} size={'sm'} disabled={true}/>
          </RewardsBtn>
        </div>
        <div className={'m-b-12'}>
          <DataField
            label={'Estimated MAHA Rewards (@30%)'}
            labelFontWeight={600}
            labelFontColor={'white'}
            value={'2,000 MAHA'}
            valueFontSize={16}
            valueFontWeight={600}
            valueFontColor={'white'}
            className={'m-b-2'}
          />
        </div>
        <div className={''}>
          <DataField
            label={'Estimated Trading Fee Rewards'}
            labelFontWeight={600}
            labelFontColor={'white'}
            value={'20 ARTH'}
            valueFontSize={16}
            valueFontWeight={600}
            valueFontColor={'white'}
          />
          <DataField
            label={''}
            labelFontWeight={600}
            labelFontColor={'white'}
            value={'10 ETH'}
            valueFontSize={16}
            valueFontWeight={600}
            valueFontColor={'white'}
          />
        </div>
      </Rewards>
      <Rewards className={'material-primary m-b-24'}>
        <div className={'single-line-center-between m-b-24'}>
          <TextWrapper text={'Action'} fontSize={24} fontFamily={'Syne'}/>
          <RewardsBtn>
            <Button
              onClick={onWithdrawClick}
              text={'Close position'} 
              size={'sm'} 
              disabled={true}
            />
          </RewardsBtn>
        </div>
      </Rewards>
    </div>
  )
}

export default PositionDetails;

const PositionContainer = styled.div`
  position: relative;
  padding-top: 44px;
`

const Rewards = styled.div`
  padding: 24px;
  border-radius: 6px;
`

const RewardsBtn = styled.div`
  width: 150px;
`

const InRangeTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.color.transparent[300]};
  position: absolute;
  right: 8px;
  top: 8px;
  height: 24px;
  width: 90px;
  border-radius: 6px;
`

const TagColor = styled.div<{ color: string }>`
  background: ${(props) => props.color};
  height: 8px;
  width: 8px;
  border-radius: 50%;
  margin-right: 8px;
`;
