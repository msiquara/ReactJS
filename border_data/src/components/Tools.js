import React from 'react'
import "./Tools.css"
import Model from "./Model/Model"
import Date from "./Date/Date"
import "@melloware/coloris/dist/coloris.css"
import { ThemeProvider, createTheme } from '@mui/material/styles'
import FrameSize from './FrameSize/FrameSize'
import ColorPicker from './ColorPicker/ColorPicker'
import SelectFont from './SelectFont/SelectFont'
import FileDownloadIcon from '@mui/icons-material/FileDownload';

function Tools({increaseBorder, slider, changeFrameColor, changeTxtColor, changeFont, boldFont,
                addCamModel, modelPosition, addDate, dateStyle, saveImage}){
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <div className="tools__main disabled">
                <FrameSize
                    increaseBorder={increaseBorder}
                    slider={slider}
                />

                <ColorPicker
                    changeFrameColor={changeFrameColor}
                    changeTxtColor={changeTxtColor}
                />

                <SelectFont
                    changeFont={changeFont}
                    boldFont={boldFont}
                />
                         
                <Model
                    addCamModel={addCamModel}
                    modelPosition = {modelPosition}
                />
                <Date
                    addDate = {addDate}
                    dateStyle = {dateStyle}
                />
                 <button className='disabled' id="button__save" onClick={saveImage}><FileDownloadIcon/>Download</button>
            </div>
        </ThemeProvider>
    )
}

export default Tools