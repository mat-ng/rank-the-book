# Delete all existing entries in the Books table
Book.delete_all

# Create new entries
Book.create([
  { title: "1984", image: "https://upload.wikimedia.org/wikipedia/en/5/51/1984_first_edition_cover.jpg", rating: 123 },
  { title: "The Great Gatsby", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg/330px-The_Great_Gatsby_Cover_1925_Retouched.jpg", rating: 113 },
  { title: "Catch-22", image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Catch22.jpg/220px-Catch22.jpg", rating: 122 },
  { title: "Animal Farm", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Animal_Farm_-_1st_edition.jpg/220px-Animal_Farm_-_1st_edition.jpg", rating: 133 },
  { title: "The Hobbit", image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/TheHobbit_FirstEdition.jpg/220px-TheHobbit_FirstEdition.jpg", rating: 132 },
  { title: "Frankenstein", image: "https://images.penguinrandomhouse.com/cover/9780553212471", rating: 101 },
  { title: "Charlotte's Web", image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fe/CharlotteWeb.png/220px-CharlotteWeb.png", rating: 100 },
  { title: "Wonder", image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Wonder_Cover_Art.png/246px-Wonder_Cover_Art.png", rating: 106 },
  { title: "Dune", image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/de/Dune-Frank_Herbert_%281965%29_First_edition.jpg/220px-Dune-Frank_Herbert_%281965%29_First_edition.jpg", rating: 74 },
  { title: "Romeo and Juliet", image: "https://m.media-amazon.com/images/I/81AW9vOT7jL._AC_SL1500_.jpg", rating: 75 },
  { title: "King Lear", image: "https://upload.wikimedia.org/wikipedia/commons/0/09/King_Lear_by_George_Frederick_Bensell.jpg", rating: 69 },
  { title: "Harry Potter", image: "https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg", rating: 70 },
  { title: "Hunger Games", image: "https://booksbird.files.wordpress.com/2019/09/514-22jzjzl.jpg", rating: 72 },
  { title: "Great Expectations", image: "https://images-na.ssl-images-amazon.com/images/I/91FDaX8y25L.jpg", rating: 65 }
])
