import React from 'react'
import { useAppContext } from '../contexts/AppContext'

export default function FinalScreen() {
    const {score} = useAppContext()
    console.log('Scoreee', score)
    return (
        <div>Final Screen: {score}</div>
    )
}