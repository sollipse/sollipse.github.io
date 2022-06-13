import React, { useState } from "react";
import { styled } from "linaria/react";
const Container = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  opacity: 0;
  animation: fadeIn 1s ease forwards !important;
  animation-delay: 2s;
  @keyframes fadeIn {
    from {
      transform: translateY(-10px);
      opacity: 0;
    }

    to {
      transform: translateY(0px);
      opacity: 1;
    }
  }
`;

const TextContainer = styled.div`
  max-width: 1000px;
  padding: 0px 30px;
`;

const SectionTitle = styled.h3`
  font-family: Oxanium;
  font-size: 40px !important;
  color: red;
  @media only screen and (max-width: 600px) {
    font-size: 20px;
  }
  line-height: .5em !important;
`;

const Paragraph = styled.p`
  text-align: justify;
  font-family: Open Sans;
  line-height: 1.6em;
  max-width: 500px;
  font-size: 17px;
  margin-top: -30px;
  margin-left: 5px;
  a {
    color: red;
  }
  @media only screen and (max-width: 600px) {
    font-size: 18px;
    a {
      margin: 0 !important;
    }
  }
`;

const Image = styled.img`
  width: 100%;
  margin-top: 20px;
  transition: all .3s ease !important;
  opacity: ${(p) => (p.loaded ? 1 : 0)} !important;
  &:hover {
    transform: scale(1.1);
  }
  width: 300px;
  margin-top: -10px;
  margin-left: -22px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Button = styled.div`
  color: white;
  font-family: Open Sans;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 30px;
  padding: 20px;
  cursor: pointer;
  color: red;
  transition: all 0.3s ease;
  &:hover {
    color: white;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const Circle = styled.div`
  border-radius: 100%;
  overflow: hidden;
  height: 250px;
  width: 250px;
  transition: all .5s ease;
`



export default () => {
  let [loaded, setLoaded] = useState(false);
  return (
    <Container>
      <a href="#">
        <Button>{"<"}back</Button>
      </a>
      <TextContainer>
        <div style={{ height: 60 }}></div>

        <Paragraph>
          {!loaded && (
            <div style={{ width: 200, height: 200, float: "left" }} />
          )}
          <ImgContainer>
          <Circle>
          <Image
            onLoad={() => setLoaded(true)}
            {...{ loaded }}
            src="https://pk-resume.s3.us-west-2.amazonaws.com/face.jpg"
          />
          </Circle>
          <SectionTitle>/about</SectionTitle>
          </ImgContainer>
          <b>I'm Paul</b>, your friendly neighborhood front-end engineer. For
          the past eight years, I've worked in the field of Computer Vision to
          make complex Machine Learning concepts accessible to everyone.
        </Paragraph>
        <br></br>
        <Paragraph>
          I helped build{" "}
          <a href="https://aws.amazon.com/rekognition/">Rekognition</a> -- an AI
          identity detection service used to{" "}
          <a href="https://www.thorn.org/about-our-fight-against-sexual-exploitation-of-children/">
            fight sex traffickers
          </a>
          , and keep public platforms free of{" "}
          <a href="https://www.fastcompany.com/90403658/amazons-ai-is-helping-companies-battle-sleazy-user-generated-content">
            obscene and violent content.
          </a>
        </Paragraph>
        <br></br>

        <Paragraph>
          I also contributed patents to{" "}
          <a href="https://venturebeat.com/2019/05/29/aws-launches-textract-machine-learning-for-text-and-data-extraction/">
            Textract
          </a>{" "}
          -- a document parsing AI service used by the US government, as well as
          companies like{" "}
          <a href="https://aws.amazon.com/textract/customers/">
            Change Healthcare
          </a>{" "}
          and{" "}
          <a href="https://aws.amazon.com/textract/customers/">
            the Washington Post
          </a>
          . I build tools to be used by the right people, for the right reasons.
        </Paragraph>
        <br></br>
        <Paragraph>
          <b>The future is coming faster by the day.</b> Those of us with the
          power to enact change have a duty to ensure the march of progress
          doesn't trample over the rare and precious things that make us human.
        </Paragraph>
        <SectionTitle style={{ color: "white", fontSize: 40 }}>
          Get in touch
        </SectionTitle>
        <Paragraph>
          <Row>
            <div>
              Email:{"    "}
              <a style={{ marginLeft: 29 }} href="mailto:paulkang@amazon.com">
                solipsistic@berkeley.edu
              </a>
            </div>
            <div>
              Github:{" "}
              <a style={{ marginLeft: 19 }} href="https://github.com/sollipse">
                sollipse
              </a>
            </div>

            <div>
              LinkedIn:{" "}
              <a
                style={{ marginLeft: 5 }}
                href="https://www.linkedin.com/in/paul-kang-67a75494/"
              >
                Paul Kang
              </a>
            </div>
          </Row>
        </Paragraph>
      </TextContainer>
    </Container>
  );
};
