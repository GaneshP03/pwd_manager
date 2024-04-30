import React from "react";
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" });

  const [passwordArray, setPasswordArray] = useState([]);
  const ref = useRef();

  useEffect(() => {
    console.log(form);
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    ref.current.src.includes("icons/eye.png")
      ? (ref.current.src = "icons/eye-slash.png")
      : (ref.current.src = "icons/eye.png");
  };

  const savePassword = () => {
    setPasswordArray([...passwordArray, {...form,id:uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]));
    setForm({ site: "", username: "", password: "" });
  };
  const editPassword = (id) => {
    setForm(passwordArray.filter(i=>i.id===id)[0]);
    setPasswordArray(passwordArray.filter(item=>item.id!==id));

  };
  const deletePassword = (id) => {
    let assure = confirm("Do you want to delete the password");
    if(assure){
      setPasswordArray(passwordArray.filter(item=>item.id!==id));
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
    }  
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast.success("Copied to Clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
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
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
      <div className="  container px-40 myContainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700">&lt;</span>
          <span>My</span>
          <span className="text-green-700">Pass/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            type="text"
            placeholder="Webiste Name"
            value={form.site}
            name="site"
            onChange={handleChange}
            className="border border-green-400 w-full rounded-full px-4 py-1"
          />
          <div className="flex  w-full justify-between gap-8">
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              name="username"
              className="border border-green-400 rounded-full px-4 py-1 w-full"
              onChange={handleChange}
            />
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                name="password"
                className="border border-green-400 rounded-full px-4 py-1 w-full"
                onChange={handleChange}
              />
              <span className="absolute right-3 top-[3px] ">
                <img
                  ref={ref}
                  src="/icons/eye.png"
                  alt="eye"
                  width={30}
                  onClick={showPassword}
                />
              </span>
            </div>
          </div>
          <button
            className="flex justify-center w-fit items-center px-4 py-2 rounded-full bg-green-600 hover:bg-green-500 border-2 border-green-500"
            onClick={savePassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="password ">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length == 0 && <div>No Passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full overflow-hidden rounded-md">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Website</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" py-2 border border-white text-center">
                        <div className="flex justify-center items-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="size-7"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "18px",
                                height: "18px",
                                paddingTop: "3px",
                                paddingLeft: "5px",
                                cursor: "pointer",
                              }}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center min-w-32">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className="size-7"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "18px",
                                height: "18px",
                                paddingTop: "3px",
                                paddingLeft: "5px",
                                cursor: "pointer",
                              }}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center min-w-32">
                        <div className="flex items-center justify-center">
                          <span> {item.password}</span>
                          <div
                            className="size-7"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "18px",
                                height: "18px",
                                paddingTop: "3px",
                                paddingLeft: "5px",
                                cursor: "pointer",
                              }}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center min-w-32">
                        <span className="cursor-pointer mx-2" onClick={()=>{editPassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/ogkflacg.json"
                            trigger="hover"
                            style={{"width":"25px","height":"25px"}}  
                          ></lord-icon>
                        </span>
                        <span className="cursor-pointer mx-2" onClick={()=>{deletePassword(item.id)}}>
                          <lord-icon
                           src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
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
