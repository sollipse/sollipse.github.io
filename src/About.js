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
  font-family: Orbitron;
  font-size: 60px;
  color: red;
`;

const Paragraph = styled.p`
  font-family: Raleway;
  line-height: 1.6em;
  font-size: 25px;
  margin-top: -30px;
  margin-left: 5px;
  a {
    color: red;
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

export default () => {
  let [loaded, setLoaded] = useState(false);
  return (
    <Container>
      <TextContainer>
        {loaded}
        <SectionTitle>Who I am</SectionTitle>
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
          I worked on the facial recognition technology used by{" "}
          <a href="https://www.thorn.org/about-our-fight-against-sexual-exploitation-of-children/">
            Thorn
          </a>{" "}
          to fight sex trafficking. I also worked on the document analysis
          technology used by{" "}
          <a href="https://aws.amazon.com/textract/customers/">
            Change Healthcare
          </a>{" "}
          to process medical documents for millions of patients and doctors.
          It's important to me that the things I build are used by the right
          people, for the right reasons.
        </Paragraph>
        <br></br>
        <Paragraph>
          <b>The future is coming faster by the day.</b> For those of us with
          the power to enact change, it is our duty to ensure the march of
          progress doesn't trample over the rare and precious things that make
          us human.
        </Paragraph>
        <SectionTitle style={{ color: "white", fontSize: 40 }}>
          Get in touch
        </SectionTitle>
        <Paragraph>
          <Row>
            <div>
              Email:{"    "}
              <a style={{ marginLeft: 46 }} href="mailto:paulkang@amazon.com">
                solipsistic@berkeley.edu
              </a>
            </div>
            <div>
              Github:{" "}
              <a style={{ marginLeft: 33 }} href="https://github.com/sollipse">
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
