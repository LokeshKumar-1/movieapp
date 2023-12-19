import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
import Footer from '../Footer'
import RenderMovieItem from '../RenderMovieItem'

const statusCode = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Popular = () => {
  const [popularData, updatePopularData] = useState([])
  const [popularFetchingStatus, updateStatus] = useState(statusCode.initial)

  const fetchPopularData = async () => {
    updateStatus(statusCode.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const api = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(api, options)
    const fetchedData = await response.json()

    if (response.ok) {
      const formattedData = fetchedData.results.map(item => ({
        backdropPath: item.backdrop_path,
        id: item.id,
        posterPath: item.poster_path,
        title: item.title,
      }))
      console.log('Array', formattedData)
      updatePopularData(formattedData)
      updateStatus(statusCode.success)
    } else {
      updateStatus(statusCode.failure)
    }
  }

  useEffect(() => {
    fetchPopularData()
  }, [])

  const tryAgainBtnTriggered = () => {
    fetchPopularData()
  }

  const renderBodyOfThePage = () => (
    <ul className="popular-list-container">
      {popularData.map(item => (
        <RenderMovieItem key={item.title} data={item} />
      ))}
    </ul>
  )

  const loaderView = () => (
    <div className="popular-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )
  const popularFailureView = () => (
    <div className="popular-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="failure view"
        className="popular-failure-image"
      />
      <p className="popular-failure-para">
        Something went wrong. Please try again
      </p>
      <button
        className="popular-tryAgain-btn"
        type="button"
        onClick={tryAgainBtnTriggered}
      >
        Try Again
      </button>
    </div>
  )

  const renderResultOfPopularPage = () => {
    switch (popularFetchingStatus) {
      case 'INPROGRESS':
        return loaderView()
      case 'SUCCESS':
        return renderBodyOfThePage()
      case 'FAILURE':
        return popularFailureView()
      default:
        return null
    }
  }
  return (
    <div className="popular-parent-container">
      <Header />
      {renderResultOfPopularPage()}
      <Footer />
    </div>
  )
}

export default Popular
