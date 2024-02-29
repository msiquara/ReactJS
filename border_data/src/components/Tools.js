import React from 'react'
import "./Tools.css"
import "@melloware/coloris/dist/coloris.css"
import Coloris from "@melloware/coloris"

function Tools({increaseBorder, changeFrameColor, changeTxtColor, addCamModel, modelPosition, saveImage}){
    Coloris.init()
    Coloris({el: "color__picker"})
    Coloris({el: "txtcolor",
            themeMode: 'dark',
            wrap: true})

    return (
        <div className="tools__main disabled">
            <label>
                {"Border size: "}
                <input type="range" id="border" onChange={(e)=>increaseBorder(e.target.value)}/>
            </label>

            <div className='color__picker' onInput={(e)=>changeFrameColor(e.target.value)}>
                <label>
                    {"Frame color: "}
                    <input type="text" data-coloris="" id='fcolor' size={7} defaultValue={'#ffffff'} ></input>
                </label>
                <button type='button' className='frame__button'></button>
            </div>
            <div className='color__picker'>
                <label>
                    {"Text color: "}
                    <input type="text" data-coloris="" id='txtcolor' size={7} defaultValue={'#000000'} onInput={(e)=>changeTxtColor(e.target.value)}></input>
                </label>
                <button type='button' className='text__button'></button>
            </div>
            <label>
                {"Camera model: "}
                <input type="checkbox" id='cmodel' onInput={(e)=>addCamModel(e.target.checked)}></input>
            </label>
            <form id='form__model' className='unchecked' onChange={(e)=>modelPosition(e.target.value)}>
                <fieldset>
                    <label>
                        <input type='radio' id='default' name='model' value='default' defaultChecked></input>
                        {"Default"}
                    </label>
                    <label>
                        <input type='radio' id='swap' name='model' value='swap'></input>
                        {"Swap"}
                    </label>
                    <label>
                        <input type='radio' id='top' name='model' value='top'></input>
                        {"Top"}
                    </label>                    
                </fieldset>
            </form>
            <button className='disabled' id="button__save" onClick={saveImage}>Download</button>
        </div>
    )
}

export default Tools