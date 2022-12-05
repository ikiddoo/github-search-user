import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

// first, create context
const GithubContext = React.createContext();

// create Provider, Consumer - GithubContext.Provider
const GithubProvider = ({ children }) => {
    // create states
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);

    // create request loading states
    const [request, setRequests] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // create repo loading states
    const [repoLoading, setRepoLoading] = useState(false);
    const [repo, setRepo] = useState(null);

    // create error state
    const [error, setError] = useState({ show: false, msg: '' });

    // check rate limit
    const checkRequests = () => {
        axios(`${rootUrl}/rate_limit`)
            .then(({ data }) => {
                // destruct remaining
                let { rate: { remaining } } = data;
                setRequests(remaining);
                // check if limit has been reached
                if (remaining === 0) {
                    // throw an error.
                    toggleError(true, 'sorry, you have exceeded your hourly limit')
                }
            })
            .catch((err) => {
                console.log(err);
            })
    };

    // toggle error - with es6 defaults. if nothing is passed, show is false, msg is empty string.
    function toggleError(show = false, msg = '') {
        setError({ show, msg });
    };

    // search github user
    const searchGithubUser = async (user) => {
        toggleError(); // invoke defaults.
        setIsLoading(true);  // enable loading
        console.log(user);
        const response = await axios(`${rootUrl}/users/${user}`).catch((err) => console.log(err));
        console.log(response);
        if (response) {
            setGithubUser(response.data);
            // destruct login & followers url from user data
            const { login, followers_url } = response.data;
            // once we successfully retrieve user data, we will retrieve repos and followers data also.
            // fetch repos data
            //axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((res) => setRepos(res.data));
            // fetch followers data
            //axios(`${followers_url}?per_page=100`).then((res) => setFollowers(res.data));

            // fetch using Promise.allSettled()
            await Promise.allSettled([
                axios(`${rootUrl}/users/${login}/repos?per_page=100`),
                axios(`${followers_url}?per_page=100`)
            ])
                .then((res) => {
                    const [repos, followers] = res;
                    const status = 'fulfilled';
                    if (repos.status === status) setRepos(repos.value.data);
                    if (followers.status === status) setFollowers(followers.value.data);
                })
                .catch((err) => console.log(err));
        } else {
            toggleError(true, 'there is no user with that username!');
        }
        checkRequests();
        setIsLoading(false);// disable loading
    }

    useEffect(() => {
        checkRequests();
        //console.log('aaa', request)
    }, []);

    return (
        // pass state values to the githubContext provider
        <GithubContext.Provider value={{
            githubUser, repos, followers, request,
            error, searchGithubUser, isLoading
        }}>{children}</GithubContext.Provider>
    )
};
export { GithubProvider, GithubContext }