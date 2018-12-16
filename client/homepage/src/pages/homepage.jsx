import React, { Component } from 'react';
import InfoblocksFrame from '../components/frames/infoblocks-frame';
import Infoblock from '../components/infoblock';
import AboutMeFrame from "../components/frames/aboutme-frame";
import GreetingBox from "../components/greetingbox";
import Avatar from "../components/avatar";

import { Container, Divider } from 'semantic-ui-react'

class Homepage extends Component {
  render() {
    const avatarPic = "images/zachary-graham-pic.jpeg";
    const name = "Zachary R. Graham";
    return (
      <Container>
        <br/>
        <AboutMeFrame>
          <Avatar src={avatarPic}/>
          <GreetingBox name={name}/>
        </AboutMeFrame>
        <Divider />
        <InfoblocksFrame>
          <Infoblock href="https://www.scu.edu" qckDesc="My Alma Mater" iconClass="university" infoText="SCU" />
          <Infoblock href="mailto:zgraham@scu.edu" qckDesc="Email Me" iconClass="mail" infoText="zgraham@scu.edu" />
          <Infoblock href="https://github.com/zgrahambo" qckDesc="My Github" iconClass="github" infoText="zgrahambo" />
          <Infoblock href="" qckDesc="Home" iconClass="home" infoText="Santa Clara, CA" />
          <Infoblock href="documents/Zachary_Graham_Resume.pdf" qckDesc="My Resume" iconClass="file pdf outline" infoText="Resume" />
          <Infoblock href="https://www.ebay.com" qckDesc="My Workplace" iconClass="suitcase" infoText="eBay" />
          <Infoblock href="/spa" qckDesc="Spotify Collaborative Playlist Analyzer" iconClass="spotify" infoText="Spotify Collab-Playlist Analyzer" />
        </InfoblocksFrame>
      </Container>
    );
  }
}

export default Homepage;
