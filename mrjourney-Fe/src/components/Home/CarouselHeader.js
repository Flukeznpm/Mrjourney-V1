import React from 'react';
import BgSlide1 from '../../static/img/pr-02.png';
import styled from "styled-components";

const ImgCover = styled.img`
    height: 100%;
    width: 100%;
    /* object-fit: cover; */
`;

const CarouselHeader = () => {
    return (
        <div>
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <ImgCover class="d-block" src="/img/Carousel-1.png" alt="First slide" />
                    </div>
                    <div class="carousel-item">
                        <ImgCover class="d-block" src="/img/Carousel-2.png" alt="Second slide" />
                    </div>
                    <div class="carousel-item">
                        <ImgCover class="d-block" src="/img/Carousel-3.png" alt="Third slide" />
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
    )
}


export default CarouselHeader;