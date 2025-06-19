export default function Home() {
  return (
    <div>
      <main className="h-screen">
        <div className="flex justify-center w-[1200px] h-full mx-auto my-0">
          <div className="chat_rooms w-3/10 h-full bg-white border-blue-500 border-x-4"></div>
          <div className="w-7/10 h-full">
            <div className="chat_screen bg-blue-100 w-full h-9/10"></div>
            <div className="w-full h-1/10">
              <input type="text" className="bg-white border-blue-500 border-2 px-2 py-1" />
              <input type="button" value="Send" className="bg-white text-blue-500 border-blue-500 border-2 h-6 w-10" />
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-blue-500 h-10">
        <div className="flex justify-center w-[1200px] mx-auto my-0">
          <a href="" className="block bg-white text-blue-500 border-blue-500 border-l-4 border-r-2 border-y-4 text-lg font-bold text-center h-10 w-50 duration-300 hover:bg-blue-500 hover:text-white">Chat</a>
          <a href="" className="block bg-white text-blue-500 border-blue-500 border-x-2 border-y-4 text-lg font-bold text-center h-10 w-50 duration-300 hover:bg-blue-500 hover:text-white">Friends</a>
          <a href="" className="block bg-white text-blue-500 border-blue-500 border-r-4 border-l-2 border-y-4 text-lg font-bold text-center h-10 w-50 duration-300 hover:bg-blue-500 hover:text-white">Settings</a>
        </div>
      </footer>
    </div>
  );
}
