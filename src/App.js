import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import './App.css'
import LoginRoute from './components/LoginRoute'
import Home from './components/Home'
import NetflixCloneContext from './context/NetflixCloneContext'
import Popular from './components/Popular'
import MovieItemDetailsPage from './components/MovieItemDetailsPage'
import SearchPage from './components/SearchPage'
import AccountRoute from './components/AccountRoute'
import NotFoundPage from './components/NotFoundPage'
import ProtectedRoute from './components/ProtectedRoute'

class App extends Component {
  state = {
    currentPage: 'HOME',
    menuStatus: false,
    dataToSearch: '',
    searchBtnStatus: false,
  }

  changePage = page => {
    this.setState({currentPage: page})
  }

  changeMenuBtnStatus = () => {
    this.setState(prevState => ({
      menuStatus: !prevState.menuStatus,
    }))
  }

  updateDataToSearch = data => {
    this.setState({dataToSearch: data})
  }

  updateSearchBtnStatus = () => {
    this.setState(prevState => ({searchBtnStatus: !prevState.searchBtnStatus}))
  }

  render() {
    const {currentPage, menuStatus, dataToSearch, searchBtnStatus} = this.state

    return (
      <NetflixCloneContext.Provider
        value={{
          currentPage,
          statusOfMenuBtn: menuStatus,
          updateCurrentPage: this.changePage,
          updateMenuBtnStatus: this.changeMenuBtnStatus,
          enteredSearchData: dataToSearch,
          updateSearchData: this.updateDataToSearch,
          isSearchBtnClicked: searchBtnStatus,
          updateStatusOfSearchBtn: this.updateSearchBtnStatus,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/popular" component={Popular} />
          <ProtectedRoute
            exact
            path="/movies/:id"
            component={MovieItemDetailsPage}
          />
          <ProtectedRoute exact path="/search" component={SearchPage} />
          <ProtectedRoute exact path="/account" component={AccountRoute} />
          <Route exact path="/not-found" component={NotFoundPage} />
          <Redirect to="/not-found" />
        </Switch>
      </NetflixCloneContext.Provider>
    )
  }
}
export default App
