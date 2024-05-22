import React from 'react';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SpinnerElement = styled.div`
  border: 5px solid #f3f3f3; 
  border-right: 5px solid #3498db; 
  border-radius: 50%; 
  width: 20px;
  height: 20px;

  }
`;

const Spinner = () => {
  return (
    <SpinnerContainer>
      <SpinnerElement />
    </SpinnerContainer>
  );
};

export default Spinner;
