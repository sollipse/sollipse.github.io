import React from "react";
import { styled, css } from "linaria/react";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import { useVisible } from "react-hooks-visible";
const Container = styled.div`
  position: relative;
  margin: 100px;
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
  @media only screen and (max-width: 600px) {
    margin: 0;
  }
`;

const VertLine = styled.div`
  height: 100%;
  width: 10px;
  background: white;
  border-radius: 5px;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const Row = styled.div`
  display: flex;
  padding-bottom: 120px;
`;

let Badge = styled.div`
  z-index: 0;
  height: 40px;
  background: red;
  margin-left: -60px;
  color: white;
  font-family: Open Sans;
  font-size: 30px;
  border-radius: 5px;
  padding: 5px;
  @media only screen and (max-width: 600px) {
    display: none;
  }
  transition: all 0.3s ease;
`;

let Content = styled.div`
  transition: opacity 1s ease;
  display: flex;
  flex-direction: column;
  padding: 40px;
  margin-top: -30px;
  width: 100%;
  color: white;
  margin-left: 100px;
  max-width: 900px;
  font-size: 25px;
  font-family: Open Sans;
  line-height: 1.4em;
  position: relative;
  @media only screen and (max-width: 600px) {
    width: calc(100% - 90px);
    margin-left: 5px;
    font-size: 17px;
  }
  li {
    margin: 10px 0px;
  }
  --borderWidth: 3px;
  background: #1d1f20;
  position: relative;
  border-radius: var(--borderWidth);
  &:after {
    content: "";
    top: calc(-1 * var(--borderWidth));
    left: calc(-1 * var(--borderWidth));
    height: calc(100% + var(--borderWidth) * 2);
    width: calc(100% + var(--borderWidth) * 2);
    background: linear-gradient(0deg, black, black, black, white, white, white);
    position: absolute;
    z-index: -1;
    animation: animatedgradient 3s ease alternate infinte;
    background-size: 300% 300%;
  }

  @keyframes animatedgradient {
    0% {
      background-position: 100% 100%;
    }
    50% {
      background-position: 50% 50%;
    }
    100% {
      background-position: 0% 0%;
    }
  }
`;

const Title = styled.div`
  font-family: Oxanium;
  font-size: 35px;
  a {
    color: white;
    transition: 0.3s ease;
    &:hover {
      color: red;
    }
  }
  @media only screen and (max-width: 600px) {
    margin-left: 0;
    font-size: 25px;
  }
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  border: 2px solid white;
  margin-right: 30px;
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

const WorkItem = ({ Head, Description, Gallery, DateString }) => {
  const [targetRef, percentVisible] = useVisible();
  return (
    <Row ref={targetRef}>
      <Badge style={{ opacity: percentVisible > 0.1 ? 1 : 0 }}>
        {DateString}
      </Badge>
      <Content
        style={{
          opacity: percentVisible < 0.3 ? 0 : 1,
          transform:
            window.innerWidth < 600
              ? ""
              : `translateX(${20 - percentVisible * 20}px)`,
        }}
      >
        <div style={{ zIndex: 1 }}>
          <Title>{Head}</Title>
          {Description}
          {Gallery}
        </div>
        <div
          style={{
            top: 0,
            left: 0,
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "black",
          }}
        ></div>
      </Content>
    </Row>
  );
};

const BigTitle = styled.h1`
  display: flex;
  flex-direction: column;
  color: white;
  font-family: Oxanium;
  font-size: 50px;
  text-align: right;
  width: calc(100% - 100px);
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
  @media only screen and (max-width: 600px) {
    margin: 0;
  }
  @media only screen and (max-width: 600px) {
    margin-left: 0;
    font-size: 35px;
    margin-bottom: 60px;
    width: 100%;
    text-align: center;
  }
`;

const Link = styled.a`
  color: white;
  cursor: pointer;
  font-size: 25px;
  &:hover {
    color: red;
  }
  transition: 0.3s ease;
`;

const CUSTOM_LABELS_GALLERY = [
  "https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F321357%2Fb5b65ee9-de9c-c62a-9956-790c1da759bd.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=7921bbf2cf4538c1d6c5f42aac174390",
  "https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F321357%2Fe1d275c5-0e15-b019-b621-f84e11c6a922.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=27a51afc9864a2354628958990ce49c3",
  "https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F321357%2Fbd539c08-5dc3-f0cd-9523-aa0875a41711.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=4ce872bd35f489aff93ad954d95d5ffc",
  "https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F321357%2Ff3aa0282-1c8e-d8a2-2524-e37c3bc6e4ea.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=09402dbfa7d9d25b422bd9c086a4d156",
];

const TEXTRACT_GALLERY = [
  "https://d2908q01vomqb2.cloudfront.net/f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59/2019/05/30/textract-ga-1.gif",
  "https://d2908q01vomqb2.cloudfront.net/f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59/2019/05/30/textract-ga-2.gif",
  "https://d2908q01vomqb2.cloudfront.net/f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59/2019/05/30/textract-ga-3.gif",
  "https://d2908q01vomqb2.cloudfront.net/f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59/2019/05/30/textract-ga-4.gif",
];
export default () => (
  <SimpleReactLightbox>
    <a href="#">
      <Button>{"<"}back</Button>
    </a>
    <div style={{ height: 60 }}></div>
    <BigTitle>
      Work Timeline
      <Link
        download
        href="https://pk-resume.s3-us-west-2.amazonaws.com/Awesome_CV+(1).pdf"
      >
        download resume
      </Link>
    </BigTitle>

    <Container>
      <VertLine />
      <WorkItem
        DateString={"01/2020"}
        Head={
          <a href="https://console.aws.amazon.com/rekognition/custom-labels">
            Custom Labels
          </a>
        }
        Description={
          <p>
            The AWS Custom Labels console allows users without Machine Learning
            experience to train AI models capable of detecting custom objects.
            <br />
            Some applications of this technology include:
            <ul>
              <li>
                Measuring how many times a product organically appears in the
                Twitter and Instagram live feeds.
              </li>
              <li>Sorting product by ripeness and size</li>
              <li>Identifying malformed, warped, or miscolored products.</li>
              <li>Identifying counterfeit products.</li>
            </ul>
            The fundamental goal of Custom Labels is to create way for
            professions such as agriculture, fashion and construction to
            leverage the power of machine learning in their fields, without
            requiring a technical backround or engineering degree.
          </p>
        }
        Gallery={
          <SRLWrapper>
            {CUSTOM_LABELS_GALLERY.map((url) => (
              <a href={url} data-attribute="SRL">
                <Image src={url} />
              </a>
            ))}
          </SRLWrapper>
        }
      />

      <WorkItem
        DateString={"09/2019"}
        Head={
          <a href="https://console.aws.amazon.com/textract/home">Textract</a>
        }
        Description={
          <p>
            Textract allows customers to pull raw text, key-values, and tables
            out of images of documents. This allows businesses and government
            organizations to automate the time-consuming and hard-to-scale
            process of data entry.
            <br></br>
            <br></br>
            Files processed through Textract are CSV compatible: an organization
            can take millions of tax forms, or loan applications, and digitize
            them searchably and sanely.
            <br></br>
            <br></br>
            As of the 2020 pandemic, Textract has been used extensively by
            multiple departments of the US government to process millions of
            loan and aid application documents.
          </p>
        }
        Gallery={
          <SRLWrapper>
            {TEXTRACT_GALLERY.map((url) => (
              <a href={url} data-attribute="SRL">
                <Image src={url} />
              </a>
            ))}
          </SRLWrapper>
        }
      />
    </Container>
  </SimpleReactLightbox>
);
