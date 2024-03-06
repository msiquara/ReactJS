import React from 'react'
import "./Tools.css"
import "@melloware/coloris/dist/coloris.css"
import Coloris from "@melloware/coloris"

function Tools({increaseBorder, changeFrameColor, changeTxtColor, changeFont, boldFont,
                addCamModel, modelPosition, addDate, dateStyle, saveImage}){
    Coloris.init()
    Coloris({el: "#fcolor"})
    Coloris({el: "#txtcolor",
            themeMode: 'dark',
            wrap: true,
            alpha: false,
            focusInput: false})

    return (
        <div className="tools__main disabled">
            <div className='tools__border'>
                <label>
                    {"Frame size "}
                    <input type="range" id="border" onChange={(e)=>increaseBorder(e.target.value)}/>
                </label>
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
                <label>
                    {"Font"}
                    <select onInput={(e)=>changeFont(e.target.value)}>
                        <option id='courier' value={'Courier'}>{'Courier'}</option>
                        <option id='cormorant' value={'Cormorant'}>{'Cormorant'}</option>
                        <option id='erikas' value={'ErikasBuero'}>{'Erikas Buero'}</option>
                        <option id='lato' value={'Lato'}>{'Lato'}</option>
                        <option id='minimal' value={'Minimal'}>{'Minimal'}</option>
                    </select>
                </label>
                    <input type='checkbox' id='fbold'  onInput={(e)=>boldFont(e.target.checked)}></input>
                    <p>{'Bold'}</p>
            </div>      

            <div className='tools__model'> 
                <p>{"Camera model "}</p>
                <input type="checkbox" id='cmodel' onInput={(e)=>addCamModel(e.target.checked)}></input>
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

            <div className='tools__date'>
                <p>{"Date"}</p>
                <input type='checkbox' className='date' onInput={(e)=>addDate(e.target.checked)}></input>
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
            <button className='disabled' id="button__save" onClick={saveImage}>Download</button>
        </div>
    )
}

export default Tools