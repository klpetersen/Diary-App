class UsersController < ApplicationController
    def index 
        users = User.all 
        render json: UserSerializer.new(users).serialized_json 
    end 
end
