import React from 'react';

class NotFound extends React.Component {
  render() {
    return (
      <div className='mainPage' >
        <div className="not-found">
          <div className="animation-wrapper">
            <div className="animation">
              <img
                id="gif-image"
                src="/src\assets\images\404.gif"
                alt="404 GIF"
              />
            </div>
          </div>
          <h1>404</h1>
          <h2>Page not found!</h2>
          <p>
            The page you are looking for might have been removed or is temporarily
            unavailable.
          </p>
        </div>
      </div>
    );
  }
}

export default NotFound;
