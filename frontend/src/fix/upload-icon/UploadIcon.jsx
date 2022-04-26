import React, { useState } from "react";

import './UploadIcon.css';


export default function UploadIcon({parentCallback}) {

     const [selectedImage, setSelectedImage] = useState(null);

     function handleChange(event){
          setSelectedImage(event.target.files[0]);
          parentCallback(event.target.files[0]);
     }

     return (
          <>   
               <label class="upload-file-icon">
                    <div class="upload-file-icon-hover">
                         {selectedImage != null ? <img className="icon-img" alt="not fount" src={URL.createObjectURL(selectedImage)}/>: ''}
                         <input className="icon-file" type="file" name="icon" onChange={handleChange}/>
                    </div>
               </label>
          </>
     );

}