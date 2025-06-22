export default function Login() {
  return (
    <div>
      <main className="login">
        <div className="w-[1200px] h-screen mx-auto my-0 py-30">
          <div className="flex justify-center items-center py-2">
            <label className="block w-20">User ID: </label>
            <input type="text" className="bg-white border-blue-500 border-2 px-2 py-1" />
          </div>
          <div className="flex justify-center items-center py-2">
            <label className="block w-20">Password: </label>
            <input type="password" className="bg-white border-blue-500 border-2 px-2 py-1" />
          </div>
          <div className="py-2">
            <input type="button" value="Login" className="block bg-white text-blue-500 border-blue-500 border-2 rounded-md h-10 w-20 mx-auto my-0 duration-300 hover:bg-blue-500 hover:text-white cursor-pointer" />
          </div>
        </div>
      </main>
    </div>
  );
}
