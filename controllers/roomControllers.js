import Room from "../models/room.js";
import { isAdminValid } from "./userController.js";

//-----------------------Create New Room----------------------------
export function createRoom(req, res){
    if(!isAdminValid(req)){
        res.status(403).json({
            message: "Forbidden"
        })
        return
    }

    const newRoom = new Room(req.body)
    newRoom.save().then(
        (result)=>{
            res.json({
                    message: "Room Created Successfully",
                    result: result
                })
        }
    ).catch(
        (err)=>{
            res.json({
                    message: "Room Creation Failed",
                    error: err
                })
        }
    )
}

//----------------------Delete Room-------------------------
export function deleteRoom(req, res){
    if(!isAdminValid(req)){
        res.status(403).json({
            message: "Forbidden"
        })
        return
    }

    const roomId = req.params.roomId
    Room.findOneAndDelete({roomId: roomId}).then(
        ()=>{
            res.json({
                message: "Room Deleted Successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message: "Room Deletion Failed"
            })
        }
    )
}

//--------------------Get Details by Room Id-----------------------
export function findRoomById(req, res){

    const roomId = req.params.roomId

    Room.findOne({roomId: roomId}).then(
        (result)=>{
            if(result == null){
                res.status(404).json({
                    message: "Room not found"
                })
                return
            }else{
                res.json({
                    message: "Room Found",
                    result: result
                })
            }
        }
    ).catch(
        (err)=>{
            res.json({
                message: "Room search failed",
                error: err
            })
        }
    )
}

//----------------------Show All Rooms------------------------
export function getRooms(req, res){
    Room.find().then(
        (result)=>{
            res.json({
                rooms: result
            })
        }
    ).catch(
        ()=>{
            res.json({
                message: "Failed to get Rooms"
            })
        }
    )
}

//-------------------Update Room-----------------------
export function updateRoom(req,res){
    if(!isAdminValid(req)){
        res.status(403).json({
            message: "Forbidden"
        })
        return
    }

    const roomId = req.params.roomId
    Room.findOneAndUpdate({
        roomId: roomId
    },req.body).then(
        ()=>{
            res.json({
                message: "Room updated successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message: "Room update failed"
            })
        }
    )
}

//-----------------Get Rooms by Category----------------
export function getRoomsByCategory(req, res){
    const category = req.params.category

    Room.find({category: category}).then(
        (result)=>{
            res.json({
                rooms: result
            })
        }
    ).catch(
        ()=>{
            res.json({
                message: "Failed to get Rooms"
            })
        }
    )
}

