import React, { Component } from 'react';
import Typical from 'react-typical';
import Switch from 'react-switch';

class Header extends Component {
  titles = [];

  constructor() {
    super();
    this.state = { checked: true };
    this.onThemeSwitchChange = this.onThemeSwitchChange.bind(this);
  }

  onThemeSwitchChange(checked) {
    this.setState({ checked });
    this.setTheme();
  }

  setTheme() {
    var dataThemeAttribute = 'data-theme';
    var body = document.body;
    var newTheme =
      body.getAttribute(dataThemeAttribute) === 'dark' ? 'light' : 'dark';
    body.setAttribute(dataThemeAttribute, newTheme);
  }

  componentDidMount() {
    this.setTheme();
  }

  render() {
    if (this.props.sharedData) {
      var name = this.props.sharedData.name;
      this.titles = this.props.sharedData.titles
        .map((x) => [x.toUpperCase(), 1500])
        .flat();
    }

    const HeaderTitleTypeAnimation = React.memo(
      () => {
        return (
          <Typical className="title-styles" steps={this.titles} loop={50} />
        );
      },
      (props, prevProp) => true
    );

    return (
      <header
        id="home"
        style={{ height: '100vh', display: 'block', zIndex: 1000 }}
      >
        <div className="row aligner" style={{ height: '70vh' }}>
          <div className="col-md-12">
            <div
              style={{
                display: 'justify-inbetween',
                position: 'flex',
              }}
            >
              <span
                className="iconify header-icon"
                data-icon="la:laptop-code"
                data-inline="false"
              ></span>
              <br />
              <h1
                className="mb-0"
                style={{ fontSize: '75px', fontFamily: 'Lato' }}
              >
                <Typical steps={[name]} wrapper="p" />
              </h1>
              <div className="title-container">
                <HeaderTitleTypeAnimation />
              </div>
              <div className="aligner">
                <a
                  href="https://github.com/sajithaliyanage"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span
                    className="iconify select-icons"
                    data-icon="la:github"
                    data-inline="false"
                  ></span>
                </a>
                <a
                  href="https://www.linkedin.com/in/sajithaliyanage"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span
                    className="iconify select-icons"
                    data-icon="la:linkedin-in"
                    data-inline="false"
                  ></span>
                </a>
                <a
                  href="https://twitter.com/sajithaliyanage"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span
                    className="iconify select-icons"
                    data-icon="la:twitter"
                    data-inline="false"
                  ></span>
                </a>
                <a
                  href="https://medium.com/@sajithaliyanage"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span
                    className="iconify select-icons"
                    data-icon="la:medium"
                    data-inline="false"
                  ></span>
                </a>
                <a
                  href="https://drive.google.com/file/d/12WyFYYKi0asVCCmrGJKCMAahh7LcsGSM/view?usp=sharing"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span
                    className="iconify select-icons"
                    data-icon="la:file-pdf"
                    data-inline="false"
                  ></span>
                </a>
                <a
                  href="mailto:sajithaliyanage@gmail.com"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span
                    className="iconify select-icons"
                    data-icon="la:envelope"
                    data-inline="false"
                  ></span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row button-swap">
          <Switch
            checked={this.state.checked}
            onChange={this.onThemeSwitchChange}
            offColor="#baaa80"
            onColor="#353535"
            className="react-switch mx-auto"
            width={90}
            height={40}
            uncheckedIcon={
              <span
                className="iconify"
                data-icon="twemoji:owl"
                data-inline="false"
                style={{
                  display: 'block',
                  height: '100%',
                  fontSize: 25,
                  textAlign: 'end',
                  marginLeft: '20px',
                  color: '#353239',
                }}
              ></span>
            }
            checkedIcon={
              <span
                className="iconify"
                data-icon="noto-v1:sun-with-face"
                data-inline="false"
                style={{
                  display: 'block',
                  height: '100%',
                  fontSize: 25,
                  textAlign: 'end',
                  marginLeft: '10px',
                  color: '#353239',
                }}
              ></span>
            }
            id="icon-switch"
          />
        </div>
      </header>
    );
  }
}

export default Header;
