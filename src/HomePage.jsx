import { createMedia } from "@artsy/fresnel";
import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";
import { Rating } from "semantic-ui-react";
import "semantic-ui-less/semantic.less";
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024
  }
});

/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text style={{ background: "white" }}>
    <Header
      as="h1"
      content="XpressDawa"
      // inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "3em"
      }}
    />
    <Header
      as="h2"
      content="Buying Medicine is Easy "
      // inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em"
      }}
    />
    <Button primary size="huge">
      Order Medicinces Now
      {/* <Icon name="right arrow" /> */}
    </Button>
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool
};

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Media greaterThan="mobile">
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            // inverted
            textAlign="center"
            style={{ minHeight: 700, padding: "1em 0em" }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              // inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container style={{ background: "white" }}>
                <Menu.Item as="a" active>
                  Home
                </Menu.Item>
                <Menu.Item as="a">Work</Menu.Item>
                <Menu.Item as="a">Company</Menu.Item>
                <Menu.Item as="a">Careers</Menu.Item>
                <Menu.Item position="right">
                  <Button as="a" inverted={!fixed}>
                    Log in
                  </Button>
                  <Button
                    as="a"
                    inverted={!fixed}
                    primary={fixed}
                    style={{ marginLeft: "0.5em" }}
                  >
                    Sign Up
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Media>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Media as={Sidebar.Pushable} at="mobile">
        <Sidebar.Pushable>
          {/* <Sidebar
            as={Menu}
            animation="overlay"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as="a" active>
              Home
            </Menu.Item>
            <Menu.Item as="a">Work</Menu.Item>
            <Menu.Item as="a">Company</Menu.Item>
            <Menu.Item as="a">Careers</Menu.Item>
            <Menu.Item as="a">Log in</Menu.Item>
            <Menu.Item as="a">Sign Up</Menu.Item>
          </Sidebar> */}

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              // inverted
              textAlign="center"
              style={{ minHeight: 350, padding: "1em 0em" }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size="large">
                  {/* <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item> */}
                  <Menu.Item position="right">
                    {/* <Button as="a" inverted> */}
                    <Button as="a">Log in</Button>
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment
      style={{ padding: "8em 0em" }}
      vertical
      style={{ background: "#0ddbd1" }}
    >
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Genuine Medicine
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              We take utmost effort to ensure the you get only 100% genuine
              medicine. We get your medicines delivered only through from the
              authorized channels
            </p>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Contactless Delivery
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              In this time of great pandemic, we are bound to take care of your
              safety. We provide contactless delivery to ensure your safety.
              Also, we provide our delivery boys all the necessary safety gears.
            </p>
          </Grid.Column>
          {/* <Grid.Column floated="right" width={6}>
            <Image
              bordered
              rounded
              size="large"
              src="/images/wireframe/white-image.png"
            />
          </Grid.Column> */}
        </Grid.Row>
        <Grid celled="internally" columns="equal" stackable>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Header as="h6" style={{ fontSize: "1.4em" }}>
                Want some help ?
              </Header>
              <Button size="huge" primary>
                Give us a Call Back
              </Button>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Header as="h6" style={{ fontSize: "1.5em" }}>
                Fast Delivery
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                We delivery medicines within 24hrs of ordering.*
                <br />
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid>
    </Segment>

    <Segment style={{ padding: "0em" }} vertical style={{ background: "Teal" }}>
      <Grid celled="internally" columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Testimonials
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              <em>
                “Today, breakthroughs in technology have taken healthcare to new
                heights, giving people access to vital information and
                physicians that in certain circumstances they never have had in
                the past regardless of their location. Rather than being
                preoccupied with their diagnosis or treatment options, patients
                receive an service of 24 hours, with no need to travel or wait
                for an appointment, at a fraction of the cost of a traditional
                second opinion.”
              </em>
              <p> </p>
              <br />
              <b>Dr. Michael Zahalsky</b>
              <br />
              Urology, Michael P. Zahalsky, M.D. P.A. Medical Director of
              Urologic Oncology, – Board Certified
              <br />
              <Rating icon="star" defaultRating={5} maxRating={5} />
            </p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
            <Header as="h3" style={{ fontSize: "2em" }}></Header>
            <p style={{ fontSize: "1.33em" }}>
              {/* <Image avatar src="/images/avatar/large/nan.jpg" /> */}
              “Not only do I use Activ Doctors Online PHR and online second
              medical opinion personally, but I’ve witnessed countless examples
              within our congregation where if medical records were in a
              centralized place for providers and the patient to understand, it
              could have saved somebody’s life. That’s a powerful thing, and it
              fits with our mission of empowerment.
              <br />
              <p></p>
              <b>Dr. John Gerald Yassin</b>
              <br />
              Opthamaology, Oculoplastic Surgery Fairfax Hospital, Falls Church,
              VA
              <br />
              <Rating icon="star" defaultRating={4} maxRating={5} />
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: "8em 0em" }} vertical>
      <Container text>
        <Header as="h3" style={{ fontSize: "2em" }}>
          Breaking The Grid, Grabs Your Attention
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          Instead of focusing on content creation and hard work, we have learned
          how to master the art of doing nothing by providing massive amounts of
          whitespace and generic content that can seem massive, monolithic and
          worth your attention.
        </p>
        <Button as="a" size="large">
          Read More
        </Button>

        <Divider
          as="h4"
          className="header"
          horizontal
          style={{ margin: "3em 0em", textTransform: "uppercase" }}
        >
          <a href="#">Case Studies</a>
        </Divider>

        <Header as="h3" style={{ fontSize: "2em" }}>
          Ease of Ordering
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          We understand that not everyone is comfortable with Apps. For your
          ease, we have multiple ordering methods like- calls, whatsapp message,
          online ordering. We are online Pharmacy with a local touch from your
          city.
        </p>
        <Button as="a" size="large">
          I'm Still Quite Interested
        </Button>
      </Container>
    </Segment>

    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Links" />
              <List link inverted>
                <List.Item as="a">FAQ's</List.Item>
                <List.Item as="a">Contact Us</List.Item>
                <List.Item as="a">Terms of Condition</List.Item>
                <List.Item as="a">Privacy Policy</List.Item>
              </List>
            </Grid.Column>
            {/* <Grid.Column width={3}>
              <Header inverted as="h4" content="Services" />
              <List link inverted>
                <List.Item as="a">
                  Send your Prescription on whatsApp <br />
                  Order medicines online through our website{" "}
                </List.Item>
                <List.Item as="a">Our Executive will call to confirm</List.Item>
                <List.Item as="a">
                  Bill will be sent to you. Pay online or choose for cash on
                  delivery facility
                </List.Item>
                <List.Item as="a">
                  Medicine Delivered at your door. Safely.
                </List.Item>
              </List>
            </Grid.Column> */}
            <Grid.Column width={7}>
              <Header as="h4" inverted>
                Contact Us
              </Header>
              <p>
                Service available 24/7 : +91 911-003-7097
                <br />
                &#169;2021 XpressDawa, All rights reserved
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
);

export default HomepageLayout;
