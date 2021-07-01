import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
const imag='./sun.svg'
const Sun = styled.div`
background-image:'url(${imag})';
border-radius: 50%;
  position: fixed;
  top: 3%;
  left: 45%;
  z-index: 1;
  width: 20%;
  max-width: 150px;
  img {
    width: 100%;
    opacity: 0.6;
  }
`;

export default ({img}) => {

  const [resetSun, setResetSun] = useState(false);

  const propsSun = useSpring({
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
    onRest: () => setResetSun(state => !state),
    config: { duration: 20000 },
    reset: resetSun
  });

  return (
    <Sun>
       
      {/* <animated.img src={img} alt="sun" style={propsSun} /> */}
      {/* <animated.img src={img} alt="sunz" style={propsSun} /> */}
      <animated.img src={"sun.svg"} alt="sunz" style={propsSun} />
    </Sun>
  );
};