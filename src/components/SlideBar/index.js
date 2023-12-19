import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class SlideBar extends Component {
  render() {
    const {data} = this.props

    const setting = {
      dots: false,
      infinite: true,
      speed: 800,
      slidesToShow: 4,
      slidesToScroll: 4,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 3,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
      ],
    }

    return (
      <Slider {...setting} className="slider-parent-container">
        {data.map(item => {
          const {id, posterPath, title} = item
          return (
            <Link to={`/movies/${id}`} className="list-el" key={id}>
              <img src={posterPath} alt={title} className="slider-images" />
            </Link>
          )
        })}
      </Slider>
    )
  }
}

export default SlideBar
