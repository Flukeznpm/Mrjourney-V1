import React from 'react';
import styled from "styled-components";
import {
    Card,
    Button as AntButton,
    Row,
    Col
} from 'antd';
import { Link } from 'react-router-dom';

const RowLogin = styled(Row)`
    display: flex;
    align-items: center;
    height: 100%;
`

const AntCard = styled(Card)`
  /* border-radius: 8px; */
  box-shadow: 2px 8px 10px rgba(0, 0, 0, 0.06), 0px 3px 4px rgba(0, 0, 0, 0.07);
  margin: 10px 0px 10px 0px;
  padding: 30px 0px 30px 0px;
`;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
`;

const TextError1 = styled.h1`
    font-size: 80px;
    margin: 0px;
    padding: 10px;
    @media (max-width: 600px) {
        font-size: 72px;
    }
`;

const TextError2 = styled.h2`
    font-size: 24px;
    margin: 0px;
    padding: 10px;
    @media (max-width: 600px) {
        font-size: 18px;
    }
    @media (max-width: 568px) {
        font-size: 16px;
    }
`;

const LinkHome = styled(Link)`
    color: ${props => (props.theme.color.primary)};
    font-size: 18px;
    padding: 10px;
    &:hover , &:active, &:focus {
        color: ${props => (props.theme.color.primaryPress)};
    }
    @media (max-width: 812px) {
        font-size: 14px;
    }
    @media (max-width: 568px) {
        font-size: 12px;
    }
`;


function NotMatchPage() {

    return (
        <Wrapper>
            <RowLogin justify="center">
                <Col lg={{ span: 10 }} md={{ span: 18 }} sm={{ span: 20 }} xs={{ span: 22 }} >
                    <AntCard>
                        <Row justify="center">
                            <TextError1>404</TextError1>
                        </Row>
                        <Row justify="center">
                            <TextError2>ขออภัย.. เกิดข้อผิดพลาดบางอย่าง</TextError2>
                        </Row>
                        <Row justify="center">
                            <LinkHome to="/">กลับสู่หน้าหลัก</LinkHome>
                        </Row>
                    </AntCard>
                </Col>
            </RowLogin>
        </Wrapper>
    )
}

export default NotMatchPage;