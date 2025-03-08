import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Space } from "antd";

const MobileCard = ({obj}) => {

    return(
      
        obj?.map((list, index)=>{
            return (
                <>
                 <div className="grid-container-element">
                    <div className="grid-child-element purple"> 
                    {Object.keys(obj[index])} : </div>
                    <div className="grid-child-element green">
                    {Object.values(obj[index])}
                        </div>
                </div>
                </>
            )
        })

        
       
  
)
}

export default MobileCard;