import { useState } from "react";
import "./ImageGallary.css"
import DropablePlace from "../DropablePlace/DropablePlace";


const imagesData = {
    data: [
    {id: "1", img: "https://i.ibb.co/LJyp6Gd/image-1.webp"},
    {id: "2", img: "https://i.ibb.co/YXgQvrs/image-2.webp"},
    {id: "3", img: "https://i.ibb.co/4Z5pxWj/image-3.webp"},
    {id: "4", img: "https://i.ibb.co/K95XxKJ/image-4.webp"},
    {id: "5", img: "https://i.ibb.co/5G01fxT/image-5.webp"},
    {id: "6", img: "https://i.ibb.co/x6TSkZh/image-6.webp"},
    {id: "7", img: "https://i.ibb.co/7rVxBYK/image-7.webp"},
    {id: "8", img: "https://i.ibb.co/VQPJqNT/image-8.webp"},
    {id: "9", img: "https://i.ibb.co/K77pgqk/image-9.webp"},
    {id: "10", img: "https://i.ibb.co/qxSrtpT/image-10.jpg"},
    {id: "11", img: "https://i.ibb.co/5k6ypSD/image-11.jpg"}
  ]
}

const ImageGallary = () => {
    const [storeData, setStoreData] = useState(imagesData)
    const [deletedId, setDeletedId] = useState([])

    // here deleted all selected images
    const handleDltImages = () => {
        // collect storeData into imageData
        let imageData = storeData;
        // upgrade imageData accordign to selected images to delete
        imageData.data = imageData.data.filter(item => !deletedId.includes(item.id));
        const afterDeletedImg = {
          data: [...imageData.data]
        }
        setStoreData(afterDeletedImg)
        setDeletedId([])
    }
    
    return (
        <div>
            <div style={{display: "flex", justifyContent: "space-between", font: "bold"}}>
                <p>{deletedId?.length} Selected item</p>
                <p onClick={handleDltImages}>Delete Item</p>
            </div>
            <DropablePlace storeData={storeData} setStoreData={setStoreData} deletedId={deletedId} setDeletedId={setDeletedId}/>
        </div>
    );
};

export default ImageGallary;