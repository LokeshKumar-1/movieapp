import {Link} from 'react-router-dom'

const RenderMovieItem = props => {
  const {data} = props
  const {id, title, posterPath} = data

  return (
    <Link to={`/movies/${id}`} className="popular-link-item">
      <li>
        <img src={posterPath} alt={title} className="popular-movies" />
      </li>
    </Link>
  )
}

export default RenderMovieItem
