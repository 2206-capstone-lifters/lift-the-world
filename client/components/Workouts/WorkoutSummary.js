import React, { useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { fetchWorkoutlist } from "../../store/workoutlist";

const WorkoutSummary = () => {
  const dispatch = useDispatch();
  const workoutlist = useSelector((state) => state.workoutlist);

  useEffect(() => {
    dispatch(fetchWorkoutlist());
  }, []);

  if (
    !workoutlist.allExercises.exercises ||
    workoutlist.allExercises.exercises.length === 0
  ) {
    return <div>Loading...</div>;
  }

  const { allExercises } = workoutlist || [];
  const eachSet = allExercises.exercises;
  console.log("exercises each set", eachSet);
  return (
    <div className="workout-summary-container">
      <div className="workout-summary-table">
        <p className="workout-summary-heading">Name</p>
        <p className="workout-summary-heading">Sets</p>
        <p className="workout-summary-heading">Reps</p>
        <p className="workout-summary-heading">Weight</p>
        <p className="workout-summary-heading">Total</p>
      </div>
      {allExercises.exercises.map((exercise) => {
        return (
          <div className="set-info" key={exercise.id}>
            <p className="set-p-info">{exercise.name}</p>
            <p className="set-p-info">
              {exercise.workoutlist.sets.length}
              {console.log("each exercise", exercise)}
            </p>
            <p className="set-p-info">
              {exercise.workoutlist.sets.reduce((acc, curr) => {
                return (acc += parseInt(curr.reps));
              }, 0)}
            </p>
            <p className="set-p-info">
              {exercise.workoutlist.sets.reduce((acc, curr) => {
                return (acc += parseInt(curr.weight));
              }, 0)}
            </p>
            <p className="set-p-info">
              {exercise.workoutlist.sets.reduce((acc, curr) => {
                return (acc += parseInt(curr.reps * curr.weight));
              }, 0)}
            </p>
            {/* {exercise.workoutlist.sets.map((set, index) => {
              return (
                <>
                  {console.log("each set in workout summary", set)}
                  <p key={index} className="set-p-info">
                    {(set.setId += 1)}
                  </p>
                  <p className="set-p-info">{set.reps}</p>
                  <p className="set-p-info">{set.weight}</p>
                  <p className="set-p-info">{set.reps * set.weight}</p>
                </>
              );
            })} */}
          </div>
        );
      })}
    </div>
  );
};

export default connect(null, null)(WorkoutSummary);