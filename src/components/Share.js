import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { auth, db } from "../firebase.js"
import "./share.css"

export default function Share() {
  const [popup, setPopup] = useState(false)
  const navigate = useNavigate()

  const baseUrL = "http://localhost:3000/homepage"

  const sharedURL = `${baseUrL}/Share?${auth.currentUser.uid}`

  function getUserData(uid) {
    db.ref("users/" + uid).once("value", (snap) => {
      console.log(snap.val())
    })
  }
  const openPopup = () => {
    setPopup(true)
  }

  const closePopup = () => {
    setPopup(false)
  }

  return (
    <div>
      Share
      <h1>Todo-List</h1>
      <button className="url" onClick={openPopup}>
        {" "}
        create url
      </button>
      <button onClick={() => navigate("/fetch")}>Fetch</button>
      <div>
        {popup ? (
          <div>
            <div className="popup">
              <div className="popup-header">
                <h1> here is your url</h1>
                <button className="btn" onClick={closePopup}>
                  x
                </button>
              </div>
              <div>
                <p>{sharedURL}</p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}
