import { Draggable } from "react-beautiful-dnd";
import './DraggablePlace.css'
const DraggablePlace = (allDragableProps) => {
    const {image, imgIndex} = allDragableProps
    
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
                        <input className='inputCheck' type='checkbox' />
                    </div>
                    </div>

                )}
            </Draggable>
        </div>
        
    );
};

export default DraggablePlace;