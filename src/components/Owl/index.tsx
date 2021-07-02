import Illustration from "./phiranha.svg";
import BackToSchool from "./back_to_school.svg";
import { useState } from "react";

export default function Owl() {
  const [src, setSrc] = useState(BackToSchool);
  return <img style={{width:"100%",maxWidth:"300px"}} src={src} onClick={()=>setSrc(Illustration)}/>;
}
