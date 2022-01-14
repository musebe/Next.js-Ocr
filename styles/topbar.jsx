import styled from '@emotion/styled';

export const Top = styled.div`
  width: 100%;
  height: 60px;
  background-color: #fff;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  z-index: 999;
  box-shadow: 2px 5px 15px 0px #17161694;
  font-family: 'Josefin Sans', sans-serif;
`;

export const TopLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  
`;
 
export const TopRight = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  margin-right: 50%;
`;

export const TopCenter = styled.div`
  flex: 9 ;  
`;
export const TopText = styled.p`
  font-size: 10px;
`
export const TopTitle = styled.li`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  list-style: none;
  margin-right: 70px;
  font-size: 21px;
  font-weight: 300;
  cursor: pointer;
  &: hover;
`;

export const TopImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 5px;
  cursor: pointer;
`;

export const Cloudinary = styled.img`
  width: 118px;
  height: 17px;
  margin-right: 10px;
  margin-left: 5px;
`;

export const TopIcon = styled.i`
  font-size: 10px;
  margin-right: 10px;
  color: #444;
  cursor: pointer;
`;