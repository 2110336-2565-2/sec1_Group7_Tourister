"use client";

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const header = ({name,handle} : {name:string,handle:Function}) => {
  return (
    <div style={{margin:"0px 0px -.6rem 0px"}}>
        <button style={{margin:".3rem 0px 0px 0px",background:"white",border:"0px",transform:"translate(-2.3rem,.3rem)"}} type="button" onClick={()=>{handle}}><ChevronLeftIcon/></button>
        <h2 style={{textAlign:"center", fontWeight:"900", textShadow:"1px 0 black", letterSpacing:"1px",margin:"-2rem 0px 0px 0px"}}>{name}</h2>
    </div>
  );
};

export default header;