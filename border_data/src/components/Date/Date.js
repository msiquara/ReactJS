import "./Date.css"
import { FormControl } from "@mui/material"
import FormControlLabel from '@mui/material/FormControlLabel'
import { Switch } from '@mui/material'

function Date({addDate, dateStyle}){
    return (
        <div className="date__main">
            <div className='tools__date'>
                <FormControl component={"fieldset"} variant="standard">
                    <FormControlLabel className="switch"
                        control={
                            <Switch onChange={(e)=>addDate(e.target.checked)}/>
                        }                
                        label="Date"
                    />
                </FormControl>
            </div>
            <form id='form__date' className='unchecked' onChange={(e)=>dateStyle(e.target.value)}>
                <fieldset>
                    <div className='date__style'>  
                        <input type='radio' id='dmy' name='date' value='dmy' defaultChecked></input>
                        <p>{"dd-mm-yy"}</p>                        
                    </div>
                    <div className='date__style'>  
                        <input type='radio' id='mdy' name='date' value='mdy'></input>
                        <p>{"mm-dd-yy"}</p>                                     
                    </div>                
                    <div className='date__style'>  
                        <input type='radio' id='ymd' name='date' value='ymd'></input>
                        <p>{"yy-mm-dd"}</p>                        
                    </div>
                </fieldset>
            </form>
        </div>
    )
}

export default Date