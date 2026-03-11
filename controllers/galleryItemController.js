import GalleryItem from "../models/galleryItem.js"


export function createGalleryItem(req, res){   
   const user = req.user
   if(user == null){
    res.status(403).json({
        message : "Pleace login to create a gallery item"
    })
    return
   } 
   if(user.type !="admin"){
    req.status(403).json({
        message : "You do not have permission to create a gallery ithem"
    })
    return
   }
    const galleryItem = req.body                    //Create new Gallery item
    const newGalleryItem = new GalleryItem(galleryItem)
    newGalleryItem.save().then(
        ()=>{
            res.json({
                message: "Gallery item created successfully"
            })
        }
    ).catch(
        ()=>{
            res.status(500).json({
                message: "Gallery item creation failed"
            })
        }
    )
}
export function getGalleryItems(req,res){
    GalleryItem.find().then(
        (list)=>{
            res.json({
                list : list
            })
        }
    )
}

