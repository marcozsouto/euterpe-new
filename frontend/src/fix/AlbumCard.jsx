import React from "react";
import styled from 'styled-components';

const CardImage = styled.img`
     width: 100%;
     height: calc(var(--column-width) - 30px);
     object-fit: cover;
     border-radius: 10%;
     box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
`;

const CardBackground = styled.div`
     background-color: #262626;
     width: var(--column-width);
     height: 100%;
     border-radius: 5%;
     padding: 15px;
     box-shadow: 0 .125rem .25rem rgba(0,0,0,.075);
     transition: 0.4s;
     &:hover {
          cursor: pointer;
          background-color: #303030;
     }
`;

const DivImg = styled.div`
     position: relative;
     width: 100%;
     margin-bottom: 10px;
`;

const Divtext = styled.div`
     min-height: 55px;
`;

const Title = styled.div`
     color: white;
     font-size: 0.9rem;
     font-weight: 600;
`;

const SubTitle = styled.div`
     color: white;
     font-size: 0.8rem;
     font-weight: 300;
`;

const PlayButton = styled.button`
     position: absolute;
     display: block;
     right: 8px;
     bottom: 14px;
     background-color: rgba(122, 122, 122, 0.9);
     color: white;
     font-size: 0.9rem;
     opacity: 0;
     transition: 0.4s;
     width: 30px;
     height: 30px;
     -moz-border-radius: 20px;
     -webkit-border-radius: 20px;
     background-image: url('/images/play.svg');
     background-position:60% 55%;
     background-repeat:no-repeat;   
     &:hover {
          background-color: #F05E54;
     }
     ${CardBackground}:hover &{
          opacity: 1;
     }
`;

function formatText(text, length){
     if(!text || text.trim() == '' || typeof text != 'string') return false;
     else if(text.length >= length) return `${text.slice(0, length-3)}...`;
     else return text;
}

export default function AlbumCard(props){
     return (
          <>
               <CardBackground>
                    <DivImg>
                         <CardImage src={props.info.img}/>
                         <PlayButton></PlayButton>
                    </DivImg>
                    <Divtext>
                         <Title>{formatText(props.info.title, 21) || 'No name passed'}</Title>
                         <SubTitle>{formatText(props.info.subTitle, 44)|| 'No name passed'}</SubTitle>
                    </Divtext>
               </CardBackground>
          </>
     );
}