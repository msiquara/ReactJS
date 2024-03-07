import "./Model.css"
import { FormControl } from "@mui/material"
import FormControlLabel from '@mui/material/FormControlLabel'
import { Switch } from '@mui/material'

function Model({addCamModel, modelPosition}){
    return (
        <div className="model__main">
            <div className='tools__model'> 
                <FormControl component={"fieldset"} variant="standard">
                    <FormControlLabel className="switch"
                        control={
                            <Switch onChange={(e)=>addCamModel(e.target.checked)}/>
                        }                
                        label="Camera Model"
                    />
                </FormControl>
            </div>   
            <form id='form__model' className='unchecked' onChange={(e)=>modelPosition(e.target.value)}>
                <fieldset>
                    <div className='model__position'>  
                        <input type='radio' id='left' name='model' value='left' defaultChecked></input>
                        <p>{"Left"}</p>                        
                    </div>
                    <div className='model__position'>  
                        <input type='radio' id='right' name='model' value='right'></input>
                        <p>{"Right"}</p>                        
                    </div>
                    <div className='model__position'>  
                        <input type='radio' id='top' name='model' value='top'></input>
                        <p>{"Top"}</p>                                     
                    </div>                
                </fieldset>
            </form>
        </div>
    )
}

export default Model