//Nhập mã sinh viên để tra cứu

import { useState } from 'react';

// Nhận props từ App.jsx
export default function SearchForm({ onSearch, isLoading }) {
  // State riêng của component này, quản lý text trong ô input
  const [sid, setSid] = useState('');

  const handleSubmit = (event) => {
    // Ngăn trang reload
    event.preventDefault();
    onSearch(sid.trim()); // Gọi hàm handleSearch() ở App.jsx
  };

  return (
    //Trả về biểu mẫu điền MSSV
    <form id="search-form" className="flex flex-col sm:flex-row gap-4 mb-6" onSubmit={handleSubmit}>
      <input 
        type="text" 
        id="sid-input" 
        placeholder="Nhập Mã số sinh viên (ví dụ: 20225315)"
        className="flex-grow shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={sid}
        onChange={(e) => setSid(e.target.value)}
        disabled={isLoading} // Tắt input khi đang tải
      />
      
      <button 
        type="submit" 
        id="search-btn"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300 whitespace-nowrap disabled:bg-gray-400"
        disabled={isLoading} // Tắt nút khi đang tải
      >
        {/*Vẽ icon kính lúp*/}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
        {isLoading ? 'Đang tra...' : 'Tra cứu'}
      </button>
    </form>
  );
}