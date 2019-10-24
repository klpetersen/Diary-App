# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


user1 = User.create(name: 'Yoan', username: 'cuban-cabana-boy')
user2 = User.create(name: 'Tony', username: 'xXRedDarknessXx')
user3 = User.create(name: 'Seb', username: 'MurderPunch')



post1 = Post.create(title: 'First post', content: 'This is content of first post', user_id: 1)
