import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DraggablePlace from "../DraggablePlace/DraggablePlace";
import {PiImageFill} from 'react-icons/pi'
import Swal from 'sweetalert2'
import "./DropablePlace.css"

const DropablePlace = (ImageGallaryprops) => {
    const {storeData, setStoreData, deletedId, setDeletedId} = ImageGallaryprops

    // set drag and drop logic of images when get image source index and destination index 
    const handleDragAndDrop = (results) => {

        const {destination, source, type } = results
    
        if(!destination) return;
    
        if(source.index === destination.index && source.droppableId === destination.droppableId) return;
    
        if(type === "group"){
          const reorderedStoreData = [...storeData.data]
          const sourceIndex = source.index;
          const destinationIndex = destination.index;
          
          // remove source index value and collect removed value into removeItem 
          const [removeItem] = reorderedStoreData.splice(sourceIndex, 1);

          // set remove item value into destination index
          reorderedStoreData.splice(destinationIndex, 0, removeItem);
          const newObjectOfChildImg = {
            data: reorderedStoreData
          }

          // update storeData according to drag and drop logic
          setStoreData(newObjectOfChildImg)
        }
      }

      // handle upload img 
      const handleImg = async (e) => {
        let imgData = new FormData();
        // set my imgbb key to host my uploaded image
        imgData.set("key", import.meta.env.VITE_IMABB_KEY);
        imgData.append('image', e.target.files[0]);
        const API_URL = `https://api.imgbb.com/1/upload`
        const res = await window.fetch(API_URL, {
            method: "POST",
            body: imgData,
        })
        const data = await res.json();
        if(data.data.display_url){
            Swal.fire({
                position: 'bottom-end',
                icon: 'success',
                title: 'Image Uploaded Successfully!',
                showConfirmButton: false,
                timer: 1500
            })
        }else{
            Swal.fire({
                title: 'Failed to upload Img',
                icon: 'error',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
            })
        }

        // update store data when uploaded new image
        const generateId = (storeData.data?.length + 1).toString() 
        const newImage = {id: generateId, img: data.data.display_url}
        const updatedStoreData = {
            data: [...storeData.data, newImage]
        } 
        setStoreData(updatedStoreData);
    }

    return (
        <DragDropContext onDragEnd={handleDragAndDrop}>
            <Droppable droppableId={"HEADER"}  type="group" direction="horizontal">
            {(provided) =>(
                <div {...provided.droppableProps} ref={provided.innerRef} className="droppableImages">
                    {storeData.data?.map((image, imgIndex) =>  <div key={image.id} className="catchFirstImage"><DraggablePlace image={image} imgIndex={imgIndex} deletedId={deletedId} setDeletedId={setDeletedId}/></div>)}
                    {provided.placeholder}
                    <div className="addImage">
                        <div>
                            <label className="fileUpload">
                                <input  type='file' name='img'  onChange={handleImg} required/>
                                <span className="imageIcon"><PiImageFill/></span>
                                <p>Add Images</p>
                            </label>
                        </div>
                    </div>
                </div>
            )}
            </Droppable>
        </DragDropContext>
    );
};

export default DropablePlace;