import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCourse } from "../actions/courses";

const AddCourse = () => {
    const initialCourseState = {
        id: null,
        title: "",
        description: "",
        published: false
    };
    const [course, setCourse] = useState(initialCourseState);
    const [submitted, setSubmitted] = useState(false);

    const dispatch = useDispatch();

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCourse({ ...course, [name]: value });
    };

    const saveCourse = () => {
        const { title, description } = course;

        dispatch(createCourse(title, description))
            .then(data => {
                setCourse({
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    published: data.published
                });
                setSubmitted(true);

                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newCourse = () => {
        setCourse(initialCourseState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newCourse}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={course.title}
                            onChange={handleInputChange}
                            name="title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={course.description}
                            onChange={handleInputChange}
                            name="description"
                        />
                    </div>

                    <button onClick={saveCourse} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddCourse;