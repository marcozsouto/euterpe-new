import React from "react";
import styled from 'styled-components';
import ListAlbums from "../../fix/lists/ListAlbums";
   
const ContainerStyle = styled.div`
     position: absolute;
     background: #1c1c1c;
     overflow-y: auto;
     ${props => props.width <= 425 ? `
          width: 100%;
          height: 100%;
     ` : `
          top: 75px;
          left: 80px;
          width: calc(100% - 80px);
          height: calc(100% - 75px);
          padding: 30px;
     `}
`;

export default function Container(props){
     return (
          <>
               <ContainerStyle width={props.width}>
                    <ListAlbums width={props.width} title={"Your Albums"}/>                                     
               </ContainerStyle>
          </>
     );
}