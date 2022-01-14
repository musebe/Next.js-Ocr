import React, { useState, useRef, useEffect } from 'react';
import {
  Cloudinary,
  Top,
  TopCenter,
  TopImg,
  TopLeft,
  TopTitle,
  TopText,
} from '../styles/topbar';
import VideoSnapshot from 'video-snapshot';

import {
  Flex,
  Button,
  Container,
  Title,
  Video,
  VideoContainer,
  UploadButton,
  Status,
  Text,
  TextContainer,
} from '../styles/ocr';
import Link from 'next/link';
import { useScreenshot } from 'use-react-screenshot';


function OCR() {
  const videoRef = useRef(null);
  const inputRef = useRef(null);
  const resultRef = useRef(null);

  const [video, setVideo] = useState();
  const [link, setLink] = useState('');
  const [result, setResult] = useState('');
  const [textpreview, setTextPreview ] = useState(false)

  const [image, takeScreenshot] = useScreenshot();

  var snapshoter;
  let url = [];

  const videoHandler = async (e) => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files?.item(0);
    setVideo(file);
  };

  const handleRecognition = async () => {
    setTextPreview(true)
    snapshoter = new VideoSnapshot(video);
    const currentTime = videoRef.current.currentTime;
    const videoPreview = await snapshoter.takeSnapshot(currentTime);
    handleOCR(videoPreview);
  };

  const handleOCR = async (preview) => {
    try {
      fetch('/api/tesseract', {
        method: 'POST',
        body: JSON.stringify({ data: preview }),
        headers: { 'Content-Type': 'application/json' },
      }).then((response) => {
        console.log(response.status);
        response.json().then((data) => {
          url.push(data);
          textHandler(url[0]);
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const textHandler = (txt) => {
    const text = txt?.message;
    const cleaned_Text = text.replace(/[^a-zA-Z ]/g, '');
    setResult(cleaned_Text);
    takeScreenshot(resultRef.current);
  };

  async function handleCloudinary() {
    try {
      fetch('/api/cloudinary', {
        method: 'POST',
        body: JSON.stringify({ data: image }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((data) => {
          setLink(data.data);
        });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <Top>
        <TopLeft>
          <Link href="https://nextjs.org/docs" passHref>
            <a>
              {' '}
              <TopImg src="https://www.creative-tim.com/assets/frameworks/icon-nextjs-552cecd0240ba0ae7b5fbf899c1ee10cd66f8c38ea6fe77233fd37ad1cff0dca.png" />
            </a>
          </Link>
          <TopText>Next js</TopText>{' '}
          <Link href="https://cloudinary.com/" passHref>
            <Cloudinary src="https://res.cloudinary.com/cloudinary-marketing/images/dpr_2.0/c_scale,w_300,dpr_3.0/f_auto,q_auto/v1638460217/website_2021/cloudinary_logo_blue_0720/cloudinary_logo_blue_0720.png?_i=AA" />
          </Link>
        </TopLeft>
        <TopCenter>
          <TopTitle>VIDEO CHARACTER RECOGNITION</TopTitle>
        </TopCenter>
      </Top>
      <Container>
        <VideoContainer>
          <Title> Video snapshot 🎥</Title>

          <Button title="click to select video" onClick={videoHandler}>
            Select Video
          </Button>
          <input ref={inputRef} type="file" hidden onChange={handleChange} />
          {video ? (
            <Video
              ref={videoRef}
              className="Video"
              controls
              src={URL.createObjectURL(video)}
            ></Video>
          ) : (
            <Video title="video shows here" controls></Video>
          )}
          <Flex>
            <Button
              title="click to begin text recognition"
              onClick={handleRecognition}
            >
              Recognize Text 📝
            </Button>
          </Flex>
        </VideoContainer>
        {result ? (
          <TextContainer>
            <Status>
              {link ? (
                  <a href={link}>
                    <Text>{link}</Text>
                  </a>
              ) : (
                'text link shows here'
              )}
            </Status>
            
            <Text ref={resultRef}>{result}</Text>
            <UploadButton
              title="upload generated PDFs"
              onClick={handleCloudinary}
            >
              Get text link
            </UploadButton>
          </TextContainer>
        ) : (
          <TextContainer>
            {textpreview? "please wait..." : "texts show here"}
          </TextContainer>
        )}
      </Container>
    </>
  );
}
export default OCR;
