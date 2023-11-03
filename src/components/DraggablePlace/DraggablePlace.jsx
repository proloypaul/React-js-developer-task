import { Draggable } from "react-beautiful-dnd";
import './DraggablePlace.css'
const DraggablePlace = (allDragableProps) => {
    const {image, imgIndex, deletedId, setDeletedId} = allDragableProps

    const handleCheckValue = (e) => {
        const checkValue = e.target.value
        const isTrue = e.target.checked
        if(isTrue){
          setDeletedId([...deletedId, checkValue])
        }else{
            // remove unchecked image using splice method
            const indexOfDltValue = deletedId.indexOf(checkValue)
            deletedId.splice(indexOfDltValue, 1)
            const updatedDeletedId = [...deletedId]
            setDeletedId(updatedDeletedId)
        }
      }

      
    return (
        <div className="draggContainer">
            <Draggable draggableId={image?.id} key={image.id} index={imgIndex}>
                {(provided) => (
                    <div 
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className="conditionalId2"
                    >
                    <div className="imgDesign">
                        <img src={image.img} alt="Empty!" width="200px" style={{border: "1px solid lightgray", borderRadius:"10px"}}/>
                        <input className='inputCheck' type='checkbox' value={image?.id} onClick={(e) => handleCheckValue(e)}/>
                    </div>
                    </div>

                )}
            </Draggable>
        </div>
        
    );
};

export default DraggablePlace;