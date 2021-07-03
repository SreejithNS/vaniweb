import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";

const Cloud = styled.div`
border-radius: 50%;
  position: fixed;
  top: 9%;
  left: 01%;
  z-index: 1;
  width: 20%;
  max-width: 150px;
  img {
    width: 100%;
    opacity: 0.6;
  }
`;

export default ({img}) => {


  const propsCloud = useSpring({
    loop: true,
    from: {  x:-200, y: 0, rotate: 0 , opacity:1.0 },
    to: [
        {   x:0, y: 20, rotate: 10, opacity:0.8 },
        {   x:200, y: 20, rotate: 10, opacity:0.8 },
        {   x:400,y: 40, rotate: 0, opacity:0.7 },
        {   x:600,y: 20, rotate: 10, opacity:0.5 },
        {   x:800,y: 40, rotate: 0, opacity:0.5 },
        {   x:1000,y: 20, rotate: 10, opacity:0.3 },
        {   x:1200,y: 0, rotate: 0, opacity:0.1 },
        {   x:1500,y: -10, rotate: 10, opacity:0.0 },
      ],
    config: { duration: 11000 },

  });

  const propsCloud1 = useSpring({
    loop:  true ,
    from: {  x:-300, y: 0, rotate: 0 , opacity:1.0 },
    to: [
        {   x:-100, y: 20, rotate: 10, opacity:0.8 },
        {   x:100,y: 40, rotate: 0, opacity:0.6 },
        {   x:300,y: 20, rotate: 10, opacity:0.4 },
        {   x:550,y: 40, rotate: 0, opacity:0.2 },
        {   x:750,y: 40, rotate: 10, opacity:0.0 },
      ],
    config: { duration: 12000 },

  });

  const propsCloud2 = useSpring({
    loop:  true ,
    from: {  x:-500, y: -20, rotate: 0 , opacity:1.0 },
    to: [
        {   x:-300, y: -20, rotate: 10, opacity:0.8 },
        {   x:-100,y: -40, rotate: 0, opacity:0.6 },
        {   x:100,y: -20, rotate: 10, opacity:0.4 },
        {   x:300,y: -40, rotate: 0, opacity:0.2 },
        {   x:500,y: -60, rotate: 10, opacity:0.0 },
      ],
    config: { duration: 10000 },

  });

  const propsCloud3 = useSpring({
    loop:  true ,
    from: {  x:-600, y: -120, rotate: 0 , opacity:1.0 },
    to: [
        {   x:-400, y: -145, rotate: 10, opacity:0.8 },
        {   x:-200,y: -165, rotate: 0, opacity:0.7 },
        {   x:100,y: -170, rotate: 10, opacity:0.5 },
        {   x:400,y: -190, rotate: 0, opacity:0.5 },
        {   x:700,y: -215, rotate: 10, opacity:0.3 },
        {   x:1100,y: -195, rotate: 0, opacity:0.1 },
        {   x:1500,y: -190, rotate: 10, opacity:0.0 },
      ],
    config: { duration: 14000 },

  });

  const propsCloud4 = useSpring({
    loop:  true ,
    from: {  x:400, y: -160, rotate: 0 , opacity:0.0 },
    to: [
        {   x:600, y: -175, rotate: 10, opacity:0.1 },
        {   x:800,y: -180, rotate: 0, opacity:0.1 },
        {   x:1000,y: -185, rotate: 10, opacity:0.3 },
        {   x:1200,y: -190, rotate: 0, opacity:0.5 },
        {   x:1400,y: -215, rotate: 10, opacity:0.3 },
        {   x:1500,y: -190, rotate: 10, opacity:0.1 },
      ],
    config: { duration: 14000 },

  });

  const propsCloud5 = useSpring({
    loop:  true ,
    from: {  x:700, y: -220, rotate: 0 , opacity:0.0 },
    to: [
        {   x:900, y: -225, rotate: 10, opacity:0.1 },
        {   x:1100,y: -235, rotate: 0, opacity:0.1 },
        {   x:1200,y: -245, rotate: 10, opacity:0.3 },
        {   x:1300,y: -250, rotate: 0, opacity:0.5 },
        {   x:1400,y: -255, rotate: 10, opacity:0.3 },
        {   x:1500,y: -265, rotate: 10, opacity:0.1 },
      ],
    config: { duration: 11500 },

  });

  return (
    <Cloud>
      <animated.img src={img} alt="cloud" style={propsCloud} />
      <animated.img src={img} alt="cloud" style={propsCloud1} />
      <animated.img src={img} alt="cloud" style={propsCloud2} />
      <animated.img src={img} alt="cloud" style={propsCloud3} />
      <animated.img src={img} alt="cloud" style={propsCloud4} />
      <animated.img src={img} alt="cloud" style={propsCloud5} />
    </Cloud>
  );
};