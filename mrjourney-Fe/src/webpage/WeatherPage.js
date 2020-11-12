import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import liff from '@line/liff';
import axios from 'axios';
import {
    Row, Col,
    Form as AntForm,
    Button as AntButton
} from 'antd';
import { withRouter } from 'react-router-dom';

const Wrapper = styled.div`
    font-size: 18px;
`;

const WrapperLoading = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
`;

const RowLoading = styled(Row)`
    display: flex;
    align-items: center;
    height: 100%;
`

const LoadingGif = styled.img`
    height: 250px;
    width: 250px;
   
`;

const WrapperContent = styled.div`
    padding: 20px;
`;


function CreateBill(props) {

    const [loading, isLoading] = useState(true)
    const [weather, setWeather] = useState([{}]);

    useEffect(async () => {
        // isLoading(false)
        let header = {
            Authorization: "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNlYjI0N2Y5YmJjMDRlNjk0ZDAyNjMyMDIyZmEwYWY0ZjNlYjU1MTZiNjVmZjllNTg5YTkzZGUyNjFlZmM5NzMwMTdjMzc2OTQxMmI2YjljIn0.eyJhdWQiOiIyIiwianRpIjoiY2ViMjQ3ZjliYmMwNGU2OTRkMDI2MzIwMjJmYTBhZjRmM2ViNTUxNmI2NWZmOWU1ODlhOTNkZTI2MWVmYzk3MzAxN2MzNzY5NDEyYjZiOWMiLCJpYXQiOjE2MDUxMjQyMzAsIm5iZiI6MTYwNTEyNDIzMCwiZXhwIjoxNjM2NjYwMjMwLCJzdWIiOiI5NzkiLCJzY29wZXMiOltdfQ.bUEK9H2ZEG7JzOKJ1YPKEHnxGLUVrD1InK-B6vqvpt-Ug6CvTtVcqY0Ppb4YQmJ_5-5vNwruB-LRfQj563lLjlqCbBmkudKoLE6ogA2xZGPmZoxeAQ2lhweWlwSJrxfXAI9A8KExwavFXQUPHDgkY4hx5Dqyakxbr_AHtQYNOY0wJugDiw9Zoty-SCbz9inWBZ69aSY590VF0Znf8UyFhIAUkj8ku5q44Kn0oB1YafHaJi4WFWoJBTEsp4ZOFkKI8auxH88hVqxr7oZzEDjoX0W7xagMb5hECFA9MSl5UO_-3TE2AS5WXdtnU2e8s9W22Zo_VpPwSdcVrCplF90JXXH3LC0MenlSpIgO4wpL2cg7DEfzyQPdaW7ZIoONea_FuMAq9-kcoU0QLOn9c-Wgv3ikTOzYisGCLSxXv2Zz1t0FgM86vKsdPd_3pvw4YR3qOvKPtlvHPv4uAXm0SXtAiABlibmXeAHZTkQ8tGn3bN-GFouUrbfYVeUIdrTdFAPIMyefbgdVjSK2ZHbWOx1UwXZM4FivwPKYaEhXf_2wOTfF424XcVZtcxX8HCPnCXVXSIVtMn9LXe6SZDLCEERYbRJ38AP8Pv2XlkUfCkJBIewfs5ttuj-kU2adHgzbtAx571ihsb1-Rh4W_mMr3NxUFrx3mls79qrW5EA7gLS7hhM"
        }
        axios.get(`https://data.tmd.go.th/nwpapi/v1/forecast/location/daily/place?province=กรุงเทพมหานคร&amphoe=ทุ่งครุ&fields=tc_max,rh&date=2020-11-12&duration=1`, { headers: header })
            .then(res => {
                setWeather(res.data)
                isLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <WrapperLoading>
                <RowLoading justify="center">
                    <LoadingGif src="/gif/loading.gif" alt="loading..." />
                </RowLoading>
            </WrapperLoading>
        )
    } else {
        return (
            <Wrapper>
                <WrapperContent>

                    {weather.WeatherForecasts.map((weather) => {
                        return (
                            <>
                                จังหวัด : {weather.location.province} <p/>
                                {weather.forecasts.map((forecasts) => {
                                    return (
                                        <>
                                            เวลา : {forecasts.time}<p/>
                                            อุณหภูมิ : {forecasts.data.tc_max}<p/>
                                        </>
                                    )
                                })}
                            </>
                        )
                    })}
                </WrapperContent>

            </Wrapper>
        )
    }
}
export default withRouter(CreateBill);