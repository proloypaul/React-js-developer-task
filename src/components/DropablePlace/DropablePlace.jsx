import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DraggablePlace from "../DraggablePlace/DraggablePlace";
import "./DropablePlace.css"

const DropablePlace = (ImageGallaryprops) => {
    const {storeData, setStoreData, deletedId, setDeletedId} = ImageGallaryprops
    console.log("imageGallaryProps", storeData, setStoreData, deletedId, setDeletedId)

    // set drag and drop logic of images when get image source index and destination index 
    const handleDragAndDrop = (results) => {

        const {destination, source, type } = results
    
        if(!destination) return;
    
        if(source.index === destination.index && source.droppableId === destination.droppableId) return;
    
        if(type === "group"){
          const reorderedStoreData = [...storeData.data]

          const sourceIndex = source.index;
          const destinationIndex = destination.index;
          // console.log("source and destination", sourceIndex, destinationIndex)
          
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


    return (
        <DragDropContext onDragEnd={handleDragAndDrop}>
            <Droppable droppableId={"HEADER"}  type="group" direction="horizontal">
            {(provided) =>(
                <div {...provided.droppableProps} ref={provided.innerRef} style={{display: "grid", gridTemplateColumns: "2.4fr 2.4fr 2.4fr 2.4fr 2.4fr", gap:"10px"}}>
                {storeData.data?.map((image, imgIndex) =>  <div key={image.id}><DraggablePlace image={image} imgIndex={imgIndex} deletedId={deletedId} setDeletedId={setDeletedId}/></div>)}
                    {provided.placeholder}
                    <div>Add Image</div>
                </div>
            ) }
            </Droppable>
        </DragDropContext>
    );
};

export default DropablePlace;