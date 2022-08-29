import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addSet,
  confirmSet,
  fetchAllWorkoutlist,
} from "../../store/workoutlist";
import { fetchWorkout, finishWorkout } from "../../store/workout";
import { fetchWorkoutlist, fetchWorkouts } from "../../store/workoutlist";
import CurrentWorkoutSet from "./CurrentWorkoutSet";
import { Link } from "react-router-dom";

class CurrentWorkout extends Component {
  componentDidMount() {
    this.props.fetchWorkout();
    this.props.fetchAllWorkoutList();
    // this.props.getCurrentWorkout();
  }

  render() {
    if (
      !this.props.workout.exercises ||
      this.props.workout.exercises.length === 0
    ) {
      return <div>Loading... please add a workout!</div>;
    }

    console.log("props here", this.props);
    const { exercises, id: workoutId } = this.props.workout;

    return (
      <div className="cw-container">
        <div className="cw-exercise-container">
          {exercises.map((exercise) => {
            return (
              <div key={exercise.id}>
                <h2 className="cw-exercise-name">{exercise.name}</h2>
                <div className="cw-exercise">
                  <div className="cw-headings">
                    <p className="cw-heading">Set</p>
                    <p className="cw-heading cw-previous-heading">Previous</p>
                    <p className="cw-heading">Reps</p>
                    <p className="cw-heading cw-weight-heading">Weight</p>
                    <p className="cw-heading cw-heading-check">️✔️️</p>
                  </div>
                  {exercise.workoutlist.sets.map((set, index) => {
                    return (
                      <CurrentWorkoutSet
                        key={index}
                        workoutId={workoutId}
                        exerciseId={exercise.id}
                        setId={index + 1}
                        weight={set.weight}
                        reps={set.reps}
                      />
                    );
                  })}

                  <div className="cw-btn-container">
                    <button
                      className="cw-add-btn"
                      onClick={() =>
                        this.props.addSet({
                          exerciseId: exercise.id,
                          reps: "0",
                          setId:
                            exercise.workoutlist.sets[
                              exercise.workoutlist.sets.length - 1
                            ].setId + 1,
                          weight: 0,
                          workoutId: workoutId,
                        })
                      }
                    >
                      + Add Set
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {this.props.workout.status === "active" ? (
          <Link to="/recap">
            <button
              className="cw-finish-btn"
              onClick={() => this.props.finishWorkout()}
            >
              Finish Workout
            </button>
          </Link>
        ) : (
          <button>Start a new workout</button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  workout: state.workout,
  exercise: state.workoutlist,
});

const mapDispatchToProps = (dispatch) => ({
  addSet: (setData) => dispatch(addSet(setData)),
  confirmSet: (setData) => dispatch(confirmSet(setData)),
  fetchWorkout: () => dispatch(fetchWorkout()),
  fetchWorkoutlist: (id) => dispatch(fetchWorkoutlist(id)),
  fetchAllWorkoutList: () => dispatch(fetchAllWorkoutlist()),
  finishWorkout: () => dispatch(finishWorkout()),
  getCurrentWorkout: () => dispatch(fetchWorkouts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWorkout);
