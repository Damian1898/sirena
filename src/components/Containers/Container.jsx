import React from 'react';
import styled from 'styled-components';

const ContainerWrapper = styled.div`
    border: 1px solid #CACACA;
    background-color: #FFF;
    border-radius: 3px;
    margin-bottom: 24px;
    &:last-child {
        margin-bottom: 0;
    }

    display: flex; 
    flex-direction: row; 
    height: calc(100vh); 
    justify-content: center; 
    align-items: center;
`;

const Container = (props) => {
    const { children, otherProps } = props;

    return (
        <ContainerWrapper {...otherProps}>
            {children}
        </ContainerWrapper>
    );
};

export default Container;