import React, { useContext } from 'react';
import styled from "styled-components";
import momentjs from 'moment'
import { HookContext } from '../../../store/HookProvider'
import {
    Card,
    Row,
    Col,
    Tooltip,
    Button as AntButton,
} from 'antd';

const ShowDateTrip = styled(Card)`
  border-radius: 4px;
  background: #f7f7f7;
  color: black;
  box-shadow: 2px 8px 10px rgba(0, 0, 0, 0.06), 0px 3px 4px rgba(0, 0, 0, 0.07);
  height: 100%;
  width: 100%;
  .ant-card-body {
    padding: 1px;
  }
`;

function ShowStartToEnd(props) {
    const { Trip } = useContext(HookContext)
    return (
        <Row justify="center">
            <Col lg={{ span: 8 }} md={{ span: 18 }} sm={{ span: 18 }}>
                <ShowDateTrip>
                    <Row justify="center">
                        <span className="p-1"> {momentjs(Trip.date).format('ll')}
                        </span>
                    &nbsp; - &nbsp;
                    <span className="p-1">{momentjs(Trip.date).add(Trip.numberAddDate - 1, 'day').format('ll')}
                        </span>
                    </Row>
                </ShowDateTrip>
            </Col>
        </Row>
    )
}

export default ShowStartToEnd;

