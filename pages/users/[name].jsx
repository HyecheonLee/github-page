import React from 'react';
import css from "styled-jsx/css";
import Profile from "../../components/Profile";
import formatDistance from 'date-fns/formatDistance'
import Repositories from "../../components/Repositories";

const style = css`
  .user-contents-wrapper {
    display: flex;
    padding: 20px;
  }`


const username = ({user, repos}) => {

    return (
      <div className="user-contents-wrapper">
        <Profile user={user}/>
        <Repositories repos={repos}/>
        <style jsx>{style}</style>
      </div>
    );
  }
;

export const getServerSideProps = async ({query}) => {
  const {name} = query;
  try {
    let user;
    let repos
    const res = await fetch(`https://api.github.com/users/${name}`);
    if (res.status === 200) {
      user = await res.json();
    } else {
      return {props: {}}
    }
    const repoRes = await fetch(`https://api.github.com/users/${name}/repos?sort=updated&page=1&per_page=10`);
    if (repoRes.status === 200) {
      repos = await repoRes.json()
    } else {
      return {props: {}}
    }
    return {props: {user, repos}};
  } catch (e) {
    console.error(e);
    return {props: {}}
  }
}
export default username;
