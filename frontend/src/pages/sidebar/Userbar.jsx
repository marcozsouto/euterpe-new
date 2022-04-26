import React, { useState } from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const UserBarStyle =  styled.div`
     position: absolute;
     left: 0;
     z-index: 11;
     font-size: 0.9rem;
     ${props => props.width <= 425 ? `
          background-image: linear-gradient(rgba(41, 41, 41,.1),rgba(41, 41, 41,1));
          width: 100%;
          height: 60px;
          bottom: 0;
     ` : `
          background-color: #141414;
          white-space: nowrap;
          overflow-x: hidden;
          top: 0;
          width: 80px;
          height: 100%;
          transition: 0.4s;
          &:hover {
               width: 250px;
               transition: 0.4s;
          }
     `}
`;

const ListUl = styled.ul`
     padding: 0px 20px !important;
     list-style-type: none;
     > li {
          padding: 5px 10px;
          color: white;
          font-weight: 600;
          transition: 0.4s;
          border-radius: 5px;
          margin: 5px 0px;
          &:hover {
               cursor: pointer;
               background-color: #1e1e1e;
          }
     }
`;

const LiMenu = styled.li`
     list-style-type: none;
     color: #B8B8B8;
     font-weight: 400;
     margin: 15px;
`;

const StyledLink = styled(Link)`
     color: unset;
     text-decoration: none;
     &:hover {
          color: unset;
     }
`;

const Title = styled.h1`
     color: white;
     font-weight: 600;
     padding-top: 1rem;
     padding: 0px 20px;
     margin-top: 20px;
`;

export default function UserBar(props){

     return (
          <UserBarStyle width={props.width}>
               <Title>Music</Title>
               <ListUl>
                    <li><StyledLink>Listen now</StyledLink></li>
                    <li><StyledLink>Browse</StyledLink></li>
                    <li><StyledLink>Radio</StyledLink></li>
                    <li><StyledLink>Search</StyledLink></li>
               </ListUl>
               <LiMenu>LIBRARY</LiMenu>
               <ListUl>
                    <li><StyledLink>Recently Added</StyledLink></li>
                    <li><StyledLink>Artists</StyledLink></li>
                    <li><StyledLink>Albums</StyledLink></li>
                    <li><StyledLink>Songs</StyledLink></li>
               </ListUl>
               <LiMenu>PLAYLISTS</LiMenu>
               <ListUl>
                    <li><StyledLink>All Playlists</StyledLink></li>
               </ListUl>
          </UserBarStyle>
     );
}