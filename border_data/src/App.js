import "./App.css";
import ExifReader from "/node_modules/exifreader/src/exif-reader"
import Tools from "./components/Tools"


let tagsList = []

function App() {
    //let [border, setBorder] = useState(0)
    const img = new Image()
    let canvas 
    let border 
    let font = 'MinimalRegular'
    let data_text
    let model_text 
    let fcolor = "white"
    let txtcolor = "black"
    let cwidth = 0
    let cheight = 0
    let ratio
    let right_corner = []
    let left_corner = []
    let top_corner = []
    let bold_checked = false
    let model_checked = false
    let top_checked = false
    let swap_checked = false

    async function createTags(file){
        const tags = await ExifReader.load(file)

        tagsList = []
        tagsList = tagsList.concat(tags.Model.description.trim())
        tagsList = tagsList.concat(tags.FocalLength.description)
        tagsList = tagsList.concat(tags.FNumber.description)
        tagsList = tagsList.concat(tags.ExposureTime.description)
        tagsList = tagsList.concat(tags.ISOSpeedRatings.description)

        data_text = tagsList[1]+', '+tagsList[2]+', '+tagsList[3]+'s, '+'ISO '+ tagsList[4]
        model_text = tagsList[0]
        console.log(data_text, model_text)
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

            ratio = cheight/cwidth
            console.log(ratio)
            document.getElementById('border').min = cwidth*0.05
            document.getElementById('border').max = cwidth*0.05*4
            document.getElementById('border').step = cwidth*0.05/4
            document.getElementById('border').value = cwidth*0.05
            canvas.style.maxWidth = `calc(95vh*(${cwidth/cheight})`
        }

        let enable = document.querySelectorAll(".disabled")
        if (enable[0] !== undefined) enable[0].classList.toggle('disabled')        

    }

    function updateBorder(){
        let ctx = canvas.getContext('2d', {alpha: false})   
        let font_size = ratio*border/5    
        cwidth = canvas.width = img.width + border*2
        cheight = canvas.height = img.height + ratio*border*2
        left_corner[0] = border
        left_corner[1] = cheight - ratio*border/2 + font_size/2      
        right_corner[1] = left_corner[1]
        top_corner[0] = border
        top_corner[1] = ratio*border/2 + font_size/2
        ctx.fillStyle = fcolor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = txtcolor
        ctx.font = font_size+'px '+font
        updateDataPosition()
        ctx.drawImage(img, border, ratio*border)
    }

    function updateDataPosition(){
        let ctx = canvas.getContext('2d', {alpha: false})

        if (!model_checked){            
            ctx.fillText(data_text, left_corner[0], left_corner[1])
            return
        }        
        //default
        if (model_checked && !swap_checked && !top_checked){        
            let txt_dimension = ctx.measureText(data_text).width
            right_corner[0] = cwidth - border - txt_dimension    
            ctx.fillText(model_text, left_corner[0], left_corner[1])
            ctx.fillText(data_text, right_corner[0], right_corner[1])
        }
        //swap
        if (swap_checked){
            let model_dimension = ctx.measureText(model_text).width
            right_corner[0] = cwidth - border - model_dimension
            ctx.fillText(data_text, left_corner[0], left_corner[1])
            ctx.fillText(model_text, right_corner[0], right_corner[1])
        }
        //top
        if (top_checked){
            ctx.fillText(model_text, top_corner[0], top_corner[1])
            ctx.fillText(data_text, left_corner[0], left_corner[1])
        }
        console.log(swap_checked, top_checked)
    }

    function increaseBorder(value){
        border = value
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
        updateBorder()
    }

    function changeTxtColor(value){
        txtcolor = value
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
        if (font == 'MinimalBold'){
            font = 'MinimalRegular'
        }

        if (font == 'LatoBold'){
            font = 'LatoRegular'
        }
        
        if (checked && font == 'MinimalRegular'){
            font = 'MinimalBold'
        }
        
        if (checked && font == 'LatoRegular'){
            font = 'LatoBold'
        }

        updateBorder()
        bold_checked = checked
    }

    function addCamModel(checked){
        let form = document.getElementById('form__model')
        form.classList.toggle('unchecked')
        model_checked = checked

        updateBorder()
        console.log(model_checked)
    }

    function modelPosition(value){
        switch(value){
            case 'swap':
                top_checked = false
                swap_checked = true
                break
            case 'top':
                swap_checked = false
                top_checked = true
                break
            case 'default':    
                swap_checked = false
                top_checked = false        
        }
        updateBorder()
    }

    return(
        <div className="App">
            <div className="App__main"> 
                <input type="file" id="uploader" onChange={createImage}/>
                <canvas id="canvas"></canvas>  
            </div>
            <Tools
                increaseBorder = {increaseBorder}
                changeFrameColor = {changeFrameColor}
                changeTxtColor = {changeTxtColor}
                changeFont ={changeFont}
                boldFont = {boldFont}
                addCamModel = {addCamModel}
                modelPosition={modelPosition}
                saveImage = {saveImage}            
            />            
        </div>
    ) 
}

export default App
