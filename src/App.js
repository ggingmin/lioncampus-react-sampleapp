import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';

import AddCourse from "./components/AddCourse"
import Course from "./components/Course"
import CoursesList from "./components/CoursesList"

function App() {
    return (
        <Router>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/courses" className="navbar-brand">
                    ggingmin
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/courses"} className="nav-link">
                            Courses
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/add"} className="nav-link">
                            Add
                        </Link>
                    </li>
                </div>
            </nav>

            <div className="container mt-3">
                <Routes>
                    <Route exact path="/courses" component={CoursesList} />
                    <Route exact path="/" component={CoursesList} />
                    <Route exact path="/add" component={AddCourse} />
                    <Route path="/courses/:id" component={Course} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
