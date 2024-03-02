import React from 'react'
import "./Tools.css"
import "@melloware/coloris/dist/coloris.css"
import Coloris from "@melloware/coloris"

function Tools({increaseBorder, changeFrameColor, changeTxtColor, changeFont, boldFont, addCamModel, modelPosition, saveImage}){
    Coloris.init()
    Coloris({el: "color__picker"})
    Coloris({el: "txtcolor",
            themeMode: 'dark',
            wrap: true})

    return (
        <div className="tools__main disabled">
            <div className='tools__border'>
                <label>
                    {"Border size "}
                    <input type="range" id="border" aria-description='Percentage' onChange={(e)=>increaseBorder(e.target.value)}/>
                </label>
                <p id='prctg'></p>
            </div>
            <div className='color__picker' onInput={(e)=>changeFrameColor(e.target.value)}>                
                <p>{"Frame color "}</p>     
                <div className='tools__frame'>
                    <input type="text" data-coloris="" id='fcolor' className='color__box' size={7} defaultValue={'#ffffff'} ></input>
                    <button type='button' data-coloris="" id='fbutton' className='color__button'></button>
                </div>               
            </div>
            <div className='color__picker'>
                <p>{"Text color "}</p>  
                <div className='tools__frame' data-coloris="">  
                    <input type="text" data-coloris="" id='txtcolor' className='color__box' size={7} defaultValue={'#000000'} onInput={(e)=>changeTxtColor(e.target.value)}></input>
                    <button type='button' data-coloris="" id='txtbutton' className='color__button'></button>
                </div>
            </div>
            <div className='select__font'>
                <label>
                    {"Font"}
                    <select onInput={(e)=>changeFont(e.target.value)}>
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
                        <input type='radio' id='default' name='model' value='default' defaultChecked></input>
                        <p>{"Default"}</p>                        
                    </div>
                    <div className='model__position'>  
                        <input type='radio' id='swap' name='model' value='swap'></input>
                        <p>{"Swap"}</p>                        
                    </div>
                    <div className='model__position'>  
                        <input type='radio' id='top' name='model' value='top'></input>
                        <p>{"Top"}</p>                                     
                    </div>                
                </fieldset>
            </form>
            <button className='disabled' id="button__save" onClick={saveImage}>Download</button>
        </div>
    )
}

export default Tools