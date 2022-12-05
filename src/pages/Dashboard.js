import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';

const Dashboard = () => {
  // retrieve isLoading from context
  const { isLoading } = React.useContext(GithubContext);

  if (isLoading) {
    return (
      <main>
        <Navbar />
        <Search />
        <img src={loadingImage} className='loading-img' alt='loading' />
      </main>
    )
  }

  return (
    <main>
      {/* <h2>Dashboard Page</h2> */}
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;
