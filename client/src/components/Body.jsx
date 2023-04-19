import React from "react";
import Home from "../pages/Home";


export default function Body() {
  const [currentPage, setCurrentPage] = useState('AboutMe');
//based on the tab of the navbar selected/the currentPage state, the content of the page will be rendered
  const renderPage = () => {
    if (currentPage === 'AboutMe') {
      return <AboutMe />;
    }
    if (currentPage === 'Portfolio') {
      return <Portfolio projectList={projectList} />;
    }
    if (currentPage === 'Contact') {
      return <Contact />;
    }
    if (currentPage === 'Resume') {
      return <Resume />;
    }
  };
//assigning the state of the current
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div >
      {renderPage()}
    </div>
  );
}
