import {WorkoutsContext} from '../context/WorkoutContext'
import { useContext } from 'react'

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext)


    if(!context) {
        throw Error('useWorkoutsConetext must be used inside a useWorkoutsProvider')
    }
    return context
}