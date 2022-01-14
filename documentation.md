###  Cloudinary Video Character Recognition

##  Introduction
In this article we create a web application that captures texts from video as well as the ability to back up your videos to cloudinary for future refference.

##  Codesandbox 

The final project demo is available on [Codesandbox]( ).

<CodeSandbox
title="video character recognition"
id=" "
/>

Get the github source code here [Github]()

##  Prerequisites

This article requires prior entry-level understanding of javascript and react

##   Sample Project Setup
In your respective projects directory generate a Nextjs app using [create-next-app CLI](https://nextjs.org/docs/api-reference/cli) :

`npx create-next-app videoOCR`

Head to the directory
 `cd videoOCR`

Install  all the required dependencies. we will use the following:

-   emotion css for styling
-   cloudinary for image uploads
-   tesseractjs for text recognition
-   use-react-screenshot to capture recognized text
-   video snapshot for capturing video frames

Use the code below to install dependancies:

`npm install @emotion/styled @emotion/react cloudinary tesseract.js use-react-screenshot video-snapshot`;

###  Backend

Let us begin with our project backend. In this project we will make two API calls, one to tesseract and another to cloudinary.

## Tesseractjs

Tesseractjs is simply a javascript library used to extract words out of images. Its service is available in several languages. In this article we will focus on the english language. 

In your `pages/api` directory, create a file named `tesseract.js`. We will use this file to access the tessaract API. 

The code below shows how the API is used. We wrap our content in an emscripted port of the Tesseract OCR Engine, set the required language then extract the text to send back our response.

For more information on this API use this  [Link](https://www.npmjs.com/package/tesseract.js/v/2.1.1).

Paste the following in the file you just created

```
import { createWorker } from 'tesseract.js';


const worker = createWorker({
  logger: m => console.log(m)
});


export default async function handler(req, res) {
  let recognizedText = ""
  const fileStr = req.body.data

  if (req.method === "POST") {

    try {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(fileStr);
      recognizedText = text
      await worker.terminate();
    } catch (error) {
      console.log('error', error);
    }
    res.status(200).json({ message: recognizedText });
    console.log('backend complete')
  }
}
```
Thats it! The code above will receive an image and extract the text content then assign the text to the `recognizedText ` variable which will then be sent to the front end as response.

Let us now create our cloudinary backend.

## Cloudinary
In this article, cloudinary's purpose will be for media upload and storage.The cloudinary website includes a free tier which can be accessed through [here](https://cloudinary.com/?ap=em). Ensure to sign up to be able to log into your dashboard where you will receive your `Cloud name` , `API Key` and `API Secret`. These 3 are   environment variables vital for you to intergrate the cloudinary services to your application.

The dashboard will look like follows:
![Cloudinary Dashboard](https://res.cloudinary.com/hackit-africa/image/upload/v1623006780/cloudinary-dashboard.png "Cloudinary Dashboard").

In your project root directory, create a new file named `.env` and fill your environment variables inside it using the format below

```
CLOUDINARY_NAME = 

CLOUDINARY_API_KEY = 

CLOUDINARY_API_SECRET=
  ```

You might be required to restart your application at this point for the project to load yur environment keys.

In the `pages/api` directory, create a file named `cloudinary.js`. We will use this to acees the cloudinary API.

First we will import cloudinary. Then we configure our environment variables using the environment keys we created in the .env file

```
var cloudinary = require("cloudinary").v2;

  

cloudinary.config({

cloud_name: process.env.CLOUDINARY_NAME,

api_key: process.env.CLOUDINARY_API_KEY,

api_secret: process.env.CLOUDINARY_API_SECRET,

});
```

Finally we introduce a handler function which takes our backend request and assigns its value to a variable named `fileStr` . The file is then uploaded to cloudinary and its cloudinary url assigned to the `uploaded_url` variable. This variable(`uploaded_url`) will then be sent back to the front end as response.

The code explained above is as follows:

```
export default async function handler(req, res) {
  let uploaded_url = '';
  const fileStr = req.body.data;

  if (req.method === 'POST') {
    try {
      const uploadedResponse = await cloudinary.uploader.upload_large(fileStr, {
        chunk_size: 6000000,
      });
      uploaded_url = uploadedResponse.secure_url;
    } catch (error) {
      console.log(error);
    }
    res.status(200).json({ data: uploaded_url });
    console.log('complete!');
  }
}
```
with our cloudinary backend intergration complete, let us now head to creating our frontend.

## FrontEnd

The front end is the part of this web application that will involve direct interraction with the user.

Start by creating a folder named `components` in the project root directory. Inside it create a file named `Ocr` and start by introducing a function called `OCR`. This function is where all the everything happens.

Your Ocr component should look as follows

```
 function OCR() {
    return(
        <div>works</works>
    )
}export default OCR;
```
in your `index` directory, replace its contents with the following to import the Ocr component
```
import OCR from "../components/Ocr"


export default function Home() {

  return (
    <>
      <OCR />
    </>
  )
}
```

we will also use our own custom font. To enable this feature in our entire application, we will have to create custom [custom document](https://nextjs.org/docs/advanced-features/custom-document) commonly used in nextjs app's html and body tags to skip the definition of sorrounding markup. To overide the nextjs default `Document`, create `./pages/_document.js` file and paste the following:
```
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;200;300;500;600;700&family=Lora:ital,wght@1,400;1,500;1,600&family=Nunito&family=Roboto:wght@400;700&family=Varela&family=Varela+Round&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

Our fonts are now intergrated. For more information on nextjs font optimization, use the following [Link](https://nextjs.org/docs/basic-features/font-optimization) 


As indicated earlier, we will use emotion css to our project.

In the `./styles` directory, create a file named `topbar.js` and paste the following codes. The codes below are will be used to style our topbar.

```
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
```

For a clearer understanding of the above components, head back to the `./components/Ocr` and import the components as shown below 
```
import {
  Cloudinary,
  Top,
  TopCenter,
  TopImg,
  TopLeft,
  TopTitle,
  TopText,
} from '../styles/topbar';
```

In your function return statement, we use the imported components to align our topbar as we see fit. In our instance, our code will look as follows

```
import {
  Cloudinary,
  Top,
  TopCenter,
  TopImg,
  TopLeft,
  TopTitle,
  TopText,
} from '../styles/topbar';
import Link from 'next/link';
 


function OCR() {
 
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
       
    </>
  );
}
export default OCR;
```
The code above results in a UI that looks as follows

![Topbar](https://res.cloudinary.com/dogjmmett/image/upload/v1642076956/topbar_lrjbjf.png "Topbar").


Now, with an idea of how emotion css works, let us proceed to build the rest of our project.

Start by replacing the page Ocr page imports with the following:

```
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
import VideoSnapshot from 'video-snapshot';


```

Notice that we have imported other components from `./styles/ocr` directory.
Let us proceed by building the components first. Like in the topbar, create a `./styles/ocr.js` file directory and opaste the following components:

```
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
```
Now head back to your Ocr component. Ensure all imports are in order.

Before we create the UIs, lets create the necessary functions that will be used.

We start by including refference variables inside the OCR function. These variables will be used to refference elements in our project DOM elements.

```
    const videoRef = useRef(null);
    const inputRef = useRef(null);
    const resultRef = useRef(null);
```
Below the above code, introduce state hooks as follows:
```
    const [video, setVideo] = useState();
    const [link, setLink] = useState('');
    const [result, setResult] = useState('');
    const [textpreview, setTextPreview ] = useState(false)
```
The above hooks will be used to
- set video to be analyzed
- track cloudinary link
- track recognized text 
- track recognized text container

Include the hook to capture recorded texts

`const [image, takeScreenshot] = useScreenshot();
  `

Also include the followining two variables which we will look into as we proceed
```
var snapshoter;
  let url = [];
```

We then introduce a function `videoHandler` to capture the video file selected by a user for preview by the respective video tag. The video handler will activate an input tag with the `inputRef` hook. the input tag will use `onChange` property to activate the hancleChange function below 

```
const handleChange = (e) => {
    const file = e.target.files?.item(0);
    setVideo(file);
  };
```

Once the video has been selected the user will play the video untill they pause on the required frame to retrieve the text. The user will then use a button to fire an `onClick` property to activate the `handleRecognition` function. The handleRecognition function will use `VideoSnapshot` from the `video-snapshot` dependency to capture the present frame and pass it to the `handleOCR` function. The function will receive the image as prop and use post method to access our tessaractAPI with our image in its body. 
```
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

```
In the code above, after posting our image, our response is passed to the `textHandler` function. The function extracts the texts and uses the string replace function to remove andwanted characters using a single regex expression

```
const textHandler = (txt) => {
    const text = txt?.message;
    const cleaned_Text = text.replace(/[^a-zA-Z ]/g, '');
    setResult(cleaned_Text);
    takeScreenshot(resultRef.current);
};
```
The function as viewed above then captures the extracted text using react screenshot library we imported earlier.

A user will be able to activate the cloudinary backup feature through a button that will fire the `handleCloudinary` function. 

This function will fetch the cloudinary backend and use post method to pass the captured image body to the cloudinary backend. Once the cloudinary link has been processed, the response link will be received and we use the useState hook to set the variable `link` to the url.

With the above complete, we can now head to our return statement where we included our top bar. Below the top bar, Introduce a container with the following:
```
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
```

In the code above, We start by introducing the title component.
We then introduce a video container which contains a button to activate the input file tag below it. The tag will be hidden since its not neccesary to be viewed by the user. 
There will be an empty video tag displayed up untill when the user selects their own video which will replace the empty one. When the user pauses on their respective frame, They will use the `recognize text` button to fire the `handleRecognition` function.

Alongside the `VideoContainer` component will be the `TextContainer` component which will use statehooks to inform the user on the progress of the recognized text text.

The component will include a `status` component which will update user on the cloudinary link update, a `Text` component to contain the recognized text and `UploadButton` component to update the `status` component.

The UI from the above code looks as follows:
![Final_UI](https://res.cloudinary.com/dogjmmett/image/upload/v1642080467/full_UI_u0oxup.png "final_UI").

That consludes our article's project. I hope you try it out and enjoy the experience.

Happy coding!