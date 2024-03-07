import "./App.css"
import "./Fonts.css"
import ExifReader from "/node_modules/exifreader/src/exif-reader"
import Tools from "./components/Tools"
import {CloudUpload} from '@mui/icons-material'
import { useState } from "react"

const img = new Image()
let tagsList = []
let ratio = 0
let canvas 
let border 

function App() {
    let slider_border = {
        min: 0,
        max: 1,
        step: 1,
        value: 0,
        prctg: 0
    }
    let [slider, setSlider] = useState([{
        min: 0,
        max: 1,
        step: 1,
        value: 0,
        prctg: 0
    }])
    let font = 'Courier'
    let font_size
    let fcolor = "white"
    let txtcolor = "black"
    let cwidth = 0
    let cheight = 0
    let model_position  = 'left'
    let date_style = 'dmy'
    let right_corner = []
    let left_corner = []
    let top_corner = []
    let date_corner = []
    let bold_checked = false
    let model_checked = false
    let date_checked = false
   
    var FontFaceObserver = require('fontfaceobserver')
   
    const fonts = [
        new FontFaceObserver('CourierBold'),
        new FontFaceObserver('Courier'), 
        new FontFaceObserver('CormorantBold'), 
        new FontFaceObserver('Cormorant'), 
        new FontFaceObserver('ErikasBueroBold'),  
        new FontFaceObserver('ErikasBuero'),  
        new FontFaceObserver('LatoBold'), 
        new FontFaceObserver('Lato'),  
        new FontFaceObserver('MinimalBold'),
        new FontFaceObserver('Minimal'),  
        new FontFaceObserver('digital7') 
    ];

    fonts.forEach(font => {
        font.load().then(function(){
            //console.log(`${font.family} is loaded`)
        }).catch(e => {
            console.error(e)
        })
    })

    async function createTags(file){
        const tags = await ExifReader.load(file)
        console.log(tags)
        console.log(tags.FocalLength)

        tagsList = []
        tagsList = tags.Model !== undefined? tagsList.concat(tags.Model.description.trim()): tagsList.concat('n/a')
        tagsList = tags.FocalLength !== undefined? tagsList.concat(tags.FocalLength.description): tagsList.concat('n/a')
        tagsList = tags.FNumber !== undefined? tagsList.concat(tags.FNumber.description): tagsList.concat('n/a')
        tagsList = tags.ExposureTime !== undefined? tagsList.concat(tags.ExposureTime.description): tagsList.concat('n/a')
        tagsList = tags.ISOSpeedRatings !== undefined? tagsList.concat(tags.ISOSpeedRatings.description): tagsList.concat('n/a')
        tagsList = tags.DateTimeOriginal !== undefined? tagsList.concat(tags.DateTimeOriginal.description.split(' ')[0]): tagsList.concat('n/a')
    }

    function createImage(){
        canvas = document.getElementById('canvas')
        let ctx = canvas.getContext('2d')
        let uploader = document.getElementById('uploader')
        const file = uploader.files[0]
        
        createTags(file)        
        img.src = URL.createObjectURL(file)

        img.onload = function(){
            border = 0
            console.log(img)
            cwidth = canvas.width = img.width + border*2
            cheight = canvas.height = img.height + border*2
            ctx.fillStyle = fcolor
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, border, border)
            console.log(ratio)
            ratio = cheight/cwidth
            
            console.log(ratio)
            slider_border.min = 5
            slider_border.max = 15
            slider_border.step = 2
            slider_border.value = 5
            setSlider(slider_border)
            console.log(slider_border)
            canvas.style.maxWidth = `calc(95vh*(${cwidth/cheight})`
        }

        let enable = document.querySelectorAll(".disabled")
        if (enable[0] !== undefined) enable[0].classList.toggle('disabled')        

    }

    function updateBorder(){
        let ctx = canvas.getContext('2d', {alpha: false})  
        font_size = Math.floor(ratio*border/4)
        console.log(ratio, border)
        cwidth = canvas.width = img.width + border*2
        cheight = canvas.height = img.height + ratio*border*2
        //slider_border.prctg = (100*border/img.width).toFixed()+'%'
        //console.log(slider_border.prctg)
        //setSlider(slider_border)
        left_corner[0] = border
        left_corner[1] = cheight - ratio*border/2 + font_size/2      
        right_corner[1] = left_corner[1]
        top_corner[0] = border
        top_corner[1] = ratio*border/2 + font_size/2
        ctx.fillStyle = fcolor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = txtcolor
        ctx.font = `${font_size}px ${font}`
        console.log(`${font_size}px ${font}`)
        updateDataPosition()
        ctx.drawImage(img, border, ratio*border)
        updateDate()        
    }

    function updateDataPosition(){
        let ctx = canvas.getContext('2d', {alpha: false})
        let data_text = tagsList[1]+', '+tagsList[2]+', '+tagsList[3]+'s, '+'ISO '+ tagsList[4]
        let model_text = tagsList[0]

        if (!model_checked){            
            ctx.fillText(data_text, left_corner[0], left_corner[1])
            return
        }        

        switch(model_position){
            case 'left':    
                let txt_dimension = ctx.measureText(data_text).width
                right_corner[0] = cwidth - border - txt_dimension    
                ctx.fillText(model_text, left_corner[0], left_corner[1])
                ctx.fillText(data_text, right_corner[0], right_corner[1])   
                break
            case 'right':
                let model_dimension = ctx.measureText(model_text).width
                right_corner[0] = cwidth - border - model_dimension
                ctx.fillText(data_text, left_corner[0], left_corner[1])
                ctx.fillText(model_text, right_corner[0], right_corner[1])
                break
            case 'top':
                ctx.fillText(model_text, top_corner[0], top_corner[1])
                ctx.fillText(data_text, left_corner[0], left_corner[1])
                break
        } 
    }

    function updateDate(){
        let date = tagsList[5].split(':') 
        date[0] = "'"+date[0].slice(2) 

        switch(date_style){
            case 'dmy':
                date = [date[2],date[1],date[0]].join('-')
                console.log(date)
                break
            case 'mdy':
                date = [date[1],date[2],date[0]].join('-')
                break
            case 'ymd':                
                date = date.join('-')
                break
        }

        if (date_checked){
            let ctx = canvas.getContext('2d', {alpha: false})
            ctx.font = `${font_size}px digital7`  
            let date_dimension = ctx.measureText(date).width
            date_corner[0] = cwidth - border - font_size - date_dimension 
            date_corner[1] = cheight - ratio*border - font_size
            ctx.fillStyle = "rgb(235 180 0/ 70%)"
            ctx.shadowColor = "rgb(207 81 5)"
            ctx.shadowOffsetX = 1
            ctx.shadowOffsetY = 0
            ctx.shadowBlur = 22
            ctx.fillText(date, date_corner[0], date_corner[1])
            console.log(date)
        }
    }

    const increaseBorder = (e, value) => {
        border = value*img.width/100
        console.log(border)
        updateBorder()                    
    }     

    function saveImage(){
        let canvasURL = canvas.toDataURL('image/jpeg', 1)
        let link = document.createElement('a')
        link.href = canvasURL
        link.download = 'new_border_image.jpg'
        link.click()
        link.remove()
    }

    function changeFrameColor(value){
        fcolor = value
        document.getElementById('fbutton').style.backgroundColor = fcolor
        updateBorder()
    }

    function changeTxtColor(value){
        txtcolor = value
        document.getElementById('txtbutton').style.backgroundColor = txtcolor
        updateBorder()
    }

    function changeFont(value){
        font = value

        if (bold_checked){
            console.log('boldchecked')
            boldFont(bold_checked)
            return
        }

        updateBorder()
    }

    function boldFont(checked){
        if (checked){
            font = font+'Bold'
        }
        //uncheck
        else{
            font = font.replace('Bold', '')
        }

        updateBorder()
        bold_checked = checked
    }

    function addCamModel(checked){
        let form = document.getElementById('form__model')
        form.classList.toggle('unchecked')
        model_checked = checked

        updateBorder()
    }

    function modelPosition(value){
        model_position = value

        updateBorder()
    }

    function addDate(checked){
        let form = document.getElementById('form__date')
        form.classList.toggle('unchecked')
        date_checked = checked
        
        updateBorder()        
    }

    function dateStyle(value){
        date_style = value

        updateBorder()
    }

    return(
        <div className="App">
            <div className="App__main"> 
                <label className="file__upload">
                    <CloudUpload />
                    {'Upload...'}
                    <input type="file" id="uploader" onChange={createImage}/>
                </label>
                <canvas id="canvas"></canvas>  
            </div>
            <Tools
                increaseBorder = {increaseBorder}
                slider = {slider}
                changeFrameColor = {changeFrameColor}
                changeTxtColor = {changeTxtColor}
                changeFont ={changeFont}
                boldFont = {boldFont}
                addCamModel = {addCamModel}
                modelPosition={modelPosition}
                addDate = {addDate}
                dateStyle = {dateStyle}
                saveImage = {saveImage}            
            />            
        </div>
    ) 
}

export default App
