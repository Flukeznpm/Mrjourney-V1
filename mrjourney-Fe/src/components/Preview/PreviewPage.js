import React, { useContext } from 'react'
import { HookContext } from '../../store/HookProvider'
import PreviewStep1 from './PreviewStep1'
import PreviewStep2 from './PreviewStep2'

function PreviewPage() {
    const { step, resetStep } = useContext(HookContext)
    const Step = () =>{
        switch (step) {
            case 1:
                return <PreviewStep1></PreviewStep1>;
            case 2:
                return <PreviewStep2></PreviewStep2>;
            default:
                resetStep()
        }
    }
        return(
            <div>
                <h1>Show Preview</h1>
                <div>
                    {Step()}
                </div>
            </div>
        )
    }

export default PreviewPage;