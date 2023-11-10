import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext()
    const[title,setTitle] = useState('')
    const[load, setLoad] = useState('')
    const[reps, setReps] = useState('')
    const[error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = {title, load, reps}
        //post request from backend/routes/workouts.js
        const response = await fetch('/api/workouts',{
            method: 'POST',
            body: JSON.stringify(workout),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok){
            //error property from workoutController
            setError(json.error)
            
        }

        if(response.ok){
            //reset the form to empty strings for next workout
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
           
            console.log('new workout added succesfully')
            dispatch({type: 'CREATE_WORKOUT', payload:json})
        }
    }


    return(
        <form className="create" onSubmit = {handleSubmit}>
            <h3>Add New Workout</h3>

            <label>Excersize Title:</label>
            <input
                type = "text"
                //video 10, 3:30
                onChange={(e) => setTitle(e.target.value)}
                value = {title}
            />

            <label>Load kg:</label>
            <input
                type = "number"
                onChange={(e) => setLoad(e.target.value)}
                value = {load}

            />

            <label>Reps:</label>
            <input
                type = "number"
                onChange={(e) => setReps(e.target.value)}
                value = {reps}

            />
        
            <button>Add Workout</button>


        </form>
    )
}

export default WorkoutForm