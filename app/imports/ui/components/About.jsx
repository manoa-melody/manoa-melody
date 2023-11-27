import React from 'react';
import { Image } from 'react-bootstrap';

const About = () => (
  <>
    <Image fluid src="/images/campus-manoa-valley.jpg" />
    <div className="text-on-image px-2">
      <h1 className="pb-4">
        Welcome to Mānoa Melody!
      </h1>
      <h2>
        Mānoa Melody aims to connect University of Hawaii at Mānoa students through music!
      </h2>
      <h2>
        Music is a powerful tool that allows people to express themselves freely while helping them share their personal experiences.
      </h2>
      <h2>
        Users can choose what instruments they are interested in or music genres they enjoy and are matched with UH Mānoa students who share the same interests.
      </h2>
      <h2>
        Upload and explore musical events hosted by students and the university and meet new people!
      </h2>
    </div>
  </>
);

export default About;
