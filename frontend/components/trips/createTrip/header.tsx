"use client";

const header = ({name,handle} : {name:string,handle:Function}) => {
  return (
    <div style={{margin:"0px 0px -10px 0px"}}>
        <button style={{margin:"5px 0px 0px 0px"}} type="button" onClick={()=>{handle}}>Back</button>
        <h1 style={{textAlign:"center", fontWeight:"900", textShadow:"1px 0 black", letterSpacing:"1px",margin:"-35px 0px 0px 0px"}}>{name}</h1>
    </div>
  );
};

export default header;