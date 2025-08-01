import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/")
      let passwords = await req.json()
      console.log(passwords)
      setPasswordArray(passwords);
  }
  

  useEffect(() => {

    getPasswords()
    
  
  }, []);


  const copyText = (text)=>{
    toast('Copied to clipboard!', {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  
});

    navigator.clipboard.writeText(text)
  }

  const showPassword = () => {
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
      ref.current.src = "icons/eyecross.png";
    }
  };

  
const savePassword = async () => {
  if (
    form.site.length > 3 &&
    form.username.length > 3 &&
    form.password.length > 3
  ) {
     
    //if any such id exist in the db, delete it
 await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
 
    // const newEntry = { ...form, id: uuidv4() };
    // const updatedList = [...passwordArray, newEntry];
    // setPasswordArray(updatedList);
    // localStorage.setItem("passwords", JSON.stringify(updatedList));
    // console.log(updatedList);
    setform({ site: "", username: "", password: "" });



  } else {
    toast.warn("All fields must be longer than 3 characters!", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });
  }
};


    const deletePassword = async (id) => {
        console.log("Deleting password with id ", id)
        let c = confirm("Do you really want to delete this password?")
        if(c){
            setPasswordArray(passwordArray.filter(item=>item.id!==id))

            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })


            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id))) 
          }
            
    }

    
    const editPassword = (id) => {
         
        console.log("Editing password with id ", id)
        setform({...passwordArray.filter(i=>i.id===id)[0], id: id}) 
        setPasswordArray(passwordArray.filter(item=>item.id!==id)) 

    }


 
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
     

    <ToastContainer
  position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="dark"
  transition= "Bounce"
/>

<ToastContainer/>


      <div className="mycontainer min-h-[91.6vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-indigo-500">&lt;</span>

          <span className="text-white">Pass</span>

          <span className="text-indigo-500">OP/ &gt;</span>
        </h1>

        <p className="text-indigo-300 text-lg text-center font-semibold">
          Your own Password Manager
        </p>

        <div className=" flex flex-col p-4 text-white gap-8 items-center ">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-indigo-400 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />

          <div className="flex flex-col md:flex-row w-full justify-between gap-5 ">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-indigo-400 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />

            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-indigo-400 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
              />

              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className=" filter invert p-1"
                  width={26}
                  src="icons/eye.png"
                  alt="eye"
                  srcset=""
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-indigo-600 hover:bg-indigo-500 rounded-full px-8 py-2 w-fit font-semibold gap-2 cursor-pointer"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#ffffff"
            ></lord-icon>
            Save 
          </button>
        </div>

        <div className="passwords md:flex-row">
          <h2 className="text-2xl py-3 text-gray-400 font-bold">
            Your Passwords
          </h2>

          {passwordArray.length === 0 && (
            <div className="text-gray-500 font-semibold">
              No passwords to show
            </div>
          )}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-indigo-900 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-black/30 text-white">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="border border-gray-800 text-center py-2">
                        <div className="flex items-center justify-center">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>

                        <div className="lordiconcopy size-7 cursor-pointer" onClick={()=>{copyText(item.site)}}>
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              "paddingTop": "3px",
                              "paddingLeft": "3px",
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                          ></lord-icon>
                        </div>
                        </div>
                      </td>
                      <td className=" border border-gray-800 text-center py-2">
                         <div className="flex items-center justify-center">
                        <span>{item.username}</span>

                        <div className="lordiconcopy size-7 cursor-pointer" onClick={()=>{copyText(item.username)}}>
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              "paddingTop": "3px",
                              "paddingLeft": "3px",
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                          ></lord-icon>
                        </div>
                        </div>
                      </td>
                      <td className=" border border-gray-800 text-center py-2">

                        <div className="flex items-center justify-center">
                        <span>{"*".repeat(item.password.length)}</span>

                        <div className="lordiconcopy size-7 cursor-pointer"  onClick={()=>{copyText(item.password)}} >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              "paddingTop": "3px",
                              "paddingLeft": "3px",
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                          ></lord-icon>
                        </div>
                        </div>
                      </td>




                    <td className="justify-center border border-gray-800 text-center py-2">
                     
                     <span className="cursor-pointer mx-1" onClick={()=>{editPassword(item.id)}}>

                          <lord-icon
                           
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                            style={{"width":"25px","height":"25px"}}
                          ></lord-icon>                    


                     </span>


                        <span className="cursor-pointer mx-1" onClick={()=>{deletePassword(item.id)}}>

                          <lord-icon
                           
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                            style={{"width":"25px","height":"25px"}}
                          ></lord-icon>                    

                     </span>
                    
                        
                      </td>


                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
