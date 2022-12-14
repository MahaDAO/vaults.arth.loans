import React from "react";
import styled from "styled-components";

import theme from "../../theme";

export interface InputProps {
  value: string;
  setValue: (text: string) => void;
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  disabled?: boolean;
  placeholder?: string;
  border?: string;
  className?: string;
}

const TextInput = (props: InputProps) => {
  const {
    value = "",
    setValue,
    inputMode = "decimal",
    disabled = false,
    placeholder = "00.00",
    border = '6px 0 0 6px',
    className = '',
  } = props;

  const onValueChange = (value: string) => {
    setValue(value);
  };

  return (
    <InputContainer style={{borderRadius: border}} className={className}>
      <CustomInput
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        type={'string'}
        onChange={(event) => {
          onValueChange(event.target.value)
        }}
      />
    </InputContainer>
  )
}

export default TextInput;

const InputContainer = styled.div`
  background: ${theme.color.dark[500]};
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

const CustomInput = styled.input`
  padding: 12px;
  color: #FFFFFF;
  fontFamily: Inter !important;
  background: transparent;
  border-style: none;
  width: 100%;
  height: 44px;
  font-weight: 600;
  &:focus {
    outline: none;
  }
  -webkit-appearance: textfield;
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  [type='number'] {
    -moz-appearance: textfield;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  ::placeholder {
    color: ${({theme}) => theme.text4};
  }
`;

const MaxTagConatiner = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #f7653b;
  padding: 10px 12px;
  background: transparent;
  border-radius: 0 6px 6px 0;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;
