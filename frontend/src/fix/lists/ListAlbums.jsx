import React, { useState } from "react";
import styled from 'styled-components';
import albums from "../../assets/albums";
import AlbumCard from "../AlbumCard";

const Item = styled.div`
     display: flex;
     flex-direction: column;
     margin-bottom: 16px;
     min-height: 300px;
     min-width: 100%;
     position: relative;
`;

const ListItems = styled.div`
     --column-width: ${props => props.width}px;
     --column-count: ${props => props.count};
     --grid-gap: ${props => props.gap}px;
     grid-gap: var(--grid-gap);
     display: grid;
     grid-template-columns: repeat(var(--column-count),minmax(0,1fr));
     grid-auto-rows: 0;
     grid-template-rows: 1fr;
     overflow-y: hidden;
`;

const Title = styled.div`
     color: white;
     font-size: 1.7rem;
     font-weight: 700;
     flex-grow: 1;
     min-width: 0;
`;

const SubTitle = styled.a`
     color: #bbbbbb;
     font-size: 1rem;
     font-weight: 500;
     text-decoration: none;
     display: ${props => props.display == 1 ? 'block' : 'none'};
     &:hover {
          cursor: pointer;
          color: #F05E54;
     }
`;

const TitleBar = styled.div`
     align-items: flex-end;
     display: flex;
     margin-bottom: 16px;
`;



export default function ListAlbums(props){

     const count = ~~(props.width/240);

     return (
          <>
               <Item>
                    <TitleBar>
                         <Title>{props.title}</Title>
                         <SubTitle display={count < albums.length ? 1 : 0}>SEE ALL</SubTitle>
                    </TitleBar>
                    <ListItems count={count} gap={props.width > 1500 ? 12 : 24} width={190}>
                         {albums.slice(0, count).map((e) => {
                              return (<AlbumCard info={e}/>);
                         })}                                                       
                    </ListItems>
               </Item>
          </>
     );
}