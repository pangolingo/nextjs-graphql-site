import Router from 'next/router'; // consider using withRouter HOC instead

import Auth from '../helpers/Auth';

class Login extends React.Component {
  state = {
    loading: false,
    email: '',
    password: ''
  }

  updateEmail = (e) => {
    this.setState({email: e.target.value})
  }

  updatePassword = (e) => {
    this.setState({password: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({loading: true});
    Auth.login(this.state.email, this.state.password).then((r) => {
      console.log(r)
      this.setState({loading: false});
      Router.push('/')
      alert('successfully logged in')
    }).catch(e => {
      console.error(e)
      this.setState({loading: false});
      alert(e.message);
    })
  }

  render() {
    return (
      <div>
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={this.updateEmail} value={this.state.email} />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={this.updatePassword} value={this.state.password} />

          <button type="submit">Log In</button>
        </form>
      </div>
    )
  }
}
export default Login