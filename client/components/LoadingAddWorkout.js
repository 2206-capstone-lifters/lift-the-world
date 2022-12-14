import React from "react";
import { Link } from "react-router-dom";

const LoadingAddWorkout = () => {
  return (
    <>
      <div className="loading-container">
        <p className="loading-add-workout-page">Please add an exercise!</p>
        <img className="cat-loading-image" src="/images/cat4.png" />
      </div>
      <div className="see-exercises">
        <Link to="/exercises">
          <button className="see-exercises-button">See all exercises</button>
        </Link>
        <Link to="/workout/preset">
          <button className="see-exercises-button">See preset workouts</button>
        </Link>
      </div>
    </>
  );
};

export default LoadingAddWorkout;
