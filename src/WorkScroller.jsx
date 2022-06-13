import React, { useState } from "react";
import { styled } from "linaria/react";

const Container = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	flex-direction: column;
	align-items: center;
`;
const Header = styled.div`
	font-size: 40px;
	
`;


const WCTitle = styled.div`
	font-size: 20px;
`;
const WCContainer = styled.div`
	font-size: 18px;
	margin: 15px;
  font-family: Open Sans;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  color: white !important;
`;
const WCImage = styled.img`
	transition: all .3s ease;
	transform: scale(1.07);
	&:hover {
		transform: scale(1.12);
		opacity: 0;
		z-index: 2;
	};
	.touched {
		transform: scale(1.12);
		opacity: 0;
		z-index: 2;
	}
	max-width: 300px;
	height: 210px

	object-fit: cover;
`;
const WCImageContainer = styled.div`
	transition: all .5s ease;
  overflow: hidden;
  display: block;
	border-radius: 10px;
	position: relative;
`;
const ImageCover = styled.div`
	text-align: left;
	transition: all .3s ease;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	font-size: 16px;
	position: absolute;
`;


const WorkCard = ({
	src,
	imgSrc,
	description,
	title
}) => {
	const [touched, setTouched] = useState(false);
	return <a href={src} target="__blank"><WCContainer 
		onTouchStart={() => setTouched(true)}
		onTouchEnd={() => setTouched(false)}

	>
			<WCTitle>
			{title}
			</WCTitle>
			<div style={{height: 10}}/>
		<WCImageContainer>
		<ImageCover>
		{description}
		</ImageCover>
		<WCImage className={touched ? "touched" : ''} src={imgSrc}/>
		</WCImageContainer>
		<WCTitle>
		</WCTitle>
	</WCContainer></a>
}

const FlexContainer = styled.div`
	margin-top: 30px;
	display: flex;
	width: 100%;
	flex-wrap: wrap;
	justify-content: center;
	max-width: 80%;
	left: 0;
	right: 0;
`;
const WorkScroller = () => {
	return <Container>
	<Header>
		Selected work
	</Header>
	<FlexContainer>
	<WorkCard 
		src={"https://www.youtube.com/watch?v=d3SQ-6KnXOU"}
		imgSrc={"https://pk-resume.s3.us-west-2.amazonaws.com/Textract.png"}
		title={"AWS Textract"}
		description={<div>
			AI Service that pulls text, tables and key-values from pictures of documents. 
			<br/>
			<br/>
			<a  style={{textDecoration: 'underline', color: 'white'}}href=""> See it in action </a>
		</div>}
	/>
	<WorkCard 
		imgSrc={"https://pk-resume.s3.us-west-2.amazonaws.com/reko14.jpg"}
		src="https://www.youtube.com/watch?v=gjUwPEqnEeI"
		title={"AWS Rekognition"}
		description={<div>
			AI Service providing real-time inferences about the contents of images and videos. 
			<br/>
			<br/>
			<a  style={{textDecoration: 'underline', color: 'white'}}href=""> See it in action </a>
		</div>}
	/>
	<WorkCard 
		src="https://www.youtube.com/watch?v=5uNs7JFY9Tk"
		imgSrc={"https://pk-resume.s3.us-west-2.amazonaws.com/CustomLabels.png"}
		title={"AWS Custom Labels"}
		description={<div>
			AI Service allowing users to "build their own AI" in just a few hours with their own images 
			<br/>
			<br/>
			<a  style={{textDecoration: 'underline', color: 'white'}}href=""> See it in action </a>
		</div>}
	/>
	<WorkCard 
		src={"https://www.youtube.com/watch?v=ZK-UNVKvxoU"}
		imgSrc={"https://pk-resume.s3.us-west-2.amazonaws.com/FacebookShops.webp"}
		title={"Facebook Shops"}
		description={<div>
			Ecosystem of features in Facebook which allow sellers to sell products directly through the Meta Family of apps.
			<br/>
			<br/>
			<a  style={{textDecoration: 'underline', color: 'white'}}href=""> See it in action </a>
		</div>}
	/>
	<WorkCard 
		src={"https://www.youtube.com/watch?v=XD0vrmiPvls"}
		imgSrc={"https://pk-resume.s3.us-west-2.amazonaws.com/LiveShopping_IG_Colored.webp"}
		title={"Instagram Live Shopping"}
		description={<div>
			System in Instagram allowing sellers to sell products directly through their live videos
			<br/>
			<br/>
			<a  style={{textDecoration: 'underline', color: 'white'}}href=""> See it in action </a>
		</div>}
	/>
	</FlexContainer>
	</Container>

}

export default WorkScroller;