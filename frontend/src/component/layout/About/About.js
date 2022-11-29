import React from "react";
import "./About.css";
import { Typography } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import aboutImg from "../../../images/logo.jpg";
const About = () => {
  // const visitInstagram = () => {
  //   window.location = "";
  // };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            {/* <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "1vmax 0" }}
              // src="https://res.cloudinary.com/ddzoycpqy/image/upload/v1668173856/Founder/e_logo__zj2teh.jpg"
              src = "https://res.cloudinary.com/ddzoycpqy/image/upload/v1669566328/Founder/img_iagvix.jpg"
              alt="Founder"
            /> */}
            <img src={aboutImg} alt="aboutUs"/>
            {/* <Typography>ViTi Candles</Typography> */}
            {/* <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button> */}
            <span>
              This is a sample wesbite. Only with the
              purpose to demo final project
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
              <a
                href="https://www.youtube.com/channel/UC9xV18hJZEj-k5Fu8LgTmSQ"
                target="blank"
              >
                <YouTubeIcon className="youtubeSvgIcon" />
              </a>

              <a href="https://www.instagram.com/cua_9052/" target="blank">
                <InstagramIcon className="instagramSvgIcon" />
              </a>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
