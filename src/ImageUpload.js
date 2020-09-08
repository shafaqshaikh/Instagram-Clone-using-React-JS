import React , {useState} from 'react'
import {Button} from '@material-ui/core'
import {storage , db} from './firebase'
import firebase from 'firebase'
import './ImageUpload.css'



const ImageUpload = ()=>{
	const [image , setImage] = useState(null)
	const [progress , setProgess] = useState('')
	const [caption , setCaption] = useState('')
	const [username , setUsername] = useState('')

	const handleChange =(e)=>{
		if (e.target.files[0]){
			setImage(e.target.files[0])
		}
	}

	const handleUpload=(props)=>{

		const uploadTask=storage.ref(`images/${image.name}`).put(image)
			uploadTask.on(
				"state_changed" , 
				(snapshot)=>{
					const progress = Math.round(
						(snapshot.BytesTransferred/snapshot.totalBytes)*100

						)
					setProgess(progress)
				},
				(error)=>{
					console.log(error)
					alert(error.message)
				},
				()=>{
					storage
						.ref("images")
						.child(image.name)
						.getDownloadURL()
						.then(url=>{
							db.collection("Posts").add({
								timestamp : firebase.firestore.FieldValue.serverTimestamp(),
								caption : caption,
								imageUrl : url,
								username :username
							})
							setProgess(0)
							setCaption("")
							setImage(null)
						})
				}
				)
	}

	return(
		<div className="imageupload">
		<progress className="imageupload_progress" value={progress} max="100" />
		<input type="text" placeholder="Enter a Name" value={username} onChange={(e)=>setUsername(e.target.value)}  />
		
		<input type="text" placeholder="Enter a Caption" value={caption} onChange={(e)=>setCaption(e.target.value)}  />
		<input type="file" onChange={handleChange}/>
		<Button className="imageUpload_button" onClick={handleUpload}>Upload</Button>
		</div>
		)
}

export default ImageUpload