import { Component } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../utilities/users-service';
import WeatherMingleLogo from '../../images/WeatherMingleLogo.png';

export default class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        error: ''
    };

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value,
            error: ''
        });
    };

    handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const { email, password } = this.state;
            const formData = { email, password };
            // The promise returned by the login service
            // method will resolve to the user object included
            // in the payload of the JSON Web Token (JWT)
            const user = await login(formData);
            this.props.setUser(user);
        } catch {
            // An error occurred during login
            this.setState({ error: 'Login Failed - Check your credentials' });
        }
    };

    render() {
        return (
            <div>
                <img src={WeatherMingleLogo} alt="Logo" className='Logo' />
                <div className="form-container">
                    <form autoComplete="off" onSubmit={this.handleSubmit}>
                        <label>Email</label>
                        <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                        <label>Password</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                        <button type="submit" className="LoginButton">LOGIN</button>
                    </form>
                </div>
                <p className="error-message">&nbsp;{this.state.error}</p>
                <p className="AccountPrompt">Need to sign up?</p>
                <Link to={'/login'} className="LoginLink">Sign Up</Link>
            </div>
        );
    }
}
