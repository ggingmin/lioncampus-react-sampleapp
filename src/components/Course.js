import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCourse, deleteCourse } from "../actions/courses";
import CourseDataService from "../services/CourseService";

const Course = (props) => {
    const initialCourseState = {
        id: null,
        title: "",
        description: "",
        published: false
    };
    const [currentCourse, setCurrentCourse] = useState(initialCourseState);
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const getCourse = id => {
        CourseDataService.get(id)
            .then(response => {
                setCurrentCourse(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getCourse(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentCourse({ ...currentCourse, [name]: value });
    };

    const updateStatus = status => {
        const data = {
            id: currentCourse.id,
            title: currentCourse.title,
            description: currentCourse.description,
            published: status
        };

        dispatch(updateCourse(currentCourse.id, data))
            .then(response => {
                console.log(response);

                setCurrentCourse({ ...currentCourse, published: status });
                setMessage("The status was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateContent = () => {
        dispatch(updateCourse(currentCourse.id, currentCourse))
            .then(response => {
                console.log(response);

                setMessage("The course was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const removeCourse = () => {
        dispatch(deleteCourse(currentCourse.id))
            .then(() => {
                props.history.push("/courses");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentCourse ? (
                <div className="edit-form">
                    <h4>Course</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={currentCourse.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={currentCourse.description}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentCourse.published ? "Published" : "Pending"}
                        </div>
                    </form>

                    {currentCourse.published ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updateStatus(false)}
                        >
                            UnPublish
                        </button>
                    ) : (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updateStatus(true)}
                        >
                            Publish
                        </button>
                    )}

                    <button className="badge badge-danger mr-2" onClick={removeCourse}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateContent}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Course...</p>
                </div>
            )}
        </div>
    );
};

export default Course;