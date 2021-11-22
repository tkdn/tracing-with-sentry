/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { getSpanId, getUuId } from "../../libs/uuid";

type Article = {
  id: number,
  title: string,
  body: string,
  created_at: string,
  updated_at: string,
}

async function fetchAllArticles() {
  const response = await fetch("/api/articles", {
    headers: {
      'trace-id': getUuId(),
      'parent-id': getSpanId(),
    }
  });
  if (!response.ok) {
    throw new Error(`Response: ${response.status}`);
  }
  const data = await response.json();
  return data as { articles: Article[] };
};

async function fetchArticle(id: number) {
  const response = await fetch(`/api/articles/${id}`, {
    headers: {
      'trace-id': getUuId(),
      'parent-id': getSpanId(),
    }
  });
  if (!response.ok) {
    throw new Error(`Response: ${response.status}`);
  }
  const data = await response.json();
  return data as Article;
};

export function useAllArticles() {
  const [data, setData] = useState<null | {articles: Article[]}>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  useEffect(() => {
    setLoading(true);
    fetchAllArticles()
      .then(data => setData(data))
      .catch(e => setError(e))
      .finally(() => setLoading(false));
  }, []);
  return [data, isLoading, error] as const;
}

export function useArticleById(id: number = 0) {
  const [data, setData] = useState<null | Article>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetchArticle(id)
      .then(data => setData(data))
      .catch(e => setError(e))
      .finally(() => setLoading(false));
  }, [id]);
  return [data, isLoading, error] as const;
}
