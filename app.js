// require packages used in the project
const express = require('express')
const app = express()
const movieList = require('./movies.json')

const port = 3000

//require express-handlebars here
const exphbs = require('express-handlebars')

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//setting static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  const numberList = [1, 2, 3, 4, 5]
  // const movieList = [
  //   {
  //     id: 1,
  //     title: 'Jurassic World: Fallen Kingdom',
  //     image: 'https://movie-list.alphacamp.io/posters/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg',
  //   }, {
  //     id: 2,
  //     title: 'JAnt-Man and the Wasp',
  //     image: 'https://movie-list.alphacamp.io/posters/rv1AWImgx386ULjcf62VYaW8zSt.jpg',
  //   }, {
  //     id: 3,
  //     title: 'Thor: Ragnarok',
  //     image: 'https://movie-list.alphacamp.io/posters/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg',
  //   }, {
  //     id: 4,
  //     title: 'Avengers: Infinity War',
  //     image: 'https://movie-list.alphacamp.io/posters/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
  //   }, {
  //     id: 5,
  //     title: 'Mission: Impossible - Fallout',
  //     image: 'https://movie-list.alphacamp.io/posters/80PWnSTkygi3QWWmJ3hrAwqvLnO.jpg',
  //   }, {
  //     id: 6,
  //     title: 'Incredibles 2',
  //     image: 'https://movie-list.alphacamp.io/posters/x1txcDXkcM65gl7w20PwYSxAYah.jpg',
  //   }, {
  //     id: 7,
  //     title: 'Fifty Shades Freed',
  //     image: 'https://movie-list.alphacamp.io/posters/jjPJ4s3DWZZvI4vw8Xfi4Vqa1Q8.jpg',
  //   }, {
  //     id: 8,
  //     title: 'The First Purge',
  //     image: 'https://movie-list.alphacamp.io/posters/2slvblTroiT1lY9bYLK7Amigo1k.jpg',
  //   }
  // ]
  res.render('index', { movie: movieList.results })
  // res.send(`
  // <h1>Create your own server with Node.js</h1>
  // <h3>Popular movies in 2018</h3>
  // <ul>
  //   <li>
  //     <img
  //       src="https://movie-list.alphacamp.io/posters/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg"
  //       alt="Jurassic World: Fallen Kingdom"
  //       width="50px"
  //     />
  //     Jurassic World: Fallen Kingdom
  //   </li>
  //   <li>
  //     <img
  //       src="https://movie-list.alphacamp.io/posters/rv1AWImgx386ULjcf62VYaW8zSt.jpg"
  //       alt="Ant-Man and the Wasp"
  //       width="50px"
  //     />
  //     Ant-Man and the Wasp
  //   </li>
  //   <li>
  //     <img
  //       src="https://movie-list.alphacamp.io/posters/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg"
  //       alt="Thor: Ragnarok"
  //       width="50px"
  //     />
  //     Thor: Ragnarok
  //   </li>
  //   <li>
  //     <img
  //       src="https://movie-list.alphacamp.io/posters/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg"
  //       alt="Avengers: Infinity War"
  //       width="50px"
  //     />
  //     Avengers: Infinity War
  //   </li>
  //   <li>
  //     <img
  //       src="https://movie-list.alphacamp.io/posters/80PWnSTkygi3QWWmJ3hrAwqvLnO.jpg"
  //       alt="Mission: Impossible - Fallout"
  //       width="50px"
  //     />
  //     Mission: Impossible - Fallout
  //   </li>
  // </ul>
  // `)
})

//: params ; ?後面的內容,稱作「查詢字串」(querystring)
app.get('/search', (req, res) => {
  console.log('req.query', req.query.keyword)
  const keyword = req.query.keyword
  const movies = movieList.results.filter(movie => {
    return movie.title.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { movie: movies, keyword: keyword })
})

app.get('/movies/:movie_id', (req, res) => {
  console.log('movie_id', req.params.movie_id)
  const movie = movieList.results.filter(movie => movie.id.toString() === req.params.movie_id)
  // const movieOne = {
  //   id: 1,
  //   title: 'Jurassic World: Fallen Kingdom',
  //   description:
  //     'Several years after the demise of Jurassic World, a volcanic eruption threatens the remaining dinosaurs on the island of Isla Nublar. Claire Dearing, the former park manager and founder of the Dinosaur Protection Group, recruits Owen Grady to help prevent the extinction of the dinosaurs once again.',
  //   release_date: '2018-06-06',
  //   image: 'c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg'
  // }
  res.render('show', { movie: movie[0] })
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})