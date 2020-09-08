import React  , {useState , useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar';
import {db} from './firebase'
import './Post.css';
import firebase from 'firebase'



const Post =({ user , postId ,  username , caption , imageUrl})=>{
	const [comments , setComments]=useState([])
	const [comment , setComment]=useState('')


	const postComment =(event)=>{
		event.preventDefault()
		db.collection("Posts").doc(postId.toString()).collection("comments").add({
			comment : comment,
			username : user.displayName,
			timestamp : firebase.firestore.FieldValue.serverTimestamp()
		})
		setComment('')
	}

	useEffect(()=>{
		let unsubscribe
		if (postId){
			unsubscribe = db
				.collection("Posts")
				.doc(postId.toString())
				.collection("comments")
				.onSnapshot((snapshot)=>{
					setComments(snapshot.docs.map((doc)=>doc.data()))
				})
		}
		
	} , [postId])
	
	return(
		<div className="post">
			<div className="post_header">
				<Avatar
				className="post_avatar" 
				alt={username}
				src="https://lh3.googleuserconte.com/qMUiSWAfGSKKUM5Q8ckNtVSiy5Wr0LdDjNjPQKNfW47sSMQXgYcXuXjd2Gq4uGzCNQfJhG5279wquPEPK6e02mP49jvDf5WbtMsKviz_40Pejs0Ggfnwd7s5k5R3rb0I17AK9xTd_rLnJlX42Zok6YK1wiRgNUP2d7r5jF8tNRj16fmG9bylT2SjrosAi8hzSP8D_hzWwVxRklQl9NCI0pCljV4OKmKgtFqXD3VhEexx4Rve2-noGQlWh0VBQVPzaAjzn99uFBxeXInObxjhpzoxKVA0LapEXIjen8kRdW9E0VAAxcIBLxESZerIQWc1xq-U6pp1fhhWTuwTUzuklSzi8BbpQ-QJLExHQnNfFBRy4oFrgnFgzc2Cq3DjmJKtLfGuldzfun8bZfTRfU_OKO7pE0bR9u-MlI7sjWqTkROXbTccvuUIPzFkw26lWbx0ryYxj3LpoUSjvavngHlX4dgO6x5Z71niY5Gfw4C81hWOReR4By4QgJLg8PFeVtC0RdKsUKyxD4m8qyfGW-W7J9BG8MY_LGwKGiquPBrsqNdhBhceOZmi3nE_DPc7MYvT6WIX4z4D6PI7eQesER83JuM0zgWDvSBkXpgtRO0MER74kjApg5-2lJ8zh15O5FbDVn70l6T1Bht6VeCUni5qFSfH9ncya8KzsLmYlRX2t0UJSa_2nW13TwSC3kDF8Q=w329-h657-no?authuser=0"

				/>
				<h1>{username}</h1>
			</div>
			<img className="post_image" src={imageUrl}/>		
			<h4  className="post_text"><strong>{username}</strong> : {caption}</h4>
			<div className="post_comments">
			{
			comments.map(comment=>{
				return <p><strong>{comment.username}</strong>{comment.comment}</p>
			})
			
									
			}
			</div>
			<form className="post_commentBox">
				<input
				className="post_input"
				type="text"
				placeholder="Add a Comment"
				value={comments}
				onChange={(e)=>setComments(e.target.value)}
				/>
				<button
				className="post_button"
				type="Submit"
				onClick={postComment}
				>Post
				</button>

			</form>
		</div>
		)
}

export default Post


