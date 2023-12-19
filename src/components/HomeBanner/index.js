import Header from '../Header'
import './index.css'
import NetflixCloneContext from '../../context/NetflixCloneContext'

const HomeBanner = props => {
  const {banner} = props
  const {title, posterPath, overview} = banner

  return (
    <NetflixCloneContext.Consumer>
      {value => {
        const {statusOfMenuBtn} = value
        const contentStyleIfMenuOpened = statusOfMenuBtn
          ? 'ifMenuOpened'
          : 'Home-banner-content-container'

        const homeBannerContainer = {
          background: `url(${posterPath}), lightgray 50% / cover no-repeat`,
          width: '100%',
        }

        return (
          <div className="Home-banner-container" style={homeBannerContainer}>
            <Header />
            <div className={contentStyleIfMenuOpened}>
              <h1 className="banner-title">{title}</h1>
              <p className="banner-desc">{overview}</p>
              <button type="button" className="banner-play-btn">
                Play
              </button>
            </div>
          </div>
        )
      }}
    </NetflixCloneContext.Consumer>
  )
}

export default HomeBanner
