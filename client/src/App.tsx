import React, { useEffect, useState } from 'react';
import { useAllArticles, useArticleById } from './hooks/api/article';

function Loading() {
  return <div>loading...</div>;
}

function ArticleList() {
  const [articleId, setArticleId] = useState<number>(0);
  const [all, isLoading, error] = useAllArticles();
  if (isLoading || all === null) {
    return <Loading />
  }
  if (error) {
    // send to sentry
  }
  const clickHandler = (id: number) => (e: React.SyntheticEvent) => {
    e.preventDefault();
    setArticleId(id);
  }
  return (
    <>
      <ul>
        {all.articles.map(article => {
          const { id, title } = article;
          return (
            <li key={id}><a href={`${id}`} onClick={clickHandler(id)}>{title}</a></li>
          );
        })}
      </ul>
      <hr />
      <p>selected article id: {articleId}</p>
      {articleId === 0 ? "nothing" : <Article id={articleId} />}
    </>
  );
}

function Article({ id }: { id: number }) {
  const [article, isLoading, error] = useArticleById(id);
  if (isLoading || article === null) {
    return <Loading />
  }
  if (error) {
    // send to sentry
  }
  console.log(article);
  return (
    <>
      <h3>{article.title}</h3>
      <p>{article.body}</p>
    </>
  );
}

function App() {
  useEffect(() => {
    fetch("/api/hello").then(r => r.json()).then(console.log);
  }, []);
  return (
    <>
      <ArticleList />
    </>
  );
}

export default App;
