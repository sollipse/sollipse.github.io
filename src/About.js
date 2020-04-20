import React, { useState } from "react";
import { styled } from "linaria/react";
const Container = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const TextContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  padding: 0px 30px;
`;

const SectionTitle = styled.h3`
  font-family: Oxanium;
  font-size: 60px;
  color: red;
  @media only screen and (max-width: 600px) {
    font-size: 40px;
  }
`;

const Paragraph = styled.p`
  font-family: Open Sans;
  line-height: 1.6em;
  font-size: 25px;
  margin-top: -30px;
  margin-left: 5px;
  a {
    color: red;
  }
  @media only screen and (max-width: 600px) {
    font-size: 20px;
    a {
      margin: 0 !important;
    }
  }
`;

const Image = styled.img`
  margin-bottom: 20px;
  width: 100%;
  max-width: 200px;
  border-radius: 100%;
  margin-right: 30px;
  border: 6px solid red;
  float: left;
  @media only screen and (max-width: 600px) {
    max-width: 100%;
  }
  opacity: ${(p) => (p.loaded ? 1 : 0)};
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
  font-size: 32px;
  padding: 20px;
  cursor: pointer;
  color: red;
  transition: all 0.3s ease;
  &:hover {
    color: white;
  }
`;

export default () => {
  let [loaded, setLoaded] = useState(false);
  return (
    <Container>
      <a href="#">
        <Button>{"<"}back</Button>
      </a>
      <TextContainer>
        <div style={{ height: 60 }}></div>

        <SectionTitle>Biography</SectionTitle>
        <Paragraph>
          {!loaded && (
            <div style={{ width: 200, height: 200, float: "left" }} />
          )}
          <Image
            onLoad={() => setLoaded(true)}
            {...{ loaded }}
            src="https://pk-resume.s3-us-west-2.amazonaws.com/27892933_423327414762672_6560785457737629696_n.jpg"
          />
          <b>I'm Paul</b>, your friendly neighborhood front-end engineer. For
          the past six years, I've worked in the field of Computer Vision to
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
              <a style={{ marginLeft: 48 }} href="mailto:paulkang@amazon.com">
                solipsistic@berkeley.edu
              </a>
            </div>
            <div>
              Github:{" "}
              <a style={{ marginLeft: 32 }} href="https://github.com/sollipse">
                sollipse
              </a>
            </div>

            <div>
              LinkedIn:{" "}
              <a
                style={{ marginLeft: 10 }}
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
