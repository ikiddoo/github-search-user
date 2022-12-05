import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  // retrieve auth0 states from useAuth0 lib
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0();
  console.log({ isAuthenticated, user, isLoading });

  // check if user isAuthenticated and user is present.
  const isUser = isAuthenticated && user;

  return (
    <Wrapper>
      {/* display user picture */}
      <div>
        {isUser && user.picture && <img src={user.picture} alt={user.name} />}
        {/* display user name */}
        {isUser && user.name && <h4>Welcome, <strong>{user.nickname.toUpperCase()}</strong></h4>}
        { // check if isUser logged in, then show logout. else, show login. 
          isUser ?
            <button onClick={() => {
              logout({ returnTo: window.location.origin });
            }}>logout</button> :
            <button onClick={loginWithRedirect}>login</button>
        }
      </div>
    </Wrapper>
  )
};

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-tem
  plate-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
    margin-left: 10px; /* add margin-left */
  }
  /* add div flex style */
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;

export default Navbar;
