class Api::ArticlesController < ApplicationController
  def index
    all_articles = Article.all
    render json: { articles: all_articles }
  end

  def show
    article = Article.find(params[:id])
    render json: article
  end

  def create
    Article.create(title: params[:title], body: params[:body])
    head :created
  end
end
