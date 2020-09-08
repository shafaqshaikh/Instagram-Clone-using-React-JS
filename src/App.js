import React  , {useState , useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Post from './Post'
import {db , auth} from './firebase'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core'
import ImageUpload from './ImageUpload'
import InstagramEmbed from 'react-instagram-embed'
function rand() {
  return Math.round(Math.random() * 20) - 10;
}
  
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {

  const classes = useStyles()
  const [modalStyle] = React.useState(getModalStyle);
  const [Posts , setPosts] = useState([])
  const [open , setOpen] =useState(false)
  const [openSignIn , setOpenSignIn] =useState(false)
  const [username , setUsername] =useState('')
  const [email , setEmail] =useState('')
  const [password , setPassword] =useState('')
  const [user , setUser] =useState(null)


useEffect(()=>{
 const unsubscribe = auth.onAuthStateChanged((authUser)=>{
    if(authUser){
      console.log(authUser)
      setUser(authUser)
    }
     else
    {
      setUser(null)
    }

  })

 return ()=>{
  unsubscribe()
 }
}  , [user , username])
  

useEffect(()=>{
  db.collection('Posts').orderBy('timestamp' , 'desc').onSnapshot(snapshot =>{
    setPosts(snapshot.docs.map(doc=> doc.data()))
  })
} , [])

const signUp =(event)=>{
  event.preventDefault()
  auth.createUserWithEmailAndPassword(email , password)
  .then((authUser)=>{
   return  authUser.user.updateProfile({
      displayName:username
    })
  })
  .catch((error)=>alert(error.message))
  setOpen(false)
}

const signIn=(event)=>{
  event.preventDefault()
  auth.signInWithEmailAndPassword(email , password)
  .catch((error)=>{alert(error.message)})
  setOpenSignIn(false)
}


  return (

    <div className="app">
    
        
    <Modal
      open={open}
      onClose={()=> setOpen(false)}
      >
      <div style={modalStyle} className={classes.paper}>
      <form className="app_signup">
            <center>
              <img
              className="app_headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="shafaq"
              />
            </center>
            <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            />
            <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <Button onClick={signUp}>Sign Up</Button>
      </form>
            </div>
      
    </Modal>
    <Modal
      open={openSignIn}
      onClose={()=> setOpenSignIn(false)}
      >
      <div style={modalStyle} className={classes.paper}>
      <form className="app_signup">
            <center>
              <img
              className="app_headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="shafaq"
              />
            </center>
            <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <Button onClick={signIn}>Sign In</Button>
      </form>
            </div>
      
    </Modal>
      <div className="app_header">
      <img
      className="app_headerImage"
      src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
      alt="shafaq"
      />
      {user ?
        (<Button onClick={()=>auth.signOut()}>Log Out</Button>
        ):(
          <div className="app_loginContainer">
          <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={()=>setOpen(true)}>Sign Up</Button>
          </div>
        )
      }
      
      </div>

      
      
    <div className="app_post">
        <div className="app_postLeft">
        {
          Posts.map((post , id)=>{
            return <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
          })
        }
        </div>
        <div className="app_postRight">
        <InstagramEmbed
            url='https://www.instagram.com/p/CB-AuH5FQ5P/'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
            />
      </div>


    </div>
      
      
      {
      user?.displayName ?
       (
        <ImageUpload username={user.displayName}/>
        ):
       (
        <h2>Sorry , you need to login to upload </h2>
        )
     
    }

      </div>

  );
}

export default App;
