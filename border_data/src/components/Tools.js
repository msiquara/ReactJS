import React from 'react'
import "./Tools.css"
import Model from "./Model/Model"
import Date from "./Date/Date"
import "@melloware/coloris/dist/coloris.css"
import Coloris from "@melloware/coloris"
import { ThemeProvider, createTheme } from '@mui/material/styles'
import {Slider, SliderValueLabel} from '@mui/material'
import FormControl from '@mui/material/FormControl'
import {InputLabel} from '@mui/material'
import {NativeSelect} from '@mui/material'

function prctgText(value){
    let label = document.getElementsByClassName('MuiSlider-valueLabelLabel')
    label[0] !== undefined? label[0].innerHTML = value+'%': label = document.getElementsByClassName('MuiSlider-valueLabelLabel')
}

function Tools({increaseBorder, slider, changeFrameColor, changeTxtColor, changeFont, boldFont,
                addCamModel, modelPosition, addDate, dateStyle, saveImage}){
    Coloris.init()
    Coloris({el: "#fcolor",
            themeMode: 'dark',
            wrap: false,
            alpha: false,
            focusInput: false
    })
    Coloris({el: "#txtcolor",
            themeMode: 'dark',
            wrap: false,
            alpha: false,
            focusInput: false
    })

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <div className="tools__main disabled">
                <div className='tools__border'>
                    <Slider
                        aria-label='Percentage'
                        onChangeCommitted={increaseBorder}
                        defaultValue={slider.value}
                        getAriaValueText={prctgText}
                        step={slider.step}
                        marks
                        min={slider.min}
                        max={slider.max}
                        valueLabelDisplay="auto"
                    />
                    <p id='prctg'></p>
                </div>

                <div className='color__picker'>                
                    <p>{"Frame color "}</p>     
                    <div className='tools__frame'>
                        <input type="text" data-coloris="" id='fcolor' className='color__box' size={7} defaultValue={'#ffffff'} onInput={(e)=>changeFrameColor(e.target.value)}></input>
                        <button type='button' id='fbutton' className='color__button'></button>
                    </div>               
                </div>

                <div className='color__picker'>
                    <p>{"Text color "}</p>  
                    <div className='tools__frame'>  
                        <input type="text" data-coloris="" id='txtcolor' className='color__box' size={7} defaultValue={'#000000'} onInput={(e)=>changeTxtColor(e.target.value)}></input>
                        <button type='button' id='txtbutton' className='color__button'></button>
                    </div>
                </div>

                <div className='select__font'>
                    <FormControl>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Font
                        </InputLabel>
                        <NativeSelect 
                            defaultValue={"Courier"}
                            onChange={(e)=>changeFont(e.target.value)}
                            inputProps={{
                                name: 'font'
                            }}
                        >
                            <option id='courier' value={'Courier'}>{'Courier'}</option>
                            <option id='cormorant' value={'Cormorant'}>{'Cormorant'}</option>
                            <option id='erikas' value={'ErikasBuero'}>{'Erikas Buero'}</option>
                            <option id='lato' value={'Lato'}>{'Lato'}</option>
                            <option id='minimal' value={'Minimal'}>{'Minimal'}</option>
                        </NativeSelect>
                    </FormControl>
                    <input type='checkbox' id='fbold'  onInput={(e)=>boldFont(e.target.checked)}></input>
                    <p>{'Bold'}</p>
                </div>      

                         
                <Model
                    addCamModel={addCamModel}
                    modelPosition = {modelPosition}
                />
                <Date
                    addDate = {addDate}
                    dateStyle = {dateStyle}
                />
                <button className='disabled' id="button__save" onClick={saveImage}>Download</button>
            </div>
        </ThemeProvider>
    )
}

export default Tools