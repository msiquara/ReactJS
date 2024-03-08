import {Slider} from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { InputLabel } from '@mui/material'
import { NativeSelect } from '@mui/material'
import './FrameSize.css'

function prctgText(value){
    let label = document.getElementsByClassName('MuiSlider-valueLabelLabel')
    label[0] !== undefined? label[0].innerHTML = value+'%': label = document.getElementsByClassName('MuiSlider-valueLabelLabel')
}

function FrameSize({increaseBorder, slider}){
    return (
        <div className='frame__size'>
            <FormControl>
                <InputLabel className='frame__label' variant="standard" htmlFor="uncontrolled-native">
                    Frame size
                </InputLabel>
                <NativeSelect 
                    className='display_none' 
                    defaultValue={"Courier"}
                    inputProps={{
                        name: 'font'
                    }}
                >     
                    <option id='courier' value={'Courier'}>{'Courier'}</option>
               
                </NativeSelect>
                <Slider
                    className='frame__slider'
                    onChangeCommitted={increaseBorder}
                    defaultValue={slider.value}
                    getAriaValueText={prctgText}
                    step={slider.step}
                    marks
                    min={slider.min}
                    max={slider.max}
                    valueLabelDisplay="auto"
                />

            </FormControl>
        </div>
    )
}

export default FrameSize