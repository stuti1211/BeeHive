import { useEffect, useState, useRef  } from 'react';
import { deleteFiles, getCurrentUser,getFiles ,uploadFile, viewFiles} from '../serviecs/authService';
import Sidebar from '../components/Sidebar';
import { Download, Trash2 ,Search } from "lucide-react";
import sud from '../assests/sud.png';

function Dashboard() {
    const [user, setUser] = useState(null);
    const fileInputRef = useRef(null);
    const [search ,setSearch]=useState("");
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getCurrentUser();
                console.log(data.userData);
                setUser(data.userData);
            } catch (error) {
                console.error(error);
            }
               const fileData = await getFiles();
                setFiles(fileData);
        };
        fetchUser();
    }, []);
    if (!user) {
        return <h1>Loading...</h1>;
    }

    const handleUpload = async (file) => {
      try {
        await uploadFile(file);
        const fileData = await getFiles();
        setFiles(fileData);

        //alert("File uploaded successfully");
      } catch (error) {
        console.error(error);
      }
    };
    
    const handleView = async(id)=>{
       try{
          console.log(2);
          const blob = await viewFiles(id); 
          const url = window.URL.createObjectURL(blob);
           window.open(url, "_blank");
           setTimeout(() => {
           window.URL.revokeObjectURL(url);
          }, 1000);

       }
       catch(error){
         console.error(error);
        alert("Unable to open file");
       }
       
    };
    const handleDelete= async(id)=>{
       try{
        await deleteFiles(id);
        setFiles((prevFile)=>
         prevFile.filter((file)=>
            file.id!==id)                
      );
    }catch(error){
      console.error(error);
        alert("Failed to delete file");
    }
  }
const filteredFiles = files.filter((file)=>{
  return file.original_name.toLowerCase().includes(search.toLowerCase())
});
return (
<div className="min-h-screen bg-gray-100">
    <div className="flex justify-between items-center px-8 py-3">
      <div className="flex items-center gap-2">
        <img
          src={sud}
          alt="BeeHive logo"
          style={{ width: "3.8rem", height: "4rem" }}
        />
        <h1 className="text-3xl font-bold">BeeHive</h1>
      </div>
      {/* Search Bar */}
    <div className="flex-1 flex justify-center px-3">
     <div className="relative w-full max-w-xl">
        <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
        type="text"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        placeholder="Search files..."
        className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 bg-white shadow-sm outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
        />
    </div>
    </div>
    <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition">
      {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-xl font-bold text-white">
          {user.email.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">
            Welcome, {user.name}
          </h3>
          {/* <h2 className="text-sm text-gray-500">{user.name}</h2> */}
         <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </div>
   </div>
    <div className="flex px-8 gap-4">
      <Sidebar />
      <div className="flex-1">
        {/* <div className="flex">
         <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Upload File
          </h2>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              setSelectedFile(file);
            }}
          />
          <button
            onClick={handleUpload}
            className="ml-10 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Upload
          </button>
        </div>
        </div> */}
         <div className="bg-white p-6 rounded-lg shadow mt-4">
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold mb-4">My Files</h2>
            <button  onClick={() => fileInputRef.current.click()}
            className="ml-10 bg-blue-500 text-white px-4 py-2 rounded"> Upload </button>
             <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setSelectedFile(file);
                    handleUpload(file);
                  }
                }}
              />
            </div>
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              className="p-3 rounded mb-2 flex justify-between items-center"
            >
             <span
                onClick={() => handleView(file.id)}
                className="cursor-pointer hover:text-blue-600 hover:underline">
              {file.original_name}
               </span>
              <div className="flex gap-3">
               <Download
                    size={20}
                    className="text-blue-600 cursor-pointer hover:text-blue-800 transition"
                    onClick={() => handleDownload(file.id)}
               />
                <Trash2
                    size={20}
                    className="text-red-600 cursor-pointer hover:text-red-800 transition"
                    onClick={() => handleDelete(file.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>

);
}

export default Dashboard;