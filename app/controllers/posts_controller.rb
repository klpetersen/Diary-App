class PostsController < ApplicationController
    def index 
        posts = Post.all 
        render json: PostSerializer.new(posts).serialized_json 
    end

    def create
        data = JSON.parse(request.raw_post)
        post = Post.create(data)
    end
    
end
