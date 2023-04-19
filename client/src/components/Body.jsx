import React from "react";
import Home from "../pages/Home";


export default function Body() {
  const [currentPage, setCurrentPage] = useState('Home');
//based on the tab of the navbar selected/the currentPage state, the content of the page will be rendered
  const renderPage = () => {
    if (href='/') {
      return <Home />;
    }
    // if (currentPage === 'New Friend') {
    //   return <NewFriend />;
    // }
    // if (currentPage === 'Friend1') {
    //   return <Friend1 />;
    // }
    // if (currentPage === 'Log In') {
    //   return <LogIn />;
    // }
    // if (currentPage === 'Sign Up') {
    //   return <SignUp />;
    // }
  };
  //assigning the state of the current
  // const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div >
      {renderPage()}
    </div>
  );
}
