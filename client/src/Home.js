import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="home">
      <h1>Home Component</h1>
        <Link to="./todos">Todos</Link>
        <Link to="./posts">Posts</Link>
        <Link to="./users">Users</Link>
        <Link to="./photos">Photos</Link>
    </div>
  )
}
export default Home;