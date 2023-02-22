import { ReactElement } from "react";
import styled from "styled-components"
import { Button } from "@mui/material";

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,0.2);
  z-index: 999;

  display: flex;
  justify-content: center;
  align-items: center;
`

const InnerPopup = styled.div`
  position: relative;
  padding: 32px;
  width: 100%;
  max-width: 640px;
  background-color: #FFF;
`

const CloseButton = styled(Button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`

export const SearchPopup = (props:any) => {
  const closeAdvanceSearchPopup = () => {
    props.setTrigger(false);
    document.body.style.overflow= 'unset';
  }
  return (props.trigger) ? (
    <Popup>
      <InnerPopup>
        <CloseButton onClick={closeAdvanceSearchPopup}>
          close
        </CloseButton>
        {props.children}
      </InnerPopup>
    </Popup>
  ) : <></>;
}