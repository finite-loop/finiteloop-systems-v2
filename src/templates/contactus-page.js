import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Keys from '../../config/APIKeys'
import Layout from '../components/layout'
import { compose, withStateHandlers } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps'
import SEO from '../components/seo'
import { ValidatorForm } from 'react-form-validator-core'
import TextValidator from '../components/TextValidator'

const MapWithAMakredInfoWindow = compose(
  withStateHandlers(
    () => ({
      isOpen: true,
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen,
      }),
    }
  ),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{
      lat: props.contactData.map.center.lat,
      lng: props.contactData.map.center.long,
    }}
  >
    <Marker
      position={{
        lat: props.contactData.map.position.lat,
        lng: props.contactData.map.position.long,
      }}
      onClick={props.onToggleOpen}
    >
      {props.isOpen && (
        <InfoWindow onCloseClick={props.onToggleOpen}>
          <div>
            <h3 className="primary text-2xl antialiased font-medium">
              {props.siteTitle}
            </h3>
            <hr className="primary h-1 bg-primary" />
            <span className="secondary text-base">
              {props.contactData.address1}
              <br />
              {props.contactData.address2}
              <br />
              {props.contactData.cityPIN}, {props.contactData.stateCountry}
              <br />
              {props.contactData.phone} | {props.contactData.email}
            </span>
          </div>
        </InfoWindow>
      )}
    </Marker>
  </GoogleMap>
))

const GoogleMapsUrl =
  'https://maps.googleapis.com/maps/api/js?key=' +
  Keys.googleMapsAPIKey +
  '&v=3.exp&libraries=geometry,drawing,places'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

class ContactForm extends React.Component {
  state = {
    open: false,
    firstname: '',
    lastname: '',
    email: '',
    message: '',
    company: '',
    submitError: '',
  }

  handleChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({ [name]: value })
  }

  handleNetworkError = () => {
    this.setState({ submitError: 'There was a network error.' })
  }

  handleSubmit = (e, state) => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'Contact', ...this.state }),
    })
      .then(() => {
        console.log('Form submission success')
        this.setState({ open: true, ...state })
      })
      .catch(error => {
        console.error('Form submission error:', error)
        this.handleNetworkError()
      })

    e.preventDefault()
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { contactus, global } = this.props.data
    const {
      email,
      firstname,
      lastname,
      message,
      company,
      submitError,
    } = this.state

    return (
      <Layout>
        <Helmet
          title={
            global.frontmatter.siteTitle + ' | ' + contactus.frontmatter.title
          }
        />
        <h1 className="lg:px-10 py-4 sm:px-2 text-xl">
          {contactus.frontmatter.heading}
        </h1>
        <p className="para-secondary lg:px-10 py-4 sm:px-2">
          {contactus.frontmatter.subheading}
        </p>
        <div className="flex flex-col lg:px-10 sm:px-2">
          <ValidatorForm
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
            name="Contact"
            ref={f => (this.form = f)}
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="pb-5"
          >
            {submitError && <p className="">{submitError}</p>}
            <TextValidator
              id="firstname"
              name="firstname"
              placeholder="First Name"
              value={firstname}
              onChange={this.handleChange}
              validators={['required']}
              errorMessages={['This field is required']}
              margin="normal"
              className="input-field"
            />
            <TextValidator
              id="lastname"
              name="lastname"
              placeholder="Last Name"
              value={lastname}
              onChange={this.handleChange}
              validators={['required']}
              errorMessages={['This field is required']}
              margin="normal"
              className="input-field"
            />
            <TextValidator
              id="email"
              name="email"
              placeholder="E-mail"
              value={email}
              onChange={this.handleChange}
              validators={['required', 'isEmail']}
              errorMessages={['This field is required', 'E-mail is not valid']}
              margin="normal"
              className="input-field"
            />
            <TextValidator
              id="company"
              name="company"
              placeholder="Company Name"
              value={company}
              onChange={this.handleChange}
              margin="normal"
              className="input-field"
            />
            <TextValidator
              id="message"
              name="message"
              placeholder="Message"
              value={message}
              onChange={this.handleChange}
              validators={['required']}
              errorMessages={['This field is required']}
              margin="normal"
              className="input-field"
            />
            <input name="bot-field" style={{ display: 'none' }} />
            <br />
            <div style={{ alignItems: 'center' }}>
              <button
                type="submit"
                className="bg-primary hover:bg-grey-darker text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </ValidatorForm>
          <div className="maps">
            <MapWithAMakredInfoWindow
              googleMapURL={GoogleMapsUrl}
              loadingElement={<div style={{ height: '100%' }} />}
              containerElement={<div style={{ height: '400px' }} />}
              mapElement={<div style={{ height: '100%' }} />}
              contactData={contactus.frontmatter}
              siteTitle={global.frontmatter.siteTitle}
            />
          </div>
        </div>
        <SEO
          postPath={contactus.frontmatter.path}
          postNode={contactus}
          postSEO
        />
      </Layout>
    )
  }
}

ContactForm.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ContactForm

export const pageQuery = graphql`
  query ContactUsQuery($path: String!) {
    contactus: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      excerpt
      frontmatter {
        path
        heading
        subheading
        title
        address1
        address2
        cityPIN
        stateCountry
        phone
        email
        submitMsg
        map {
          position {
            lat
            long
          }
          center {
            lat
            long
          }
        }
      }
    }
    global: markdownRemark(
      frontmatter: { templateKey: { eq: "global-settings" } }
    ) {
      frontmatter {
        siteTitle
      }
    }
  }
`
