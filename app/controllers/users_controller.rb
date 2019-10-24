class UsersController < ApplicationController
    def index 
        users = User.all 
        render json: UserSerializer.new(users).serialized_json 
    end 
    
    def create
        data = JSON.parse(request.raw_post)
        user = User.create(data)
    end
end
