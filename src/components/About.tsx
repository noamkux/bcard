import { FunctionComponent } from "react";

interface AboutProps {
    
}
 
const About: FunctionComponent<AboutProps> = () => {
  return (
    <div className="component-container container header mt-5">
      
      <h1>About Us</h1>
      <p>
        Welcome to our BCard website! We are dedicated to providing a platform
        that connects businesses and individuals seeking services. Our mission
        is to make it easy for you to find the right professional for your needs
        or to showcase your own business.
      </p>
      <h2>Our Vision</h2>
      <p>
        Our vision is to create a vibrant community where businesses and service
        providers can connect with their target audience. We believe in
        fostering meaningful relationships and helping people discover services
        that align with their needs.
      </p>
      <h2>How It Works</h2>
      <p>
        BCard is designed to simplify the process of finding and connecting with
        businesses. Our platform features a comprehensive list of businesses and
        services across various categories. You can easily navigate through the
        listings, explore detailed information about each business, and make
        informed decisions.
      </p>
      <h2>Why Choose BCard</h2>
      <p>
        Choosing BCard offers several benefits. Whether you're a business owner
        or someone seeking services, our platform provides the following
        advantages:
      </p>
      <ul>
        <li>Wide range of categories to choose from</li>
        <li>Easy access to detailed business profiles</li>
        <li>User-friendly interface for smooth navigation</li>
        <li>Opportunity to showcase your business to a wider audience</li>
        <li>Efficient communication between businesses and customers</li>
      </ul>
      <h2>Get Started</h2>
      <p>
        Ready to explore what BCard has to offer? Browse through our listings,
        discover top-notch businesses, and connect with professionals who can
        cater to your needs. If you're a business owner, don't miss the
        opportunity to join our community and reach potential customers.
      </p>
      <p>
        Thank you for choosing BCard. We're excited to have you on board!
      </p>
    </div>
  );
};

export default About;