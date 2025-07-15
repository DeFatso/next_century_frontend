import React from "react";
import { Link } from "react-router-dom";

export default function SignInPage() {
  return (
    <div className="auth-page">
      <div className="logo">
        <h1>21st</h1>
        <h1>CENTURY</h1>
        <h1>ED</h1>
      </div>

      <div className="auth-form">
        <h2>Login</h2>
        
        <form>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input 
                type="password" 
                id="password" 
                placeholder="Enter your password" 
                required 
              />
              <span className="toggle-password">Hide</span>
            </div>
          </div>
          
          <button type="submit" className="login-button">Login</button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <button className="google-auth">
          Continue with Google
        </button>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
