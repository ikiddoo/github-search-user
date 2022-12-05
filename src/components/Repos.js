import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';

const Repos = () => {
  // destruct repos object 
  const { repos } = React.useContext(GithubContext);
  // console.log(repos);

  // destruct langauge property value
  const languages = repos.reduce((total, item) => {
    // destruct language from each and every repo.
    const { language, stargazers_count } = item;

    // check if language property is null or not.
    if (!language) return total;
    // check if does not have a language property, create new language and set to an object.
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    }
    // else, however, if language property is present, keep the same property
    // first, 
    else {
      total[language] = {
        ...total[language], // first, copy the values that language object current has.
        value: total[language].value + 1, // overwrite the value property and + 1 to add
        stars: total[language].stars + stargazers_count
      }
    }
    return total; // return total, else reduce will not work.
  }, {}); // total will return an object.

  // since we want languages to be an array, we use Object.values which will give only values of an object.
  // extract top most used languages from repo, as such language with highest value will be first.
  const mostUsed = Object.values(languages).sort((a, b) => b.value - a.value).slice(0, 5);
  //console.log(mostUsed);

  // sort by most stars per language, only top 5
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .map((item) => {
      return { ...item, value: item.stars };
    })
    .slice(0, 5);
  //console.log(mostPopular);

  // Create static data for chart 
  const chartData = [
    {
      label: "HTML",
      value: "13"
    },
    {
      label: "CSS",
      value: "160"
    },
    {
      label: "JavaScript",
      value: "80"
    },
  ];

  // get stars and forks
  let { stars, forks } = repos.reduce((total, item) => {
    const { stargazers_count, name, forks } = item;
    // console.log('aaaa', total.stars);
    total.stars[stargazers_count] = {
      label: name,
      value: stargazers_count
    };
    total.forks[forks] = {
      label: name,
      value: forks
    };
    return total;
  }, { stars: {}, forks: {} });
  //console.log(stars);

  // get last 5 which is the biggest star and fork counts
  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  // show the ExampleChart component.
  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={mostUsed} />
        <Column3D data={stars} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={forks} />
      </Wrapper>
    </section>
  )
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  /* this is possible by setting the width to 100% */
  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
