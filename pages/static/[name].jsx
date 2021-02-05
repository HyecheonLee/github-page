import React from 'react';

const name = ({user, time}) => {
  const username = user && user.name;
  return (
    <div>
      {username}
      {time}
    </div>
  );
};
export const getStaticProps = async ({query}) => {
  const {name} = query;
  try {
    const res = await fetch(`https://api.github.com/users/${name}`);
    if (res.status === 200) {
      const user = await res.json();
      return {props: {user, time: new Date().toISOString()}};
    }
    return {props: {time: new Date().toISOString()}}
  } catch (e) {
    console.error(e);
    return {props: {time: new Date().toISOString()}}
  }
}

export async function getStaticPath() {
  return {
    paths: [{params: {name: "hyecheonlee"}}],
    fallback: true
  }
}

export default name;
