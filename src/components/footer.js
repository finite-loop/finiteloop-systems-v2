import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
  EmailIcon,
} from 'react-share'

class Footer extends React.Component {
  render() {
    return (
      <div className="bg-primary flex justify-center align-center flex-wrap text-white p-2 mt-1">
        <div className="flex justify-around flex-1 items-center">
          {this.props.links.map(({ item: footerLinks }) => (
            <div key={footerLinks.title}>
              {!footerLinks.newwindow && (
                <Link
                  to={footerLinks.url}
                  className="text-white text-2xl font-medium uppercase no-underline p-4"
                >
                  {footerLinks.title}
                </Link>
              )}
              {footerLinks.newwindow && (
                <a
                  href={footerLinks.url}
                  target="_new"
                  className="text-white text-2xl font-medium uppercase no-underline p-4"
                >
                  {footerLinks.title}
                </a>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-around flex-1 items-center cursor-pointer">
          Share
          <TwitterShareButton
            url={this.props.url}
            title={this.props.title}
            via="_finiteloop"
            hashtags={[this.props.hashTag]}
          >
            <TwitterIcon round size={48} />
          </TwitterShareButton>
          <LinkedinShareButton url={this.props.url} title={this.props.title}>
            <LinkedinIcon round size={48} />
          </LinkedinShareButton>
          <EmailShareButton
            url={this.props.url}
            subject={'Enquire about ' + this.props.title}
          >
            <EmailIcon round size={48} />
          </EmailShareButton>
          <FacebookShareButton
            url={this.props.url}
            quote={this.props.title}
            hashtag={'#' + this.props.hashTag}
          >
            <FacebookIcon round size={48} />
          </FacebookShareButton>
          <WhatsappShareButton url={this.props.url} title={this.props.title}>
            <WhatsappIcon round size={48} />
          </WhatsappShareButton>
        </div>
      </div>
    )
  }
}

Footer.propTypes = {
  links: PropTypes.array.isRequired,
}

export default Footer