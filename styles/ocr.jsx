import styled from '@emotion/styled';

export const Container = styled.div`
  margin-left: 4%;
  margin-top: 3%;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  font-family: 'Josefin Sans', sans-serif;
`;

export const Title = styled.li`
  display: flex;
  justify-content: center;
  margin: 0%;
  padding: 0%;
  list-style: none;
  margin-right: 20px;
  font-size: 21px;
  font-weight: 300;
  cursor: pointer;
  &: hover;
`;

export const VideoContainer = styled.div`
  text-align:center;
  margin:auto;
`

export const Button = styled.div`
    color: black;
    cursor: pointer;
    margin-top:5%;
    font-size: 16px;
    font-weight: 400;
    line-height: 45px;
    max-width: 100%;
    position: relative;
    text-decoration: none;
    text-transform: uppercase;
    width: 100%;
    // border: 1px solid;
    overflow: hidden;
    position: relative;
    &:after {
        background: red;
        content: "";
        height: 155px;
        left: -75px;
        opacity: 0.2;
        position: absolute;
        top: -50px;
        transform: rotate(35deg);
        transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
        width: 50px;
        z-index: -10;
    }
    &:hover {
      transform: scale(1.5);
        text-decoration: none;
        :after {
            left: 120%;
            transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
        }
    }
`;

export const Video = styled.video`
  width: 35vw;
  height: 25vw;
  margin: 1rem;
  background: #2c3e50;
`;

export const TextContainer = styled.div`
  text-align: center;
  margin-left: 5%;
  padding 10 10 10;
  width: 35vw;
  margin-top: 15%;
  margin-right: 15%;
`
export const UploadButton = styled.button`
  padding: 10px;
  font-size: 12px;
  border-radius: 0.7rem;
  color: white;
  border:0px;
  font-weight: bold;
  margin-top: 30px;
  padding: 1em 3em;
  background-size: 300% 300%;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  background-color: #f50057;
  &: hover {
    transform: scale(1.1);
  }
`;

export const Text = styled.p`
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 200px;
  height : 50px
`

export const Status = styled.div`
  background-color: #d4d4d4;
  border-radius: 0.5rem;
  margin-right: 0.5rem;
  font-weight: 10;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const Flex = styled.div`
  display: flex;
`;