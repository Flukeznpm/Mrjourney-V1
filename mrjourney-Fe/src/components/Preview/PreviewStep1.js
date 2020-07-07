import React, { useContext } from 'react'
import { HookContext } from '../../store/HookProvider'

function PreviewStep1() {
    const { nextStep, prevStep } = useContext(HookContext)
    return (
        <div>
            <h1>Step 1</h1>
            <button className="btn" onClick={() => nextStep(1)}>next</button>
            <button className="btn" onClick={() => prevStep(1)}>previous</button>
        </div>
    )
}

export default PreviewStep1;