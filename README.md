# licious-assignment
Single page application for a bookstore.

Bower and npm packages needs to be install. \n
Bower : cd client && bower install


insert demo products, from mongo shell run:
use licious

db.products.insert([
  { "name" : "Animal Farm", "author" : "George Orwell", "description" : "What happens when ill-treated farm animals gang up to throw out their lazy, corrupt and power-drunk rulers? Animal Farm is born.", "imageUrl" : "http://ecx.images-amazon.com/images/I/61T6m0LJWmL.jpg", "price" : 300 },
  { "name" : "Zen And The Art Of Motorcycle Maintenance", "author" : "Robert Pirsig", "description" : "Acclaimed as one of the most exciting books in the history of American letters, this modern epic became an instant bestseller upon publication in 1974, transforming a generation and continuing to inspire millions. A narration of a summer motorcycle trip undertaken by a father and his son, the book becomes a personal and philosophical odyssey into fundamental questions of how to live. Resonant with the confusions of existence, Zen and the Art of Motorcycle Maintenance is a touching and transcendent book of life.", "imageUrl" : "http://ecx.images-amazon.com/images/I/51KJeTdeZuL.jpg", "price" : 450 },
  { "name" : "Wuthering Heights", "author" : "Emily Bronte", "description" : "n 1847, after the success of her sister Charlotte's novel Jane Eyre, Emily Bronte published Wuthering Heights. The tale takes its name from the farmhouse on the bleak and windy North York Moors where much of the story is set. In it, we read of a passionate love affair between Catherine Earnshaw and an orphan adopted by her father by the name of Heathcliff. The book challenged Victorian ideals such as gender inequality and class differences as well as general morality and religious hypocrisy.", "imageUrl" : "http://ecx.images-amazon.com/images/I/81tE4C8kWAL.jpg", "price" : 500 },
  { "name" : "Crime and punishment", "author" : "Fyodor Dostoyevsky", "description" : "Crime and Punishment is set in St Petersburg and paints a vivid picture 18th century Russia before the revolution brought with it the winds of change. The book portrays the rampant poverty and unending pain and suffering of the proletariat. It is in such ghastly circumstances that the character of Raskolnikov is born.", "imageUrl" : "http://ecx.images-amazon.com/images/I/81KEJOGwS6L.jpg", "price" : 549 }
])
